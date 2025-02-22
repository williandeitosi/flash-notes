"use server";

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
    const response = await fetch("http://localhost:3333/user/1/notes", {
      next: { revalidate: 10 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const data = await response.json();
    return data.allNote || [];
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    return [];
  }
}

export async function getOnlyNote(id: number): Promise<GetNoteResponse | null> {
  try {
    const response = await fetch(`http://localhost:3333/user/1/notes/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao buscar nota:", error);
    return null;
  }
}

export async function addNote(title: string, description: string) {
  try {
    const response = await fetch("http://localhost:3333/user/1/new-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to add note");
    }

    getNotes();
    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar nota:", error);
    throw new Error("Failed to add note");
  }
}
