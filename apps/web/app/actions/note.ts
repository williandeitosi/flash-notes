"use server";
import axios from "axios";

export interface Note {
  id: number;
  title: string;
  description: string;
  createAt: string;
  updateAt: string;
  userId: number;
}

export interface GetNoteResponse {
  getNote: Note;
}

export async function getNotes() {
  try {
    const response = await axios.get<{
      allNote: { title: string; description: string; id: number }[];
    }>("http://localhost:3333/user/1/notes");
    return response.data.allNote;
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    return [];
  }
}

export async function getOnlyNote(id: number): Promise<GetNoteResponse | null> {
  try {
    const response = await axios.get<GetNoteResponse>(
      `http://localhost:3333/user/1/notes/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar nota:", error);
    return null;
  }
}

export async function addNote(title: string, description: string) {
  try {
    await axios.post("http://localhost:3333/user/1/new-note", {
      title,
      description,
    });
  } catch (error) {
    console.error("Erro ao adicionar nota:", error);
  }
}
