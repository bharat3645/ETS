const fs = require('fs');
const path = require("path");

function create_dict(){
    for (var i=0, values=new Array(arguments.length);i<arguments.length; i++) values[i]  = arguments[i]
    var hmm =  Object.fromEntries(new Map(values))
    return hmm
}

const p = path.join(__dirname, "users.json")

class UserModel{
    constructor(id,password,name,phone){
        this.id = id
        this.password = password
        this.phone = phone
        this.name = name
    }
    signUp(){
        var d  = this.read()
        d = Object.assign(d, create_dict([this.id, {
            id: this.id,
            password: this.password,
            name: this.name,
            phone:this.phone
        }]))
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