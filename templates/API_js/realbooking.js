function fetchdata(){
    var urlink = "http://localhost//backend/schedule.php?" + window.location.href.split("?")[1]
    fetch(urlink,{
        method:'GET'
    }).then(res => {
        status = res.status
        if (status == 200)
        return res.text()
        else if (status == 403){
        alert("尚未登入")
        location.replace('index.html')
        }
    }).then(text =>{
        ar = JSON.parse(text)

        $("#username").html(ar['username'])
        $("#bgtime").html(ar['departure_time'])
        $("#endtime").html(ar['arrival_time'])
        $("#train_type").html(ar['train_type'])
        $("#train_num").html(ar['train_num'])
        $("#departure").html(ar['departure'])
        $("#destination").html(ar['destination'])
    }).catch(function (error){
        console.error(error)
    })
}
const ticketform = document.getElementById('ticketform')

ticketform .addEventListener('submit',(e) => {
    e.preventDefault()
    
    var count = 0
    const formData = new FormData(document.querySelector('form'))
    const searchparams = new URLSearchParams()
    for (const pair of formData){
        if (pair[1] == "0")
        count+=1
        if (count != 3)
        searchparams.append(pair[0],pair[1])
    }
    const trainid = window.location.href.split("?")[1]
    searchparams.append(trainid.split("=")[0],trainid.split("=")[1])
    console.log(searchparams)
    
    fetch('http://localhost//backend/journey.php',{
        method:'POST',
        body: searchparams,
        credentials: 'include'
    }).then(res => {
        status = res.status

        if (status == 201){
            alert("訂票成功")
            console.log(count)
            location.replace('bookinghis.html')
        }
        else if (status == 403){
            alert("尚未登入")
            location.replace('login.html')
        }
        else{
            alert("票數不可為零或缺失")
        }
    }).catch(function (error){
         console.error(error)
    })
})