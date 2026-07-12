import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubmissionForm from "@/components/SubmissionForm";
import { conference } from "@/lib/conference-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Submit a paper — ${conference.shortName}`,
};

export default function SubmitPage() {
  return (
    <>
      <Header />
      <main className="blueprint-grid min-h-[calc(100vh-64px)] bg-ink-900">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">No account needed</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
            Submit your paper
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-300">
            Fill in the details below and attach your manuscript as a PDF. Your submission is sent
            directly to the organizing committee — no login or registration required.
          </p>

          <div className="mt-10 rounded-xl border border-ink-600 bg-ink-800/30 p-6 sm:p-8">
            <SubmissionForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
