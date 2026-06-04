import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Notehub - Create Note`,
  description: "Create a new note on NoteHub",
  openGraph: {
    title: `Notehub`,
    description: "Create new note",
    url: `https://notehub.com/action/create`,
    siteName: 'NoteHub',
    images: [{
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },],
      type: 'website',
  },
}

const CreateNote = async () => {
	
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;