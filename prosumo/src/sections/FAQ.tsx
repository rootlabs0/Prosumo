import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    q: "What types of facilities does Prosumo support?",
    a: "Prosumo is built for energy-intensive industrial and commercial assets — manufacturing plants, data centers, commercial real estate portfolios, cold chains, and mixed-use campuses. If your facility has sub-metered loads and variable tariff exposure, Prosumo is relevant.",
  },
  {
    q: "How long does a typical deployment take?",
    a: "Most deployments reach full operational status within 6–8 weeks. Week one covers integration mapping with your BMS, SCADA, or smart meter stack. Weeks 2–4 are model training and anomaly baseline establishment. Live dashboards are available by week five at the latest.",
  },
  {
    q: "Does Prosumo require changes to existing hardware?",
    a: "No. Prosumo is software-first and connects via standard industrial protocols — Modbus, BACnet, MQTT, OPC-UA, and REST. Your existing smart meters and building management systems are sufficient for most sites. Edge hardware is optional and only recommended for high-granularity sub-metered environments.",
  },
  {
    q: "How is our operational data protected?",
    a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Prosumo is ISO 27001 aligned with SOC 2 Type II audit in progress. On-premise and private cloud deployment are available for customers with strict data residency or sovereign requirements.",
  },
  {
    q: "What ROI should we expect, and in what timeframe?",
    a: "Across our current customer base, average payback is under 90 days. Energy cost reduction ranges from 18% to 41% depending on tariff structure, load flexibility, and baseline efficiency. We produce site-specific ROI projections during pre-deployment assessment — no commitment required.",
  },
  {
    q: "Can Prosumo integrate with our existing ERP or energy management system?",
    a: "Yes. Prosumo exposes a REST API and webhooks for bidirectional data exchange. Pre-built connectors exist for SAP PM, Schneider EcoStruxure, Siemens Desigo CC, and ABB Ability. Custom integrations are scoped and delivered by our implementation team as part of standard onboarding.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="section faq">
      <div className="container faq__layout">
        <div className="faq__lead reveal">
          <p className="eyebrow faq__eyebrow">Common Questions</p>
          <h2 className="h-section faq__title">
            Everything you need
            <br />
            to evaluate Prosumo.
          </h2>
          <p className="body-muted faq__sub">
            Still have questions?
            <br />
            Reach us at{" "}
            <a href="mailto:hello@prosumo.cz" className="faq__contact-link">
              hello@prosumo.cz
            </a>
          </p>
        </div>

        <ul className="faq__list reveal">
          {faqs.map((item, i) => (
            <li key={i} className={`faq__item ${open === i ? "is-open" : ""}`}>
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq__answer" aria-hidden={open !== i}>
                <p>{item.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
