var win = window.location.origin + window.location.pathname
if (win != window.location.href){
    var urlink = "http://localhost/teamwork_tenth_php/templates/bookingres.html?"+window.location.href.split("?")[1]
    location.replace(urlink)
}