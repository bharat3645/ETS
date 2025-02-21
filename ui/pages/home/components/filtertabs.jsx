import React from "react";
import { v4 as uuidv4 } from 'uuid';

const tabs = [
    "all",
    "ongoing",
    "upcoming",
    "completed"
]
import "./css/filtertabs.css"
import anime from 'animejs/lib/anime.es.js';

class Tabs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            on: 0
        }
        this.onChange = props.onChange || -1
        this.onClick = this.onClick.bind(this)
    }
    onClick(i){
        var _  
        this.setState({on: i})
        if(this.onChange !== -1){
            this.onChange((_ = tabs[i], _ = (i==0) ? -1 : _))
        }
    }
    render(){
        return (
            <div className={"w-full  h-fit  space-x-2 p-2 capitalize grid grid-cols-4 sm:grid-cols-[repeat(4,25%)] text-center sm:text-[100%] text-[80%]"}>
                {
                    tabs.map(
                        (v,i)=>{
                            var id = ""
                            if(i == this.state.on){
                                id = "filterclicked"
                            }
                            return <div className={"gg p-3 sm:p-2 cursor-pointer  f" + i} id={id} key={uuidv4()} onClick={
                                  ()=>  this.onClick(i)
                            }>{v}</div>
                        }
                    )
                }
            </div>
        )
    }

}

export default Tabs