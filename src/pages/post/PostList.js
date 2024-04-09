import React, { useEffect, useState } from 'react'
import styles from "./Post.module.css"
import { FiUser } from "react-icons/fi";

const PostList = ({ post }) => {
    const BASE_URL = "http://localhost:8000/"
    const [imageUrl, setImageUrl] = useState('')
    const [comments, setcomments] = useState([])

    const construct_image = () =>{
        if (post.image_url_type === 'absolute') {
            setImageUrl(post.image_url)
        }
        else{
            setImageUrl(BASE_URL + post.image_url)
        }
    }

    const construct_comments = () => {
        setcomments(post.comments)
    }

    useEffect(() => {
        construct_image()
        construct_comments()
    }, [])
    
return (
    <div className={styles.post}>
        <div className={styles.post_header}>
            <FiUser size={20} />
            <div className={styles.post_headerInfo}>
            <p>{post.user.username}</p>
            <button className="--btn --btn-danger">Delete</button>
            </div>
        </div>

        <img className={styles.post_image} src={imageUrl} alt="post_image" />

        <h4 className={styles.post_text}>{post.caption}</h4>

        <div className={styles.post_comments}>
            {
            comments.map((comment) => (
                <p> <strong>{comment.username}:</strong> {comment.text} </p>
            ))
        }
        </div>

    </div>
)
}

export default PostList
