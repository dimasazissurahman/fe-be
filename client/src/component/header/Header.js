import { useContext } from "react";
import Loading from "../loading/loadingPage";
import { AppContext } from "../provider/Provider";
import styles from "./Header.module.css";

export const Header = () => {
    const { userData, setUserData } = useContext(AppContext);
    if (userData.length === 0) {
        return <Loading />
    }
    return (
        <header className={`${styles["header_logo"]} + ${styles["font_title"]}`}>
            <h1>University List App</h1>
            <div className={`${styles["sub_menu"]} + ${styles["mid"]}`}>
                <p onClick={() => { window.location.href = '/' }}>Home</p>
                <p onClick={() => { window.location.href = '/subscribe' }}>Subscribe</p>
            </div>
            {userData ?
                <div className={`${styles["sub_menu"]}`}>
                    <div className={styles["box_button"]} onClick={() => { window.location.href = "/profile" }} >
                        <p>Hi, {userData[0].fname}</p>
                    </div>
                    <p onClick={() => { window.location.href = '/auth/page=login' }}>Logout</p>
                </div>
                :
                <div className={`${styles["sub_menu"]}`}>
                    <p onClick={() => { window.location.href = '/auth/page=login' }}>Login</p>
                    <div className={styles["box_button"]} onClick={() => { window.location.href = '/auth/page=register' }}>
                        <p>Register</p>
                    </div>
                </div>
            }
        </header>
    )
}