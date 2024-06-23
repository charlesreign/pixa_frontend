import React, { useEffect, useState } from 'react'
import styles from "./Post.module.css"
import { FiUser } from "react-icons/fi";

const PostList = ({ post }) => {
    const [imageUrl, setImageUrl] = useState('')
    const [comments, setcomments] = useState([])
    const [newComment, setNewComment] = useState('')

    // access token from windows local storage
    const authToken = window.localStorage.getItem("authToken");
    const authTokenType = window.localStorage.getItem("authTokenType");
    const authUsername = window.localStorage.getItem("username");

    const construct_image = () =>{
        if (post.image_url_type === 'absolute') {
            setImageUrl(post.image_url)
        }
        else{
            setImageUrl(process.env.REACT_APP_BACKEND_BASE_URL + post.image_url)
        }
    }

    const construct_comments = () => {
        setcomments(post.comments)
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': authTokenType + ' ' + authToken,
                'Content-Type': 'application/json'
            })
        }

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'post/delete/' + post.id, requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.replace(process.env.REACT_APP_FRONTEND_BASE_URL)
                return response.json()
            }
            throw response
        })
        .catch(error => {
            console.log(error);
        })

    }

    const postComment = (e) => {
        e.preventDefault();

        const json_string = JSON.stringify({
            "username": authUsername,
            "text": newComment,
            "post_id": post.id
        })

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Authorization': authTokenType + ' ' + authToken,
                'Content-Type': 'application/json'
            }),
            body: json_string
        }

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'comment/create', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            fetchComment()
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setNewComment('')
        })
    }

    const fetchComment = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + 'comment/all/' + post.id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            setcomments(data)
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        construct_image()
        construct_comments()
    })
    
return (
    <div className={styles.post}>
        <div className={styles.post_header}>
            <FiUser size={20} />
            <div className={styles.post_headerInfo}>
            <p>{post.user.username}</p>
            <button className="--btn --btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>

        <img className={styles.post_image} src={imageUrl} alt="post_image" />

        <h4 className={styles.post_text}>{post.caption}</h4>

        <div className={styles.post_comments} key={post.id}>
            {
            comments.map((comment) => (
                <p> <strong>{comment.username}:</strong> {comment.text} </p>
            ))
        }
        </div>
        {authToken && 
        (
            <form className={styles.comment_form} onSubmit={postComment}>
                <input
                className={styles.comment_input}
                type="text"
                placeholder="Add comment"
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                />
                <button disabled={!newComment} className={styles.comment_btn}>comment</button>
            </form>
        )
        }
        
    </div>
)
}

export default PostList
