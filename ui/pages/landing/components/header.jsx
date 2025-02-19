import React from "react";
import {Search} from 'lucide-react';

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            header: 1
        }
        this.onHeaderClicked = this.onHeaderClicked.bind(this)
    }
    onHeaderClicked(n){
        var s = document.getElementById("header" + this.state.header)
        s.className = "ht"
        var s = document.getElementById("header" + n)
        s.className = s.className + " header-clicked"
        this.state.header = n
        this.setState(this.state)
    }
    n(){
        this.onHeaderClicked(1)
    }
    render(){
        return (
        <div className="header w-full grid grid-cols-[auto_60%] p-2 space-y-1.5">
            <div className="grid grid-cols-[80%_25%]">
                <div className="searchbox flex w-full">
                    {/* <Search size={35}/> */}
                    <div className="searhb grid w-[100%] grid-cols-[90%_auto] rounded-3xl p-2">
                      <div className="dd grid grid-cols-[15%_85%]">
                        <div className="sicon flex items-center justify-center">
                            <Search color="#5F6F65"/>
                        </div>
                        <input className="w-[80%]" id="search" type="text" placeholder="Need some inspiration?" />
                      </div>
                    </div>
                </div>
                
            </div>
            <div className="hc flex">
                <div className="header-content w-[100%] grid grid-cols-6 text-xl">
                    <div className="ht" id="header1" onClick={() => this.onHeaderClicked(1)}>home</div>
                    <div className="ht" id="header2" onClick={()=>this.onHeaderClicked(2)}>podcast</div>
                    <div className="ht" id="header3" onClick={()=>this.onHeaderClicked(3)}>dumpit</div>
                    <div className="ht" id="header4" onClick={()=>this.onHeaderClicked(4)}>blogs</div>
                    <div className="ht" id="header5" onClick={()=>this.onHeaderClicked(5)}>about us</div>
                    <div className="ht" id="header6" onClick={()=>this.onHeaderClicked(6)}>help</div>
                </div>
            </div>
         </div>
    )
    }
}
export default Header