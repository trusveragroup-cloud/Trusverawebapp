"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { C } from "@/lib/colors";
import { RESEARCH_QUESTIONS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TheSixQuestions() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: C.cream50, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 13,
            letterSpacing: "2px",
            color: C.cream50,
            background: C.forest900,
            border: `1px solid ${C.forest900}`,
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          THE SIX QUESTIONS
        </span>
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 34, color: C.textDark, fontWeight: 400, margin: "20px 0 0" }}>
          The Questions Every B2B Technology Company Needs Answered Before They Scale
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 16, color: C.textMuted, marginTop: 16, lineHeight: 1.7 }}>
          TrusVera Group&apos;s market research is structured around six revenue-critical questions. Each has a
          direct answer. Each answer feeds directly into action.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ maxWidth: 860, margin: "0 auto" }}
      >
        {RESEARCH_QUESTIONS.map((q, i) => {
          const open = openIndex === i;
          return (
            <div key={q.number} className="mr-accordion-item">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(open ? -1 : i);
                  }
                }}
                style={{ display: "flex", alignItems: "center", gap: 20, padding: "24px 0", cursor: "pointer" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: 32,
                    color: C.gold400,
                    width: 56,
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  {q.number}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: 20,
                    color: open ? C.forest800 : C.textDark,
                    lineHeight: 1.3,
                    flex: 1,
                    transition: "color 0.3s ease",
                  }}
                >
                  {q.question}
                </span>
                <motion.div
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ flexShrink: 0 }}
                >
                  {open ? <Minus size={24} color={C.gold500} aria-hidden="true" /> : <Plus size={24} color={C.gold500} aria-hidden="true" />}
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="mr-accordion-body-inner">
                      <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75, marginBottom: 16 }}>
                        {q.answer}
                      </p>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.gold500,
                          background: "rgba(200,151,62,0.08)",
                          border: "1px solid rgba(200,151,62,0.2)",
                          borderRadius: 8,
                          padding: "5px 12px",
                        }}
                      >
                        <ArrowRight size={12} color={C.gold500} aria-hidden="true" />
                        {q.service}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
