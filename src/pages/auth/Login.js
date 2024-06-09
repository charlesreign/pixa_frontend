import { useState } from "react";
import styles from "./Auth.module.scss"
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { TOGGLE_AUTH_TOKEN, TOGGLE_TOKEN_TYPE, TOGGLE_USER_ID, TOGGLE_USERNAME } from "../../store/slice/authSlice";



const Login = () => {

    const dispatch = useDispatch();
    
    const [username, setUsernamee] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = (e) => {
        e.preventDefault();
    
        setIsLoading(true);

        let formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)

        const requestOptions = {
            method: 'POST',
            body: formData
        }

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'login', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            console.log(data);
            dispatch(TOGGLE_AUTH_TOKEN(data.access_token))
            dispatch(TOGGLE_TOKEN_TYPE(data.token_type))
            dispatch(TOGGLE_USER_ID(data.user_id))
            dispatch(TOGGLE_USERNAME(data.username))
            setIsLoading(false);
            window.location.replace(process.env.REACT_APP_FRONTEND_BASE_URL)
        })
        .catch(error => {
            console.log("An error has occurred, error=" +error.message+ ' data');
            setIsLoading(false);
            toast.error("An error has occurred, error=" +error.message+ ' data')
        })
    };


return (
    <>
        {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
            <img src={loginImg} alt="Login" width="400px" />
        </div>
        <Card>
            <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsernamee(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="--btn --btn-primary --btn-block">Login</button>
                <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
                </div>
            </form>
            <span className={styles.register}>
                <p>
                Don't have an account? <Link to="/register">Register</Link>
                </p>
            </span>
            </div>
        </Card>
        </section>
    </>
    );
};

export default Login;
