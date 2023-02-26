import React, { useState, useEffect } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import frLocal from "moment/locale/fr";
import moment from "moment";

function DateRangePickerField(props) {
    const { dateStart, setDateStart, dateEnd, setDateEnd, id } = props;
    const [focusedInput, setFocusedInput] = useState(null);
    useEffect(() => {
        moment.locale("fr", frLocal);
    }, []);
    let required = false;
    if (props.required !== undefined) {
        required = true;
    }
    let minimumNight = 1;
    if (props.minimumNight !== undefined) {
        minimumNight = props.minimumNight;
    }
     let orientation = "horizontal";
    
    const handleDateChange = ({ startDate, endDate }) => {
        let nbDay = 0;
        if (endDate !== null) {
            nbDay = Math.abs(startDate.diff(endDate, "days"));
        }
        if (nbDay > 90) {
            startDate = moment();
            endDate = null;
        }
        setDateStart(startDate);
        setDateEnd(endDate);
    };
    return (
        <DateRangePicker
            startDatePlaceholderText="Date de début"
            endDatePlaceholderText="Date de fin"
            startDate={dateStart}
            endDate={dateEnd}
            startDateId={id + "startDateId"}
            endDateId={id + "endDateId"}
            onDatesChange={handleDateChange}
            required={required}
            focusedInput={focusedInput}
            onFocusChange={(focus) => setFocusedInput(focus)}
            displayFormat="DD/MM/YYYY"
            hideKeyboardShortcutsPanel={true}
            withFullScreenPortal={false}
            numberOfMonths={2}
            orientation={orientation}
            firstDayOfWeek={1}
            minDate={moment()}
            maxDate={moment().add(3, "y")}
        />
    );
}
export default DateRangePickerField;