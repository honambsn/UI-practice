"use client";

import React, {useState} from 'react'
import ProjectCard from "./ProjectCard";
import ProjectTag from './ProjectTag';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
};

const projectsData: Project[] = [
    {
        id: 1,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
    {
        id: 2,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["Mobile"],
        gitUrl: "/",
        previewUrl: "/",
    },
    {
        id: 3,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
    
    {
        id: 4,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["Mobile"],
        gitUrl: "/",
        previewUrl: "/",
    },
    {
        id: 5,
        title: "React Portfolio Website",
        description: "Prj description",
        image: "/images/projects/1.jpeg",
        tag: ["Web"],
        gitUrl: "/",
        previewUrl: "/",
    },
]

const ProjectsSection = () => {
    
    const [tag, setTag] = useState<string>("All");

    const handleTagChange = (newTag: string) => {
        setTag(newTag);
    };

    const filteredProjects =
        tag === "All"
        ? projectsData
        : projectsData.filter((project) => project.tag.includes(tag));
    
  return (
    <>
        <h2 className='text-center text-4xl font-bold text-white'>
            My Projects
        </h2>

        <div className='text-white flex flex-row justify-center items-center gap-2 py-6'>
            <ProjectTag onClick={handleTagChange} name="All" isSelected={tag === "All"}/>

            <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === "Web"}/>

            <ProjectTag onClick={handleTagChange} name="Mobile" isSelected={tag === "Mobile"}/>
        </div>

        <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
            {filteredProjects.map((project) => <ProjectCard key={project.id} title={project.title} description={project.description} imgUrl={project.image} gitUrl={project.gitUrl} previewUrl={project.previewUrl} />)}
        </div>
    </>
  )
}

export default ProjectsSection


//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=4335