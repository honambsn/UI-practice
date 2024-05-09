particlesJS("background",{
    particles:{
        number:{
            value:15, //number of particles
            density:{
                enable:true,
                value_area: 300, // area where particles will be distributed
            },
        },
        
        color:{
            value: "#ffffff",  //particles color
        },
        shape:{
            type: "triangle",//shape type
        },

        opacity:{
            value:0.8,
            random: true,
            anum:{
                enable:true,
                speed: 1,
                opacity_min:0.1,
                sync: false,
            },
        },

        size:{
            value:5, //base size of particles
            random: true,
            anim:{
                enable: true,
                speed: 4,
                size_min: 0.3,
                sync:false,
            },
        },

        //connecting lines
        line_linked:{
            enable: true,
            distance: 150, //maximum distance between linked particles
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },

        //particle movement
        move:{
            enable:true,
            speed: 2,
            direction: "none",
            random:false,
            straight: false,
            out_mode: "bounce",//behavior when particles move out of the canvas
            bounce:false,
        },
    },
    //interactivity settings
    interactivity:{
        detect_on: "canvas",
        events:{
            onhover:{
                enable: true,
                mode:"repulse",
            },
            onclick:{
                enable:true,
                mode:"push",
            },
            resize:true,
        },
    },
    retina_detect: true,
});