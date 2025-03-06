export interface BlogCardProps {
    id:number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const Author = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return(
        <div>
            <div className="pt-20 pb-5">
                Author
            </div>
            <div className="flex">
<div className="pr-5 ">
<Avatar name = {authorName}/>
</div>
<h3 className="font-bold text-2xl">{authorName}</h3>
</div>
        </div>
    )
}


export function Avatar({ name }: { name: string }) {
    return (
        <div className="text-md relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
}