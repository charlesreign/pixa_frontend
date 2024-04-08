import { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const logo = (
    <div className={styles.logo}>
        <Link to="/"> 
            <h2>Insta<span>gram</span></h2>
        </Link>
    </div>
);


const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const logoutUser = () => {
        setIsLoading(true);

    };

    return (
        <>
        {isLoading && <Loader />}
        <header>
            <div className={styles.header}>
            {logo}
            <nav
                className={
                showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
                }
            >
                <div
                className={
                    showMenu
                    ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                    : `${"nav-wrapper"}`
                }
                onClick={hideMenu}
                ></div>

                <ul onClick={hideMenu}>
                <li className={styles["logo-mobile"]}>
                    <Link to="/">{logo}</Link>
                    <FaTimes size={22} color="#fff" onClick={hideMenu} />
                </li>
                <li>
                    <NavLink to="/" className={activeLink}>Home</NavLink>
                </li>
                </ul>
                <div className={styles["header-right"]} onClick={hideMenu}>
                <span className={styles.links}>
                    <NavLink to="/login" className={activeLink}>
                    Login
                    </NavLink>
                    <NavLink to="/register" className={activeLink}>
                    Register{" "}
                    </NavLink>
                    <NavLink to="/" onClick={logoutUser}>
                    logout
                    </NavLink>
                </span>
                </div>
            </nav>

            <div className={styles["menu-icon"]}>
                <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
            </div>
            </div>
        </header>
        </>
    );
    };

    export default Header;
