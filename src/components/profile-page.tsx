import type { Profile } from "@/content/profiles";
import { projectsFor } from "@/content/projects";
import {
  EDUCATION,
  PROFILE_LABELS,
  PROFILE_PATHS,
  type ProfileId,
} from "@/content/site";
import { breadcrumbSchema, profilePageSchema } from "@/lib/structured-data";
import Link from "next/link";
import Contact from "./contact";
import Experience from "./experience";
import { ArrowRight } from "./icons";
import ProfileHero from "./profile-hero";
import { ProjectCard } from "./project-card";
import Section from "./section";
import Seo from "./seo";
import Skills from "./skills";
import TaleFeature from "./tale-feature";

const ProfilePage = ({ profile }: { profile: Profile }) => {
  const projects = projectsFor(profile.id);
  const path = PROFILE_PATHS[profile.id];
  const other: ProfileId = profile.id === "software" ? "ai" : "software";
  return (
    <>
      <Seo
        title={profile.seo.title}
        description={profile.seo.description}
        path={path}
        type="profile"
        image={`/og/${profile.id}.png`}
        imageAlt={`Mohamed Aklamaash, ${PROFILE_LABELS[profile.id]} profile`}
        jsonLd={[
          profilePageSchema({
            path,
            name: `${PROFILE_LABELS[profile.id]}: Mohamed Aklamaash`,
            description: profile.seo.description,
            projects,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: PROFILE_LABELS[profile.id], path },
          ]),
        ]}
      />
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <ProfileHero profile={profile} />

        <div className="space-y-16 sm:space-y-20">
          <Section
            id="projects"
            title={profile.projectsHeading}
            intro={profile.projectsIntro}
          >
            <div className="space-y-5">
              {profile.id === "software" && <TaleFeature />}
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Section>

          <Section
            id="experience"
            title="Experience"
            intro={profile.experienceIntro}
          >
            <Experience />
          </Section>

          <Section
            id="skills"
            title="Technical areas"
            intro="Grouped by where I've actually used them."
          >
            <Skills groups={profile.skills} />
          </Section>

          <Section id="education" title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[17px] font-semibold text-fg">
                <a className="hover:text-accent" href={EDUCATION.schoolUrl}>
                  {EDUCATION.school}
                </a>
              </h3>
              <p className="font-mono text-[12px] text-subtle">
                {EDUCATION.dates}
              </p>
            </div>
            <p className="mt-1 text-[15px] text-body">
              {EDUCATION.degree}, {EDUCATION.place}
            </p>
          </Section>

          <Section id="other-profile" title={PROFILE_LABELS[other]}>
            <Link
              href={PROFILE_PATHS[other]}
              className="group flex items-center justify-between gap-6 rounded-lg border border-line p-5 transition-colors duration-150 hover:border-line-strong hover:bg-surface sm:p-6"
            >
              <span className="text-[15px] leading-7 text-body">
                {profile.crossLink}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-fg">
                View
                <span className="sr-only">
                  {" "}
                  the {PROFILE_LABELS[other]} profile
                </span>
                <ArrowRight className="text-accent transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Section>

          <Section id="contact" title="Contact">
            <Contact profile={profile.id} />
          </Section>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
