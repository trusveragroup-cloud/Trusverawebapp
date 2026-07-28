import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ExternalLink,
  Link2,
  Copy,
} from "lucide-react";
import NavBar from "@/components/sections/NavBar";
import FooterSection from "@/components/sections/FooterSection";
import { getPostBySlugFromDB, getRelatedPostsFromDB, getAllSlugsFromDB } from "@/lib/blog-db";
import { C } from "@/lib/colors";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugsFromDB();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlugFromDB(slug);
  if (!post) return { title: "Post Not Found | TrusVera Group" };
  return {
    title: `${post.title} | TrusVera Group`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlugFromDB(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPostsFromDB(post.slug, post.category, 3);

  return (
    <div style={{ paddingBottom: 80 }}>
      <style>{`
        .prose h2 { font-family: var(--font-dm-serif); font-size: 30px; color: #0D2E20; margin: 48px 0 20px; line-height: 1.25; }
        .prose h3 { font-family: var(--font-playfair); font-size: 22px; color: #0F3D2E; margin: 36px 0 16px; }
        .prose p { font-family: var(--font-inter); font-size: 18px; line-height: 1.85; color: #374151; margin-bottom: 24px; }
        .prose blockquote { border-left: 4px solid #D4A843; background: #F0EBE1; color: #0F3D2E; padding: 20px 24px; margin: 32px 0; border-radius: 0 8px 8px 0; font-style: italic; font-size: 19px; line-height: 1.7; }
        .prose ul { padding-left: 24px; margin-bottom: 24px; }
        .prose ol { padding-left: 24px; margin-bottom: 24px; }
        .prose li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 8px; }
        .prose a { color: #166B4A; text-decoration: underline; }
        .prose strong { font-weight: 700; color: #0D2E20; }
        @media (max-width: 768px) {
          .post-title { font-size: 34px !important; }
          .cover-image-wrapper { height: 240px !important; border-radius: 0 !important; }
          .article-body { padding: 40px 16px !important; }
          .related-grid { grid-template-columns: 1fr !important; }
          .author-card { flex-direction: column !important; }
        }
      `}</style>

      <NavBar />

      {/* SECTION 1: POST HEADER */}
      <section style={{ background: C.forest800, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 28,
            }}
          >
            <Link
              href="/blog"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: C.cream400,
                textDecoration: "none",
              }}
            >
              Blog
            </Link>
            <ChevronRight size={14} color={C.cream500} />
            <span
              style={{
                background: C.gold500,
                color: C.forest900,
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                padding: "3px 12px",
                borderRadius: 20,
              }}
            >
              {post.category}
            </span>
          </div>
          <h1
            className="post-title"
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 54,
              color: C.cream100,
              lineHeight: 1.15,
              marginBottom: 28,
            }}
          >
            {post.title}
          </h1>
          <div style={{ width: 72, height: 3, background: C.gold400, margin: "0 auto 28px" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: C.forest600,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: C.cream100,
              }}
            >
              {post.authorInitials}
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: C.cream100 }}>
              {post.author}
            </span>
            <span style={{ color: C.cream500 }}>•</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.cream400 }}>
              {post.authorRole}
            </span>
            <span style={{ color: C.cream500 }}>•</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.cream400 }}>
              {post.date}
            </span>
            <span style={{ color: C.cream500 }}>•</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.gold400 }}>
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: COVER IMAGE */}
      <section style={{ maxWidth: 1100, margin: "-40px auto 0", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div
          className="cover-image-wrapper"
          style={{
            position: "relative",
            height: 500,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 16px 56px rgba(0,0,0,0.18)",
          }}
        >
          <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} />
        </div>
      </section>

      {/* SECTION 3: ARTICLE BODY */}
      <section className="article-body" style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px" }}>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>

      {/* SECTION 4: TAGS ROW */}
      <section style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{ borderTop: `1px solid ${C.slate200}`, paddingTop: 32 }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: C.slate400,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            Topics
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: C.cream200,
                  color: C.slate600,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  padding: "6px 16px",
                  borderRadius: 20,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: AUTHOR CARD */}
      <section style={{ maxWidth: 740, margin: "0 auto", padding: "0 24px 64px" }}>
        <div
          className="author-card"
          style={{
            background: C.cream100,
            border: `1px solid ${C.slate200}`,
            borderRadius: 14,
            padding: 32,
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              background: C.forest100,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: C.forest700,
              flexShrink: 0,
            }}
          >
            {post.authorInitials}
          </div>
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: C.slate400,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 4,
              }}
            >
              Written by
            </div>
            <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 22, color: C.forest800 }}>
              {post.author}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate500, marginBottom: 12 }}>
              {post.authorRole}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.slate600, lineHeight: 1.7 }}>
              Senior thought leader at TrusVera Group specializing in B2B demand generation and marketing intelligence strategy.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: RELATED POSTS */}
      <section style={{ background: C.cream200, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.forest800 }}>
              More Insights
            </h2>
            <Link
              href="/blog"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: C.forest600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              View All Articles
              <ArrowRight size={16} />
            </Link>
          </div>
          {relatedPosts.length > 0 ? (
            <div
              className="related-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}
            >
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      background: C.cream100,
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                    }}
                  >
                    <div style={{ position: "relative", height: 200 }}>
                      <Image src={related.coverImage} alt={related.title} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 24 }}>
                      <span
                        style={{
                          display: "inline-block",
                          background: C.forest600,
                          color: C.cream100,
                          fontFamily: "Inter, sans-serif",
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: 1.5,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {related.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-dm-serif)",
                          fontSize: 20,
                          color: C.forest800,
                          lineHeight: 1.3,
                          margin: "12px 0 10px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {related.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 14,
                          color: C.slate500,
                          lineHeight: 1.65,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginBottom: 16,
                        }}
                      >
                        {related.excerpt}
                      </p>
                      <div style={{ borderBottom: `1px solid ${C.slate200}`, marginBottom: 16 }} />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: C.forest700 }}>
                          {related.author}
                        </span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.slate400 }}>
                          {related.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: 16, color: C.slate500 }}>
              More articles coming soon.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7: BOTTOM NAV BAR */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          zIndex: 100,
          /* rgba(10, 35, 22, 0.96) matches C.forest900 with transparency for the blur effect */
          background: "rgba(10, 35, 22, 0.96)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <Link
            href="/blog"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <ChevronLeft size={18} color={C.cream300} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: C.cream200 }}>
              Back to Blog
            </span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.cream400 }}>
              Share:
            </span>
            <ExternalLink size={18} color={C.cream300} style={{ cursor: "pointer" }} />
            <Link2 size={18} color={C.cream300} style={{ cursor: "pointer" }} />
            <Copy size={18} color={C.cream300} style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
