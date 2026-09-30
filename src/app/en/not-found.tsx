import Link from "next/link";
export default function NotFound() {
  return <section className="panel prose"><h1>Page not found</h1><p>The requested page does not exist. Check the address or return to the home page.</p><Link href="/en">Back to home</Link></section>;
}
