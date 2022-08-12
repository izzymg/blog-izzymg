import styles from "../styles/Nav.module.css"

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <a href="/">Home</a>
            <a href="https://izzymg.dev">Portfolio</a>
        </nav>
    )
}

export default Nav