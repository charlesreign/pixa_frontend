import React, { useEffect, useState } from 'react'
import styles from "./Post.module.css"

const PostList = ({ post }) => {
    const BASE_URL = "http://localhost:8000/"
    const [imageUrl, setImageUrl] = useState('')

    const construct_image = () =>{
        if (post.image_url_type === 'absolute') {
            setImageUrl(post.image_url)
        }
        else{
            setImageUrl(BASE_URL + post.image_url)
        }
    }

    useEffect(() => {
        construct_image()
    }, [])
    
return (
    <div className='post_list'>
        <img className={styles.card__image} src={imageUrl} alt="post_image" />
    </div>
)
}

export default PostList
