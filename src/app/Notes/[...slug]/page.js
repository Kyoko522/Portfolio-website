import { getNote, getNotesInFolder, getAllNoteSlugs } from '@/lib/getMarkdownNote'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = getAllNoteSlugs()
  return slugs.map(slugArray => ({ slug: slugArray }))
}

export default async function NotePage({ params }) {
  const slugArray = params.slug || []
  const slugPath = slugArray.join('/')

  try {
    const note = await getNote(slugPath)
    return (
      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <article className="prose" dangerouslySetInnerHTML={{ __html: note.contentHtml }} />
      </main>
    )
  } catch (e) {
    // If note not found, maybe it's a folder
    const notes = getNotesInFolder(slugPath)
    if (notes.length === 0) return notFound()

    return (
      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Folder: {slugPath || 'notes'}</h1>
        <ul className="list-disc pl-5">
          {notes.map((note) => (
            <li key={note}>
              <Link href={`/Notes/${slugPath}/${note}`} className="text-blue-600 hover:underline">
                {note}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    )
  }
}