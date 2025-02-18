"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getNotes } from "../actions/note";
import Button from "./Button";
import Modal from "./Modal";
import Card from "./card";

const ColumnNotes = () => {
  const [notes, setNotes] = useState<{ title: string; description: string }[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchData();
  }, []);

  const handleNoteAdded = async () => {
    const updatedNotes = await getNotes();
    setNotes(updatedNotes);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); // Abre ou fecha o modal
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
          <Card key={index} title={note.title} description={note.description} />
        ))}
      </div>

      <Button onClick={toggleModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onNoteAdded={handleNoteAdded}
      />
    </div>
  );
};

export default ColumnNotes;
