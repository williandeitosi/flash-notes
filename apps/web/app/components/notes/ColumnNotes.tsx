"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getNotes } from "../../actions/note";
import Button from "../Button";
import Modal from "../Modal";
import Card from "../card";

interface ColumnNotesProps {
  onSelectedNote: (id: number) => void;
}

const ColumnNotes: React.FC<ColumnNotesProps> = ({ onSelectedNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: notes = [], refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleNoteId = (id: number) => {
    onSelectedNote(id);
  };

  return (
    <div className="col-span-3 border-purple-900 border-r-2 overflow-hidden rounded-lg flex flex-col">
      <div className="flex gap-2 items-center justify-center mb-4">
        <h2 className="text-purple-900 text-3xl">Notes</h2>
        <div className="bg-zinc-800 rounded-full w-1/2 h-10 flex items-center justify-center cursor-pointer">
          <FaSearch size={20} className="text-purple-900" />
        </div>
      </div>

      <div className="h-full overflow-y-auto flex flex-col gap-2">
        {notes.map((note, index) => (
          <Card
            onClick={handleNoteId}
            id={note.id}
            key={note.id}
            title={note.title}
            description={note.description}
          />
        ))}
      </div>

      <Button onClick={toggleModal} />
      <Modal isOpen={isModalOpen} onClose={toggleModal} onNoteAdded={refetch} />
    </div>
  );
};

export default ColumnNotes;
