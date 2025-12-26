import React, { useState } from "react";

function Technology() {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: "3d-printing",
      title: "3D Printing",
      subtitle:
        "High precision prints for creative, educational, commercial, industrial use",
      description:
        "High-precision 3D printing for creative, educational, commercial, and industrial applications with multiple materials and finishes.",
      features: [
        "High Precision",
        "Multiple Materials",
        "Post-processing",
        "Quality Checks",
      ],
      icon: "🖨️",
      color: "from-blue-600 to-cyan-600",
      details:
        "We deliver high-precision prints for artistic pieces, engineering parts, and end-use products. Supported technologies include FDM and Resin (SLA/DLP) for varied detail and strength.",
    },
    {
      id: "custom-design",
      title: "Custom 3D Designing",
      subtitle: "From your sketch to print-ready 3D models",
      description:
        "Turn sketches and ideas into detailed 3D models ready for printing or prototyping. Iterative design and CAD-ready files provided.",
      features: [
        "Concept Sketching",
        "CAD Modeling",
        "Print Optimization",
        "File Delivery",
      ],
      icon: "🖋️",
      color: "from-purple-600 to-pink-600",
      details:
        "Provide a sketch, photo, or brief — our designers will create optimized 3D models, prepare manufacturable geometry, and export formats suitable for printing or CNC.",
      hasUpload: false,
    },
    {
      id: "miniatures",
      title: "Miniature Models",
      subtitle: "Temples, architecture, characters and showpieces",
      description:
        "Specialized miniature models for temples, architecture, characters, decorative items and collectible showpieces with ultra-fine detail.",
      features: [
        "High-detail Resin",
        "Scale Modeling",
        "Texturing",
        "Batch Production",
      ],
      icon: "🏛️",
      color: "from-green-600 to-emerald-600",
      details:
        "We craft miniature models with emphasis on scale accuracy and surface detail — ideal for collectors, religious replicas, and decorative collections.",
      hasUpload: false,
    },
    {
      id: "gifts",
      title: "Personalized Gifts & Showpieces",
      subtitle: "Unique customized items for events and gifting",
      description:
        "Personalized and unique gifts — corporate, event, or home decor: nameplates, miniatures, and custom showpieces tailored to your needs.",
      features: ["Customization", "Small Runs", "Packaging", "Branding"],
      icon: "🎁",
      color: "from-orange-500 to-red-500",
      details:
        "We design and print personalized gifts and showpieces with branding or custom personalization for events, festivals, and corporate gifting.",
      hasUpload: false,
    },
    {
      id: "industrial",
      title: "Industrial & Mechanical Parts Printing",
      subtitle:
        "Functional prototypes, replacement parts, engineering components",
      description:
        "Functional prototyping and end-use part printing for engineering applications — durable materials and dimensional accuracy.",
      features: [
        "Engineering Materials",
        "Tolerance Control",
        "Functional Testing",
        "Batch Production",
      ],
      icon: "⚙️",
      color: "from-slate-600 to-slate-800",
      details:
        "We print functional prototypes and replacement parts using engineering-grade materials and validate geometry for fit and function. Ideal for mechanical and industrial use.",
    },
    {
      id: "prototyping",
      title: "Prototyping for Startups",
      subtitle: "Bring your startup idea to life",
      description:
        "Fast, professional prototyping and concept visualization to validate ideas and accelerate product development for startups.",
      features: [
        "Concept Validation",
        "Iterative Prototypes",
        "Visualization",
        "Low-volume Manufacturing",
      ],
      icon: "🚀",
      color: "from-indigo-600 to-violet-600",
      details:
        "We help startups iterate quickly with functional prototypes, feasibility studies, and production-ready designs to reduce time-to-market.",
      hasUpload: false,
    },
    {
      id: "workshops",
      title: "Educational Workshops",
      subtitle: "Hands-on sessions on 3D printing and design",
      description:
        "Workshops for schools and colleges covering 3D printing, CAD basics, and rapid prototyping techniques with practical exercises.",
      features: [
        "Hands-on Labs",
        "Curriculum Packs",
        "Instructor Support",
        "Certificates",
      ],
      icon: "🏫",
      color: "from-emerald-500 to-teal-500",
      details:
        "Our practical workshops teach students and learners how to design, prepare, and print 3D models and understand manufacturing workflows.",
      hasUpload: false,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-black pt-24 pb-20">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-6 md:px-12 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 text-blue-200 rounded-full text-sm font-semibold backdrop-blur-sm">
              ✨ Our Technology
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Professional{" "}
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technology
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive solutions for all your 3D printing, design, and
            prototyping needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 px-6 md:px-12 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setExpandedService(
                    expandedService === service.id ? null : service.id
                  )
                }
              >
                {/* Card Background Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                ></div>

                {/* Border Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                {/* Card Content */}
                <div className="relative backdrop-blur-sm bg-slate-900/50 border border-white/10 group-hover:border-white/30 rounded-2xl p-8 transition-all duration-300">
                  {/* Icon and Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl transition-transform duration-300 group-hover:rotate-180">
                      ↓
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <span className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Expanded Section */}
                  {expandedService === service.id && (
                    <div className="border-t border-white/10 pt-6 mt-6 animate-in fade-in duration-300">
                      <h4 className="text-white font-bold mb-3">Details</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {service.details}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-purple-600/20 blur-2xl"></div>
            <div className="relative backdrop-blur-sm bg-blue border border-white/20 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Contact our team to discuss your project requirements and get a
                free quote
              </p>
              <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                Get Your Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Technology;
