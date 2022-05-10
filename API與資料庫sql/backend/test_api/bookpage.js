const ticketform = document.getElementById('ticketform')

ticketform .addEventListener('submit',(e) => {
    e.preventDefault()
    
    const formData = new FormData(document.querySelector('form'))
    const searchparams = new URLSearchParams()
    for (const pair of formData){
        searchparams.append(pair[0],pair[1])
        console.log(pair[0],pair[1])
    }
    const trainid = window.location.href.split("?")[1]
    searchparams.append(trainid.split("=")[0],trainid.split("=")[1])

    fetch('http://localhost:8081//backend/journey.php',{
        method:'POST',
        body: searchparams,
        credentials: 'include'
    }).then(res => {
        status = res.status
        console.log(status)
        if (status == 201)
        return res.text()
        else if (status == 403){
            alert("not logged")
            location.replace('index.php')
        }
        else{
            alert("Invalid")
            location.replace('index.php')
        }
    }).then(text =>{
        console.log(text)
        alert("Booking Successful")
        location.replace('index.php')
    }).catch(function (error){
         console.error(error)
    })
})