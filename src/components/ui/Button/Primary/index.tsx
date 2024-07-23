import React from "react";

const index = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`bg-black border hover:bg-gray-800 text-white w-full flex items-center justify-center p-2 rounded-md ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default index;
