import { useEffect, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config";

export interface BlogFace{
    
        content: string,
        title: string,
        id: number,
        author: {
            username: string
        }
    
}
export const useBlogs=()=>{
    const [loading , setLoading ] = useState(true);
    const [blogs,setBlogs] = useState<BlogFace[]>([]);

    useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }
         )
         .then(response=>{
            setBlogs(response.data.post);
            setLoading(false)
         })
    },[])
    return (
        {
        loading,
        blogs
        }
    )
}

export const useBlog=(id:number)=>{
    const [loading , setLoading ] = useState(true);
    const [blog,setBlog] = useState<BlogFace>();
    
    useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }
         )
         .then(response=>{
            setBlog(response.data.post);
            setLoading(false)
         })
    },[id])
    return (
        {
        loading,
        blog
        }
    )
}