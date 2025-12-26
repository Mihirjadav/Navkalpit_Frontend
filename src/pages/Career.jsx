import React from "react";

export default function Career() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-red from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join the Navkalpit Team
          </h1>
          <p className="text-xl text-slate-300">
            A place where creativity blends with engineering and every idea
            shapes the future.
          </p>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">
            How to Apply
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-2xl font-bold text-blue-400 ">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    Prepare Your Resume or Portfolio
                  </h3>
                  <p className="text-slate-300">
                    Gather your resume, portfolio, or any work samples that
                    showcase your skills and experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl font-bold text-blue-400 ">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    Submit Your Application
                  </h3>
                  <p className="text-slate-300">
                    Click the "Apply Now" button below and fill out the
                    application form with your details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl font-bold text-blue-400 ">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    Hear From Us
                  </h3>
                  <p className="text-slate-300">
                    We'll review your application and get back to you soon with
                    next steps.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                window.open("https://forms.gle/8D6Z9an6a5EcNFw77", "_blank")
              }
              className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-4 md:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Creative & Inspiring Environment",
                description:
                  "Work in a collaborative space where innovation is encouraged.",
                icon: "💡",
              },
              {
                title: "Real Client Projects",
                description:
                  "Work on actual projects that make a real-world impact.",
                icon: "🎯",
              },
              {
                title: "Learn Advanced 3D Printing",
                description:
                  "Gain hands-on experience with cutting-edge 3D printing technologies.",
                icon: "🖨️",
              },
              {
                title: "Growth Opportunities",
                description:
                  "Grow your career with a fast-growing startup with big ambitions.",
                icon: "📈",
              },
              {
                title: "Certification & Training",
                description:
                  "Interns receive certifications upon completion of their program.",
                icon: "🎓",
              },
              {
                title: "Flexible Work Culture",
                description:
                  "We value talent and provide flexible work arrangements.",
                icon: "🌟",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-400 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-blue-400">
            Current Openings
          </h2>

          <div className="space-y-4 mb-8">
            {[
              {
                position: "3D Design Engineer",
                level: "Intermediate",
                type: "Full-time",
              },
              {
                position: "CAD Technician",
                level: "Entry-level",
                type: "Full-time",
              },
              {
                position: "Quality Assurance Specialist",
                level: "Intermediate",
                type: "Full-time",
              },
              {
                position: "3D Printing Intern",
                level: "Internship",
                type: "Internship",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    {job.position}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-700 rounded text-sm text-slate-300">
                      {job.level}
                    </span>
                    <span className="px-3 py-1 bg-blue-900 rounded text-sm text-blue-300">
                      {job.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    window.open("https://forms.gle/8D6Z9an6a5EcNFw77", "_blank")
                  }
                  className=" mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-6 text-center">
            <p className="text-slate-300 mb-4">
              Don't see a position that fits? Send us your resume anyway!
            </p>
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:info@navkalpit.com?subject=Job Application&body=Hello%20Team,%0D%0A%0D%0APlease%20find%20my%20resume%20attached.%0D%0A%0D%0AThank%20you.")
              }
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Send Your Resume
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Let's Create the Future Together
          </h2>
          <p className="text-slate-300 text-lg">
            If you're passionate about 3D printing, design, and innovation, we'd
            love to hear from you!
          </p>
        </div>
      </section>
    </div>
  );
}
