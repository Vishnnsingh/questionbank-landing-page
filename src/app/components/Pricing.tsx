import { Check, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../seo';

const plans = [
  {
    name: 'Class 10th',
    price: products[0].price,
    duration: 'One Year',
    serviceName: products[0].name,
    serviceDescription: products[0].description,
    popular: true,
    gradient: 'from-blue-500 to-blue-600',
    features: [
      '10 Years Question Bank',
      'AI Exam Prediction',
      'Unlimited Mock Tests',
      'Performance Analytics',
      'Chapter-wise Practice',
      'Most Repeated Questions',
      'Complete Syllabus Coverage',
      'Doubt Resolution Support',
    ],
  },
  {
    name: 'Class 12th',
    price: products[1].price,
    duration: 'One Year',
    serviceName: products[1].name,
    serviceDescription: products[1].description,
    popular: true,
    gradient: 'from-teal-500 to-teal-600',
    features: [
      '10 Years Question Bank',
      'AI Exam Prediction',
      'Unlimited Mock Tests',
      'Performance Analytics',
      'Chapter-wise Practice',
      'Most Repeated Questions',
      'Complete Syllabus Coverage',
      'Doubt Resolution Support',
      'Career Guidance',
      'College Information',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-14 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-5 py-2.5 rounded-full text-sm mb-6 shadow-lg">
            <Sparkles className="size-4" />
            <span>Affordable Learning</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight">
            Simple
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Pricing Plans
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Choose the perfect plan for your CBSE or Bihar Board exam preparation
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.serviceName}
              itemScope
              itemType="https://schema.org/Product"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className={`relative bg-white/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 lg:p-8 border-2 transition-all duration-500 ${
                plan.popular
                  ? 'border-teal-500 shadow-2xl'
                  : 'border-slate-200/50 hover:border-blue-300 hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                    <Zap className="size-4 fill-current" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <motion.div 
                  className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-3 shadow-lg`}
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    delay: index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl text-slate-900 mb-2">
                  <span itemProp="name">{plan.name}</span>
                </h3>
                <p className="sr-only" itemProp="description">{plan.serviceDescription}</p>
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span
                    className="text-4xl lg:text-5xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                  >
                    <meta itemProp="priceCurrency" content="INR" />
                    <meta itemProp="price" content={String(plan.price)} />
                    INR {plan.price}
                  </span>
                  <span className="text-slate-500">/ {plan.duration}</span>
                </div>
                <p className="text-sm text-slate-500">
                  One-time payment in INR. Full access.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 bg-gradient-to-br ${plan.gradient} rounded-full flex items-center justify-center`}>
                      <Check className="size-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full bg-gradient-to-r ${plan.gradient} text-white py-3.5 rounded-xl hover:shadow-xl transition-all hover:scale-105 font-semibold text-base`}>
                Get Started Now
              </button>

              {/* Money Back Guarantee */}
              <div className="mt-4 text-center">
                <p className="text-xs text-slate-500">
                  Secure Payment. 7-Day Money Back Guarantee.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="mx-auto flex max-w-sm flex-col items-stretch gap-4 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-4 text-left shadow-lg border border-slate-200/50 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-6 lg:gap-8 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-slate-700">No Hidden Charges</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Check className="size-5 text-blue-600" />
              </div>
              <span className="text-sm text-slate-700">Regular Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Check className="size-5 text-teal-600" />
              </div>
              <span className="text-sm text-slate-700">One-Time Payment</span>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto rounded-lg bg-white/80 border border-slate-200 p-4 sm:p-6">
          <h3 className="text-2xl text-slate-900 mb-4">Products and Services</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <div key={product.name} className="rounded-lg border border-slate-200 p-4 bg-white">
                <h4 className="text-lg text-slate-900">{product.name}</h4>
                <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                <p className="mt-3 text-sm font-semibold text-teal-700">
                  Price: INR {product.price} for {product.duration}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">Trusted by 2,450+ Board Exam Students</p>
          <div className="flex justify-center items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 border-2 border-white"
                ></div>
              ))}
            </div>
            <span className="text-sm text-slate-600 ml-2">Join them today!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
