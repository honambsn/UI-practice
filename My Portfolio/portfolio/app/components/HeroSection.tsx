"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";
import Link from "next/link";



const HeroSection: React.FC = () => {
    return (
        // <section className="w-full max-w-7xl mx-auto py-20 overflow-x-hidden">
        //     <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-8 place-self-center text-center sm:text-left justify-self-start">

                    {/* <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold">

                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Hello, I am
                        </span>

                        <TypeAnimation
                            sequence={[
                            ' Ho Nam',
                            1500,
                            ' C# Developer',
                            1500,
                            ' Fullstack Developer',
                            1500,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            //className="whitespace-nowrap sm:inline block"
                            className="block sm:inline break-words"
                        />

                        </h1> */}

                    <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Hello, I am
                        </span>

                        <span className="block min-h-[1.5em] sm:min-h-[2em]">
                            <TypeAnimation
                            sequence={[
                                ' Ho Nam',
                                1500,
                                ' C# Developer',
                                1500,
                                ' Fullstack Developer',
                                1500,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="break-words"
                            />
                        </span>
                    </h1>

                    <p className="text-[#adb7be] text-base sm:text-lg mb-6 lf:text-xl">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>

                    {/* <div className="flex flex-col sm:flex-row gap-4"> */}
                    <div>
                        <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-primary to-secondary hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 text-white cursor-pointer font-semibold">Hire Me</button>

                        <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-primary to-secondary hover:scale-105 hover:bg-slate-800 text-white mt-3 cursor-pointer">
                          <span className="block bg-[#121212] hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-full px-5 py-2 font-semibold">
                            Download CV</span></button>
                    </div>

                </div>
                
                {/* <div className="col-span-4 md:col-span-5 place-self-center mt-4 lg:mt-0"> */}
                <div className="col-span-4 place-self-center mt-4 lg:mt-0">
                    <div className="relative rounded-full overflow-hidden bg-[#181818] w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]">
                        <Image
                            src="/assets/GjO4qpgW0AAWr9i.jpeg"
                            alt="image"
                            width={300}
                            height={300}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            // className="object-cover"
                            // fill
                        />
                    </div>
                </div>
            </div>
        </section>

    );
};



export default HeroSection
