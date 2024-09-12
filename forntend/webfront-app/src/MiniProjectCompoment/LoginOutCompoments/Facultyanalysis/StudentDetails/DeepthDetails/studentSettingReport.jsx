import React from "react";

function OptionsReport({ date, setDate, option, setOption, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Date:", date, "Option:", option);
    onSubmit(); // Call the callback function when the form is submitted
  };

  return (
    <div className="options-report-container">
      <form onSubmit={handleSubmit} className="options-report-form">
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="option">Choose an Option:</label>
          <select
            id="option"
            name="option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="present">Presents</option>
            <option value="absent">Absents</option>
            <option value="all">All</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default OptionsReport;
