import React, { useState } from "react";

export default function ChartPie({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
    percentage: string;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    label: "",
    value: 0,
    percentage: "",
    visible: false,
  });

  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let angle = 0;
  const cx = 50,
    cy = 50,
    r = 45;

  const slices = data.map((d) => {
    const portion = d.value / total;
    const startAngle = angle;
    const endAngle = angle + portion * Math.PI * 2;
    angle = endAngle;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const large = portion > 0.5 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;

    return {
      path,
      label: d.label,
      value: d.value,
      percentage: (portion * 100).toFixed(1) + "%",
    };
  });

  const colors = [
    "#60A5FA",
    "#34D399",
    "#F59E0B",
    "#F87171",
    "#A78BFA",
    "#F472B6",
    "#10B981",
    "#FBBF24",
  ];

  return (
    <div className="relative flex justify-center w-full">
      <svg
        viewBox="0 0 100 100"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square"
        onMouseLeave={() =>
          setTooltip((t) => ({
            ...t,
            visible: false,
          }))
        }>
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.path}
            fill={colors[i % colors.length]}
            onMouseMove={(e) => {
              const rect = (
                e.target as SVGElement
              ).ownerSVGElement!.getBoundingClientRect();
              setTooltip({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                label: s.label,
                value: s.value,
                percentage: s.percentage,
                visible: true,
              });
            }}
          />
        ))}
      </svg>

      {tooltip.visible && (
        <div
          className="absolute text-xs px-2 py-1 rounded shadow-lg pointer-events-none 
                     bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          style={{
            top: tooltip.y + 5,
            left: tooltip.x + 5,
          }}>
          {tooltip.label}: {tooltip.value} ({tooltip.percentage})
        </div>
      )}
    </div>
  );
}
