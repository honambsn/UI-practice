import React from 'react'
import {activeAnimations, motion} from "framer-motion";

type TabButtonProps = {
    active: boolean,
    selectTab: () => void,
    children: React.ReactNode
};

const variants = {
    default: {width: 0},
    active: {width: "calc(100% - 0.75rem)"}, 
};

const TabButton = ({ active, selectTab, children } : TabButtonProps) => {

    //const buttonClasses = active ? "text-white border-b border-purple-500" : "text-[#adb7be]";
    const buttonClasses = active ? "text-white" : "text-[#adb7be]";

    
    return (
        <button onClick={selectTab}>
            <p className={`mr-3 font-semibold hover:text-white ${buttonClasses} cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-105`}>
                {children}
            </p>
            
            <motion.div animate = {active ? "active" : "default"} variants={variants} className='h-1 bg-yellow-500 mt-2 mr-3'>

            </motion.div>
        </button>
    );
};

export default TabButton;



//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=8324