import { Check, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import {
  SCHEMA_IN_STOCK,
  SCHEMA_NEW_CONDITION,
  SCHEMA_ORG_URL,
} from '../config/env';
import { absoluteUrl, PRODUCT_IMAGE_URL, SITE_NAME, products } from '../seo';

const logoImage = '/iconb.png';
const logoImageClass = 'h-full w-full object-contain';

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
              itemType={`${SCHEMA_ORG_URL}/Product`}
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
              <meta itemProp="image" content={PRODUCT_IMAGE_URL} />
              <span itemProp="brand" itemScope itemType={`${SCHEMA_ORG_URL}/Brand`} className="sr-only">
                <meta itemProp="name" content={SITE_NAME} />
              </span>
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
                  className="inline-flex h-28 w-28 items-center justify-center overflow-hidden mb-3 sm:h-32 sm:w-32"
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
                  <img src={logoImage} alt="Honhaar plan logo" className={logoImageClass} />
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
                    itemType={`${SCHEMA_ORG_URL}/Offer`}
                  >
                    <meta itemProp="priceCurrency" content="INR" />
                    <meta itemProp="price" content={String(plan.price)} />
                    <meta itemProp="availability" content={SCHEMA_IN_STOCK} />
                    <meta itemProp="itemCondition" content={SCHEMA_NEW_CONDITION} />
                    <meta itemProp="url" content={absoluteUrl('/#pricing')} />
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
            </motion.div>
          ))}
        </div>

        {/* Trust strip — modern classic */}
        <motion.div
          className="mx-auto mt-14 max-w-4xl sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 px-5 py-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:px-8 sm:py-6">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500" />
            <ul className="grid gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-200">
              {[
                { label: 'No Hidden Charges', tone: 'text-emerald-600 bg-emerald-50' },
                { label: 'Regular Updates', tone: 'text-blue-600 bg-blue-50' },
                { label: 'One-Time Payment', tone: 'text-teal-700 bg-teal-50' },
              ].map((item) => (
                <li key={item.label} className="flex items-center justify-center gap-3 sm:px-4">
                  <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full ${item.tone}`}>
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium tracking-wide text-slate-800">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Products and Services */}
        <motion.div
          className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_28px_70px_-40px_rgba(15,23,42,0.4)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -right-16 -top-16 size-56 rounded-full bg-teal-300/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 size-48 rounded-full bg-blue-300/15 blur-3xl" />

          <div className="relative border-b border-slate-100 px-5 py-6 sm:px-8 sm:py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-auto max-w-[180px] items-center sm:h-14 sm:max-w-[220px]">
                  <img src="/Logo.png" alt="Honhaar" className="h-full w-full object-contain object-left" />
                </span>
                <div className="hidden h-10 w-px bg-slate-200 sm:block" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">Official offerings</p>
                  <h3 className="text-2xl tracking-tight text-slate-950 sm:text-3xl">Products and Services</h3>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-500 sm:text-right">
                Transparent INR pricing for Class 10 and Class 12 board preparation.
              </p>
            </div>
          </div>

          <div className="relative grid gap-5 p-5 sm:p-7 md:grid-cols-2">
            {products.map((product, index) => (
              <article
                key={product.name}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg sm:p-6"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${
                    index === 0 ? 'from-blue-600 to-teal-500' : 'from-teal-600 to-cyan-500'
                  }`}
                />
                <div className="pl-3">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h4 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">{product.name}</h4>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${
                        index === 0 ? 'bg-blue-600' : 'bg-teal-600'
                      }`}
                    >
                      {index === 0 ? 'Class 10' : 'Class 12'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 text-center sm:mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="mb-5 text-sm font-medium tracking-wide text-slate-600 sm:text-base">
            Trusted by <span className="font-semibold text-slate-900">2,450+</span> Board Exam Students
          </p>
          <div className="inline-flex items-center gap-4 rounded-full border border-white/80 bg-white/90 px-4 py-2.5 shadow-lg shadow-slate-200/60 backdrop-blur-sm sm:gap-5 sm:px-5">
            <div className="flex -space-x-2.5">
              {['A', 'R', 'S', 'P', 'M'].map((initial, i) => (
                <div
                  key={initial}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-teal-500 text-xs font-bold text-white shadow-sm"
                  style={{ zIndex: 5 - i }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="pr-1 text-sm font-semibold text-teal-800">Join them today!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
