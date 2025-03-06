import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading , blogs }: { loading: boolean, blogs: { id:number ,title: string, content: string, author: { username: string } }[] } = useBlogs();
    if(loading){

        return (<div className="flex justify-center flex-col">loading...</div>)
    }
    return (
        <div>
            <AppBar />

            <div className="flex justify-center">


                <div className="">
                    {blogs.map((blog)=><BlogCard 
                    id={blog.id}
                    title={blog.title} 
                    content={blog.content} 
                    publishedDate="6th March 2024" 
                    authorName={blog.author.username || "Anon"} 
                    />)}
                    
                </div>
            </div>
        </div>
    )
}