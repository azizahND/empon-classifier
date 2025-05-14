import React from "react";

const Button = ({ label, children, onClick, type = "button", className, variant = "green", ikon }) => {
  const variantClasses = {
    green: "bg-green border-2 border-green hover:bg-white hover:text-green hover:border-green font-medium",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-bold  transition ${variantClasses[variant]} ${className}`}
    >
      {ikon && <span className="text-lg">{ikon}</span>}
      {children || label}
    </button>
  );
};

export default Button;
