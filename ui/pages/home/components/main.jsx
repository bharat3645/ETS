
import React,{useState,useEffect} from "react"
import { v4 as uuidv4 } from 'uuid';
import {fetchApiData} from "./helpers/http"
import Ftabs from "./filtertabs"
import {Clock,MapPin} from "lucide-react";
import Search from '../components/search.jsx';
import TabNav from '../components/tabnav.jsx';
import { ToastContainer, toast } from "react-toastify";
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
const notify = (msg,type)=>{
        switch(type){
            case "error":{
             toast.error(msg);
                break
            }
            case "warn":{
                 toast.warn(msg);
                break
            }
            default:{
            toast.info(msg);
            }
        }
  }

const book = (title)=>{
    
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
                            id: window.userData.id,
                            time:h.time,
                            adr: h.adr,
                            date:h.date,
                        }
                }
                     ).then(
                        (res)=>notify(res.data.message, res.data.success?"info":"error")
                     )
                }
             )
}
const genCard = (cat,title,desc,status,date,reg,adr = "College auditorium")=>{
    return  (
   <div key={v4()} className="flex-col w-80 h-fit border border-black p-4 rounded-2xl bg-(--bg-e) text-white">
    {
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
    }
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
                <div className="flex flex-col text-xl font-bold space-y-1"><span className="font-bold">{<Clock/>}</span><span className="font-light text-center text-[90%]">{date}</span></div>
                <div className="flex flex-col text-center"><span className="text-xl font-bold">{reg}+</span><span className="font-light tracking-[4px] text-center text-[150%]">Regisration</span></div>
            </div>
        </div>
        <div className="flex h-fit text-[70%] space-x-5 justify-center whitespace-nowrap">
            <div className="flex w-full h-fit mt-auto mb-auto space-x-20 items-center justify-center">
                <div className="w-full justify-center flex space-x-5 text-xl font-bold space-y-1"><span className="font-bold">{<MapPin/>}</span><span className="font-light text-center">{adr}</span></div>
            </div>
        </div>
        <div className="w-full h-fit flex text-center">
           
            <div className={"w-[50%] ml-auto p-2  text-center rounded-[10px] cursor-pointer " + ((status.toLowerCase()!="completed")? "bg-(--bg-h)": "bg-(--completed) font-bold")} onClick={()=>{
                 if (status.toLowerCase()!="completed") return book(title)
                }}>{(status.toLowerCase()!="completed")? "Book now": "Completed"}</div>
        </div>
    </div>
</div>)
}


function MainCards(props){
   const [status,setStatus] = useState(-1)
   const [tity,setTity] = useState(-1)
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
                events.reverse()
                r = r.concat(
                    events.map(
                        (_)=>{
                            if((status != -1) && (status != _.status.toLowerCase())) return 
                            if((tity != -1) && !(_.event_title.toLowerCase().includes(tity.toLowerCase()))) return 
                             return  genCard(type,_.event_title,_.desc,_.status,_.date,_.eventRegistrations)
                        }
                    )
                )
            }
        )
        console.log(r)
        setRend(r)
    },
    [rdata,status,name,tity]
   )
   const onSearchChange  = (r)=>{
    console.log(r.current.value)
        setTity((r.current.value.length != 0 )? r.current.value: -1)
   }
   return   (Object.keys(rdata).length != 0 ?
    (<div className=" w-full h-full grid">
            <div className="tabnav scrollbar-none w-full overflow-x-scroll overflow-y-hidden flex items-center">
                {(<TabNav data={Object.keys(data)} onChange={setName}/>)}
            </div>
            <div className="w-full h-fit flex mb-4 mt-4">
                    <div className="sb w-[98%] h-fit flex">
                        <div id="searchbox" className="flex ml-auto  w-[95%] sm:w-[50%] h-fit rounded-[20px] border-2 border-black p-1 mr-auto">{<Search placeholder="Search society" onChange={onSearchChange}/>}</div>
                    </div>
            </div>
            <div className="w-full h-fit flex">
                <div className="flex w-fit ">
                    <div className="lg:pl-20 w-fit rounded-r-[20px] top-1 relative ">{<Ftabs onChange={setStatus}/>}</div>
                </div>
            </div>
            <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto overflow-x-hidden flex flex-wrap pt-10 sm:p-10 space-x-5 space-y-10 justify-center" id="mc">{rendering}</div>
    </div>) : ""
   )
   
}
export default MainCards
