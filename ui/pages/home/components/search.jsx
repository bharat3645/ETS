import React from "react";
import {Search} from 'lucide-react';
import "./css/search.css"

class SearchBox extends React.Component{
    constructor(props){
        super(props)
        this.placeholder = props.placeholder || "Searching events?"
    }
    render(){
        return <div className="searchbox flex w-full">
        <div className="searhb grid w-[100%] grid-cols-[90%_auto] rounded-3xl p-2">
          <div className="dd grid grid-cols-[10%_90%]">
            <div className="sicon flex items-center justify-center w-[80%]">
                <Search color="#5F6F65" size={30}/>
            </div>
            <input className="w-[80%]" id="search" type="text" placeholder={this.placeholder} />
          </div>
        </div>
    </div>
    }
}


export default SearchBox