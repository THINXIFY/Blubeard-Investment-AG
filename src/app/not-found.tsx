import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-white" aria-labelledby="nf-title">
      <Container className="flex min-h-[80svh] flex-col justify-center gap-8 pt-[var(--header-h)]">
        <Eyebrow index="404">Page not found</Eyebrow>
        <h1 id="nf-title" className="max-w-[16ch] text-display">
          This page could not be found.
        </h1>
        <p className="max-w-[44ch] text-lead text-slate">
          The address may have changed, or the page may no longer exist.
        </p>
        <div>
          <Button href="/" arrow>
            Return home
          </Button>
        </div>
      </Container>
    </section>
  );
}
