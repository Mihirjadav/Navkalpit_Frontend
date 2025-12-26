import React, { useState, useRef } from "react";

export default function Service() {
  const [tech, setTech] = useState(null); // 'FDM' or 'STL'
  const [material, setMaterial] = useState(null);
  const [color, setColor] = useState(null);
  const [file, setFile] = useState(null);
  const [verified, setVerified] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);
  const [estimatedWeight, setEstimatedWeight] = useState(0); // grams
  const fileRef = useRef(null);

  // Price per gram for each technology
  const materialPricesByTech = {
    FDM: {
      PLA: 5,
      ABS: 12,
      PETG: 18,
      TPU: 22,
      Nylon: 25,
      "PLA+ (Premium)": 12,
      "Wood PLA": 20,
      "Carbon Fiber PLA": 40,
      "Carbon Fiber Nylon": 70,
    },
    STL: {
      "iTech Premium Standard 8K Resin": 3.6,
      ABS: 6.5,
    },
  };

  const colors = [
    "#111827",
    "#0ea5e9",
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#8b5cf6",
  ];

  const materialsForCurrentTech = tech
    ? Object.keys(materialPricesByTech[tech] || {})
    : [];

const allowedExtensions = [
  "stl",
  "obj",
  "step",
  "stp",
  "iges",
  "3mf",
  "amf",
];

const handleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    alert("Invalid file type. Please upload a valid 3D file.");
    e.target.value = ""; // reset input
    return;
  }

};


  function resetSelections() {
    setMaterial(null);
    setColor(null);
    setFile(null);
    setVerified(false);
    setEstimatedWeight(0);
    if (fileRef.current) fileRef.current.value = "";
  }

  function onSelectTech(t) {
    if (t !== tech) {
      setTech(t);
      resetSelections();
    }
  }

  const canVerify = () => {
    if (!tech) return false;
    if (!material) return false;
    if (!color) return false;
    if (!file) return false;
    return true;
  };

  const currentPricePerGram =
    tech && material ? materialPricesByTech[tech]?.[material] : null;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-black text-slate-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Choose Service & Upload</h1>
          <p className="text-slate-400 mt-2">
            Select Service, material, color, upload STL and verify design.
          </p>
        </header>

        {/* Tech Selector */}
        <section className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">1. Select Service</h2>
          <div className="flex gap-4">
            <button
              onClick={() => onSelectTech("FDM")}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                tech === "FDM"
                  ? "bg-white text-slate-900 border-transparent"
                  : "bg-slate-700/60 text-slate-200 border-slate-600"
              }`}
            >
              FDM
            </button>
            <button
              onClick={() => onSelectTech("STL")}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                tech === "STL"
                  ? "bg-white text-slate-900 border-transparent"
                  : "bg-slate-700/60 text-slate-200 border-slate-600"
              }`}
            >
              STL
            </button>
          </div>
        </section>

        {/* Material (FDM) */}
        {tech === "FDM" && (
          <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              2. Choose Material (FDM)
            </h2>
            <div className="flex flex-wrap gap-3">
              {materialsForCurrentTech.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  className={`px-4 py-2 rounded-lg border font-medium flex items-center gap-3 ${
                    material === m
                      ? "bg-white text-slate-900 border-transparent"
                      : "bg-slate-700/60 text-slate-200 border-slate-600"
                  }`}
                >
                  <span>{m}</span>
                  <span className="text-xs text-slate-400">
                    ₹{materialPricesByTech.FDM[m]}/g
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Material (STL) */}
        {tech === "STL" && (
          <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              2. Choose Material (STL)
            </h2>
            <div className="flex flex-wrap gap-3">
              {materialsForCurrentTech.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  className={`px-4 py-2 rounded-lg border font-medium flex items-center gap-3 ${
                    material === m
                      ? "bg-white text-slate-900 border-transparent"
                      : "bg-slate-700/60 text-slate-200 border-slate-600"
                  }`}
                >
                  <span>{m}</span>
                  <span className="text-xs text-slate-400">
                    ₹{materialPricesByTech.STL[m]}/g
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Color Picker */}
        {tech && (
          <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">3. Pick a Color</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex gap-3 items-center">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={`color-${c}`}
                    className={`w-10 h-10 rounded-full border-2 ${
                      color === c ? "border-white" : "border-slate-700"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-400">
                  Or choose any color:
                </label>
                <input
                  type="color"
                  value={color || "#0ea5e9"}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 p-0 border-0 rounded-full"
                  aria-label="custom-color"
                />
                <div className="ml-3 text-sm text-slate-300">
                  {color ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ background: color }}
                      />
                      {color}
                    </span>
                  ) : (
                    "No color selected"
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* File Upload */}
        {tech && (
          <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">4. Upload File</h2>
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="px-4 py-2 bg-white text-black rounded-md font-medium shadow hover:shadow-lg"
                >
                  Choose File
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  accept=".stl,.obj,.step,.stp,.iges,.3mf,.amf"
                  onChange={handleFile}
                  className="hidden"
                />
              </div>

              <div className="text-sm text-slate-300">
                {file ? file.name : "No file uploaded"}
              </div>

              {file && (
                <button
                  onClick={() => {
                    setFile(null);
                    if (fileRef.current) fileRef.current.value = "";
                    setVerified(false);
                  }}
                  className="ml-auto md:ml-0 px-3 py-2 bg-slate-700 rounded-md text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Preview area (simple placeholder) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-slate-900/50 rounded-lg border border-slate-700 p-4 h-48 flex items-center justify-center">
                {file ? (
                  <div className="text-center">
                    <div className="text-sm text-slate-300 mb-2">
                      Preview (basic)
                    </div>
                    <div className="text-xs text-slate-400">
                      Filename: {file.name}
                    </div>
                    <div className="mt-4 text-xs text-slate-400">
                      3D preview integration (model-viewer / three.js) can be
                      added later.
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500">
                    Choose an STL to see a preview
                  </div>
                )}
              </div>

              <div className="bg-slate-900/40 rounded-lg border border-slate-700 p-4 h-48 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Selected</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Service : {tech || "—"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Material : {material || "—"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Price/g :{" "}
                    {currentPricePerGram ? `₹${currentPricePerGram}/g` : "—"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Color :{" "}
                    {color ? (
                      <>
                        <span
                          className="inline-block w-3 h-3 rounded-full align-middle mr-2"
                          style={{ background: color }}
                        />
                        {color}
                      </>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setVerified(canVerify())}
                    disabled={!canVerify()}
                    className={`w-full py-2 rounded-md text-sm font-semibold ${
                      canVerify()
                        ? "bg-white text-black rounded-md font-medium"
                        : "bg-slate-700 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Verify Design
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final action */}
        <section className="text-center">
          <button
            disabled={!verified}
            onClick={() => {
              if (verified) setShowQuotation(true);
            }}
            className={`px-8 py-3 rounded-full font-semibold ${
              verified
                ? "bg-white text-black rounded-md font-medium shadow-lg"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Go to Next
          </button>
        </section>

        {/* Quotation modal */}
        {showQuotation && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 text-slate-100 rounded-2xl max-w-2xl w-full p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-3">Quotation Summary</h3>
              <div className="text-sm text-slate-300 space-y-2 mb-4">
                <div>Technology: {tech}</div>
                <div>Material: {material || "—"}</div>
                <div>
                  Price per gram:{" "}
                  {currentPricePerGram ? `₹${currentPricePerGram}/g` : "—"}
                </div>
                <div>Color: {color || "—"}</div>
                <div>File: {file ? file.name : "—"}</div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-slate-400">
                  Estimated Weight (grams)
                </label>
                <input
                  type="number"
                  min={0}
                  value={estimatedWeight}
                  onChange={(e) =>
                    setEstimatedWeight(Number(e.target.value) || 0)
                  }
                  className="mt-2 w-full p-2 rounded-md bg-slate-800 border border-slate-700 text-slate-100"
                />
              </div>

              <div className="text-right text-lg font-semibold">
                Total Price:{" "}
                {currentPricePerGram
                  ? `₹${(estimatedWeight * currentPricePerGram).toFixed(2)}`
                  : "—"}
                + 18% GST
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => setShowQuotation(false)}
                  className="px-4 py-2 rounded-md bg-slate-700 text-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert("Quotation saved/confirmed (placeholder)");
                    setShowQuotation(false);
                  }}
                  className="px-4 py-2 rounded-md bg-white text-black font-medium"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// export default function Technology() {
//   const [techs, setTechs] = useState([]); // Technologies from API
//   const [tech, setTech] = useState(null); // Selected technology Slug
//   const [materials, setMaterials] = useState([]); // Materials from API
//   const [material, setMaterial] = useState(null); // Selected material object
//   const [color, setColor] = useState("#0ea5e9");
//   const [file, setFile] = useState(null);
//   const [verified, setVerified] = useState(false);
//   const [showQuotation, setShowQuotation] = useState(false);
//   const [estimatedWeight, setEstimatedWeight] = useState(0);
//   const [quotation, setQuotation] = useState(null);
//   const fileRef = useRef(null);
//   const tier = "standard"; // Example tier

//   const colors = ["#111827", "#0ea5e9", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

//   // Fetch technologies on mount
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/technology-list/")
//       .then((res) => {
//         setTechs(Array.isArray(res.data) ? res.data : res.data.results || []);
//       })
//       .catch((err) => console.error("Error fetching technologies:", err));
//   }, []);

//   // Fetch materials when tech changes
//   useEffect(() => {
//     if (!tech) return;
//     axios
//       .get(`http://127.0.0.1:8000/api/material-list/?technology=${tech}`)
//       .then((res) => setMaterials(res.data))
//       .catch((err) => console.error("Error fetching materials:", err));
//   }, [tech]);

//   function resetSelections() {
//     setMaterial(null);
//     setColor("#0ea5e9");
//     setFile(null);
//     setVerified(false);
//     setEstimatedWeight(0);
//     if (fileRef.current) fileRef.current.value = "";
//   }

//   function onSelectTech(t) {
//     if (t !== tech) {
//       setTech(t);
//       resetSelections();
//     }
//   }

//   const handleFile = (e) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     if (!f.name.toLowerCase().endsWith(".stl")) {
//       alert("Please upload an STL file (.stl)");
//       e.target.value = "";
//       return;
//     }
//     setFile(f);
//     setVerified(false);
//   };

//   const canVerify = () => {
//     return tech && material && color && (file || estimatedWeight > 0);
//   };

//   const handleVerify = () => {
//     setVerified(canVerify());
//   };

//   const handleQuotation = async () => {
//     if (!verified) return;
//     try {
//       let result;
//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("material_id", material.id);
//         formData.append("tier", tier);
//         formData.append("gst_percent", 18);

//         const res = await axios.post("http://127.0.0.1:8000/api/stl-upload/", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         result = res.data;
//       } else {
//         const res = await axios.post("http://127.0.0.1:8000/api/calculate-price/", {
//           material_id: material.id,
//           tier: tier,
//           weight_grams: estimatedWeight,
//           gst_percent: 18,
//         });
//         result = res.data;
//       }
//       setQuotation(result);
//       setShowQuotation(true);
//       setEstimatedWeight(result.weight_grams || estimatedWeight);
//     } catch (err) {
//       console.error(err);
//       alert("Error calculating quotation");
//     }
//   };

//   // Price per gram if material selected
//   const currentPricePerGram = material?.price_per_gram;

//   return (
//     <div className="min-h-screen bg-linear-to-b from-slate-900 to-black text-slate-100 py-20">
//       <div className="max-w-6xl mx-auto px-6">
//         <header className="text-center mb-10">
//           <h1 className="text-4xl font-bold">Choose Technology & Upload</h1>
//           <p className="text-slate-400 mt-2">
//             Select technology, material, color, upload STL and verify design.
//           </p>
//         </header>

//         {/* Tech Selector */}
//         <section className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 mb-8">
//           <h2 className="text-lg font-semibold mb-4">1. Select Technology</h2>
//           <div className="flex gap-4 flex-wrap">
//             {techs.map((t) => (
//               <button
//                 key={t.id}
//                 onClick={() => onSelectTech(t.slug)}
//                 className={`px-5 py-3 rounded-xl font-semibold transition ${
//                   tech === t.slug
//                     ? "bg-white text-slate-900 border-transparent"
//                     : "bg-slate-700/60 text-slate-200 border-slate-600"
//                 }`}
//               >
//                 {t.name}
//               </button>
//             ))}
//           </div>
//         </section>

//         {/* Material Selector */}
//         {tech && (
//           <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
//             <h2 className="text-lg font-semibold mb-4">2. Choose Material</h2>
//             <div className="flex flex-wrap gap-3">
//               {materials.map((m) => (
//                 <button
//                   key={m.id}
//                   onClick={() => setMaterial(m)}
//                   className={`px-4 py-2 rounded-lg border font-medium flex items-center gap-3 ${
//                     material?.id === m.id
//                       ? "bg-white text-slate-900 border-transparent"
//                       : "bg-slate-700/60 text-slate-200 border-slate-600"
//                   }`}
//                 >
//                   <span>{m.name}</span>
//                   <span className="text-xs text-slate-400">₹{m.price_per_gram}/g</span>
//                 </button>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Color Picker */}
//         {tech && (
//           <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
//             <h2 className="text-lg font-semibold mb-4">3. Pick a Color</h2>
//             <div className="flex flex-col md:flex-row md:items-center gap-4">
//               <div className="flex gap-3 items-center">
//                 {colors.map((c) => (
//                   <button
//                     key={c}
//                     onClick={() => setColor(c)}
//                     aria-label={`color-${c}`}
//                     className={`w-10 h-10 rounded-full border-2 ${
//                       color === c ? "border-white" : "border-slate-700"
//                     }`}
//                     style={{ background: c }}
//                   />
//                 ))}
//               </div>
//               <div className="flex items-center gap-3">
//                 <label className="text-sm text-slate-400">Or choose any color:</label>
//                 <input
//                   type="color"
//                   value={color || "#0ea5e9"}
//                   onChange={(e) => setColor(e.target.value)}
//                   className="w-10 h-10 p-0 border-0 rounded-full"
//                   aria-label="custom-color"
//                 />
//                 <div className="ml-3 text-sm text-slate-300">
//                   {color ? (
//                     <span className="inline-flex items-center gap-2">
//                       <span className="w-4 h-4 rounded-full" style={{ background: color }} />
//                       {color}
//                     </span>
//                   ) : (
//                     "No color selected"
//                   )}
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* File Upload */}
//         {tech && (
//           <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 mb-8">
//             <h2 className="text-lg font-semibold mb-4">4. Upload STL File</h2>
//             <div className="flex flex-col md:flex-row gap-4 md:items-center">
//               <div>
//                 <button
//                   onClick={() => fileRef.current?.click()}
//                   className="px-4 py-2 bg-white text-black rounded-md font-medium shadow hover:shadow-lg"
//                 >
//                   Choose STL File
//                 </button>
//                 <input
//                   ref={fileRef}
//                   type="file"
//                   accept=".stl"
//                   onChange={handleFile}
//                   className="hidden"
//                 />
//               </div>
//               <div className="text-sm text-slate-300">{file ? file.name : "No file uploaded"}</div>
//               {file && (
//                 <button
//                   onClick={() => {
//                     setFile(null);
//                     if (fileRef.current) fileRef.current.value = "";
//                     setVerified(false);
//                   }}
//                   className="ml-auto md:ml-0 px-3 py-2 bg-slate-700 rounded-md text-sm"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>

//             {/* Preview area */}
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="md:col-span-2 bg-slate-900/50 rounded-lg border border-slate-700 p-4 h-48 flex items-center justify-center">
//                 {file ? (
//                   <div className="text-center">
//                     <div className="text-sm text-slate-300 mb-2">Preview (basic)</div>
//                     <div className="text-xs text-slate-400">Filename: {file.name}</div>
//                     <div className="mt-4 text-xs text-slate-400">
//                       3D preview integration (model-viewer / three.js) can be added later.
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-slate-500">Choose an STL to see a preview</div>
//                 )}
//               </div>

//               <div className="bg-slate-900/40 rounded-lg border border-slate-700 p-4 h-48 flex flex-col justify-between">
//                 <div>
//                   <h4 className="text-sm font-semibold">Selected</h4>
//                   <p className="text-xs text-slate-400 mt-2">Technology: {techs.find((t) => t.id === tech)?.name || "—"}</p>
//                   <p className="text-xs text-slate-400">Material: {material?.name || "—"}</p>
//                   <p className="text-xs text-slate-400">
//                     Price/g: {currentPricePerGram ? `₹${currentPricePerGram}/g` : "—"}
//                   </p>
//                   <p className="text-xs text-slate-400">
//                     Color:{" "}
//                     {color ? (
//                       <>
//                         <span className="inline-block w-3 h-3 rounded-full align-middle mr-2" style={{ background: color }} />
//                         {color}
//                       </>
//                     ) : (
//                       "—"
//                     )}
//                   </p>
//                 </div>
//                 <div>
//                   <button
//                     onClick={handleVerify}
//                     disabled={!canVerify()}
//                     className={`w-full py-2 rounded-md text-sm font-semibold ${
//                       canVerify()
//                         ? "bg-white text-black rounded-md font-medium"
//                         : "bg-slate-700 text-slate-400 cursor-not-allowed"
//                     }`}
//                   >
//                     Verify Design
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Final action */}
//         <section className="text-center">
//           <button
//             disabled={!verified}
//             onClick={handleQuotation}
//             className={`px-8 py-3 rounded-full font-semibold ${
//               verified
//                 ? "bg-white text-black rounded-md font-medium shadow-lg"
//                 : "bg-slate-700 text-slate-400 cursor-not-allowed"
//             }`}
//           >
//             Go to Next
//           </button>
//         </section>

//         {/* Quotation modal */}
//         {showQuotation && quotation && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <div className="bg-slate-900 text-slate-100 rounded-2xl max-w-2xl w-full p-6 border border-slate-700">
//               <h3 className="text-xl font-bold mb-3">Quotation Summary</h3>
//               <div className="text-sm text-slate-300 space-y-2 mb-4">
//                 <div>Technology: {techs.find((t) => t.id === tech)?.name}</div>
//                 <div>Material: {material?.name || "—"}</div>
//                 <div>Price per gram: {currentPricePerGram ? `₹${currentPricePerGram}/g` : "—"}</div>
//                 <div>Color: {color || "—"}</div>
//                 <div>File: {file ? file.name : "—"}</div>
//               </div>

//               <div className="mb-4">
//                 <label className="text-sm text-slate-400">Estimated Weight (grams)</label>
//                 <input
//                   type="number"
//                   min={0}
//                   value={estimatedWeight}
//                   onChange={(e) => setEstimatedWeight(Number(e.target.value) || 0)}
//                   className="mt-2 w-full p-2 rounded-md bg-slate-800 border border-slate-700 text-slate-100"
//                 />
//               </div>

//               <div className="text-right text-lg font-semibold">
//                 Total Price:{" "}
//                 {currentPricePerGram
//                   ? `₹${(estimatedWeight * currentPricePerGram).toFixed(2)}`
//                   : "—"}{" "}
//                 + 18% GST
//               </div>

//               <div className="mt-6 flex gap-3 justify-end">
//                 <button
//                   onClick={() => setShowQuotation(false)}
//                   className="px-4 py-2 rounded-md bg-slate-700 text-slate-200"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => {
//                     alert("Quotation saved/confirmed (placeholder)");
//                     setShowQuotation(false);
//                   }}
//                   className="px-4 py-2 rounded-md bg-white text-black font-medium"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
