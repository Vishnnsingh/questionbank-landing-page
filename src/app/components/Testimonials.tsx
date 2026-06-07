import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    class: 'Class 12th Student',
    rating: 5,
    text: 'The AI prediction feature is amazing! It helped me focus on the most important topics and I scored 92% in my exams.',
    location: 'Patna, Bihar',
  },
  {
    name: 'Rahul Kumar',
    class: 'Class 10th Student',
    rating: 5,
    text: 'Mock tests are exactly like the real exams. The performance tracking helped me improve my weak subjects significantly.',
    location: 'Muzaffarpur, Bihar',
  },
  {
    name: 'Anjali Singh',
    class: 'Class 12th Student',
    rating: 5,
    text: '10 years question bank with solutions is a game changer. I could practice so many questions and understand the pattern.',
    location: 'Gaya, Bihar',
  },
  {
    name: 'Amit Raj',
    class: 'Class 10th Student',
    rating: 5,
    text: 'The repeated questions feature saved me so much time. I focused only on what matters most and improved my score by 15%.',
    location: 'Bhagalpur, Bihar',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-14 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands of successful Bihar Board students
          </p>
        </div>
        
        <div className="grid gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Student Info */}
              <div className="border-t border-slate-100 pt-4">
                <div className="text-slate-900 mb-1">
                  {testimonial.name}
                </div>
                <div className="text-xs text-slate-500">
                  {testimonial.class}
                </div>
                <div className="text-xs text-teal-600 mt-1">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-3 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl text-blue-600 mb-2">
              2,450+
            </div>
            <div className="text-slate-600">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl text-teal-600 mb-2">
              10,000+
            </div>
            <div className="text-slate-600">Questions Solved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl text-purple-600 mb-2">
              92%
            </div>
            <div className="text-slate-600">Average Score</div>
          </div>
        </div>
      </div>
    </section>
  );
}
