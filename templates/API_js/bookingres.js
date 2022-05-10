$(document).ready(function(){
    if (window.location.href.split("?")[1].includes("trainid")){
        var urlink = "http://localhost/teamwork_tenth_php/templates/realbooking.html?"+window.location.href.split("?")[1]
        location.replace(urlink)
    }else{
        var urlink = "http://localhost//backend/schedule.php?"+window.location.href.split("?")[1]
        fetch(urlink,{
            method:'GET'
        }).then(res => {
            status = res.status
            if (status == 200)
            return res.text()
            else if (status == 404){
                alert("無符合結果")
                location.replace("booking.html")
            }
            else{
                alert("格式不正確")
                location.replace("booking.html")
            }
            
        }).then(text =>{
            var adult =  Math.floor(Math.random()*(300-50+1))+50
            ar = JSON.parse(text)
            for (let obj of ar) {
                obj = JSON.parse(obj)

                var remain = Math.floor(Math.random() * 50)
                var string = "";
                (remain != 0)?(string = '<div class="subtraininforword">'+remain+'位</div>'):(string = '<div class="subtraininforword redcol ">0位</div>');
                var tick = "";
                (remain != 0)?(tick = '<form class="ticketbox"><input type="hidden" name="trainid" value="'+obj['id']+'"><input type="submit" class="subtraininforword booking" value="訂票"></form>'):(tick = '<div class="subtraininforword redcol">已無座位</div>');

                
                document.getElementById("display").innerHTML +=
                `<div class="traininforbox">`+
                    `<div class="traininfor">`+
                        `<div class="subtraininforword">`+
                            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                                id="Capa_1" x="0px" y="0px" viewBox="0 0 405.333 405.333"
                                style="enable-background:new 0 0 405.333 405.333;" xml:space="preserve">
                                <g>
                                    <g>
                                        <path
                                            d="M202.667,0C108.373,0,32,10.667,32,85.333V288c0,41.28,33.493,74.667,74.667,74.667l-32,32v10.667h256v-10.667l-32-32    c41.28,0,74.667-33.387,74.667-74.667V85.333C373.333,10.667,296.96,0,202.667,0z M106.667,320c-17.707,0-32-14.293-32-32    s14.293-32,32-32s32,14.293,32,32S124.373,320,106.667,320z M181.333,192H74.667V85.333h106.667V192z M298.667,320    c-17.707,0-32-14.293-32-32s14.293-32,32-32s32,14.293,32,32S316.373,320,298.667,320z M330.667,192H224V85.333h106.667V192z" />
                                    </g>
                                </g>
                            </svg>
                            ${obj['train_type']}${obj['train_num']}
                        </div>`+
                    `</div>`+
                    `<div class="traininfor">`+
                        `<div class="subtraininforword">${obj['departure']}</div>`+
                    `</div>`+
                    `<div class="traininfor">`+
                        `<div class="subtraininforword">${obj['destination']}</div>`+
                    `</div>`+
                    `<div class="traininfor">`+
                        `<div class="subtraininforword">1小時22分</div>`+
                    `</div>`+
                    `<div class="traininfor">`+
                        `<div class="subtraininforword">$${adult}</div>`+
                    `</div>`+
                    `<div class="traininfor">`+
                        `<div class="subtraininforword">$${Math.floor(adult*0.8)}</div>`+
                    `</div>`+
                    `<div class="traininfor">`+
                        `<div class="subtraininforword">$${Math.floor(adult*0.5)}</div>`+
                    `</div>`+
                    `<div class="traininfor">`+
                        string+
                    `</div>`+
                    `<div class="traininfor">`+
                        tick+
                    `</div>`+
                `</div>`
            }
        }).catch(function (error){
            console.error(error)
        })
    }
})

