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

  let note = null
  try {
    note = await getNote(slugPath)
  } catch (e) {
    // note not found, will fall through to folder view
  }

  if (note) {
    return (
      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <article className="prose" dangerouslySetInnerHTML={{ __html: note.contentHtml }} />
      </main>
    )
  }

  const notes = getNotesInFolder(slugPath)
  if (notes.length === 0) return notFound()

  return (
    <main className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Folder: {slugPath || 'notes'}</h1>
      <ul className="list-disc pl-5">
        {notes.map((n) => (
          <li key={n.slug}>
            <Link href={`/Notes/${slugPath}/${n.slug}`} className="text-blue-600 hover:underline">
              {n.isFolder ? `📁 ${n.name}` : n.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}