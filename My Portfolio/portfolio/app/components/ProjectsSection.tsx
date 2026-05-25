"use client";

import React, {useState, useRef} from 'react'
import ProjectCard from "./ProjectCard";
import ProjectTag from './ProjectTag';
import { motion, useInView} from "framer-motion";

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
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    const handleTagChange = (newTag: string) => {
        setTag(newTag);
    };

    const filteredProjects =
        tag === "All"
        ? projectsData
        : projectsData.filter((project) => project.tag.includes(tag));

    const cardVariants = {
        initial: {y: 50, opacity: 0},
        animate: {y: 0, opacity: 1},
    };


    return (
        <section ref={ref}>
            <h2 className='text-center text-4xl font-bold text-white'>
                My Projects
            </h2>

            <div className='text-white flex flex-row justify-center items-center gap-8 py-6'>
                <ProjectTag onClick={handleTagChange} name="All" isSelected={tag === "All"}/>

                <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === "Web"}/>

                <ProjectTag onClick={handleTagChange} name="Mobile" isSelected={tag === "Mobile"}/>
            </div>

            <ul className='grid md:grid-cols-3 gap-8 md:gap-12'>
                {filteredProjects.map((project, index) => (
                    <motion.li
                        variants={cardVariants}
                        initial= "initial"
                        animate={isInView ? "animate" : "initial"}
                        key={index}
                        transition={{duration: 0.3, delay: index * 0.4}}>
                    <ProjectCard
                    key={project.id}
                        title={project.title} 
                        description={project.description} 
                        imgUrl={project.image} 
                        gitUrl={project.gitUrl} 
                        previewUrl={project.previewUrl} />
                    </motion.li>
                ))}
            </ul>
        </section>
    )
}

export default ProjectsSection


