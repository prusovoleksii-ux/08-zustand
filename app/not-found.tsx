import { Metadata } from 'next';
import css from './Home.module.css'

export const metadata: Metadata = {
  title: `Page Not Found`,
  description: "The page you're looking for doesn't exist",
  openGraph: {
    title: `NoteHub - Not Found`,
    description: "The page you're looking for doesn't exist on NoteHub",
    url: `https://notehub.com/`,
    siteName: 'NoteHub',
    images: [{
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },],
      type: 'article',
  },
}

const NotFound = () => {

    return (    
        <>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    )
}

export default NotFound;