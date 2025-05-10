/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    question: "What types of books do you sell?",
    answer: "We offer a wide variety of books, including fiction, non-fiction, textbooks, children's books, and more! You can find books from various genres like mystery, romance, science fiction, history, and biography."
  },
  {
    question: "Do you offer eBooks?",
    answer: "Yes! We provide a collection of eBooks that can be purchased and downloaded directly to your device. Simply choose the eBook format during checkout."
  },
  {
    question: "Can I return or exchange a book?",
    answer: "Yes, we offer a return or exchange policy for books in new and unopened condition. You can return or exchange books within 14 days of purchase with a receipt or order confirmation."
  },
  {
    question: "How do I track my order?",
    answer: "After placing your order, you will receive a tracking number via email to monitor the status of your delivery. You can also track your order in your account under the 'Order History' section."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes, we offer gift cards that can be redeemed online or in-store. You can choose the gift card value and send it to your loved ones."
  },
  {
    question: "Is there a discount for students or educators?",
    answer: "Yes, we offer discounts for students and educators. Please contact our customer support for more details or visit the 'Special Offers' page on our website."
  },
  {
    question: "How do I get notified about new arrivals or discounts?",
    answer: "You can sign up for our newsletter to receive updates on new arrivals, discounts, and special offers directly in your inbox."
  },
  {
    question: "Can I pre-order books?",
    answer: "Yes, pre-ordering is available for upcoming releases. You will be notified once the book is in stock and ready to ship."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship internationally to most countries. Shipping costs and delivery times will vary based on your location."
  },
  {
    question: "Do you offer bulk purchases for schools or libraries?",
    answer: "Yes, we offer bulk purchasing options with special discounts for schools, libraries, and other institutions. Please contact our sales team for more information."
  }
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index : any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-[#01DFBF]'>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className='border-b py-4'>
          <div
            className='flex justify-between items-center cursor-pointer'
            onClick={() => toggleFAQ(index)}
          >
            <h3 className='text-lg font-medium'>{item.question}</h3>
            {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
          </div>
          {activeIndex === index && (
            <p className='mt-2 text-gray-600'>{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
