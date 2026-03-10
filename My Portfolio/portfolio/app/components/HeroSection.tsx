"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';




const HeroSection: React.FC = () => {
    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-7 place-self-center text-center sm:text-left">
                    <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Hello, I am {" "}</span>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'new',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Ho Nam',
                                1000,
                                'C# Developer',
                                1000,
                                'Developer 3',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '2em', display: 'inline-block' }}
                            repeat={Infinity}
                            />
                    </h1>

                    <p className="text-[#adb7be] text-base sm:text-lg mb-6 lf:text-xl">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>

                    <div>
                        <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 text-white cursor-pointer font-semibold">Hire Me</button>

                        <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:scale-105 hover:bg-slate-800 text-white mt-3 cursor-pointer">
                          <span className="block bg-[#121212] hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-full px-5 py-2 font-semibold">
                            Download CV</span></button>
                    </div>

                </div>
                
                <div className="col-span-5 place-self-center mt-4 lg:mt-0">
                    <div className="relative rounded-full overflow-hidden bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px]">
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


//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=3457
