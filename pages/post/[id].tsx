import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import ReactMarkdown from "react-markdown";

import styles from "../../styles/[id].module.css"

import { openAllMd, openMd, Post } from "../../lib";
import Head from "next/head";

interface PostProps {
    post: Post
}

const Post: NextPage<PostProps> = (props) => {

    const { post } = props

    const transformImageUri = (src: string, alt: string, title: string | null): string => {
        return `${process.env.API_URL}${src}`
    }

    const metaTitle = `${post.title} - izzymg.deblog`

    return (
        <div className={styles.container}>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={post.desc} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.desc}>{post.desc}</p>
                </header>
                <article className={styles.article}>
                    <span className={styles.date}>{post.date}</span>
                    <ReactMarkdown transformImageUri={transformImageUri}>
                        {post.content}
                    </ReactMarkdown>
                </article>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {

    if (!params) {
        throw 404
    }

    const post = await openMd(params["id"] as string)

    return {
        props: { post },
    }
}

export async function getStaticPaths() {

    const posts = await openAllMd()

    return {
        paths: posts.map(post => ({ params: { id: post.slug } })),
        fallback: false
    }
}

export default Post