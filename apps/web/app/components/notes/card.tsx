interface CardProps {
  id: number;
  title: string;
  description: string;
  onClick: (id: number) => void;
}

const Card = ({ title, description, onClick, id }: CardProps) => {
  return (
    <div
      onClick={onClick ? () => onClick(id) : undefined}
      className=" bg-gray-300 w-[90%] mx-auto rounded-lg text-black p-2 flex flex-col gap-2 "
    >
      <h3 className="font-semibold truncate">{title}</h3>
      <p className="truncate">{description}</p>
    </div>
  );
};

export default Card;
