import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Topics from "@/components/Topics";
import ImportantDates from "@/components/ImportantDates";
import Committees from "@/components/Committees";
import SubmissionGuidelines from "@/components/SubmissionGuidelines";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Topics />
        <ImportantDates />
        <Committees />
        <SubmissionGuidelines />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
