function fetchdata(){
    fetch("http://localhost:8081//backend/schedule.php?departure=%E5%8F%B0%E5%8C%97&destination=%E9%AB%98%E9%9B%84&start_time=12%3A00",{
        method:'GET'
    }).then(res => {
        status = res.status
        if (status == 200)
        return res.text()
        else if (status == 404)
        alert("not found")
        else
        alert("invalid")
        
    }).then(text =>{
        ar = JSON.parse(text)

        for (let obj of ar) {
            obj = JSON.parse(obj)
            document.getElementById("display").innerHTML +=
            '<div>' +
                `<div>${obj.departure}</div>` +
                `<div>${obj.departure_time}</div>` +
                `<div>${obj.destination}</div>` +
                `<div>${obj.arrival_time}</div>` +
                `<form class="ticketbox">` +
                    `<input type="hidden" name="trainid" value="${obj.id}">`+
                    `<input type="submit" class="subtraininforword booking" value="訂票">`+
                `</form>`+
            '</div>'
        }
    }).catch(function (error){
        console.error(error)
    })
}
var win = window.location.origin + window.location.pathname
if (win != window.location.href){
    var urlink = "http://localhost:8081//backend/schedule.php?" + window.location.href.split("?")[1]

    fetch(urlink,{
        method:'GET'
    }).then(res => {
        status = res.status
        console.log(res)

        if (status == 200)
        location.replace("http://localhost:8081/backend/web/bookpage.html?" + window.location.href.split("?")[1])
        else{
            alert("Not Login")
            return res.text()
        }
    }).then(text =>{
        console.log(text)
    }).catch(function (error){
        console.error(error)
    })
}

