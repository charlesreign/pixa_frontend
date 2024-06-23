import { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { TOGGLE_AUTH_TOKEN, TOGGLE_TOKEN_TYPE, TOGGLE_USER_ID, TOGGLE_USERNAME } from "../../store/slice/authSlice";

const logo = (
    <div className={styles.logo}>
        <Link to="/"> 
            <h2>Pixa<span>gram</span></h2>
        </Link>
    </div>
);


const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading] = useState(false);

    const dispatch = useDispatch();
    
    // access auth token from redux store
    const isAuthToken = window.localStorage.getItem("authToken");

    // console.log("this is auth token="+isAuthToken)

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };

    const logoutUser = () => {
        dispatch(TOGGLE_AUTH_TOKEN(null))
        dispatch(TOGGLE_TOKEN_TYPE(null))
        dispatch(TOGGLE_USER_ID(null))
        dispatch(TOGGLE_USERNAME(null))

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
                    {logo}
                    <FaTimes size={22} color="#fff" onClick={hideMenu} />
                </li>
                <li>
                    <NavLink to="/" className={activeLink}>Home</NavLink>
                </li>
                </ul>
                <div className={styles["header-right"]} onClick={hideMenu}>
                <span className={styles.links}>
                    { isAuthToken ? (
                        <NavLink to="/" onClick={logoutUser}>logout</NavLink>
                    ):
                    (
                        <>
                        <NavLink to="/login" className={activeLink}>Login</NavLink>
                        <NavLink to="/register" className={activeLink}>Register{" "}</NavLink>
                        </>
                    )
                    
                    }
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
