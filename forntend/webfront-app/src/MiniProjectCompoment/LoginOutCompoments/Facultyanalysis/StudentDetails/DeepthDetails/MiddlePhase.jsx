import React, { useState } from "react";
import StudentReportDetailDeepth from "./StudentReportDetails";
import OptionsReport from "./studentSettingReport";

export default function MiddlePhaseD() {
  const [date, setDate] = useState("");
  const [count, updateCount] = useState(0);
  const [option, setOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const handleFormSubmit = () => {
    setIsSubmitted(false); // Reset to false before setting it to true
    updateCount(count + 1);
    setTimeout(() => setIsSubmitted(true), 0); // Set to true after a short delay to trigger useEffect
  };

  return (
    <div>
      <OptionsReport
        date={date}
        setDate={setDate}
        option={option}
        setOption={setOption}
        onSubmit={handleFormSubmit} // Pass the callback function
      />
      {isSubmitted && (
        <StudentReportDetailDeepth date={date} option={option} count={count} />
      )}{" "}
      {/* Render StudentReport when isSubmitted is true */}
    </div>
  );
}
