import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { getNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] && slug[0] !== "all" ? slug[0] : "all";
  return {
    title: `Notes: ${tag}`,
    description: `Notes filtered by ${tag}`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `Notes filtered by ${tag}`,
      url: `https://notehub.com/notes/${tag}`,
      siteName: 'NoteHub',
      images: [{
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag,
        },],
        type: 'website',
    },
  }
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] && slug[0] !== "all" ? slug[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => getNotes({
      search: "",
      page: 1,
      tag: tag,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
