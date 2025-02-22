
import React,{useState,useEffect} from "react"
import {fetchApiData} from "./helpers/http"
import Ftabs from "./filtertabs"
import {Clock} from "lucide-react";
import Search from '../components/search.jsx';
import TabNav from '../components/tabnav.jsx';
var i =0

const isBooked = (title)=>{
    return fetchApiData("get", "isbooked", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
        },
        params: {
            name: title,
            id: `${window.userData.name}`
        }
    })
}

const book = (title)=>{
    isBooked(title).then(
        res => {
           var _ = res.data
           if (_.success == false){
             fetchApiData(
                "get",
                "event/" + title,
                {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
            }}
             ).then(
                res => {
                    var h =res.data
                    fetchApiData(
                        "post",
                        "book",
                        {headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem("token"),
                    },
                        data: {
                            name: h.event_title,
                            id: window.userData.name,
                            time:h.time,
                            adr: h.adr,
                            date:h.date
                        }
                }
                     ).then(
                        (res)=>console.log(res.data)
                     )
                }
             )
           } 
        }
    )
}
const genCard = (cat,title,desc,status,date,reg)=>{
    return  <div className="flex flex-col w-80 h-fit border border-black p-4 rounded-2xl bg-(--bg-e) text-white">
    <div className="flex w-full h-fit">
        <div className="title font-[DM_Sans] text-(--bg-c) opacity-70">{cat}</div>
        <div className={`ml-auto ${status.toLowerCase()} w-fit rounded-2xl font-[DM_Sans] font-[800] text-[70%] capitalize`}>
            {status}
        </div>
    </div>
    <div className="font-[Metropolis]  text-2xl whitespace-nowrap font-[800] pt-4">{title}</div>
    <div className="data w-full h-fit grid space-y-7">
        <div className="text-[70%] opacity-70 font-light">{desc}</div>
        <div className="flex h-fit text-[70%] space-x-5 justify-center whitespace-nowrap">
            <div className="flex h-fit mt-auto mb-auto space-x-20 items-center">
                <div className="flex flex-col text-xl font-bold space-y-1"><span className="font-bold">{<Clock/>}</span><span className="font-light text-center">12th feb</span></div>
                <div className="flex flex-col text-center"><span className="text-xl font-bold">{reg}+</span><span className="font-light tracking-[4px] text-center text-[150%]">Regisration</span></div>
            </div>
        </div>
        <div className="w-full h-fit grid grid-cols-[50%_50%] space-x-5 text-center">
            <div className="p-2 whitespace-nowrap border">
                View More
            </div>
            <div className="p-2 bg-(--bg-h) text-center rounded-[10px] cursor-pointer" onClick={()=>{book(title)}}>Book now</div>
        </div>
    </div>
</div>
}


function MainCards(props){
   const [status,setStatus] = useState(-1)
   const [name,setName] = useState(-1)
   const [data,setData] = useState({})
   const [rdata,setrData] = useState({})
   const [rendering,setRend] = useState([])
   useEffect(()=>{
    fetchApiData("get", "/events").then(
        (d)=>{setData(d.data)}
    )
   }, [])
   useEffect(
    ()=>{
        setrData(data)
    },
    [data]
   )

   useEffect(
    ()=>{
        var k = Object.values(rdata),r = []
        k.forEach(
            (v)=>{
                var type = v.society_type, events = v.events
                if((name != -1) && (name != v.name)) return 
                r = r.concat(
                    events.map(
                        (_)=>{
                            if((status != -1) && (status != _.status.toLowerCase())) return 
                             return  genCard(type,_.event_title,_.desc,_.status,"12th feb",_.eventRegistrations)
                        }
                    )
                )
            }
        )
        console.log(r)
        setRend(r)
    },
    [rdata,status,name]
   )
   return   (Object.keys(rdata).length != 0 ?
    (<div className="w-full h-full grid">
            <div className="tabnav w-full overflow-x-scroll overflow-y-hidden flex items-center">
                {(<TabNav data={Object.keys(data)} onChange={setName}/>)}
            </div>
            <div className="w-full h-fit flex mb-4">
                    <div className="sb w-[98%] h-fit flex">
                        <div id="searchbox" className="flex ml-auto  w-[95%] sm:w-[50%] h-fit rounded-[20px] border-2 border-black p-1 mr-auto">{<Search placeholder="Search society"/>}</div>
                    </div>
            </div>
            <div className="w-full h-fit flex border-t border-t-(--bg-f)">
                <div className="flex w-fit ">
                    <div className="lg:pl-20 w-fit rounded-r-[20px] top-1 relative ">{<Ftabs onChange={setStatus}/>}</div>
                </div>
            </div>
            <div className="flex flex-wrap pt-10 sm:p-10 space-x-5 space-y-10 justify-center" id="mc">{rendering}</div>
    </div>) : ""
   )
   
}
export default MainCards
