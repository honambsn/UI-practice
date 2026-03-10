import React from 'react'

type TabButtonProps = {
    active: boolean,
    selectTab: () => void,
    children: React.ReactNode
};

const TabButton = ({ active, selectTab, children } : TabButtonProps) => {

    const buttonClasses = active ? "text-white border-b border-purple-500" : "text-[#adb7be]";
    
    return (
        <button onClick={selectTab}>
            <p className={`mr-3 font-semibold hover:text-white ${buttonClasses} cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-105`}>
                {children}
            </p>
        </button>
    );
};

export default TabButton;
