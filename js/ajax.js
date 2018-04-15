
$(function(){
    console.log=function(){};
    //global variables
    var lat,
        lon,
        newLat,
        newLon, 
        city,
        lang, 
        OWM_URL, 
        temp,
        humid,
        pressure,
        country,
        temp_min,
        temp_max,
        clouds,
        counter = 0;
        
    var $map = $("#map");
    var $spin = $(".spinner");
    var $show = $("#showMap");
    var $input = $("#input-city");
    var $lang = $("#language");
    var leve = $("#otherValue");
    var reve = $("#someOtherValue");
    
    //Function to read and set the second and the third values of option to use one select to put 3 deferent values in three deferent function

    $("#language").change(function () {
        var otherValue=$(this).find('option:selected').attr('data-othervalue');
        var someOtherValue=$(this).find('option:selected').attr('data-someothervalue');
        $('#otherValue').val(otherValue);
        $('#someOtherValue').val(someOtherValue);
        
    });
          
    //OpenWeatherMap API key
    var _0xffcc=["\x63\x33\x37\x37\x38\x31\x31\x62\x38\x38\x61\x39\x61\x32\x31\x63\x38\x61\x64\x31\x33\x36\x30\x39\x31\x65\x35\x38\x39\x63\x62\x65"];var OWM_API_KEY=_0xffcc[0]
    
    //display current city on load, or at least city of your IP address provider
    currentCity();
    
    //Main function for city search
    searchCity();
    
    //Function to show google map, definition is at bottom
    toggleMap();
    
    //this is going to display a city of your IP address provider
    //it might be wrong ofcourse, in my case it's wrong by 500km. But then you can type in your desired city
    //I might include navigator.geolocation in future, but it's often not available in browsers, so for now it's this
    function currentCity(){
        var _0xf928=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x69\x70\x69\x6E\x66\x6F\x2E\x69\x6F\x3F\x74\x6F\x6B\x65\x6E\x3D\x37\x31\x33\x32\x62\x62\x34\x66\x31\x34\x30\x64\x63\x61","\x67\x65\x74\x4A\x53\x4F\x4E"];$[_0xf928[1]](_0xf928[0],callback)
        
        function callback(data) {
            lat = data.loc.split(',')[0];
            lon = data.loc.split(',')[1];
    
            OWM_URL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&lang="+lang+"&units=metric&appid=" + OWM_API_KEY;
            updateWeather(OWM_URL);
            
        }
    }
    
    //Gets city based on your input
    function yourCity() {
        
        var city = $input.val();
        var urlParam = "";
        var lang = $lang.val();
        
        //if input is invalid, it shows weather in my city :)
        if (!city) {
            city="Helsingborg";
            urlParam = "q="+city;
        }
        
        //regular expression to check whether input string contains any numbers
        //if it contains number, I assume that it is a ZIP code, and changed url parameter accordingly
        var regEx = city.match(/\d+/g);
        if (regEx !== null) {
            urlParam = "zip="+city;
        }
        else {
            urlParam = "q="+city;
        }
        
        OWM_URL = "https://api.openweathermap.org/data/2.5/weather?"+urlParam+"&lang="+lang+"&region="+country+"&units=metric&appid=" + OWM_API_KEY;
        updateWeather(OWM_URL);
    }

    //main function for updating weather based on url which is generated based on city or current place
    function updateWeather(OWM_URL) {
        
        //weatherData will hold all requested data(typically object or array) in JSON format
        $.getJSON(OWM_URL, function(weatherData){
            
            var _0x10a5=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x6F\x6D\x61\x67\x6F\x6A\x70\x75\x6C\x6A\x69\x63\x2E\x6E\x65\x6F\x63\x69\x74\x69\x65\x73\x2E\x6F\x72\x67\x2F\x77\x65\x61\x74\x68\x65\x72\x5F\x70\x68\x6F\x74\x6F\x73\x2F\x75\x65\x6C\x6B\x6E\x76\x6B\x6E\x6A\x62\x62\x63\x62\x63\x64\x63\x62\x64\x6A\x64\x63\x6E\x75\x6E","\x69\x63\x6F\x6E","\x77\x65\x61\x74\x68\x65\x72","\x2E\x50\x4E\x47","\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x69\x6D\x61\x67\x65","\x75\x72\x6C\x28","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x6F\x6D\x61\x67\x6F\x6A\x70\x75\x6C\x6A\x69\x63\x2E\x6E\x65\x6F\x63\x69\x74\x69\x65\x73\x2E\x6F\x72\x67\x2F\x77\x65\x61\x74\x68\x65\x72\x5F\x70\x68\x6F\x74\x6F\x73\x2F\x6A\x6E\x6B\x66\x76\x6E\x68\x75\x65\x6A\x63\x64\x66\x65\x72\x62\x76\x6E\x64\x5F","\x2E\x4A\x50\x45\x47","\x29","\x63\x73\x73","\x62\x6F\x64\x79"];var icon=_0x10a5[0]+ weatherData[_0x10a5[2]][0][_0x10a5[1]]+ _0x10a5[3];$(_0x10a5[10])[_0x10a5[9]](_0x10a5[4],_0x10a5[5]+ _0x10a5[6]+ weatherData[_0x10a5[2]][0][_0x10a5[1]]+ _0x10a5[7]+ _0x10a5[8])
                city = weatherData.name;
                country = weatherData.sys.country;
                windDir = degToCompass(weatherData.wind.deg % 360);
                windName =weatherData.wind.name;
                humid = weatherData.main.humidity;
                
                pressure = weatherData.main.pressure;
                clouds = weatherData.clouds.all;
                $show.val(city+"'s MAP ⦿");
                $(".widget-menu__header").text(city + ", " + country);
                $("#pressure").html(pressure + " hpa");
                $("#humid").html(humid + "%");
                $(".weather-card__img").attr("src", icon);
                $(".weather-card__means").text(firstLetterUpper(weatherData.weather[0].description) + "  (" + clouds + "% of clouds)");
                $(".container-fluid").fadeIn(800);
                $spin.hide();
                
                unitTrigger(weatherData);
                
                lat = weatherData.coord.lat;
                lon = weatherData.coord.lon;
                
                //after weather was updated with new latitude and longitude, set them to be equal to current ones
                newLat = lat;
                newLon = lon;

                
                //Time zone function using lat and lon from update weather function
                var _0x899a=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x77\x6F\x72\x6C\x64\x77\x65\x61\x74\x68\x65\x72\x6F\x6E\x6C\x69\x6E\x65\x2E\x63\x6F\x6D\x2F\x70\x72\x65\x6D\x69\x75\x6D\x2F\x76\x31\x2F\x74\x7A\x2E\x61\x73\x68\x78\x3F\x71\x3D","\x2C","\x26\x66\x6F\x72\x6D\x61\x74\x3D\x6A\x73\x6F\x6E\x26\x6B\x65\x79\x3D\x61\x62\x35\x63\x61\x66\x63\x66\x64\x37\x30\x32\x34\x64\x38\x64\x38\x38\x66\x31\x31\x32\x36\x31\x31\x31\x38\x31\x30\x30\x34\x26\x63\x61\x6C\x6C\x62\x61\x63\x6B\x3D\x74\x66\x75\x6E\x63"];var url=_0x899a[0]+ lat+ _0x899a[1]+ lon+ _0x899a[2]
                //reference to jQuery library is required prior to using this function
                $.getScript(url, function (response) { });
                
                
                window.tfunc = function (response) {
                var time = "";
                var gmtDef = "";
                time = city+" Time: " + response.data.time_zone[0].localtime;
                gmtDef = response.data.time_zone[0].utcOffset;
                $(".widget-menu__time").text(time);
                $(".widget-menu__gmt").text('UTC/GMT '+gmtDef);

            };
                  
        }).fail(function(error) {
            
            //handle "404 not found" error, and show my city (usually happens when it's a wrong input)
            if (error.status == 404) {
                yourCity();
            }
            else {
                //if it's come other problem, show currentCity (shows unexpectedly)
                currentCity();
            }
        });
    }
    
    //every click on unit button increases counter and calls this function which converts data
    //if the counter is odd number units are imperial, else metric
    function updateUnits(weatherData) {
        
        temp = weatherData.main.temp;
        windSpeed = weatherData.wind.speed*3.6;
        temp_max = weatherData.main.temp_max;
        temp_min = weatherData.main.temp_min;
        if(counter % 2 == 1) {
            //unary + operator, converts operand to a number if it already isn't, this will also ditch any unnecessary zeros
            temp = +(temp * (9/5) + 32).toFixed(1) +"°F";
            temp_max = +(temp_max * (9/5) + 32).toFixed(1) +"°F";
            temp_min = +(temp_min * (9/5) + 32).toFixed(1) +"°F";
            windSpeed = +(windSpeed * 0.62137119223733).toFixed(2)+" mp/h";
            $("#change").val("°C");

        }
        else {
            temp = +temp.toFixed(1) +"°C";
            temp_max = +temp_max.toFixed(1) +"°C";
            temp_min = +temp_min.toFixed(1) +"°C";
            windSpeed = +windSpeed.toFixed(2)+" kp/h";
            $("#change").val("°F");
        }
        
        $(".weather-card__number").text(temp);
        $('#maxTemp').text(temp_max);
        $('#minTemp').text(temp_min);
        //sometimes there isn't info about wind direction, if that happens I put N as a direction
        if(windDir) {
            $('#direction').text(windDir);
            $("#speed").text(windSpeed);
        }
        else {
            $('#direction').text("N ");
            $("#speed").text(windSpeed);
        }
    }
    
    //function for updating weather data on every API call and updating units on every click
    function unitTrigger(data) {
        updateUnits(data);
        $("#change").off("click").on("click",function(){
            counter++;
            updateUnits(data);
        });
    }

    //turn degreess into wind direction name, StackOverflow thank you
    function degToCompass(num) {
        
        //Divide angle by 22.5 because 360/16 = 22.5deg per direction change
        //Add 0.5 so that when we divide the value we can break the 'tie' between the direction change threshold
        // 'tie' means, for example if its 11.25 degress we don't know if it's "N" or "NNE", because it's on the threshold
        var val = Math.floor((num / 22.5) + 0.5);
        
        //16 directions which are going clockwise starting from North
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        
        //Return the value from array at the index of (mod 16)
        return arr[(val % 16)];
    }
    
    //Monitors if the enter was pressed while typing in input field, if it's pressed, fire up click event on Go button
    function onEnterSearch() {
        $input.keyup(function(event) {
            if (event.keyCode == 13) {
                $("#submit").click();
            }
        });
    }
    
    //Main function for city search
    function searchCity() {
        onEnterSearch();
        
        $("#submit").off('click').on('click',function() {
            $(".container-fluid").fadeOut(200);
            $spin.show();
            yourCity();
            event.preventDefault();
            $input.val('').blur();
        });
    }
    
    
    //Weather description comes with first letter lowercase, I like it uppercase, so that's this
    function firstLetterUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    //BELOW IS GOOGLE MAPS SECTION

    function googleMaps(lati, longi, leve, reve){
        
        window.google = {};
        
        //api url
        var _0x47d3=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x61\x70\x73\x2E\x67\x6F\x6F\x67\x6C\x65\x61\x70\x69\x73\x2E\x63\x6F\x6D\x2F\x6D\x61\x70\x73\x2F\x61\x70\x69\x2F\x6A\x73\x3F\x6B\x65\x79\x3D\x41\x49\x7A\x61\x53\x79\x44\x68\x31\x74\x72\x51\x5F\x68\x2D\x4A\x69\x42\x78\x69\x79\x34\x37\x6B\x52\x67\x5A\x76\x65\x48\x51\x59\x33\x50\x67\x70\x78\x79\x45\x26\x72\x65\x67\x69\x6F\x6E\x3D","\x26\x6C\x61\x6E\x67\x75\x61\x67\x65\x3D","\x26\x63\x61\x6C\x6C\x62\x61\x63\x6B\x3D\x3F"];var GGL_URL=_0x47d3[0]+ reve+ _0x47d3[1]+ leve+ _0x47d3[2]
        var pos= {lat: lati, lng: longi};
        var map = null, marker = null;
        
        //send api request and set callback function
        
        $.getJSON(GGL_URL, initMap);   
        //callback function for getJSON method, gets called after successful request
        function initMap(){
            
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: pos
            });
            
            marker = new google.maps.Marker({
                map: map,
                position: pos,
                draggable: true
            });
            
            //after marker was dragged to new position, save it's position in new variables
            google.maps.event.addListener(marker, 'dragend', function(ev){
                //get position of new marker
                newLat = marker.getPosition().lat(); // new Lat-Lon  after dragend-event
                newLon = marker.getPosition().lng();
            });
    
            //map won't get shown without this, because div was hidden and map acts the same without resize trigger, it's like an update
            google.maps.event.trigger(map, 'resize');
        }
    }
    
    //Function to show/hide a map on button click
    function toggleMap() {
        
        $show.click(function() {
            if($map.is(':visible')) {
                if(newLat != lat || newLon != lon) {
                    //update weather with new latitude and longitude
                    OWM_URL = "https://api.openweathermap.org/data/2.5/weather?lat="+newLat+"&lon="+newLon+"&lang="+lang+"&units=metric&appid=" + OWM_API_KEY;
                    
                    updateWeather(OWM_URL);
                }
                $map.fadeOut();
                $show.val(city+"'s MAP ⦿");
            }
            else {
                $spin.fadeIn(100);
                $map.fadeIn();
                googleMaps(lat, lon, $("#otherValue").val() ,$("#someOtherValue").val());
                $spin.fadeOut(100);
                $show.val("X");
            }
        });
    }   
});


