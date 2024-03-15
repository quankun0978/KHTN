import React from 'react';

function IconDropdown({ width = 12, height = 8 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.36605 7.72701L0.264458 2.46079C-0.0881526 2.09681 -0.0881526 1.50823 0.264458 1.14811L1.11222 0.272991C1.46483 -0.0909971 2.03501 -0.0909971 2.38387 0.272991L6 4.00581L9.61613 0.272991C9.96874 -0.0909971 10.5389 -0.0909971 10.8878 0.272991L11.7355 1.14811C12.0882 1.5121 12.0882 2.10068 11.7355 2.46079L6.63395 7.72701C6.28884 8.091 5.71866 8.091 5.36605 7.72701Z"
        fill="#94A3B8"
      />
    </svg>
  );
}

export default IconDropdown;
