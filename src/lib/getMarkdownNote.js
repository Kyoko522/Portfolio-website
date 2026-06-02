import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'

const notesDir = path.join(process.cwd(), 'src/notes')

function slugify(text) {
  return text
    .replace(/[',;()\\]/g, '')
    .replace(/\s+/g, '-')
}

function unslugify(text) {
  return text.replace(/-/g, ' ')
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walkDir(fullPath, fileList)
    } else if (file.endsWith('.md')) {
      const relativePath = path.relative(notesDir, fullPath)
      const slugArray = relativePath
        .replace(/\.md$/, '')
        .split(path.sep)
        .map(slugify)
      fileList.push(slugArray)
    }
  })

  return fileList
}

export function getAllNoteSlugs() {
  return walkDir(notesDir)
}

export async function getNote(slugPath) {
  const slugParts = slugPath.split('/')
  let currentDir = notesDir

  for (let i = 0; i < slugParts.length; i++) {
    const isLast = i === slugParts.length - 1
    const slugPart = slugParts[i]

    const entries = fs.readdirSync(currentDir)

    const match = entries.find(entry => {
      const name = isLast ? entry.replace(/\.md$/, '') : entry
      return slugify(name) === slugPart
    })

    if (!match) {
      throw new Error(`Not found: ${slugPath}`)
    }

    currentDir = path.join(currentDir, match)
  }

  const fullPath = currentDir.endsWith('.md') ? currentDir : `${currentDir}.md`

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Note not found: ${slugPath}`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    title: data.title || path.basename(fullPath, '.md'),
    contentHtml,
  }
}

export function getNotesInFolder(folderSlug) {
    const realPath = folderSlug
      ? folderSlug.split('/').map(part => part.replace(/-/g, ' ')).join('/')
      : ''
  
    const folderPath = path.join(notesDir, realPath)
  
    if (!fs.existsSync(folderPath)) {
      return []
    }
  
    const items = fs.readdirSync(folderPath)
  
    return items.map(item => {
      const fullPath = path.join(folderPath, item)
      const stat = fs.statSync(fullPath)
      const isFolder = stat.isDirectory()
      const name = item.replace(/\.md$/, '')
      const slug = isFolder ? name : slugify(name)
  
      return {
        name,
        slug,
        isFolder
      }
    })
  }