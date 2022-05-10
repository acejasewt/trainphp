const registerform = document.getElementById('registerform')
const registermsg = document.getElementById('registermsg')

registerform .addEventListener('submit',(e) => {
    e.preventDefault()
    registermsg.innerHTML = ""
    
    if ($("input[name='password']").val() == $("input[name='checkpw']").val()){
        const formData = new FormData(document.querySelector('form'))
        const searchparams = new URLSearchParams()
        for (const pair of formData){
            searchparams.append(pair[0],pair[1])
        }
        fetch('http://localhost//backend/userinfo.php',{
            method:'POST',
            body: searchparams,
            credentials: 'include'
        }).then(res => {
            status = res.status
            console.log(status)
            
            if (status == 201)
            alert('創建成功')
            else if (status == 409)
            registermsg.innerHTML += `<p>名稱已被使用</p>`
            else
            registermsg.innerHTML += `<p>欄位未輸入</p>`
            return res.text()
        }).then(text =>{
            console.log(text)
        }).catch(function (error){
            console.error(error)
        })
    }
    else
    registermsg.innerHTML += `<p>密碼驗證不正確</p>`
})