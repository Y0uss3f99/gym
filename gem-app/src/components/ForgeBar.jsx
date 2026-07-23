import React from 'react'
export const DAILY_GOAL_KG = 6000;
 
export default function ForgeBar({ volume }) {
  const pct = Math.min(100, Math.round((volume / DAILY_GOAL_KG) * 100));
  const plateCount = Math.min(10, Math.round(pct / 10));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <div style={{ width: 14, height: 34, background: "#8a8783", borderRadius: 2 }} />
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: i < plateCount ? 46 : 22,
              background: i < plateCount ? "#E2572B" : "#3a3733",
              borderRadius: 2,
              transition: "height 300ms ease, background 300ms ease",
            }}
          />
        ))}
        <div style={{ flex: 1, height: 6, background: "#3a3733", borderRadius: 3 }} />
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#c9c5bd" }}>
        {pct}% of {DAILY_GOAL_KG.toLocaleString()}kg daily forge goal
      </span>
    </div>
  );
}