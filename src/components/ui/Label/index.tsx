import React, { ReactNode } from "react";

interface Label {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

const index = ({ htmlFor, children, className }: Label) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

export default index;
