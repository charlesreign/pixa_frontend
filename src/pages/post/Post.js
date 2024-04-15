import React, { useEffect, useState } from 'react'
import PostList from './PostList'
import Loader from "../../components/loader/Loader";

const Post = () => {
    const BASE_URL = "http://localhost:8000/"
    
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const get_post = () =>{
        setIsLoading(true);
        fetch(BASE_URL + "post/all")
        .then(response => {
            const response_data = response.json()
            // console.log(response_data);
            if (response.ok) {
                return response_data
            }
            throw response
        })
        .then(data => {
            const result = data.sort((a, b) => {
            const t_a = a.timestamp.split(/[-T:]/);
            const t_b = b.timestamp.split(/[-T:]/);
            const d_a = new Date(Date.UTC(t_a[0], t_a[1]-1, t_a[2], t_a[3], t_a[4], t_a[5]));
            const d_b = new Date(Date.UTC(t_b[0], t_b[1]-1, t_b[2], t_b[3], t_b[4], t_b[5]));
            return d_b - d_a
            })
            return result
        })
        .then(data => {
            // console.log(data[0]);
            setPosts(data)
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        get_post()
    }, [])
    return (
        <>
        {isLoading && <Loader />}
        <div className='app_post'>
            {
            posts.map(post => (
                <PostList post={post} key={post.id}/>
            ))
            }
        </div>
        </>
        
    )
}     

export default Post
