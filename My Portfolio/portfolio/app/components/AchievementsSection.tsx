import { validateHeaderValue } from 'http';
import React from 'react'

type Achiement = {
    metric: string,
    value: string,
};

const achievementsList = [
    {
        metric: "Projects",
        value: "10+",
    },
    {
        metric: "Users",
        value: "Calculating",
    },
    {
        metric: "Years",
        value: "3+",
    },
];

const AchievementsSection = () => {
  return (
    <div className='py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <div className='border-[#33353f] border rounded-md py-8 px-17 flex flex-row items-center justify-between'>
            {
                achievementsList.map((achievement, index) => (
                    <div key={index} className='flex flex-col items-center justify-center mx-4'>
                        <h2 className='text-white text-5xl font-bold'>{achievement.value}</h2>
                        <p className='text-[#adb7be] text-2xl'>{achievement.metric}</p>
                    </div>
                ))
            }
      </div>
    </div>
  )
}

export default AchievementsSection

