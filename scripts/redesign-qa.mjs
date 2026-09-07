/** QA do redesign com o Playwright já disponível no ambiente, sem dependência de produção. */
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const base = process.env.QA_URL || 'http://localhost:3000';
mkdirSync('.qa-shots', { recursive: true });
const report = [];
const errors = [];
const sharp = require('sharp');
const luminance = rgb => rgb.map(v => v/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
for (const [name, width, height] of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844],['small',320,780]]) {
  const page = await browser.newPage({ viewport: {width,height}, reducedMotion: 'reduce' });
  await page.goto(base, {waitUntil:'networkidle'});
  await page.screenshot({path:`.qa-shots/redesign-${name}.png`,fullPage:true});
  await page.screenshot({path:`.qa-shots/hero-${name}.png`});
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  report.push({name,overflow});
  // Amostra o fundo real sob cada caractere, incluindo gradiente e marca.
  const text = await page.evaluate(() => Array.from(document.querySelectorAll('.hero-copy .eyebrow, .hero-line > span, .hero-copy .lead, .hero-copy .pill')).map(el => {
    const style = getComputedStyle(el);
    const points = [];
    const walker = document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const node = walker.currentNode;
      for(let i=0;i<node.textContent.length;i++) {
        if (!node.textContent[i].trim()) continue;
        const r = document.createRange(); r.setStart(node,i);r.setEnd(node,i+1);
        const box = r.getBoundingClientRect();
        points.push([box.x+box.width/2,box.y+box.height/2]);
      }
    }
    return {label:el.textContent.trim().slice(0,35),rgb:style.color.match(/[\d.]+/g).slice(0,3).map(Number),min:parseFloat(style.fontSize)>=24?3:4.5,points};
  }));
  const hidden = await page.addStyleTag({content:'.hero-copy * { color: transparent !important; }'});
  const {data,info} = await sharp(await page.screenshot({fullPage:true})).removeAlpha().raw().toBuffer({resolveWithObject:true});
  await hidden.evaluate(el=>el.remove());
  const contrasts = text.map(item => {
    const fg = luminance(item.rgb);
    const ratios = item.points.map(([x,y])=>{
      const i=(Math.floor(y)*info.width+Math.floor(x))*info.channels;
      const bg=luminance(Array.from(data.subarray(i,i+3)));
      return (Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);
    });
    return {label:item.label,ratio:Number(Math.min(...ratios).toFixed(2)),minimum:item.min};
  });
  report.push({name,contrasts});
  writeFileSync('.qa-shots/redesign-report.json',JSON.stringify(report,null,2));
  await page.close();
}
const routes = ['/baixar','/recursos','/instalacao','/documentacao','/faq','/sobre','/privacidade','/termos'];
for (const route of routes) {
  const page = await browser.newPage({viewport:{width:320,height:780},reducedMotion:'reduce'});
  const response = await page.goto(base + route,{waitUntil:'networkidle'});
  report.push({route,status:response.status(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth)});
  await page.close();
}
const nojs = await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:780}});
await nojs.goto(base);
report.push({noJS:await nojs.locator('h1').isVisible(),svgFallback:await nojs.locator('.nv3d-flat img').isVisible()});
await nojs.close();
const live = await browser.newPage({viewport:{width:1440,height:1000}});
live.on('pageerror',e=>errors.push(e.message));
await live.addInitScript(()=>{
  window.__metrics={lcp:0,cls:0};
  new PerformanceObserver(list=>{for(const e of list.getEntries())window.__metrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__metrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
});
await live.goto(base,{waitUntil:'networkidle'});
await live.waitForFunction(() => document.querySelector('canvas') && !document.querySelector('.nv3d-flat'));
await live.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'));
await live.waitForTimeout(700);
await live.screenshot({path:'.qa-shots/hero-webgl.png'});
report.push({webgl:await live.locator('canvas').count(),metrics:await live.evaluate(()=>window.__metrics)});
await live.locator('#pilares').scrollIntoViewIfNeeded();
await live.waitForTimeout(750);
report.push({scrollCueHidden:await live.locator('.scroll-cue').getAttribute('data-scrolled')!==null});
await live.emulateMedia({reducedMotion:'reduce'});
await live.locator('.nv3d-flat img').waitFor({state:'visible'});
report.push({reducedFallback:await live.locator('.nv3d-flat img').isVisible()});
await live.setViewportSize({width:390,height:844});
await live.locator('.menu-trigger').click();
await live.keyboard.press('Tab');
await live.keyboard.press('Escape');
report.push({menuClosed:!(await live.locator('#site-menu').isVisible()),focusRestored:await live.locator('.menu-trigger').evaluate(el=>el===document.activeElement)});
await live.close();
report.push({errors});
await browser.close();
writeFileSync('.qa-shots/redesign-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if (errors.length || report.some(item => item.overflow || item.status >= 400 || item.noJS === false || item.svgFallback === false || item.contrasts?.some(c=>c.ratio<c.minimum) || item.menuClosed===false || item.focusRestored===false || item.reducedFallback===false)) process.exitCode = 1;
