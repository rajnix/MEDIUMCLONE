
import { Author } from "../components/Author";



export const Blog = () => {
   
    
    return (
        <div>


            <div className="flex justify-center">

               <Author 
                id={10}
                authorName='rajnish'
                title='new titlle'
                content='very content'
                publishedDate='5th jan 0225'/>
            </div>
        </div>
    )
}