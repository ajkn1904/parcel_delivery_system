export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq5Props {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  {
    question: "How can I track my parcel?",
    answer:
      "Once your parcel is shipped, you will receive a tracking number. Enter this number in our tracking system to see the real-time status and location of your delivery.",
  },
  {
    question: "What are your delivery timeframes?",
    answer:
      "Delivery times depend on the destination and service type. Standard deliveries typically take 2-5 business days, while express options are faster. Exact estimates are provided at checkout.",
  },
  {
    question: "What should I do if my parcel is delayed?",
    answer:
      "If your delivery is delayed, please check your tracking information first. For further assistance, contact our customer support team, who will help resolve any issues promptly.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we provide international delivery services to many countries. Shipping times and costs vary based on location and package size. You can get an estimate during checkout.",
  },
  {
    question: "Can I change the delivery address after shipping?",
    answer:
      "If your parcel hasn’t been dispatched yet, you can update the delivery address via your account. Once it’s in transit, contact customer support for possible solutions.",
  },
];

export default function FAQ({
  heading = "Frequently Asked Questions",
  description = "Find answers to the most common questions about our parcel delivery services.",
  faqs = defaultFaqs,
}: Faq5Props) {
  return (
    <section className="container py-24 scale-x-[0.90]">
      <div className="container">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-10 uppercase">{heading}</h1>
          <p className="mt-6 font-medium text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
