import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import PostCard from "../components/PostCard"

interface HomeProps {
  posts: Post[]
}

const Home: NextPage<HomeProps> = (props) => {

  const { posts } = props

  const postGrid = posts.map(post => <PostCard key={post.slug} {...post}></PostCard>)

  return (
    <div className={styles.container}>
      <Head>
        <title>izzymg.devblog</title>
        <meta name="description" content="Izzy MG's writings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Izzy MG&lsquo;s writings
        </h1>

        <p className={styles.description}>
          Here&lsquo;s where I work with Next.JS and sometimes write stuff. Check out my <a href="https://izzymg.dev">portfolio</a>!
        </p>

        <section className={styles.postGrid}>
          {postGrid}
        </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {

  const res = await fetch(`${process.env.API_URL}/posts`)
  const json = await res.json()
  const data = json

  const posts: Post[] = []

  for(const entry of data) {
    posts.push(
      entry as Post
    )
  }

  // reverse to display homepage posts newest -> oldest
  return {
    props: { posts: posts.reverse() }, 
  }
}

export default Home
