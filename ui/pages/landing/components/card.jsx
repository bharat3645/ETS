import React from "react";
import anime from 'animejs/lib/anime.es.js';
import {Clock} from "lucide-react";
import VisibilitySensor from 'react-visibility-sensor';

const card = (type,title,desc,reg,date,i) => {
    return (
        <div className="flex flex-col h-fit w-full p-2     bg-white rounded-2xl origin-center " id={"card" + i}>
            <div className="flex flex-col w-full h-full  space-y-10" >
                <div className="flex flex-col w-full h-fit space-y-5">
                    <div className="type text-(--bg-h) capitalize text-2xl">{type}</div>
                    <div className="flex flex-col w-full h-fit space-y-4">
                        <div className="title sm:text-4xl text-xl font-bold text-black">{title}</div>
                        <div className="desc sm:text-[60%] text-[10px] opacity-70 text-black">{desc}</div>
                    </div>
                </div>
                <div className="flex w-full h-fit text-center text-2xl justify-center font-extrabold text-(--bg-h) opacity-70">
                    <span>{reg}+ Registrations</span>
                </div>
                <div className="book grid grid-cols-[50%_50%]">
                    <div className="flex">
                        <div className="w-[70%] text-center p-[10px] bg-(--bg-h) text-white font-medium">Book Now</div>
                    </div>
                    <div className="flex justify-end items-center text-xl text-(--bg-h) space-x-2">
                        {<Clock/>}
                        <div className='h-fit'>{date}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

function Animations(p){
    var _ = document.getElementById("cards"), w = _.clientWidth,h = _.clientHeight
    const props = {
        easing: p.easing || "easeInOutQuad",
        duration: p.duration || 2000,
        loop:true,
        // direction: "reverse",
        delay: 1000,
        // easing: function(el, i, total) {
        //     return function(t) {
        //       return Math.pow(Math.sin(t * (i + 1)), total);
        //     }
        //   }
    }
    const cardN = 3
    const _getObj = (x1,x2,y1,y2)=>{
        var obj = {},fc ,k
        if(y1 == y2){
            k = ((x2-x1))
            obj['translateX'] = ((x2-x1))
            fc = w
        }
        else{
            k = ((x2-x1))
            obj['translateY'] = (y2-y1) 
            fc = h
        }
        if (Math.round(Math.floor(k)) == Math.round(Math.floor(fc / 2)) ){
            obj['scale'] = 1.2
        }
        return obj

    }
    var data  = [
        [
            "tech",
            "Momentum 2.0",
            `This hackathon is designed to push the boundaries of innovation, bringing together talented developers, designers, and problem-solvers to tackle real-world challenges. With a high-energy atmosphere, participants collaborate, experiment, and build cutting-edge solutions within a limited timeframe.
            Key highlights include expert mentorship, hands-on workshops, and access to powerful tools and APIs. Whether working solo or in teams, competitors strive to create impactful projects that impress judges and industry leaders. With exciting prizes, networking opportunities, and a platform to showcase skills, this hackathon promises an unforgettable experience of learning, creativity, and competition.`,
            "50",
            "12th feb"
        ],
        [
            "tech",
            "CodeSprint 2024",
            `This hackathon is designed to push the boundaries of innovation, bringing together talented developers, designers, and problem-solvers to tackle real-world challenges. With a high-energy atmosphere, participants collaborate, experiment, and build cutting-edge solutions within a limited timeframe.
            Key highlights include expert mentorship, hands-on workshops, and access to powerful tools and APIs. Whether working solo or in teams, competitors strive to create impactful projects that impress judges and industry leaders. With exciting prizes, networking opportunities, and a platform to showcase skills, this hackathon promises an unforgettable experience of learning, creativity, and competition.`,
            "75",
            "25th March"
        ],
        [
            "tech",
            "InnovateX Hack",
            `This hackathon is designed to push the boundaries of innovation, bringing together talented developers, designers, and problem-solvers to tackle real-world challenges. With a high-energy atmosphere, participants collaborate, experiment, and build cutting-edge solutions within a limited timeframe.
            Key highlights include expert mentorship, hands-on workshops, and access to powerful tools and APIs. Whether working solo or in teams, competitors strive to create impactful projects that impress judges and industry leaders. With exciting prizes, networking opportunities, and a platform to showcase skills, this hackathon promises an unforgettable experience of learning, creativity, and competition.`,
            "100",
            "5th April"
        ]
    ]

    React.useEffect(() => {
        createAnimations()
      }, []);
    const createAnimations = ()=>{
        var animations = new Array(cardN),_,  obj = {}
        for(var i =0;i<animations.length;i++){
            if(i==(cardN-1)){
                _ = 0
            }
            else{
                _ = i+1
            }
            var k ="card" + i
            var hm = document.getElementById(k)
            var gm = hm.getBoundingClientRect()
            var hm2 = document.getElementById("card"+_)
            var gm2 = hm2.getBoundingClientRect()
            var x1 = gm.left,x2 = gm2.left, y1 = gm.top, y2 = gm2.top
            var obj = {}
            obj = Object.assign(_getObj(x1,x2,y1,y2),props)
            anime(Object.assign({targets: "#" + k,complete: ()=>{console.log("done")}}, obj)) 
        }
        return animations
    }
    return (
        <div className="xl:flex xl:flex-row flex-col overflow-hidden xl:w-full w-[95%] h-full space-x-25 space-y-30  xl:items-start items-center mt-10  xl:m-[0] ml-auto mr-auto" id='cc'>
            {
                    data.map((v,i)=>{
                        return card(v[0],v[1],v[2],v[3],v[4],i)
                    })
            }
        </div>

)
}
export default Animations