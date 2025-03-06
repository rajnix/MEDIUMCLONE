import { Link } from "react-router-dom";

export interface BlogCardProps {
    id:number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
        <div className="p-4   w-screen max-w-screen-lg cursor-pointer">


            <div className="flex">

                <div className="flex justify-center flex-col">
                    <Avatar name={authorName} />
                </div>

                <div className="px-2 font-semibold">
                    {authorName}.
                </div>
                <div className="flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="px-2 font-bold text-gray-400">

                    {publishedDate}
                </div>
            </div>
            <div className="py-2 text-3xl font-bold ">
                {title}
            </div>
            <div className="py-2">
                {content.length > 100 ? (content.slice(0, 100) + "...") : content}
            </div>
            <div className="font-extralight pb-2">
                {Math.ceil(content.length / 100) + "min read"}
            </div>
            <div className="border border-slate-200 " />
        </div>
        </Link>

    )
}

function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-slate-500">

        </div>
    )
}


export function Avatar({ name }: { name: string }) {
    return (
        <div className="text-xs relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
}