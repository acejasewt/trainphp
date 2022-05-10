const loginform = document.getElementById('loginform')

loginform.addEventListener('submit',(e) => {
    e.preventDefault()

    const formData = new FormData(document.querySelector('form'))
    const searchparams = new URLSearchParams()
    for (const pair of formData){
        searchparams.append(pair[0],pair[1])
    }

    fetch('http://localhost:8081//backend/session.php',{
        method:'POST',
        body: searchparams,
        credentials: 'include'
    }).then(res => {
        status = res.status
        console.log(status)
        
        if (status == 200)
        //alert("Logged")
        location.replace( "./index.php")
        else if (status == 404)
        alert("not found")
        else
        alert("invalid")
        return res.text()
    }).then(text =>{
        console.log(text)
    }).catch(function (error){
        console.error(error)
    })

})


