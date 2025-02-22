const fs = require('fs');
const path = require("path");

function create_dict(){
    for (var i=0, values=new Array(arguments.length);i<arguments.length; i++) values[i]  = arguments[i]
    var hmm =  Object.fromEntries(new Map(values))
    return hmm
}

const p = path.join(__dirname, "events.json")

class Event{
    constructor(id,name,time,date,adr,){
        this.id = id
        this.name = name
        this.time = time
        this.date = date
        this.adr = adr
        this.payload = {
            id: this.id,
            name: this.name,
            time: this.time,
            date:this.date,
            adr: this.adr
        }
    }
    book(){
        var d  = this.read(),j
        d[this.name] = (j = (d[this.name] ?? {}),create_dict([this.id, this.payload]))
        fs.writeFileSync(p, JSON.stringify(d), "utf8");
    }
    read(){
        var d  = fs.readFileSync(p, "utf8");
        return JSON.parse(d)
    }
    find(){
        var d  = this.read()
        try{
            return d[this.name][this.id]
        }
        catch{
            return false
        }
    }

}
module.exports = Event