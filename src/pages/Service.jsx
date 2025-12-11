import React, { useState } from "react";

function Service() {
  const [expandedService, setExpandedService] = useState(null);
  const [fileUpload, setFileUpload] = useState({
    "3d-printing": null,
    prototype: null,
  });

  const services = [
    {
      id: "3d-printing",
      title: "3D Printing",
      subtitle: "Transform Your Ideas into Physical Objects",
      description:
        "Professional 3D printing services with precision and quality. Choose from multiple materials and finishes.",
      features: [
        "Design Consultation",
        "3D Printing",
        "Post-Processing",
        "Quality Assurance",
      ],
      icon: "🖨️",
      color: "from-blue-600 to-cyan-600",
      details:
        "Our 3D printing service includes design optimization, material selection, and precision printing using state-of-the-art equipment. We handle FDM and SLA technologies for maximum versatility.",
      hasUpload: true,
    },
    {
      id: "pcb-design",
      title: "PCB Design",
      subtitle: "Custom Circuit Board Solutions",
      description:
        "Expert PCB design and layout services for your electronic projects. From concept to production.",
      features: [
        "Schematic Design",
        "PCB Layout",
        "Gerber Generation",
        "Design Verification",
      ],
      icon: "⚡",
      color: "from-purple-600 to-pink-600",
      details:
        "We provide comprehensive PCB design services including schematic capture, multi-layer layout, signal integrity analysis, and preparation for manufacturing. DFM reviews ensure manufacturability.",
      hasUpload: false,
    },
    {
      id: "3d-scanning",
      title: "3D Scanning",
      subtitle: "Capture Reality in Digital Form",
      description:
        "High-precision 3D scanning services to digitize physical objects and environments.",
      features: [
        "Object Scanning",
        "Point Cloud Processing",
        "Mesh Generation",
        "Format Export",
      ],
      icon: "📡",
      color: "from-green-600 to-emerald-600",
      details:
        "Our professional 3D scanning services capture precise measurements and geometries of physical objects. Perfect for reverse engineering, quality inspection, and digital archiving.",
      hasUpload: false,
    },
    {
      id: "prototype",
      title: "Prototype Development",
      subtitle: "Bring Your Concept to Life",
      description:
        "End-to-end prototype development services including design, printing, and testing.",
      features: [
        "Design Review",
        "Rapid Prototyping",
        "Functional Testing",
        "Iteration Support",
      ],
      icon: "🔧",
      color: "from-orange-600 to-red-600",
      details:
        "From concept to finished prototype, we handle every step. Upload your design files (FDM, SLA formats) and we'll bring your vision to life with expert craftsmanship.",
      hasUpload: true,
    },
  ];

  const handleFileChange = (serviceId, event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file format (only FDM, SLA formats allowed)
      const validFormats = [".fdm", ".sla", ".stl", ".obj", ".step"];
      const fileName = file.name.toLowerCase();
      const isValidFormat = validFormats.some((format) =>
        fileName.endsWith(format)
      );

      if (isValidFormat) {
        setFileUpload((prev) => ({
          ...prev,
          [serviceId]: file,
        }));
      } else {
        alert("Please upload only FDM, SLA, STL, OBJ, or STEP files");
        event.target.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-black pt-12 sm:pt-16 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-3 sm:px-6 md:px-12 mb-12 sm:mb-16 md:mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-500/20 border border-blue-400/40 text-blue-200 rounded-full font-semibold backdrop-blur-sm">
              ✨ Our Services
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-6 leading-tight">
            Professional{" "}
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive solutions for all your 3D printing, design, and
            prototyping needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 px-3 sm:px-6 md:px-12 mb-12 sm:mb-16 md:mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
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
                <div className="relative backdrop-blur-sm bg-slate-900/50 border border-white/10 group-hover:border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all duration-300">
                  {/* Icon and Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-2xl font-bold text-white break-words">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl transition-transform duration-300 group-hover:rotate-180 flex-shrink-0">
                      ↓
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-base">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full flex-shrink-0"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Expanded Section */}
                  {expandedService === service.id && (
                    <div className="border-t border-white/10 pt-4 sm:pt-6 mt-4 sm:mt-6 space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                      <div>
                        <h4 className="text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">
                          Details
                        </h4>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {service.details}
                        </p>
                      </div>

                      {/* File Upload Section */}
                      {service.hasUpload && (
                        <div className="space-y-3 sm:space-y-4">
                          <h4 className="text-white font-bold text-sm sm:text-base">
                            Upload Design Files
                          </h4>
                          <div className="border-2 border-dashed border-slate-600 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-blue-500 transition-colors group/upload">
                            <label className="flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer">
                              <div className="text-2xl sm:text-3xl">📁</div>
                              <div className="text-center">
                                <p className="text-white font-semibold text-xs sm:text-base break-words max-w-xs">
                                  {fileUpload[service.id]
                                    ? fileUpload[service.id].name
                                    : "Click to upload"}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  FDM, SLA, STL, OBJ, STEP
                                </p>
                              </div>
                              <input
                                type="file"
                                hidden
                                accept=".fdm,.sla,.stl,.obj,.step"
                                onChange={(e) =>
                                  handleFileChange(service.id, e)
                                }
                              />
                            </label>
                          </div>
                          {fileUpload[service.id] && (
                            <button className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all text-sm sm:text-base">
                              Submit Order
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 px-3 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-purple-600/20 blur-2xl"></div>
            <div className="relative backdrop-blur-sm bg-blue border border-white/20 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-xs sm:text-base">
                Contact our team to discuss your project requirements and get a
                free quote
              </p>
              <button className="px-6 sm:px-8 py-2.5 sm:py-4 bg-black text-white font-bold rounded-full text-xs sm:text-base hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                Get Your Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
