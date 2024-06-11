import { useState } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [input, setInput] = useState('')
  const [weatherData, setWeatherData] = useState({
    loading: false,
    data: {},
    error: false
  })

  const toDateFunction = () => {
    const Months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
    const currentDate = new Date()
    let date = `${WeekDays[currentDate.getDay()]}  ${currentDate.getDate()}  ${Months[currentDate.getMonth()]} `
    return date;
  }

  const handleSearchQuery = async () => {
    // setInput('')
    setWeatherData({ ...weatherData, loading: true })
    let url = 'https://api.openweathermap.org/data/2.5/weather';
    let api_key = '5f48f8f2ab03674412051d55b8a92ec0'

    await axios
      .get(url, {
        params: {
          q: input,
          // units: metric,
          appid: api_key
        }
      })
      .then((res) => {
        console.log('res', res);
        setWeatherData({ ...weatherData, data: res.data, loading: false, error: false })
      })
      .catch((error) => {
        setWeatherData({ ...weatherData, data: {}, error: true })
        setInput(" ")
        console.log("something went wrong error message is :- ", error.message)
      })

  }
  return (
    <div className='bg-blue-100 w-full h-screen py-10'>
      <div className=''>
          <h1 className='text-center font-semibold text-4xl text-green-800 mb-8'>Weather App</h1>
        <div className='w-[600px] mx-auto  shadow-xl shadow-black rounded-tl-[30%] bg-transparent p-10 text-center'>
          <div className='w-[70%] my-10 rounded-xl bg-yellow-400 flex overflow-hidden mx-auto'>
            <input type="text"
            className='outline-none py-1.5 px-4 w-full'
              placeholder='enter city name ...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
            onClick={handleSearchQuery}
            className='bg-red-500 px-6 text-white font-semibold hover:bg-red-600 curser-pointer duration-300'
            >
              Search</button>
          </div>

          {
            weatherData.loading && (
              <div className="flex justify-center">
                <br />
                <br />
                <Oval type="Oval" color='red' width={50} height={50} />
              </div>
            )
          }

          {
            weatherData.error && (
              <div className='text-center text-red-500'>
                <br />
                <br />
                <span>
                  <FontAwesomeIcon icon={faFrown} className='text-3xl'/>
                  <span className='pl-10 font-medium'> City not found ! ...</span>
                </span>
              </div>
            )
          }
          {
            weatherData && weatherData.data && weatherData.data.main && (
              <div>
                <div>
                  <h1 className='text-4xl font-bold text-gray-600'>{weatherData.data.name} , <span>{weatherData.data.sys.country}</span></h1>
                </div>
                <div className='mt-4'>
                  <span className='text-xl font-medium text-gray-500'>{toDateFunction()}</span>
                </div>
                <div className='flex items-center justify-center gap-1 my-5'>
                  <img
                    className=''
                    src={`https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`}
                    alt={weatherData.data.weather[0].description}
                  />
                  <span className='text-3xl font-bold text-gray-800 pt-8'>
                  {Math.round(weatherData.data.main.temp - 273.15)} 
                  <sup>°C</sup>
                  </span>
                </div>
                <div className='text-gray-500 '>
                  <p>{weatherData.data.weather[0].description.toUpperCase()}</p>
                  <p>Wind Speed: {weatherData.data.wind.speed}m/s</p>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App
