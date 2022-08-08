import { GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, NextPage } from "next";

interface PostProps {
    post: Post
}

const Post: NextPage<PostProps> = (props) => {

    const { post } = props

    return (
        <main>
            <header>
                <h1>{post.title}</h1>
                <span>{post.date}</span>
            </header>

            <article>
                {post.content}
            </article>
        </main>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {

    if(!params) {
        throw 404
    }

    const res = await fetch(`${process.env.API_URL}/posts/?slug=${params["id"]}`)
    const data = await res.json()
    const post: Post = data["0"]

    return {
        props: { post },
    }
}

export async function getStaticPaths() {

    const res = await fetch(`${process.env.API_URL}/posts`)
    const json = await res.json()
    const data = json
  
    const posts: Post[] = []
  
    for(const entry of data) {
      posts.push(
        entry as Post
      )
    }
  

    return {
        paths: posts.map(post => ({ params: { id: post.slug } })),
        fallback: false
    }
}

export default Post