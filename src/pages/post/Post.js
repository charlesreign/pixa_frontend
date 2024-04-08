import React, { useEffect, useState } from 'react'
import PostList from './PostList'
import styles from "./Post.module.css"

const Post = () => {
    const BASE_URL = "http://localhost:8000/"
    
    const [posts, setPosts] = useState([])

    const get_post = () =>{
        fetch(BASE_URL + "post/all")
        .then(response => {
            const response_data = response.json()
            console.log(response_data);
            if (response.ok) {
                return response_data
            }
            throw response
        })
        .then(data => {
            setPosts(data)
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        get_post()
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.card}>
            {
            posts.map(post => (
                <PostList post={post} />
            ))
            }
            <p className={styles.card__name}>Lily-Grace Colley</p>
            </div>
        </div>
    )
}     

export default Post
