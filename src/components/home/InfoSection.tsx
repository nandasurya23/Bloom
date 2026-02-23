import type { JSX } from "react";
import { FiCheckCircle, FiClock, FiPackage, FiTruck } from "react-icons/fi";

type InfoStep = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const ORDER_STEPS: InfoStep[] = [
  {
    title: "Choose Bouquet",
    description: "Browse curated collections and pick your favorite arrangement.",
    icon: <FiPackage />
  },
  {
    title: "Place Order",
    description: "Add to cart, fill checkout details, and confirm the simulation payment.",
    icon: <FiCheckCircle />
  },
  {
    title: "Fast Delivery",
    description: "Your bouquet is prepared with care and sent to your selected address.",
    icon: <FiTruck />
  },
  {
    title: "Support Ready",
    description: "Need updates? Our team is ready through email and WhatsApp.",
    icon: <FiClock />
  }
];

export function InfoSection(): JSX.Element {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold text-bloom-ink sm:text-3xl">How To Order</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {ORDER_STEPS.map((step) => (
          <article key={step.title} className="rounded-2xl border border-bloom-rose/40 bg-white p-5">
            <div className="inline-flex items-center gap-2 text-bloom-ink">
              {step.icon}
              <h3 className="text-base font-medium">{step.title}</h3>
            </div>
            <p className="mt-2 text-sm text-bloom-ink/75">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
