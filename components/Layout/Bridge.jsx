"use client";

import React from "react";

export default function GradientSection({
  from = "#000000",   // لون البداية
  bridge = "#4A2A1F", // لون البريدج (الوسيط)
  to = "#FC873E",     // لون النهاية
  children,
}) {
  return (
    <section
      className="w-full flex items-center justify-center h-8"
      style={{
        background: `linear-gradient(to bottom, ${from}, ${bridge}, ${to})`,
      }}
    >
      {children}
    </section>
  );
}
