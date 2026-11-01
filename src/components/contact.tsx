import { PERSON, RESUMES, type ProfileId } from "@/content/site";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const Row = ({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  value: string;
}) => (
  <li>
    <a
      href={href}
      className="group flex items-center justify-between gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-surface-2 sm:px-5"
    >
      <span className="flex items-center gap-3 text-[15px] text-fg">
        <span className="text-subtle group-hover:text-fg">{icon}</span>
        {label}
      </span>
      <span className="truncate font-mono text-[13px] text-muted">{value}</span>
    </a>
  </li>
);

/** Contact links. Pass a profile to show only that resume, or hideResumes when they're shown elsewhere. */
const Contact = ({
  profile,
  hideResumes = false,
}: {
  profile?: ProfileId;
  hideResumes?: boolean;
}) => {
  const resumes = hideResumes
    ? []
    : profile
      ? [RESUMES[profile]]
      : [RESUMES.software, RESUMES.ai];
  return (
    <div>
      <p className="max-w-prose text-[15px] leading-7 text-body">
        Email is the best way to reach me. I&apos;m happy to talk about roles, a
        project you&apos;re working on or anything on this site.
      </p>
      <ul className="mt-5 divide-y divide-line overflow-hidden rounded-lg border border-line">
        <Row
          href={`mailto:${PERSON.email}`}
          icon={<MailIcon />}
          label="Email"
          value={PERSON.email}
        />
        <Row
          href={PERSON.linkedin}
          icon={<LinkedInIcon />}
          label="LinkedIn"
          value={`in/${PERSON.linkedinHandle}`}
        />
        <Row
          href={PERSON.github}
          icon={<GitHubIcon />}
          label="GitHub"
          value={PERSON.githubHandle}
        />
        {resumes.map((r) => (
          <Row
            key={r.href}
            href={r.href}
            icon={<FileIcon />}
            label={r.label}
            value="PDF"
          />
        ))}
      </ul>
    </div>
  );
};

export default Contact;
