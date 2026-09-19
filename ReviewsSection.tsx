import React from 'react';
import { CUSTOMER_REVIEWS, FAQS } from '../data/restaurantData';
import { Star, Quote, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0a08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1813] border border-[#3b3022] text-[#f59e0b] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patron Experiences</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#fdfbf7]">
            Words From Our <span className="text-[#f59e0b]">Guests</span>
          </h2>
          <p className="mt-3 text-[#b5aa99] text-base">
            Over 500,000 satisfied diners across three decades of culinary heritage in Hyderabad.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-2xl bg-[#14120e] border border-[#2b241b] hover:border-[#f59e0b]/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#4a3e2e] opacity-40" />
                </div>

                <p className="text-sm text-[#cfc5b4] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#241e17] flex items-center justify-between">
                <div>
                  <h4 className="font-royal font-bold text-white text-sm">
                    {rev.name}
                  </h4>
                  <div className="text-xs text-[#8e8373]">{rev.location}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#8e8373] block uppercase tracking-wider">Favorite Dish</span>
                  <span className="text-xs font-semibold text-[#f59e0b]">
                    {rev.recommendedDish}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-[#241e17]">
          <div className="text-center mb-8">
            <h3 className="font-royal text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#f59e0b]" />
              <span>Frequently Asked Questions</span>
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#14120e] border border-[#282218] text-left"
              >
                <h4 className="font-semibold text-sm text-white flex items-start gap-2.5">
                  <span className="text-[#f59e0b] font-royal font-bold">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="mt-2 text-xs text-[#a99e8e] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
