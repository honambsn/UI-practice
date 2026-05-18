"use client";
import { validateHeaderValue } from 'http';
import React from 'react';
import dynamic from 'next/dynamic';

const AnimatedNumbers = dynamic(() => {return import("react-animated-numbers")}, {ssr: false});



type Achievement = {
    metric: string,
    value: string,
    prefix?: string;
    postfix?: string;
};

const achievementsList: Achievement[] = [
    {
        metric: "Projects",
        value: "10",
        postfix: "+",
    },
    {
        prefix: "~",
        metric: "Users",
        value: "Calculating",
    },
    {
        metric: "Years",
        value: "3",
        postfix: "+",
    },
];

const AchievementsSection = () => {
  return (
    <div className='py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 border border-cyan-500 rounded-xl'>
        <div className='border-[#33353f] border rounded-md py-8 px-16 flex flex-row items-center justify-between'>
            {
                achievementsList.map((achievement, index) => (
                    <div key={index} className='flex flex-col items-center justify-center mx-4'>
                        {/* <h2 className='text-white text-5xl font-bold flex flex-row items-end gap-1'>
                            <span className="text-3xl mb-1 opacity-80">
                                {achievement.prefix}
                            </span>
                            {isNaN(parseInt(achievement.value)) ? (
                                <span className="text-3xl font-semibold text-zinc-100">
                                    {achievement.value}
                                </span>
                            ) : (
                                <AnimatedNumbers
                                    animateToNumber={parseInt(achievement.value)}
                                    locale="en-US"
                                    className="text-white text-4xl font-bold"
                                    // config={(_: string, index: number) => {
                                    //     return {
                                    //         mass: 1,
                                    //         friction: 100,
                                    //         tension: 140 * (index +1),
                                    //     };
                                    // }}
                                />
                            )}
                            {achievement.postfix && (
                                <span className="text-3xl mb-1 opacity-80">
                                    {achievement.postfix}
                                </span>
                            )}
                        </h2> */}

                        <h2 className="text-white text-4xl font-bold flex flex-row items-end gap-1">
                            {/* {achievement.prefix} */}
                            
                            {/* <AnimatedNumbers
                            animateToNumber={parseInt(achievement.value)}
                            locale="en-US"
                            className="text-white text-4xl font-bold"
                            
                            />
                            {achievement.postfix} */}


                            <span className="text-3xl mb-1 opacity-100  ">
                                {achievement.prefix}
                            </span>
                            {isNaN(parseInt(achievement.value)) ? (
                                <span className="text-3xl mb-1 font-semibold text-zinc-300">
                                    {achievement.value}
                                </span>
                            ) : (
                                <AnimatedNumbers
                                    animateToNumber={parseInt(achievement.value)}
                                    locale="en-US"
                                    className="text-white text-4xl font-bold"
                                    // config={(_: string, index: number) => {
                                    //     return {
                                    //         mass: 1,
                                    //         friction: 100,
                                    //         tension: 140 * (index +1),
                                    //     };
                                    // }}
                                />
                            )}
                            {achievement.postfix && (
                                <span className="text-3xl mb-1 opacity-80">
                                    {achievement.postfix}
                                </span>
                            )}
                        </h2>
                        
                        <p className='text-[#adb7be] text-2xl'>{achievement.metric}</p>
                    </div>
                ))
            }
      </div>
    </div>
  )
}

export default AchievementsSection

