import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 7);
    launchDate.setHours(0, 0, 0, 0);

    const calculateTimeLeft = () => {
      const difference = launchDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-6">
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-accent/20 rounded-lg px-3 py-4 sm:px-6 sm:py-6 min-w-[60px] sm:min-w-[90px] shadow-deep">
              <span className="font-serif text-2xl sm:text-4xl md:text-5xl text-accent font-semibold animate-pulse-gold">
                {String(block.value).padStart(2, '0')}
              </span>
            </div>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm mt-2 block uppercase tracking-widest">
            {block.label}
          </span>
          {index < timeBlocks.length - 1 && (
            <span className="absolute top-1/2 -right-3 text-accent/50 text-2xl hidden sm:block">:</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
