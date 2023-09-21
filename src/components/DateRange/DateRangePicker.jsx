import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'

const DateRangePicker = ({ startDate, endDate, onChange }) => {
  return (
    <div className="date-range-picker">
      <DatePicker
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => onChange('start', date)}
        selectsStart
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        startDate={startDate}
        endDate={endDate}
        onChange={(date) => onChange('end', date)}
        selectsEnd
        placeholderText="End Date"
      />
    </div>
  )
}

// DateRangePicker.propTypes = {
//   startDate: PropTypes.date,
//   endDate: PropTypes.date,
//   onChange: PropTypes.string,
// }
DateRangePicker.propTypes = {
  startDate: PropTypes.string.isRequired, // Example: '2023-02-01'
  endDate: PropTypes.string.isRequired, // Example: '2023-02-28'
  onChange: PropTypes.func.isRequired, // A function to handle date changes
}

export default DateRangePicker
