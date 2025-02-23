const fs = require('fs');
const path = require("path");

function create_dict(){
    for (var i=0, values=new Array(arguments.length);i<arguments.length; i++) values[i]  = arguments[i]
    var hmm =  Object.fromEntries(new Map(values))
    return hmm
}

const p = path.join(__dirname, "users.json")

class UserModel{
    constructor(id,password,name,phone,branch){
        this.id = id
        this.password = password
        this.phone = phone
        this.name = name
        this.branch = branch
    }
    signUp(){
        this.payload = {
            id: this.id,
            password: this.password,
            name: this.name,
            phone:this.phone,
            branch: this.branch,
            bookings: [],
        }
        var d  = this.read()
        d = Object.assign(d, create_dict([this.id, this.payload]))
        fs.writeFileSync(p, JSON.stringify(d), "utf8");
    }
    updateBooking(token,payload){
        var d  = this.read()
        console.log(this.id)
        console.log(d[this.id])
        var k = (d[this.id]?.bookings ?? (d[this.id]['bookings'] = []))
        d[this.id]['bookings'] = k.concat(create_dict([token,payload]))
        fs.writeFileSync(p, JSON.stringify(d), "utf8");
    }
    read(){
        var d  = fs.readFileSync(p, "utf8");
        return JSON.parse(d)
    }
    find(){
        var d  = this.read(),k,k2,k3
        return d[this.id]
    }

}


module.exports = UserModel