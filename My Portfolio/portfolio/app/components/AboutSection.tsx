"use client";
import {useTransition, useState} from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content : (
            <ul className="list-disc list-inside">
                <li>C#</li>
                <li>Python</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Angular</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>MySQL</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>Git</li>
            </ul>
        )
    },
    {
        title: "Education",
        id: "education",
        content : (
            <ul className="list-disc list-inside">
                <li>University of Science</li>
            </ul>
        )
    },
    {
        title: "Degree",
        id: "degree",
        content : (
            <ul className="list-disc list-inside">
                <li>Bachelor</li>
            </ul>
        )
    }
] as const;

type TabType = "skills" | "education" | "degree";

const AboutSection = () => {
    const [tab, setTab] = useState<TabType>("skills");
    // const [isPending, startTransition] = useTransition();

    // const handleTabChange = (id: TabType) => {
    //     startTransition(() => {
    //         setTab(id);
    //     });
    // };

    const handleTabChange = (id: TabType) => {
        setTab(id);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-20 text-white">
            {/* <div className="grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16"> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16 items-center">
            
                {/* <Image src="/assets/2607423.jpg" 
                        width={500} height={500} 
                        alt="About Image"
                        className="w-full h-auto rounded-lg"/> */}
                        {/* fill className="object-cover" */}


                <Image
                    src="/assets/2607423.jpg"
                    width={500}
                    height={500}
                    alt="About Image"
                    className="w-full h-auto rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    />
                        
                
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                    <p className="text-base md:text-lg">I am a full stack web developer with a passion for creating interactive and responsive web applications. I have experience working with C#, Python, JavaScript, React, Angular, Node.js, Express, MySQL, HTML, CSS, and Git. I am a quick learner and I am always looking to expand my knowledge and skill set. I am a team player and I am excited to work with others to create amazing applications.</p>

                    {/* <div className="flex flex-row justify-start mt-8"> */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <TabButton
                            selectTab={() => handleTabChange("skills")}
                            active={tab === "skills"}
                            >
                            Skills
                        </TabButton>

                        <TabButton
                            selectTab={() => handleTabChange("education")}
                            active={tab === "education"}
                            >
                            Education
                        </TabButton>

                        {/* <TabButton
                            selectTab={() => handleTabChange("certifications")}
                            active={tab === "certifications"}
                            >
                            Certifications
                        </TabButton> */}
                        
                        <TabButton
                            selectTab={() => handleTabChange("degree")}
                            active={tab === "degree"}
                            >
                            Degree
                        </TabButton>
                    </div>

                    <div className="mt-8">
                        {TAB_DATA.find((t) => t.id === tab)?.content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;