import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    // Timer to redirect
    let navigate = useNavigate();
    const [seconds, setSeconds] = useState(10);

    const countDown = () => {
        if (seconds < 1) {
            navigate('/', { replace: true });
        } else {
            setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
        }
    };

    countDown();

    return (
        <div className="notFound">
            <h1>404 - Not Found</h1>
            <Link to="/" className="image">
                <img
                    src={require('../../assets/404image.png')}
                    className="image"
                />
            </Link>
            <h4>{`Redirecting to main page after ${seconds} seconds`}</h4>
        </div>
    );
};

export default NotFound;
