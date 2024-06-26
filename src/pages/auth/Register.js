import React, { useState } from "react";
import styles from "./Auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const Register = () => {
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [cPassword, setCPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);

const registerUser = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const json_string = JSON.stringify({
        username: username,
        email: email,
        password: password
    })

    const requestOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: json_string
    }

    fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'user/create', requestOption)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw response
    })
    .then(data => {
        setIsLoading(false);
        console.log(data);
        window.location.replace(process.env.REACT_APP_FRONTEND_BASE_URL+'login')
    })
    .catch(error => {
        console.log("An error has occurred, error=" +error.message);
        setIsLoading(false);
        toast.error("An error has occurred, error=" +error.message+ ' data')
    })
}


return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
        <Card>
        <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
            />
            <button className="--btn --btn-primary --btn-block" type="submit">
                Register
            </button>
            </form>
            <span className={styles.register}>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            </span>
        </div>
        </Card>
        <div className={styles.img}>
        <img src={registerImg} alt="Register" width="400px" />
        </div>
    </section>
    </>
);
};

export default Register;
