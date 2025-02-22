"use client";

import { useQuery } from "@tanstack/react-query";
import { getOnlyNote, type GetNoteResponse } from "../../actions/note";

interface INoteId {
  noteId: number | null;
}

const ShowNote: React.FC<INoteId> = ({ noteId }) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<GetNoteResponse | null>({
    queryKey: ["note", noteId],
    queryFn: () => getOnlyNote(noteId!),
    enabled: !!noteId,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar a nota.</div>;

  return (
    <div className="p-8 overflow-y-auto h-full">
      {note ? (
        <div>
          <h3 className="text-center my-6 font-bold text-2xl">
            {note.getNote.title}
          </h3>
          <p className=" break-words">{note.getNote.description}</p>
        </div>
      ) : (
        <p>Nenhuma nota selecionada.</p>
      )}
    </div>
  );
};

export default ShowNote;
