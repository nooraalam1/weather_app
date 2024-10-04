import React from 'react';
import { Outlet } from 'react-router-dom';
import WeatherUi from './WeatherUi';

const Base = () => {
    return (
        <div>
            <WeatherUi></WeatherUi>
            <Outlet></Outlet>
        </div>
    );
};

export default Base;