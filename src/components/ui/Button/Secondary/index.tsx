import React from "react";

const index = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`bg-white border hover:bg-slate-50 text-black w-full flex items-center justify-center p-2 rounded-md ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default index;
