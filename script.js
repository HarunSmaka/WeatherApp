$(document).ready(function(){

    $(function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var yyyy = today.getFullYear();

        today = dd + " " + month[mm] + " " + yyyy;
        $("#currentDate").text("Today, " + today)
    });

    var city = [];
    $(".main").hide();
    $(".forecast").hide();
   



    $("#button1").click(function(temp){
        $("#forecastWeather").empty();
        $("#nextFiveDays").empty();
        temp.preventDefault();

        var user_city = $("#city_value").val();
        if (user_city !== ""){
            $.ajax({
                type: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + user_city + '&appid=9dcd8991f9f548f9d28bc5cf37a80c4e&units=metric',
                dataType: 'jsonp',
                success: function(data){
                    $(".main").show();
                    city.push(user_city);
                    $("#weather").empty().text(data.weather[0].description);
                    $("#city").empty().text(data.name);
                    $("temperature").empty().text(data.main.temp + "°C");
                    $("#pressure").empty().append("Pressure: " + data.main.pressure + " hPa");
                    $("#min_temp").empty().append("Min temperature: " + data.main.temp_min + "°C");
                    $("#humidity").empty().append("Humidity: " + data.main.humidity + " %");
                    $("#max_temp").empty().append("Max temperature: " + data.main.temp_max + "°C");
                    $("#wind_speed").empty().append("Wind Speed: " + data.wind.speed + " m/s");
                    $("#wind_direction").empty().append("Wind Direction: " + data.wind.deg + "°");
                    $("#icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");


                }
            })
        } else{
            $("#city_value").attr("placeholder", "Field is empty"); 
        }
    });



    
    $("#button2").click(function(temp){
        temp.preventDefault();
        var user_city = city.slice(-1)[0]; 
        $.ajax({
            type: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + user_city + '&appid=9dcd8991f9f548f9d28bc5cf37a80c4e&units=metric',
            dataType: 'jsonp',
            
            success: function(data){
                $("#forecastWeather").empty();
                $(".forecast").show();
                
                var table = "";
                for (var i = 6; i < data.list.length; i += 8) {
                    table += "<tr>";
                    table += "<td>" + data.list[i].dt_txt.split(' ')[0];
                    table += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";
                    table += "<td>" + data.list[i].main.temp + "</td>";
                    table += "<td>" + data.list[i].weather[0].description + "</td>";
                    table += "<td>" + data.list[i].main.temp_min + "°C</td>";
                    table += "<td>" + data.list[i].main.temp_max + "°C</td>";
                    table += "<td>" + data.list[i].main.pressure + "hPa</td>";
                    table += "<td>" + data.list[i].main.humidity + "%</td>";
                    table += "<td>" + data.list[i].wind.speed + "m/s</td>";
                    table += "<td>" + data.list[i].wind.deg + "°</td>";
                    table += "</tr>";
                }

                $('#forecastWeather').append('<thead><tr><td>Date</td><td>Weather</td><td>Temperature</td><td>Description</td><td>Min temp</td><td>Max Temp</td><td>Pressure</td><td>Humidity</td><td>Wind Speed</td><td>Wind Direction</td></tr></thead>');
                $("#forecastWeather").append(table);
                $("#nextFiveDays").empty().append("5 Day Forecast for " + data.city.name);
                $('html, body').animate({
                    scrollTop: $(".forecast").offset().top
                }, 1000);
                
            }
        })
    });






});