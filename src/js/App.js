import React from 'react';
import axios from 'axios';
import {geolocated} from "react-geolocated";
import moment from 'moment';

import style from "../styles/style.less";
import MyImage from '/src/images/city.jpg';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            city: null
        };
    }

    componentDidMount() {
        this.getData();
    }
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }
    getData() {
        navigator.geolocation.getCurrentPosition((position) => {
            axios.get(
                `http://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=becf03b8755cb69c661e8f63e7cab62f&exclude=minutely,hourly,alerts&units=metric`
            ).then(response => {
                    this.setState({weather: response.data});
                }).catch(function (error) {
                alert('Please provide your geolocation');
            });
            axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDJAXhm1_raKHKUJkUicdmu9yJ4up1ITuQ`
            ).then(response => {
                this.setState({city: response.data.results[2].address_components[2].long_name});
            }).catch(function (error) {
               alert('Please provide your geolocation');
            });
        });
    }

    render() {
        let weather = this.state.weather;
        let city = this.state.city;
        return (
            <div>
                <header>
                    <div className={'header'}><h1>Let your day shine</h1></div>
                </header>
                <main>
                    <div className={'flex-container'}>
                        <div className={'forecast-today c-flex'}>
                            <div className={'forecast-header'}>
                                <div className={'day'}>{weather ? moment(weather.current.dt*1000).format("DD MMM h:mm") : ''}</div>
                            </div>
                            <div className={'forecast-content'}>
                                <div className={'location'}>{city}</div>
                                <div className={'degree'}>
                                    <div className={'num c-flex'}>
                                       <div className={'cur'}>{weather ? Math.round(weather.current.temp) : ''}<sup>o</sup>C</div>
                                        <div className={'feel'}><small>{weather ?  Math.round(weather.current.feels_like): ''}<sup>o</sup></small></div>
                                    </div>
                                </div>
                                <div className={'parameters c-flex'}>
                                    <span><i className={'fas fa-umbrella'}></i>Humidity: {weather ? weather.current.humidity: ''}%</span>
                                    <span><i className={'fas fa-wind'}></i>Wind speed: {weather ? Math.round((weather.current.wind_speed)*10)/10: ''} m/sec</span>
                                    <span><i className={'fas fa-cloud'}></i>Cloudiness: {weather ? weather.current.clouds: ''}%</span>
                                </div>
                            </div>
                        </div>
                        {
                            weather ? weather.daily.map((day, key) => {
                                if (key > 0){
                                    return(
                                        <div className={'forecast c-flex'} key={key}>
                                            <div className={'forecast-header'}>
                                                <div className={'day'}>{moment(day.dt*1000).format("DD MMM")}</div>
                                            </div>
                                            <div className={'detailed r-flex'}>
                                                <div className={'part c-flex'}>
                                                    <div className={'text'}>Morning</div>
                                                    <div className={'icon'}><i className="far fa-sun"></i></div>
                                                    <div className={'cur'}>{Math.round(day.temp.morn)}<sup>o</sup>C</div>
                                                    <div className={'feel'}><small>{Math.round(day.feels_like.morn)}<sup>o</sup></small></div>
                                                </div>
                                                <div className={'part c-flex'}>
                                                    <div className={'text'}>Evening</div>
                                                    <div className={'icon'}><i className="fas fa-cloud-moon"></i></div>
                                                    <div className={'cur'}>{Math.round(day.temp.eve)}<sup>o</sup>C</div>
                                                    <div className={'feel'}><small>{Math.round(day.feels_like.eve)}<sup>o</sup></small></div>
                                                </div>
                                                <div className={'part c-flex'}>
                                                    <div className={'text'}>Night</div>
                                                    <div className={'icon'}><i className="far fa-moon"></i></div>
                                                    <div className={'cur'}>{Math.round(day.temp.night)}<sup>o</sup>C</div>
                                                    <div className={'feel'}><small>{Math.round(day.feels_like.night)}<sup>o</sup></small></div>
                                                </div>
                                            </div>
                                            <div className={'parameters c-flex'}>
                                                <span><i className={'fas fa-umbrella'}></i>Humidity: {day.humidity}%</span>
                                                <span><i className={'fas fa-wind'}></i>Wind speed: {Math.round((day.wind_speed)*10)/10} m/sec</span>
                                                <span><i className={'fas fa-cloud'}></i>Cloudiness: {day.clouds}%</span>
                                            </div>
                                        </div>
                                    )
                                }
                            }) : null
                        }
                    </div>
                </main>
            </div>
        )
    }
}

export default geolocated()(App);
