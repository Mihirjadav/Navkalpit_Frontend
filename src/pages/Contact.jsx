import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // You can integrate your backend API here
      console.log("Form submitted:", form);
      setSubmitted(true);
      setTimeout(() => {
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-red from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something Amazing Together
          </h1>
          <p className="text-xl text-slate-300">
            We'd love to hear from you. Get in touch with us today!
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-12 px-4 md:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "📞",
              label: "Phone",
              value: "+91 73838 81288",
              link: "tel:+917383881288",
            },
            {
              icon: "✉️",
              label: "Email",
              value: "info@navkalpit.com",
              link: "mailto:info@navkalpit.com",
            },
            {
              icon: "📍",
              label: "Location",
              value: "Rajkot",
              link: null,
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link || "#"}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:border-blue-400 transition-colors"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className="text-slate-400 text-sm mb-2">{item.label}</p>
              <p className="text-slate-100 font-semibold">{item.value}</p>
            </a>
          ))}
        </div>
      </section>


      {/* Social Connect Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
            Connect With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://www.instagram.com/navkalpit2610?igsh=MTlveXRwdjRubWR0dQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center hover:border-pink-400 transition-colors"
            >
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-2">
                Instagram
              </h3>
              <p className="text-slate-400 mb-4">
                Follow us for latest updates and portfolio
              </p>
              <button className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors">
                Follow Us
              </button>
            </a>

            <a
              href="https://www.facebook.com/share/19tdFeRrnR/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center hover:border-blue-400 transition-colors"
            >
              <div className="text-5xl mb-4">👍</div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-2">
                Facebook
              </h3>
              <p className="text-slate-400 mb-4">
                Join our community and stay connected
              </p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Like Page
              </button>
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
