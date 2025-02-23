import React,{useState,useEffect} from "react"
import {fetchApiData} from "./helpers/http"
import "./css/style.css";
import { v4 as uuidv4 } from 'uuid';

function Ticket(props){
    const [bookings,setBookings] = useState([])
    const [retry, setRetry] = useState(false)
    useEffect(()=>{
        fetchApiData("get", "bookings", {
            headers:{
            "Authorization": localStorage.getItem("token")
            },
            params: {
                id: (window.userData?.id ?? (setRetry(!retry)))
            }
    }).then(
        res => {res.data.bookings.reverse();return setBookings(res.data.bookings)}
    )
    }, [retry])    
    return (
        <div className="flex flex-col w-full font-[DM_Sans] space-y-10 text-white">
            {bookings.map(
                (v,_)=>{
                    console.log(v) 
                    var h = Object.keys(v)[0], i =Object.values(v)[0]
                    return <div key={uuidv4()} className="w-full bg-(--body) grid grid-cols-[10%_90%] p-5 space-x-5 rounded-2xl">
                        <div className="flex sm:text-center sm:items-center   justify-center lg:text-xl md:text-[110%] text-[90%] ">#{_+1}</div>
                        <div className="w-full flex-col grid">
                            <div className="w-full flex lg:text-3xl md:text-[150%] sm:text-[130%] text-[20px] font-medium">{i.name}</div>
                            <div className="lg:text-[90%] md:text-[80%] sm:text-[70%] text-[15px] font-light">{i.adr}</div>
                            
                        </div>
                        <div className="w-full h-fit flex justify-center m-2 col-span-2">
                            <div className="w-[90%] flex">
                                <div className="lg:text-[90%] sm:text-[80%] text-[10px] flex space-x-5 opacity-70 uppercase items-end">
                                    <span>{i.date}</span>
                                    <span>{i.time}</span>
                                </div>
                                <span  className="ml-auto sm:text-[100%] text-[15px] p-2 bg-(--bg-h)"><a href={"/ticket?token=" + h}>View more</a></span>
                            </div>
                        </div>
                    </div>
                }
            )}
        </div>
    )
}

export default Ticket