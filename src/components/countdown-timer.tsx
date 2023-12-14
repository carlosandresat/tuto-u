"use client"
import { useState, useEffect } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetTime: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining()
  );

  function calculateTimeRemaining(): TimeRemaining {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      // Timer has reached or passed the target time
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetTime]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div>
            <p className="text-5xl">{timeRemaining.days}</p>
            <p className="text-muted-foreground">Days</p>
          </div>
          <div>
            <p className="text-5xl">{timeRemaining.hours}</p>
            <p className="text-muted-foreground">Hours</p>
          </div>
          <div>
            <p className="text-5xl">{timeRemaining.minutes} </p>
            <p className="text-muted-foreground">Minutes</p>
          </div>
          <div>
            <p className="text-5xl">{timeRemaining.seconds}</p>
            <p className="text-muted-foreground">Seconds</p>
          </div>
       </div>
    </div>
  );
};