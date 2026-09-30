import EnglishPage from "@/components/seo/EnglishPage";
import { PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
const page = PAGES[0];
export const metadata = pageMetadata({title: page.title, description: page.description, path: page.en});
export default function Page() { return <EnglishPage path="/en" />; }

