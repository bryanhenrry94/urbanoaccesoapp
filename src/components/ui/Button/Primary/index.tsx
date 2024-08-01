import React from "react";

const PrimaryButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white w-full flex items-center justify-center py-2 px-4 rounded transition-all duration-[var(--transition-speed)] ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
