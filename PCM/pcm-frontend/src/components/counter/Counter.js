import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const Counter = ({timeRemaining, setTimeRemaining}) => {
    const { loading, emailSent, sendOTPMessage, generatedOTP, email, maxInActiveInterval, sendOTPError } = useSelector(state => state.sendOTP);
    // const [timeRemaining, setTimeRemaining] = useState(maxInActiveInterval);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // countdown timer
    useEffect(() => {
        if (timeRemaining < 0) return;
        const intervalId = setInterval(() => {
            setTimeRemaining(timeRemaining - 1000);
            
            setSeconds(Math.floor((timeRemaining / 1000) % 60));
            setMinutes(Math.floor((timeRemaining / 1000 / 60) % 60));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeRemaining]);

    return (
        <div className="counter">
            <p className='m-0'>
                Resend OTP in {`${minutes}`.padStart(2, 0)}:{`${seconds}`.padStart(2, 0)}
            </p>
        </div>
    );
}

export default Counter