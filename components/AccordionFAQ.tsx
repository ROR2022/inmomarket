"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  toggleAccordion: () => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  toggleAccordion,
  index,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full py-5 px-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`content-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 prose dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FAQCategoryProps {
  categoryName: string;
  questions: { title: string; content: string }[];
}

export const AccordionFAQ: React.FC<FAQCategoryProps> = ({ categoryName, questions }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((item) => item !== index)
        : [...prevOpenItems, index]
    );
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-primary mb-6">{categoryName}</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
        {questions.map((question, index) => (
          <AccordionItem
            key={index}
            title={question.title}
            content={question.content}
            isOpen={openItems.includes(index)}
            toggleAccordion={() => toggleAccordion(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionFAQ; 