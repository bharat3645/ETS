function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

(
    function(){
        var data = {headers:{
            "Authorization": localStorage.getItem("token")
        }}
        fetch("/api/ticket/" + getParameterByName("token"),data).then((res) => res.json()).then( (res)=>{
               try{
                   var s = res.booking
                   document.getElementById("title").innerText = s?.name 
                   document.getElementById("name").innerText = s?.id
                   document.getElementById("time").innerText = s.time
                   document.getElementById("date").innerText = s.date
                   document.getElementById("adr").innerText = s.adr
                   document.getElementById("img").src = s.url

               } 
               catch(e){console.log(e)}
        }
        )
    }

)()