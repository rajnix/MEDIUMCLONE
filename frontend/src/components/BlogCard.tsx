interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps)=> {
return (
    <div>
        
        
    <div className="flex">
        
    <div>
    <Avatar name={authorName} />   
    </div>
   
    <div className="px-2 font-semibold"> 
    {authorName}. 
    </div>
    <div className="px-2 font-bold text-gray-400">
   
    {        publishedDate}
    </div>
    </div>
    <div className="font-extrabold ">
        {title}
    </div>
    <div>
        {content.length>100? (content.slice(0,100) + "..."):content}
    </div>
    <div className="font-extralight ">
        {Math.ceil(content.length/100) + "min read"}
    </div>
    <div className="bg-slate-200 h-1 w-full" />
    </div>

)
}

function Avatar({name}:{name:string}){
    return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
    )
}