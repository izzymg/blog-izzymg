import styles from '../styles/PostCard.module.css'

const PostCard = ({ title, slug, date, desc, }: Post) => {

    const url = `/post/${slug}/`
    return (
        <div className={styles.postCard}>
            <span className={styles.postDate}>{date}</span>
            <a href={url} className={styles.postTitle}><h2>{title}</h2></a>
            <p>{desc}</p>
            <a className={styles.cta} href={url}>View Post</a>
        </div>
    )
}

export default PostCard