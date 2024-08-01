import React from "react";

const SecondaryButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`bg-[var(--color-secondary)] hover:bg-[var(--color-primary-light)] text-[var(--color-primary)] w-full flex items-center justify-center py-2 px-4 rounded transition-all duration-[var(--transition-speed)] ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;
