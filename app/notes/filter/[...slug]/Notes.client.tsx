'use client';

import css from './NotesPage.module.css';
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { getNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSetQuery = useDebouncedCallback((search: string) => {
    setQuery(search);
    setCurrentPage(1);
  }, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", query, currentPage, tag],
    queryFn: () => getNotes({
                        search: query,
                        page: currentPage,
                        tag: tag,
                    }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={debouncedSetQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => router.push("/notes/action/create")}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}