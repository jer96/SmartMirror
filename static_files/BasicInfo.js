<!--
/**
  * Jeremiah Bill
  * Script used to show date and weather information 
  * OpenWeatherMap API
  * http://openweathermap.org/api
*/
function UpdateClock() {
    var d = new Date();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    weekday = day[d.getDay()];


    pre = "0"

    if (hours == 0) {
        zone = "AM";
        hours = 12;
    }
    if (hours < 12) {
        zone = "AM";
    } else if (hours == 12) {
        zone = "PM";
        hours = 12;
    } else {
        zone = "PM";
        hours -= 12;
    }
    if (minutes >= 10) {
        pre = ""
    }
    time = hours + ':' + pre + minutes + ' ' + zone
    var date = [months[d.getMonth()], d.getDate(), year].join(' ');
    document.getElementById('time').innerHTML = time;
    document.getElementById('date').innerHTML = weekday + ' ' + date;
    setTimeout(UpdateClock, 1000);
}
UpdateClock();


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    gettingJSON(position.coords.latitude, position.coords.longitude);
}

function gettingJSON(arg1, arg2) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + arg1 + "&lon=" + arg2 + "&appid=9be1f5cf513f1528206d175f1e663f44", function(json) {
        var data = JSON.parse(JSON.stringify(json));
        document.getElementById('temp').innerHTML = data.name + ": " + convertTemp(data.main.temp) + "°F";
        document.getElementById('lowTemp').innerHTML = "Low: " + convertTemp(data.main.temp_min) + "°F" + " | High: " + convertTemp(data.main.temp_max) + "°F";
        var type = JSON.parse(JSON.stringify(data.weather[0]));
        document.getElementById('type').innerHTML = "Expect " + type.description;
        var picId = type.id;
        var timeSwitch = new Date(data.dt * 1000);
        var hour = timeSwitch.getHours() - 4;
        switch (hour) {
            case -4:
                hour = 20;
                break;
            case -3:
                hour = 21;
                break;
            case -2:
                hour = 22;
                break;
            case -1:
                hour = 23;
                break;
            default:
                break;
        }
        //daytime am
        if (hour < 12) {
            if (picId >= 200 && picId < 300) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/11d.png";
            } else if (picId >= 300 && picId < 500) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/09d.png";
            } else if (picId >= 500 && picId < 600) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/10d.png";
            } else if (picId >= 600 && picId < 700) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/13d.png";
            } else if (picId >= 700 && picId < 800) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/50d.png";
            } else if (picId >= 800) {
                switch (picId) {
                    case 800:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/01d.png";
                        break;
                    case 801:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/02d.png";
                        break;
                    case 802:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/03d.png";
                        break;
                    case 803:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/04d.png";
                        break;
                    case 804:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/04d.png";
                        break;
                }

            }

        }
        //nightime pm
        else {
            if (picId >= 200 && picId < 300) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/11n.png";
            } else if (picId >= 300 && picId < 500) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/09n.png";
            } else if (picId >= 500 && picId < 600) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/10n.png";
            } else if (picId >= 600 && picId < 700) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/13n.png";
            } else if (picId >= 700 && picId < 800) {
                document.getElementById('icon').src = "http://openweathermap.org/img/w/50n.png";
            } else if (picId >= 800) {
                switch (picId) {
                    case 800:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/01n.png";
                        break;
                    case 801:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/02n.png";
                        break;
                    case 802:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/03n.png";
                        break;
                    case 803:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/04n.png";
                        break;
                    case 804:
                        document.getElementById('icon').src = "http://openweathermap.org/img/w/04n.png";
                        break;
                }

            }

        }

    });
}

function convertTemp(kelvin) {
    var fahren = 1.8 * (kelvin - 273) + 32;
    return fahren.toFixed();
}
getLocation();
-->