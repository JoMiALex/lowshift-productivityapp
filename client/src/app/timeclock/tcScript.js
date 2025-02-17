function clock(){
    // Current Date
    var monthList = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"];
    var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    var today = new Date();

    document.getElementById('Date').innerHTML = (dayList[today.getDay()] + " " + today.getDate() 
    + " " + monthList[today.getMonth()] + " " + today.getFullYear());

    //Current Time
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = h<11 ? 'AM': 'PM';

    h = h<10? '0'+h: h;
    m = m<10? '0'+m: m;
    s = s<10? '0'+s: s;

    document.getElementById('hr').innerHTML = h;
    document.getElementById('min').innerHTML = m;
    document.getElementById('sec').innerHTML = s;

}var inter = setInterval(clock, 400);

function toggleSidebar() {
    document.getElementById("sideBar").classList.toggle("active");
}
