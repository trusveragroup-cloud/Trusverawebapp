"use client";

import { motion } from "framer-motion";
import { C } from "@/lib/colors";

const EASE = [0.16, 1, 0.3, 1] as const;

const statsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const statItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const PARAGRAPHS = [
  "Every week, B2B technology companies publish research reports, whitepapers, and guides that their buyers never see. The content is good. Sometimes it is exceptional. But it sits on a resource page, gets shared once on LinkedIn, and generates eleven downloads in its first month, eight of which are from your own team.",
  "The problem is almost never the content. It is the distribution. Without a structured promotion program targeting the right buyers through the right channels, even the most valuable whitepaper produces a trickle of downloads from contacts who were already in your ecosystem. It does not reach the in-market buyers who have never heard of you but would download it immediately if it showed up in the right place.",
  "TrusVera Group's whitepaper promotion service is the distribution engine your content team does not have. We put your whitepaper in front of verified, intent-matched buyers through four coordinated channels, capture a verified lead from every download, and deliver a qualified contact list to your sales team, typically within 72 hours of campaign launch.",
];

const STATS = [
  { value: "73%", label: "of B2B whitepapers get fewer than 50 downloads" },
  { value: "8x", label: "more pipeline from intent-matched vs broad syndication" },
  { value: "72hr", label: "from submission to first leads in your CRM" },
];

export default function DistributionProblem() {
  return (
    <section style={{ background: C.white, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ maxWidth: 840, margin: "0 auto" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: 40,
            color: C.forest900,
            lineHeight: 1.15,
            marginBottom: 32,
            fontWeight: 400,
          }}
        >
          Great Content Fails Without Distribution
        </h2>

        {PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 17,
              color: C.textMuted,
              lineHeight: 1.8,
              marginBottom: 20,
            }}
          >
            {p}
          </p>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="wp-pullquote"
          style={{ marginTop: 48 }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              color: C.forest800,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Distribution is not a nice-to-have for content marketing. It is the only thing that determines
            whether your content generates pipeline or just generates compliments.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={statsContainer}
          className="wp-problem-stats"
          style={{ marginTop: 48 }}
        >
          {STATS.map((stat) => (
            <motion.div key={stat.value} variants={statItem}>
              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: 36, color: C.gold500, lineHeight: 1, fontWeight: 400 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, color: C.textMuted, marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
