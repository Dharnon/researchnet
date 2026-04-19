"use client";

import { useState } from "react";
import AvatarLib, { genConfig } from "react-nice-avatar";

export function Avatar({ seed, size = 52 }: { seed: string; size?: number }) {
  const [config] = useState(() => genConfig(seed));
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
      <AvatarLib {...config} style={{ width: size, height: size }} />
    </div>
  );
}
