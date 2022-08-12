// Markdown + metadata parser

import { promises as fs } from "fs"
import path from "path"

export interface Post {
    slug: string
    title: string
    date: string
    desc: string
    content: string
}

export const openMd = async (slug: string): Promise<Post> => {
    const meta: any = {}
    try {
        const handle = await fs.open(path.join("./blog", `${slug}.md`))
        // drop first 5 bytes for ---\n
        const buffer = ((await handle.readFile({ encoding: "utf-8" })).replaceAll('\r\n', '\n')).slice(4)

        buffer.slice(0, buffer.indexOf('\n-')).split('\n').forEach(v => {
            const r = v.split(':')
            meta[r[0]] = r[1].trim().replace(/\"+/g, "")
        })

        await handle.close()
        return { ...meta, slug, content: buffer.slice(buffer.lastIndexOf('---\n')) }

    } catch (e) {
        throw `failed to open markdown post: ${e}`
    }
}

export const openAllMd = async (): Promise<Post[]> => {
    const dirHandle = await fs.opendir("./blog/")

    let posts: Post[] = []

    try {

        let dirent = await dirHandle.read()
        while (dirent != null) {
            const slug = path.basename(dirent.name, ".md")
            posts.push((await openMd(slug)))
            dirent = await dirHandle.read()
        }

    } catch (e) {
        throw `failed to index all markdown posts: ${e}`
    } finally {
        await dirHandle.close()
    }

    return posts
}