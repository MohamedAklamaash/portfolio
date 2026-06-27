import Intro from "@/components/hero/intro";
import AboutMe from "@/components/about-me";
import FeaturedProjects from "@/components/featured-projects";
import ContactSection from "@/components/contact-section";
import { TRACKS, type TrackId } from "@/lib/tracks";
import { NextSeo } from "next-seo";

const TrackHome = ({ track }: { track: TrackId }) => {
  const { seo, id } = TRACKS[track];
  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={`https://aklamaash.me/${id}`}
      />
      <Intro track={track} />
      <AboutMe track={track} />
      <FeaturedProjects track={track} />
      <ContactSection />
    </>
  );
};

export default TrackHome;
