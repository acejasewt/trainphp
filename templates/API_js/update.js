$(document).ready(function () {
    fetch('http://localhost/backend/userinfo.php',{
        method:'GET',
    }).then(res => {
        status = res.status
        if (status == 403){
            alert("尚未登入")
            location.replace('index.html')
        }
        return res.text()
    }).then(text =>{
        var ar = JSON.parse(text)
        $('.input').each(function(){
            $(this).attr("placeholder",ar[$(this).attr('name')])
        })
    }).catch(function (error){
        console.error(error)
    })
})

const updateform = document.getElementById('updateform')
updateform.addEventListener('submit',(e) => {
    e.preventDefault()
    const checkpw = $('input[name="checkpw"]').val()
    const password = $('input[name="password"]').val()
    const updateparams = new URLSearchParams()

    if ((checkpw == password)){
        
        $('.input').each(function(){
                var temp
                ($(this).val()!= '')?(temp = $(this).val()):(temp = $(this).attr("placeholder"))
                updateparams.append($(this).attr('name'),temp)
        })
        
        fetch('http://localhost//backend/userinfo.php',{
            method:'PATCH',
            body: updateparams,
            credentials: 'include'
        }).then(res => {
            status = res.status
            document.getElementById('changemsg').innerHTML = ""

            if (status == 200)
            document.getElementById('changemsg').innerHTML += "修改成功"
            else if (status == 403)
            alert("還未登入")
            else
            document.getElementById('changemsg').innerHTML += "格式不符"
        }).catch(function (error){
            console.error(error)
        })

    }else{
    document.getElementById('changemsg').innerHTML = ""
    document.getElementById('changemsg').innerHTML += "密碼驗證錯誤"
    }
})