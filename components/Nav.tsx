import Link from "next/link"
import styles from "../styles/Nav.module.css"

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <a href="https://izzymg.dev">Portfolio</a>
        </nav>
    )
}

export default Nav