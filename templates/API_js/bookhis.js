$(document).ready(function(){
    fetch('http://localhost//backend/journey.php', {
        method: 'GET'
    }).then(res => {
        status = res.status

        if (status == 403) {
            alert("尚未登入")
            location.replace("index.html")
        }
        else if ((status == 404) || status == 500) {
            document.getElementById("tickethisbox").innerHTML +=
            `<div class="jrtitlebox">`+
            `<p>沒有任何訂票紀錄</p>`+
            `</div>`
        }
        else
            return res.text()
    }).then(text => {
        var ar = JSON.parse(text)
        for (let obj of ar) {
            obj = JSON.parse(obj)
            var string = "";
            (obj['adult'] != 0)?(string+='<div class="ticket">全票'+obj['adult']+'張</div>'):"";
            (obj['child'] != 0)?(string+='<div class="ticket">兒童票'+obj['child']+'張</div>'):"";
            (obj['elder'] != 0)?(string+='<div class="ticket">敬老票'+obj['elder']+'張</div>'):"";

            document.getElementById("tickethisbox").innerHTML +=
            `<div class="jrtitlebox">`+
                `<div class="leftjrbox">`+
                    `<div class="locbox">`+
                        `<div>${obj['departure']}</div>`+
                        `<div class="arrowloc">`+
                            `<i class="fas fa-arrow-right"></i>`+
                        `</div>`+
                        `<div>${obj['destination']}</div>`+
                    `</div>`+
                    `<div class="datebox">2021/05/21</div>`+
                    `<div class="tmebox">`+
                        `<div>${obj['departure_time']}</div>`+
                        `<div class="tmei">`+
                            `<i class="fas fa-arrow-right"></i>`+
                        `</div>`+
                        `<div>${obj['arrival_time']}</div>`+
                        `<div class="train">${obj['train_type']}</div>`+
                    `</div>`+
                `</div>`+
                `<div class="ticbox">`+
                    string+
                    `<div class="rmtic"><a href="#">退票/換票</a></div>`+
                `</div>`+
            `</div>`
        }
    }).catch(function (error) {
        console.error(error)
    })
})