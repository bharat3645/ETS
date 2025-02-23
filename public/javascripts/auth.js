(
    function(){
        var data = {headers:{
            "Authorization": localStorage.getItem("token")
        }}
        fetch("/api/user",data).then((res) => res.json()).then( (res)=>{
            console.log(res)
            if(res.status === 200){
               try{
                   var s = res.user
                   document.getElementById("branch").innerText = s?.branch || "Aids"
                   document.getElementById("stuname").innerText = s?.name
                   document.getElementById("enroll").innerText = s.id
               } 
               catch{}
                window.userData = res.user
                if((location.pathname == "/login")) return (location.href = "/home")
                return
                
            }
            if(!(location.pathname == "/login")) location.href = "/login"
        }
        )
    }

)()