import React from "react";

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${disabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                } ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
