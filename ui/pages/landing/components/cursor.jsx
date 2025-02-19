import React from "react";
class Cursor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            props: {
                left: 0,
                top: 0
            },
            wasOnText: false

        }
        this.cur = React.createRef()
    }
    componentDidMount(){
        var oo 
        var w = this.cur.current.clientWidth + "px"
        var h = this.cur.current.clientHeight + "px"
        document.addEventListener("mousemove", (e)=>{
            var state = {}
            var obj = {left:e.pageX , top:e.pageY}
            console.log(e)
            var k = (!isText(e.toElement.innerHTML))
            console.log(k)
            if(this.state.wasOnText){
                oo = {
                    width: w,
                    hegith: h
                }
            }
            if(k){
                oo = {
                    width: "1px",
                    "height": (e.toElement.clientHeight + (10)) + "px"
                }
                this.state.wasOnText = true
            }
            Object.assign(obj,oo)
            this.state.props = obj
            document.documentElement.style.cursor = 'none';
            this.setState(obj)
        })
    }
    render(){
        return <div className="cursor" ref={this.cur} style={this.state.props}></div>
    }
}


export default Cursor