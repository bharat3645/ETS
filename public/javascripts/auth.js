(
    function(){
        var data = {headers:{
            "Authorization": localStorage.getItem("token")
        }}
        fetch("/api/user",data).then((res) => res.json()).then( (res)=>{
            console.log(res)
            if(res.status === 200){
                return (window.userData = res.user)
                
            }

            location.href = "/login"
        }
        )
    }

)()