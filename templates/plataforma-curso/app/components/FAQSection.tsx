"use client";

import { useState } from "react";
import { faqItems } from "../data/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div className="section-inner" style={{ textAlign: "center" }}>
        <div className="section-label">Dúvidas frequentes</div>
        <h2 className="section-title">
          Perguntas que
          <br />
          <em>você provavelmente tem</em>
        </h2>
        <div className="faq-list" style={{ textAlign: "left" }}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="faq-item" key={item.question}>
                <button
                  className={`faq-question${isOpen ? " open" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  {item.question}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className={`faq-answer${isOpen ? " open" : ""}`}>{item.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
