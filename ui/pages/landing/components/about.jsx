import React from "react";
import CountUp from 'react-countup';
import { twMerge } from 'tailwind-merge'
import VisibilitySensor from 'react-visibility-sensor';

const Polygon_7 = (props) => (
    <video width="320" height="240" autoPlay loop muted>
    <source src="/assets/mp4/orb.mp4" type="video/mp4" />
    </video>
);

var _ = false
class About extends React.Component{
    constructor(props){
        super(props)
        this.r = document.getElementById("root")
        this.w = this.r.clientWidth
        this.h = this.r.clientHeight
    }
    render(){
        return (<div className="sct w-full h-full  flex-col text-white justify-center items-center">
            <div className="grid grid-cols-[50%_50%] h-fit text-2xl font-[DM_Sans] space-x-20">
                <div className="flex flex-col h-fit w-fit">
                     <div className="text-center font-bold text-3xl">{
                        <CountUp end={400} redraw={true}>
                            {({ countUpRef, start }) => (
                                <VisibilitySensor onChange={start} delayedCall>
                                    <span ref={countUpRef} />
                                </VisibilitySensor>
                            )}
                        </CountUp>
                      }</div>
                    <div className="ti font-light tracking-[10px] text-center">Registration</div>
                </div>
                <div className="flex flex-col h-fit w-fit justify-center ml-auto mr-auto">
                    <div className="text-center font-bold text-3xl">{
                        <CountUp end={20} redraw={true}>
                            {({ countUpRef, start }) => (
                                <VisibilitySensor onChange={start} delayedCall>
                                    <span ref={countUpRef} />
                                </VisibilitySensor>
                            )}
                        </CountUp>
                      }</div>
                    <div className="ti font-light tracking-[10px] text-center">Events</div>
                </div>
            </div>
            <div className="flex w-full h-fit justify-center scale-50">
                {Polygon_7()}
            </div>
            <div className="grid grid-cols-[50%_50%] h-fit text-2xl font-[DM_Sans] space-x-20">
                <div className="flex flex-col h-fit w-fit">
                    <div className="text-center font-bold text-3xl">{
                            <CountUp end={30} redraw={true}>
                                {({ countUpRef, start }) => (
                                    <VisibilitySensor onChange={start} delayedCall>
                                        <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                            </CountUp>
                        }</div>
                    <div className="ti font-light tracking-[10px] text-center">Societies</div>
                </div>
                <div className="flex flex-col h-fit w-fit justify-center ml-auto mr-auto">
                    <div className="text-center font-bold text-3xl">{
                        <CountUp end={150} redraw={true}>
                                {({ countUpRef, start }) => (
                                    <VisibilitySensor onChange={start} delayedCall>
                                        <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                        </CountUp>
                        }</div>
                    <div className="ti font-light tracking-[10px] text-center">Seats</div>
                </div>
            </div>
         </div>)
    }
}
export default About