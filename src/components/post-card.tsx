import Link from "next/link";

interface PostCardProps {
  title: string;
  description: string;
  slug: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, description, slug }) => {
  return (
    <Link
      href={`/posts/${slug}`}
      className="glow-card block p-5 transition-all duration-200 group"
      style={{ borderRadius: "4px", textDecoration: "none" }}
    >
      <p
        className="font-mono text-sm font-medium mb-2 transition-colors duration-200"
        style={{ color: "var(--text)" }}
      >
        {title}
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "var(--text-2)", fontFamily: "var(--font-body)" }}
      >
        {description}
      </p>
      <div
        className="mt-4 font-mono text-xs flex items-center gap-1 transition-colors duration-200"
        style={{ color: "var(--text-3)" }}
      >
        Read →
      </div>
    </Link>
  );
};

export default PostCard;
