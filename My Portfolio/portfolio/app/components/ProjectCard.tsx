import React from 'react'
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

type ProjectCardProps = {
    imgUrl: string;
    title: string;
    description: string;
    gitUrl: string;
    previewUrl: string;
};

const ProjectCard = ({imgUrl, title, description, gitUrl, previewUrl} : ProjectCardProps) => {
  return (
    <div>
        <div className="h-52 md:h-72 rounded-t-xl relative group"
            style={{background: `url(${imgUrl})`, backgroundSize: "cover"}}>
                {/* <div className="overlay absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-500">
                    <Link href="/"
                          className="absolute top-4 left-4 h-14 w-14 border-2 rounded-full border-[#adb7be] hover:border-white flex items-center justify-center">
                        <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
                    </Link>
                </div> */}
                {/* <div className="overlay absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-500  flex 
                items-center justify-center"> */}
                <div className="overlay absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-100 group-hover:bg-black/80 transition-all duration-500 flex items-center justify-center gap-4">
                    <Link href={gitUrl}
                          className="h-14 w-14 border-2 relative rounded-full border-[#adb7be] hover:border-white flex items-center justify-center">
                        <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
                    </Link>

                    <Link href={previewUrl}
                          className="h-14 w-14 border-2 relative rounded-full border-[#adb7be] hover:border-white flex items-center justify-center">
                        <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
                    </Link>
                </div>
        </div>

        <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4">
            <h5 className='text-xl font-semibold mb-2'>{title}</h5>
            <p className='text-[#adb8be]'>{description}</p>
        </div>
    </div>
  )
}

export default ProjectCard


