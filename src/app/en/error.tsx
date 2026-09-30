"use client";

import ErrorView from "@/components/pages/ErrorView";

export default function Error(props: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorView locale="en" {...props} />;
}
