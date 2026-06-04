import { NewNoteValues } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initDraft: NewNoteValues = {
    title: "",
    content: "",
    tag: "Todo",
}

type NoteDraftStore = {
    draft: NewNoteValues;
    setDraft: (note: NewNoteValues) => void;
    clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
        (set) => ({
            draft: initDraft,
            setDraft: (note) => set(() => ({ draft: note })),
            clearDraft: () => set(() => ({ draft: initDraft })),
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({ draft: state.draft }),
        },
    ),
);
