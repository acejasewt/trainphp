function getloginstatus(){
    fetch('http://localhost/backend/userinfo.php',{
        method:'GET',
    }).then(res => {
        status = res.status
        if (status == 200){
            document.getElementById('alreadylogin').innerHTML +=
            `<button class="header_btn btn_img">`+                    
                `<img class="userimg" src="static/img/usrimg.jpg" alt="usrimg">`+
                `<div class="dropdown">`+
                    `<ul>`+
                        `<li class="dropdown_link"><a href="overview.html">帳戶總覽</a></li>`+
                        `<li class="dropdown_link"><a href="logout.html">登出</a></li>`+
                    `</ul>`+
                `</div>`+
            `</button>`
        }else{
            document.getElementById('headerlist').innerHTML +=
            `<li>`+
                `<a href="login.html"><button class="header_btn header_btn_hover">會員登入</button></a>`+
            `</li>`
        }
    }).catch(function (error){
        console.error(error)
    })
}
