import { useState } from "react";

const WeatherUi = () => {
    const [cityName, setCityName] = useState("");
    const [info, setInfo] = useState(null);
    const [icon, setIcon] = useState("");

    const searchValue = (e) => {
        e.preventDefault();
        const city = e.target.name.value;
        setCityName(city);
        search(city);
    };

    const search = async (cityName) => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7a0465fbafd8e78d04ffcc755e3e0ee8&units=metric`
        );
        const data = await response.json();
        setInfo(data);
        setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    };

    return (
        <div>
            {/* Center input and search button */}
            <div className="mt-5 flex justify-center items-center p-5">
                <form
                    onSubmit={searchValue}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Search here"
                        className="input input-bordered input-info w-full sm:w-64 md:w-96"
                    />
                    <button className="btn btn-outline btn-default w-full sm:w-auto">
                        Search
                    </button>
                </form>
            </div>

            {/* Background and weather output section */}
            <div
                className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center min-h-screen h-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://i.ibb.co.com/5cJ3cXH/img1.jpg')` }}
            >
                {/* Weather info centered for larger screens */}
                <div className="p-8 bg-black bg-opacity-50 rounded-lg text-white mx-auto">
                    <h1 className="">
                        Weather Forecast of{" "}
                        <span className="font-semibold">
                            {info?.name} ({info?.sys?.country})
                        </span>
                    </h1>

                    {/* Colorful Gradient Line */}
                    <hr className="my-4 border-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full" />

                    <h2 className="card-title">Temperature: {info?.main?.temp} °C</h2>
                    <h2 className="card-title">Feels Like: {info?.main?.feels_like} °C</h2>
                    <p className="card-title">
                        Weather: {info?.weather && info.weather.length > 0
                            ? info.weather[0].main
                            : "Loading..."}
                    </p>
                    <p className="card-title">Humidity: {info?.main?.humidity} %</p>
                    <p className="card-title">Wind: {info?.wind?.speed} meter/sec</p>
                    <p className="card-title">Visibility: {info?.visibility} meter</p>
                </div>

                {/* Enhanced weather icon section with a more user-friendly background */}
                {icon && (
                    <div className="flex justify-center items-center">
                        <div className="rounded-full bg-gray-800 bg-opacity-60 p-5 shadow-lg">
                            <img
                                src={icon}
                                className="w-32 sm:w-40 md:w-48 lg:w-56"
                                alt="Weather Icon"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherUi;
