import styles from '../styles/Home.module.css'

const PostCard = ({ title, slug, date, }: Post) => {

    const url = `/post/${slug}/`
    return (
        <div className={styles.postCard}>
            <a href={url} className={styles.postTitle}><h2>{title}</h2></a>
            <span className={styles.postDate}>{date}</span>
        </div>
    )
}

export default PostCard