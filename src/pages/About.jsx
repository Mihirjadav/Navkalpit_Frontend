import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-8 bg-gradient-to-red from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            About Navkalpit
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
            Navkalpit is a creative 3D printing and design studio dedicated to
            turning your concept into tangible, beautiful and functional
            products. We combine advanced technology with innovative thinking to
            deliver models that inspire, solve problems, and elevate ideas.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed italic border-l-4 border-blue-400 pl-4 sm:pl-6">
              To deliver innovative 3D solutions and products made in India,
              empowering individuals, startups and industries with quality and
              creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400">
              Our Vision
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed italic border-l-4 border-blue-400 pl-4 sm:pl-6">
              To become India's leading creative manufacturing studio showcasing
              world-class excellence built on Made in India innovation.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12 text-center text-blue-400">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Personalized & Fully Customized Design",
                icon: "✨",
              },
              {
                title: "High Accuracy Prints & Quality Materials",
                icon: "🎯",
              },
              {
                title: "Expertise in Both Creative and Industrial Projects",
                icon: "🏭",
              },
              {
                title: "Fast Turnaround with Professional Finishing",
                icon: "⚡",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-6 hover:border-blue-400 transition-colors"
              >
                <div className="text-3xl sm:text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-400">
            Our Journey
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8 md:p-12">
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6">
              Started with a vision to bring meaningful design into reality,
              Navkalpit has now completed thousands of models—from sentimental
              gifts to high-performance industrial parts. Each project
              represents our commitment to excellence, innovation, and customer
              satisfaction.
            </p>
            <div className="bg-slate-700/50 rounded-lg p-4 sm:p-6 border-l-4 border-blue-400">
              <p className="text-sm sm:text-base text-slate-200">
                We take pride in transforming ideas into tangible products that
                make a real impact on our clients' lives and businesses. Our
                growing portfolio is a testament to our dedication and expertise
                in the 3D printing industry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
