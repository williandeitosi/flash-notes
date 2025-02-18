"use client";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer mt-2 font-bold bg-gradient-to-r from-sky-700 to-purple-900 p-2 rounded-lg w-[90%] mx-auto"
    >
      +
    </button>
  );
};

export default Button;
