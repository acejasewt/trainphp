const loginform = document.getElementById('loginform')
const loginmsg = document.getElementById('loginmsg')

loginform.addEventListener('submit',(e) => {
    e.preventDefault()

    const formData = new FormData(document.querySelector('form'))
    const searchparams = new URLSearchParams()
    for (const pair of formData){
        if (pair[1] != "")
        searchparams.append(pair[0],pair[1])
    }

    fetch('http://localhost//backend/session.php',{
        method:'POST',
        body: searchparams,
        credentials: 'include'
    }).then(res => {
        status = res.status
        loginmsg.innerHTML = ""

        if (status == 200)
        location.replace( "index.html")
        else if (status == 404)
        loginmsg.innerHTML += `<p>未有相符的使用者名稱或密碼</p>`
        else
        loginmsg.innerHTML += `<p>欄位未輸入</p>`
    }).catch(function (error){
        console.error(error)
    })
})

function getloginstatus(){
    fetch('http://localhost/backend/userinfo.php',{
        method:'GET',
    }).then(res => {
        status = res.status
        if (status == 200){
            alert("您已登入")
            location.replace("index.html")
        }
    }).catch(function (error){
        console.error(error)
    })
}
getloginstatus()

