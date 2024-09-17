import React, { useState } from 'react';

const faqs = [
    {
      question: "Will there be more calculators?",
      answer: "Yes. We will be adding more calculators for other marketplaces soon."
    },
    {
      question: "How can I contact you?",
      answer: (
        <span>
          Join our <a class ="font-semibold" href="https://discord.gg/JGzhWfVkaD" target="_blank" rel="noopener noreferrer">Discord</a> for support and updates.
        </span>
      )
    }
  ];
  

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 text-cornflowerblue font-roboto">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-5 border-b border-gray-200">
          <button
            className="py-3 w-full text-left text-lg sm:text-xl md:text-2xl font-semibold flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span>{openFAQ === index ? '-' : '+'}</span>
          </button>
          {openFAQ === index && (
            <p className="py-4 px-4 text-left text-base sm:text-lg md:text-xl text-darkcharcoal font-roboto">{faq.answer}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQ;
