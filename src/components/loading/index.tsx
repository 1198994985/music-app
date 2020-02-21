import React, { useState } from "react";
import "./index.scss";

export interface IPLoading {
  isLoading?: boolean;
  className?: string;
  dur?: number;
  color?: string;
  size?:"small" | "middle" |"big"
}
const Loading: React.FC<IPLoading> = ({
  isLoading = true,
  className,
  dur = 0.7,
  color = "#F73A3A",
  size="middle"
}) => {
  if (!isLoading) {
    return null;
  }
  return (
    <svg
      viewBox="0 0 32 32"
      fill={color}
      className={`icon-loading-${size} ` + className}
    >
      <circle cx="16" cy="3" r="0" fillOpacity=".1">
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin="0"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(45 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity=".2"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.125 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(90 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity=".3"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.25 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(135 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity=".4"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.375 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(180 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity=".5"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.5 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(225 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity=".6"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.625 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(270 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity=".7"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.75 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(315 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity=".8"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.875 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
      <circle
        transform="rotate(180 16 16)"
        cx="16"
        cy="3"
        r="0"
        fillOpacity="0.9"
      >
        <animate
          attributeName="r"
          values="0;3;0;0"
          dur={dur}
          repeatCount="indefinite"
          begin={0.5 * dur}
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          calcMode="spline"
        />
      </circle>
    </svg>
  );
};

export default Loading;
