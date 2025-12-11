import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function Shop({ onAddToCart } = {}) {
  const sampleProducts = [
    {
      id: 1,
      title: "Ram Mandir 3D Model",
      price: 1499,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 2,
      title: "Ram Mandir",
      price: 999,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 3,
      title: "Smart Phone Stand",
      price: 3499,
      img: "/shop/mobile-stand.png",
    },
    {
      id: 4,
      title: "Mobile Phone Stands",
      price: 7999,
      img: "/shop/mobile-stans.png",
    },
    {
      id: 5,
      title: "Ram Mandir 3D Model",
      price: 1499,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 6,
      title: "Ram Mandir",
      price: 999,
      img: "/shop/Ram-mandir.png",
    },
    {
      id: 7,
      title: "Smart Phone Stand",
      price: 3499,
      img: "/shop/mobile-stand.png",
    },
    {
      id: 8,
      title: "Mobile Phone Stands",
      price: 7999,
      img: "/shop/mobile-stans.png",
    },
  ];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [visibleImage, setVisibleImage] = useState(null); // product id of modal

  // Cart state (local to this page). Each item: { product, qty }
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // categories derived
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(sampleProducts.map((p) => p.category))),
    ],
    []
  );

  // filtered + sorted list
  const filtered = useMemo(() => {
    let items = sampleProducts.filter((p) => {
      const matchQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === "All" ? true : p.category === category;
      return matchQuery && matchCategory;
    });

    if (sort === "price-low") items = items.sort((a, b) => a.price - b.price);
    else if (sort === "price-high")
      items = items.sort((a, b) => b.price - a.price);
    // "popular" - keep original order

    return items;
  }, [query, category, sort]);

  const openLightbox = (productId) => setVisibleImage(productId);
  const closeLightbox = () => setVisibleImage(null);

  const currentIndex = visibleImage
    ? filtered.findIndex((p) => p.id === visibleImage)
    : -1;

  const showNext = () => {
    if (currentIndex === -1) return;
    const next = filtered[(currentIndex + 1) % filtered.length];
    setVisibleImage(next.id);
  };

  const showPrev = () => {
    if (currentIndex === -1) return;
    const prev =
      filtered[(currentIndex - 1 + filtered.length) % filtered.length];
    setVisibleImage(prev.id);
  };

  // CART helpers
  const findCartIndex = (productId) =>
    cartItems.findIndex((ci) => ci.product.id === productId);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx === -1) return [...prev, { product, qty }];
      // already in cart -> increase qty
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
      return copy;
    });

    // open sidebar when adding
    setCartOpen(true);

    // external callback
    if (typeof onAddToCart === "function") onAddToCart(product);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty } : i))
    );
  };

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.product.price, 0);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-black text-white py-12 sm:py-16 md:py-20">
      <section className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
            Shop
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Browse our premium 3D printed products
          </p>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm sm:text-base"
          />

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm sm:text-base"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm sm:text-base"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-2xl p-3 sm:p-4 hover:border-slate-600 transition-all"
              >
                <div className="relative group">
                  <button
                    onClick={() => openLightbox(product.id)}
                    className="w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-900 flex items-center justify-center h-40 sm:h-48 md:h-56"
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </button>

                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 hidden group-hover:flex">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-2 sm:px-3 py-1 rounded-full bg-emerald-600 text-white text-xs sm:text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-white">
                      {product.title}
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">
                    ₹{product.price}
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-slate-600 text-slate-300 hover:text-white transition flex-1 text-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition flex-1"
                  >
                    Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox modal */}
      {visibleImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 sm:p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-slate-800 border border-slate-700 rounded-lg sm:rounded-2xl overflow-hidden">
              <div className="relative">
                <button
                  onClick={closeLightbox}
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-slate-900/80 hover:bg-slate-900 rounded-full p-1.5 sm:p-2 z-10"
                >
                  ✕
                </button>
                <button
                  onClick={showPrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 rounded-full p-1.5 sm:p-2"
                >
                  ‹
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 rounded-full p-1.5 sm:p-2"
                >
                  ›
                </button>

                <div className="w-full bg-slate-900 flex items-center justify-center min-h-48 sm:min-h-80">
                  {(() => {
                    const product =
                      filtered.find((p) => p.id === visibleImage) ||
                      sampleProducts.find((p) => p.id === visibleImage);
                    return (
                      <img
                        src={product?.img || "/images/placeholder.png"}
                        alt={product?.title}
                        className="max-h-[60vh] object-contain w-full"
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.png";
                        }}
                      />
                    );
                  })()}
                </div>

                <div className="p-3 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 border-b border-slate-700">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {filtered.find((p) => p.id === visibleImage)?.title}
                    </h3>
                  </div>
                  <div className="text-lg sm:text-xl font-bold">
                    ₹{filtered.find((p) => p.id === visibleImage)?.price}
                  </div>
                </div>

                <div className="p-3 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() =>
                      addToCart(
                        filtered.find((p) => p.id === visibleImage),
                        1
                      )
                    }
                    className="px-3 sm:px-4 py-2 sm:py-2 rounded-lg bg-emerald-600 text-white text-sm sm:text-base hover:bg-emerald-700 transition"
                  >
                    Add to cart
                  </button>
                  <Link
                    to={`/product/${visibleImage}`}
                    className="px-3 sm:px-4 py-2 sm:py-2 rounded-lg border border-slate-600 text-white text-sm sm:text-base text-center hover:border-slate-500 transition"
                  >
                    Product page
                  </Link>
                  <button
                    onClick={closeLightbox}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white transition sm:ml-auto"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-slate-800 border-l border-slate-700 flex flex-col">
          <div className="p-4 sm:p-6 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Your Cart
            </h3>
            <button
              onClick={() => setCartOpen(false)}
              className="px-2 sm:px-3 py-1 sm:py-2 rounded bg-slate-700 hover:bg-slate-600 transition text-sm sm:text-base"
            >
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-6 flex-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="text-center text-slate-400 py-20">
                Your cart is empty.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map(({ product, qty }) => (
                  <div
                    key={product.id}
                    className="flex items-start gap-3 p-2 sm:p-3 bg-slate-700/50 rounded-lg"
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-14 sm:w-16 h-14 sm:h-16 object-cover rounded-lg flex-shrink-0"
                      onError={(e) =>
                        (e.currentTarget.src = "/images/placeholder.png")
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium text-white truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        ₹{product.price} each
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded border border-slate-600 text-sm text-slate-300 hover:text-white"
                        >
                          −
                        </button>
                        <input
                          value={qty}
                          onChange={(e) => {
                            const val = parseInt(e.target.value || "0", 10);
                            if (!isNaN(val) && val >= 1)
                              updateQty(product.id, val);
                          }}
                          className="w-10 text-center rounded border border-slate-600 bg-slate-700 text-white text-sm px-1"
                        />
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded border border-slate-600 text-sm text-slate-300 hover:text-white"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="ml-auto text-xs text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 border-t border-slate-700 bg-slate-900">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-sm text-slate-400">Subtotal</span>
              <span className="font-semibold text-lg">₹{cartTotal}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 sm:py-3 rounded-lg bg-emerald-600 text-white text-sm sm:text-base hover:bg-emerald-700 transition font-semibold">
                Checkout
              </button>
              <button
                onClick={() => {
                  setCartItems([]);
                  setCartOpen(false);
                }}
                className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-slate-600 text-slate-300 text-sm sm:text-base hover:text-white transition"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
