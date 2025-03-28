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
  } catch (err) {
    const items = getNotesInFolder(slugPath)
    if (!items || items.length === 0) return notFound()

    const basePath = slugArray.join('/')

    return (
      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Folder: {slugArray.length > 0 ? slugArray[slugArray.length - 1] : 'Notes'}
        </h1>
        <ul className="list-disc pl-5 space-y-2">
          {items.map(item => {
            const href = `/Notes/${basePath ? `${basePath}/` : ''}${item.slug}`
            return (
              <li key={item.slug}>
                <Link href={href} className="text-blue-600 hover:underline">
                  {item.isFolder ? `📁 ${item.name}` : `📄 ${item.name}`}
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
    )
  }
}