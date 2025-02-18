"use server";
import axios from "axios";

export async function getNotes() {
  try {
    const response = await axios.get<{
      allNote: { title: string; description: string }[];
    }>("http://localhost:3333/user/1/notes");
    return response.data.allNote;
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    return [];
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
