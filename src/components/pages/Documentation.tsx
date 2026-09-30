import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { ArrowUpRight } from "@/components/icons";
import { REPO_URL, REPO_PACOTES, CHAVE_FPR, CONTACT_EMAIL, DOCS_URL, VERSAO } from "@/lib/constants";
import { fmt, getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { localePath } from "@/lib/routes";

export default function Documentation({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const t = messages.documentation;
  const c = messages.common;
  const link = (path: string) => localePath(locale, path);
  const mail = `mailto:${CONTACT_EMAIL}`;
  const paths = [link("/baixar"), link("/instalacao"), "#primeiros-passos"];
  return (
    <>
      <section className="hero" aria-label={t.hero.label}>
        <div className="hero-copy">
          <span className="eyebrow">{fmt(t.hero.eyebrow, { version: VERSAO })}</span>
          <h1 className="h-xl">{t.hero.title}</h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="pill-row">
            <a
              className="pill"
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.hero.repo}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="panel prose" aria-labelledby="construir">
        <h2 id="construir">{t.build.title}</h2>
        <p>{t.build.text1}</p>
        <p>{t.build.text2}</p>
        <p>{rich(t.build.links, { buildGuide: `${DOCS_URL}/COMO-CONSTRUIR.md`, news: link("/novidades"), mail })}</p>
        <p>{rich(t.build.guides, { guides: link("/guias") })}</p>
      </section>

      <section className="panel" aria-labelledby="comecar">
        <div className="sec-head"><span className="eyebrow">{t.start.eyebrow}</span><h2 className="h-lg" id="comecar">{t.start.title}</h2></div>
        <div className="doc-paths">
          {t.start.paths.map((path, index) => {
            const content = <><strong>{path.title}</strong><span>{path.text}</span><ArrowUpRight /></>;
            const href = paths[index];
            return href.startsWith("#")
              ? <a className="doc-path" key={href} href={href}>{content}</a>
              : <Link className="doc-path" key={href} href={href}>{content}</Link>;
          })}
        </div>
      </section>

      <section className="panel" aria-labelledby="primeiros-passos">
        <div className="sec-head"><span className="eyebrow">{t.firstSteps.eyebrow}</span><h2 className="h-lg" id="primeiros-passos">{t.firstSteps.title}</h2></div>
        <p className="lead">{t.firstSteps.lead1}</p>
        <CodeBlock t={messages.code}>{"neo-status"}</CodeBlock>
        <p className="step-desc">{t.firstSteps.result}</p>
        <p className="lead">{t.firstSteps.lead2}</p>
        <CodeBlock t={messages.code}>{"neo-status --help"}</CodeBlock>
        <p className="grid-note">{t.firstSteps.note}</p>
      </section>

      <section className="panel" aria-labelledby="problemas">
        <div className="sec-head"><span className="eyebrow">{t.problems.eyebrow}</span><h2 className="h-lg" id="problemas">{t.problems.title}</h2></div>
        <p className="lead">{rich(t.problems.lead, { guides: link("/guias") })}</p>
        <div className="pill-row"><a className="pill pill--ghost" href={mail}>{t.problems.cta} <ArrowUpRight /></a></div>
      </section>

      <section className="panel" aria-labelledby="indice">
        <div className="sec-head">
          <span className="eyebrow">{t.index.eyebrow}</span>
          <h2 className="h-lg" id="indice">{rich(t.index.title)}</h2>
        </div>
        <ol className="steps">
          {Object.entries(t.index.docs).map(([file, doc], index) => (
            <li className="step" key={file}>
              <span className="step-code">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name"><a href={`${DOCS_URL}/${file}`}>{doc.title}</a></h3>
                  <span className="step-dur">documentation/{file}</span>
                </div>
                <p className="step-desc">{doc.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--accent" aria-labelledby="repo">
        <div className="sec-head">
          <span className="eyebrow">{t.repo.eyebrow}</span>
          <h2 className="h-lg" id="repo">{rich(t.repo.title)}</h2>
          <p className="lead">{rich(t.repo.lead)}</p>
        </div>
        <CodeBlock t={messages.code} label="pacman.conf">{`[neovanguard]
SigLevel = Required DatabaseOptional
Server = ${REPO_PACOTES.replace("/x86_64", "/$arch")}`}</CodeBlock>
        <p className="lead">{t.repo.fingerprint}</p>
        <CodeBlock t={messages.code} label={messages.code.keyFingerprint}>{CHAVE_FPR}</CodeBlock>
      </section>

      <section className="panel" aria-labelledby="ajuda">
        <div className="sec-head">
          <span className="eyebrow">{t.help.eyebrow}</span>
          <h2 className="h-lg" id="ajuda">{rich(t.help.title)}</h2>
        </div>
        <p className="lead">{rich(t.help.lead)}</p>
        <CodeBlock t={messages.code}>{`neo-status --help
neo-zap --help
nvginstall --help`}</CodeBlock>
      </section>

      <section className="closer" aria-label={c.nextStep}>
        <h2 className="h-xl">{t.closer.title}</h2>
        <div className="pill-row">
          <a className="pill" href={mail}>
            {t.closer.cta}
            <ArrowUpRight />
          </a>
          <Link href={link("/guias")} className="pill pill--ghost">
            {c.systemGuides}
          </Link>
        </div>
      </section>
    </>
  );
}
