import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NavBar from "@/components/sections/NavBar";
import FooterSection from "@/components/sections/FooterSection";
import { getFeaturedPostFromDB, getGridPostsFromDB } from "@/lib/blog-db";
import { C } from "@/lib/colors";

export const metadata = {
  title: "Blog | TrusVera Group",
  description:
    "Expert B2B insights on intent data, demand generation, account profiling, and marketing intelligence from the TrusVera Group team.",
};

export const revalidate = 60;

const categoryPills = [
  "All",
  "Intent Data",
  "Demand Generation",
  "Account Profiling",
  "Lead Generation",
  "Market Research",
  "Email Marketing",
];

export default async function BlogPage() {
  const featuredPost = await getFeaturedPostFromDB();
  const gridPosts = await getGridPostsFromDB();

  return (
    <div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.13);
        }
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 40px !important; }
          .featured-card { flex-direction: column !important; }
          .featured-image { width: 100% !important; height: 260px !important; position: relative !important; }
          .featured-content { border-left: none !important; border-top: 4px solid; padding: 28px 24px !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <NavBar />

      {/* SECTION 1: PAGE HERO */}
      <section style={{ background: C.forest800, padding: "100px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.12,
            zIndex: 0,
          }}
        />
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            textAlign: "center",
            animation: "fadeUp 0.7s ease forwards",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: C.gold400,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 20,
            }}
          >
            Insights & Intelligence
          </div>
          <h1
            className="hero-title"
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: 68,
              color: C.cream100,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            The B2B Growth Blog
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 20,
              color: C.cream300,
              lineHeight: 1.7,
              maxWidth: 640,
              margin: "0 auto 32px",
            }}
          >
            Expert perspectives on intent data, demand generation, and account-based marketing strategy, written for revenue leaders who demand precision.
          </p>
          <div style={{ width: 64, height: 3, background: C.gold400, margin: "0 auto" }} />
        </div>
      </section>

      {/* SECTION 2: FEATURED POST */}
      {featuredPost && (
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 0" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: C.forest600,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            Featured Article
          </div>
          <Link href={`/blog/${featuredPost.slug}`} style={{ textDecoration: "none" }}>
            <div
              className="featured-card"
              style={{
                display: "flex",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
                background: C.cream100,
                minHeight: 480,
              }}
            >
              <div
                className="featured-image"
                style={{ position: "relative", width: "55%", flexShrink: 0 }}
              >
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="featured-content"
                style={{
                  width: "45%",
                  padding: "48px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderLeft: `4px solid ${C.gold400}`,
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      background: C.forest600,
                      color: C.cream100,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      padding: "4px 12px",
                      borderRadius: 20,
                      marginBottom: 20,
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: 38,
                      color: C.forest800,
                      lineHeight: 1.2,
                      marginBottom: 16,
                    }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      color: C.slate600,
                      lineHeight: 1.75,
                      marginBottom: 24,
                    }}
                  >
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: C.forest100,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.forest700,
                        flexShrink: 0,
                      }}
                    >
                      {featuredPost.authorInitials}
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: C.forest800 }}>
                      {featuredPost.author}
                    </span>
                    <span style={{ color: C.slate400 }}>•</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.slate500 }}>
                      {featuredPost.authorRole}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      gap: 16,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      color: C.slate400,
                    }}
                  >
                    <span>{featuredPost.date}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <div
                    style={{
                      marginTop: 24,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: C.gold500,
                      color: C.forest900,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      padding: "12px 24px",
                      borderRadius: 6,
                      textDecoration: "none",
                    }}
                  >
                    Read Article
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* SECTION 3: CATEGORY FILTER BAR */}
      <section style={{ maxWidth: 1200, margin: "32px auto 0", padding: "0 24px" }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            color: C.slate400,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          Browse by Topic
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {/* Category filtering wired in Phase 2 with Supabase */}
          {categoryPills.map((pill) =>
            pill === "All" ? (
              <div
                key={pill}
                style={{
                  background: C.forest600,
                  color: C.cream100,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  padding: "8px 20px",
                  borderRadius: 24,
                  cursor: "pointer",
                }}
              >
                {pill}
              </div>
            ) : (
              <div
                key={pill}
                style={{
                  background: C.cream200,
                  color: C.slate600,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  padding: "8px 20px",
                  borderRadius: 24,
                  cursor: "pointer",
                }}
              >
                {pill}
              </div>
            )
          )}
        </div>
      </section>

      {/* SECTION 4: ARTICLES GRID */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.forest800 }}>
            Latest Articles
          </h2>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              color: C.forest600,
              textDecoration: "none",
            }}
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>
        <div
          className="blog-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}
        >
          {gridPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div
                className="blog-card"
                style={{
                  background: C.cream100,
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                  transition: "transform 0.25s ease",
                }}
              >
                <div style={{ position: "relative", height: 200 }}>
                  <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} />
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
                    {post.category}
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
                    {post.title}
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
                    {post.excerpt}
                  </p>
                  <div style={{ borderBottom: `1px solid ${C.slate200}`, marginBottom: 16 }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: C.forest700 }}>
                      {post.author}
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.slate400 }}>
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
