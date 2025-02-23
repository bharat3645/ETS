import React from "react";
import "./css/tabs.css"
import { v4 as uuidv4 } from 'uuid';

class TabNav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tab: 0
        }
        console.log(props.data)
        this.society = ['All'].concat(props.data)     
        this.onClick = this.onClick.bind(this)
        this.onChange = props.onChange || -1
    }
    onClick(i){
        this.setState({tab: i})
        if(this.onChange != -1) this.onChange(i == 0 ? -1 : this.society[i])
    }
    render(){
        return <div className="flex whitespace-nowrap space-x-5 text-[90%]  bg-(--bg-c) p-3 font-[DM_Sans]">
            {
                this.society.map((v,i)=>{
                    return <span key={uuidv4()} className={"cursor-pointer p-3 pl-10 pr-10 bg-white rounded-2xl" + ((this.state.tab == i) ? " tabClicked":"")} onClick={()=>{this.onClick(i)}}>{v}</span>
                })
            }
        </div>
    }

}


export default TabNav