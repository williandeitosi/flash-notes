interface CardProps {
  title: string;
  description: string;
  onClick: (id: number) => void;
  id: number;
}

const Card: React.FC<CardProps> = ({ id, title, description, onClick }) => {
  return (
    <div
      onClick={() => onClick(id)}
      className=" bg-gray-300 w-[90%] mx-auto rounded-lg text-black p-2 flex flex-col gap-2 "
    >
      <h3 className="text-xl font-bold truncate">{title}</h3>
      <p className="break-words line-clamp-4">{description}</p>
    </div>
  );
};

export default Card;
