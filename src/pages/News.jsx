import React from "react";

export default function News() {
  const latest = [
    "New Resin printing capability added for ultra-detailed models",
    "Successfully delivered 500+ customized miniature Ram mandir models.",
    "Launched advanced CAD service for industrial clients.",
    "Startup internship program for design students.",
    "Participated in local tech & innovation exhibitions",
  ];

  const features = [
    "Customized showpiece collections for festival gifting.",
    "Functional mechanical part printing for engineering clients",
    "Personalized nameplates & miniature decor models.",
  ];

  const articles = [
    "How 3D printing is changing local business.",
    "Benefits of rapid prototyping for startups",
    "Difference between FDM & Resin Printing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-blue from-slate-50 to-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
            News & Updates
          </h1>
          <p className="text-slate-600">
            Latest company updates, projects, and educational posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Latest Updates</h2>
            <ul className="space-y-3 text-slate-700">
              {latest.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">{item}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Feature Projects</h2>
            <ul className="space-y-3 text-slate-700">
              {features.map((f, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-green-600 mt-1">•</span>
                  <p className="font-medium">{f}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Educational Articles</h2>
            <ul className="space-y-3 text-slate-700">
              {articles.map((a, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-orange-500 mt-1">•</span>
                  <p className="font-medium">{a}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-gradient-to-red from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="mb-4">
            Subscribe to our newsletter for updates on new services, workshops
            and featured projects.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              aria-label="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900"
            />
            <button className="px-4 py-3 bg-white text-blue-600 font-bold rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
