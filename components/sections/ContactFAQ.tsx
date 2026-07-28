"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { C } from "@/lib/colors";
import { CONTACT_FAQ } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: C.cream50, padding: "120px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}
      >
        <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: 32, color: C.textDark, fontWeight: 400, textAlign: "center" }}>
          Questions Before You Reach Out
        </h2>
        <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, textAlign: "center", marginTop: 12 }}>
          Honest answers to the questions most people ask before contacting a demand generation company.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ maxWidth: 760, margin: "0 auto" }}
      >
        {CONTACT_FAQ.map((f, i) => {
          const open = openIndex === i;
          const bodyId = `ct-faq-body-${i}`;
          return (
            <div key={f.question} className="ct-faq-item">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={open}
                aria-controls={bodyId}
                onClick={() => setOpenIndex(open ? -1 : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIndex(open ? -1 : i);
                  }
                }}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 0", cursor: "pointer" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: open ? C.forest800 : C.textDark,
                    flex: 1,
                    transition: "color 0.3s ease",
                  }}
                >
                  {f.question}
                </span>
                <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
                  {open ? <Minus size={20} color={C.gold500} aria-hidden="true" /> : <Plus size={20} color={C.gold500} aria-hidden="true" />}
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={bodyId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 0 22px 0" }}>
                      <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 15, color: C.textMuted, lineHeight: 1.75 }}>
                        {f.answer}
                      </p>
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
