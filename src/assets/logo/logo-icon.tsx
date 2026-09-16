import React from "react";

export interface LogoIconProps extends React.SVGProps<SVGSVGElement> {}

export default function LogoIcon({ className, ...props }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="13" />
      <polygon points="16,6 24.66,11 24.66,21 16,26 7.34,21 7.34,11" />
      <circle cx="16" cy="16" r="4" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}
