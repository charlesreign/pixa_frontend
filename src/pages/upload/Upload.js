import { useState } from "react";
import styles from "../../pages/auth/Auth.module.scss"
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadSharp } from "react-icons/io5";
import Loader from "../../components/loader/Loader";


const Upload = () => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    // access token from windows local storage
    const authToken = window.localStorage.getItem("authToken");
    const authTokenType = window.localStorage.getItem("authTokenType");
    const authUserId = window.localStorage.getItem("userId");

    const handleUpload = (e) => {
        e.preventDefault();

        let formData = new FormData()
        formData.append("image", image)

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': authTokenType + ' ' + authToken
            }),
            body: formData
        }

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'post/image', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            console.log(data);
            createPost(data.filename)
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setCaption('')
            setImage(null)
            document.getElementById('fileInput').value = null
        })
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const createPost = (image_url) => {
        setIsLoading(true);
        const json_string = JSON.stringify({
            "image_url": image_url,
            "image_url_type": "relative",
            "caption": caption,
            "creator_id": authUserId
        })
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': authTokenType + ' ' + authToken,
                'Content-Type': 'application/json'
            }),
            body: json_string
        }

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'post/create', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            window.location.replace(process.env.REACT_APP_FRONTEND_BASE_URL)
            window.scrollTo(0,0)
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
            toast.error(error)
        })
        
    }

    return (
        <>
        {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                <h2>Upload image</h2>
                <form onSubmit={handleUpload}>
                    <input
                    type="file"
                    required
                    id="fileInput"
                    onChange={handleChange}
                    />
                    <input
                    type="text"
                    placeholder="Caption"
                    required
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    />
                    <button className="--btn --btn-primary --btn-block"><IoCloudUploadSharp/> &nbsp;upload</button>
                    
                </form>
                
                </div>
            </Card>
        </section>
        </>
        
    )
}

export default Upload
