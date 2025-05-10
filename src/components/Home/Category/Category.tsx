import {  ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TbCategory } from "react-icons/tb";


const categories = [
  { name: "Fiction", icon: <TbCategory className="w-5 h-5" /> },
  { name: "Science", icon: <TbCategory className="w-5 h-5" /> },
  { name: "Self Development", icon: <TbCategory className="w-5 h-5" /> },
  { name: "Poetry", icon: <TbCategory className="w-5 h-5" /> },
  { name: "Religious", icon: <TbCategory className="w-5 h-5" /> },
];

export default function Category() {
  return (
    <section className="py-16  sm:px-4 dark:bg-gray-900">
      <div className="max-w-[90%] mx-auto px-4 sm:px-0 lg:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Our Book Categories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover books that match your interests across diverse categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/allbooks?category=${encodeURIComponent(category.name)}`}
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#4C765E]  hover:text-white"
            >
              {/* green overlay on hover */}
              <div className="absolute inset-0 bg-[#4C765E] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-[#4C765E] to-[#4C765E] text-white shadow-md group-hover:from-[#4C765E] group-hover:to-[#4C765E] transition-all">
                  {category.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-800  transition-colors text-center">
                  {category.name}
                </h3>
                <div className="mt-2 flex items-center text-sm text-[#4C765E] opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        
      </div>
    </section>
  );
}