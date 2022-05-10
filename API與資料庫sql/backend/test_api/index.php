<?php 
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
</head>
<body>
    <?php
    if (!isset($_SESSION['isLogged'])){
        echo "You arenot Logged in";
        
    ?>
    <button><a href="login.html">Log in</a></button>
    <?php
    }
    else{
        echo $_SESSION['username'];
    ?>
    <button onclick="logout()">Log out</button>
    <?php }?>
    <button onclick="usrinfor()">Userinfo</button>
    <button><a href="update.html">Update</a></button>
    <button><a href="register.html">Register</a></button>
    <button><a href="getticket.html">Get Ticket</a></button>
    <button><a href="schedule.html">Schedule</a></button>
    <button><a href="booking.html">Booking</a></button>
    


    <script>
        function logout(){
            fetch('http://localhost:8081/backend/session.php',{
                method:'DELETE',
            }).then(res => {
                status = res.status
                console.log(status)
                if (status == 200){
                    alert("LOG oUT")
                    location.replace( "./index.php")
                }
            }).catch(function (error){
                console.error(error)
            })
        }

        function usrinfor(){
            fetch('http://localhost:8081/backend/userinfo.php',{
                method:'GET',
            }).then(res => {
                status = res.status
                console.log(status)
                if (status == 403)
                    alert("Not Login Yet!")
                return res.text()
            }).then(text =>{
                console.log(text)
            }).catch(function (error){
                console.error(error)
            })
        }
    </script>
</body>
</html>