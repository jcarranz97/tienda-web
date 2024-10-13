import React from 'react';

interface TicketIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const TicketIcon: React.FC<TicketIconProps> = ({
  width = 24,
  height = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 10V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 1 0-4ZM5 5h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2Zm8 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        fill={color}
      />
    </svg>
  );
};