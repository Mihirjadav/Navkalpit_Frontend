import React, { useState } from "react";

export default function Cart() {
  return (
    <section className="relative w-full min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-black overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="flex justify-center items-center">
        <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-semibold">
          No items in cart
        </h1>
      </div>
    </section>
  );
}
