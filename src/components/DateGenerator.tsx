import React from 'react';

interface DateGeneratorProps {
  fromDate: Date;
  endDate: Date;
  dayName: string; // The day name to filter, e.g., "Monday", "Tuesday"
  onDatesGenerated: (dates: string[]) => void; // Callback function to send dates back to parent
}

const DateGenerator: React.FC<DateGeneratorProps> = ({ fromDate, endDate, dayName, onDatesGenerated }) => {
  const generateDates = () => {
    const dates: Date[] = [];
    let currentDate = new Date(fromDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === getDayIndex(dayName)) {
        dates.push(new Date(currentDate)); // Push a new date object to avoid mutation
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return dates.map(date => date.toISOString().slice(0, 10)); // Format dates to YYYY-MM-DD strings
  };

  const getDayIndex = (dayName: string) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays.indexOf(dayName);
  };

  const dates = generateDates();

  // Invoke the callback with generated dates when ready
  React.useEffect(() => {
    if (dates.length > 0) {
      onDatesGenerated(dates);
    }
  }, [dates, onDatesGenerated]);

  return (
    <div>
      {/* <h2>Dates for {dayName}s between {fromDate.toISOString().slice(0, 10)} and {endDate.toISOString().slice(0, 10)}:</h2>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default DateGenerator;