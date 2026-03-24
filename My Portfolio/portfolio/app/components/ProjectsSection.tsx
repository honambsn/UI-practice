import React from 'react'
import ProjectCard from "./ProjectCard";

const projectsData = [
    {
        id: 1,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["All", "Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
    {
        id: 2,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["All", "Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
    {
        id: 3,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["All", "Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
    
    {
        id: 4,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["All", "Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
    {
        id: 5,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["All", "Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
]

const ProjectsSection = () => {
  return (
    <>
        <h2>My Projects</h2>

        <div className='text-white flex flex-row justify-center items-center gap-2 py-6'>
            <button className='rounded-full border-2 border-purple-500 px-6 py-3 text-xl cursor-pointer'>All</button>
            <button>Web</button>
        </div>

        <div>
            {projectsData.map((project) => <ProjectCard key={project.id} title={project.title} description={project.description} imgUrl={project.image} gitUrl={project.gitUrl} previewUrl={project.previewUrl} />)}
        </div>
    </>
  )
}

export default ProjectsSection


//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=4335