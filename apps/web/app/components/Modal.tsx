"use client";

import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { addNote } from "../actions/note";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    await addNote(title, description);
    onNoteAdded();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-zinc-800 w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-zinc-700 p-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Write Note</h1>
          <button
            className="hover:bg-zinc-700 p-2 rounded-lg transition-colors"
            onClick={onClose}
          >
            <IoCloseSharp size={24} className="text-red-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              className="text-white text-sm font-medium block"
              htmlFor="title"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none"
              placeholder="Enter the title of your note..."
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-white text-sm font-medium block"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              name="description"
              rows={8}
              className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none"
              placeholder="Enter the content of your note..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-gradient-to-r from-sky-700 to-purple-900 text-white rounded-lg"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
