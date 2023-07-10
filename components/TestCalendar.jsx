'use client'
import moment from "moment";
import BasicCalendar from "./BasicCalendar.jsx";
import { useEffect } from 'react';
import { useScheduleManager } from "../hooks/useScheduleManager";
import {useMemo} from 'react';
import { Calendar, CalendarProps, momentLocalizer } from "react-big-calendar";
import "../styles/calendar.css";



const events = [
  {
    start: moment("2023-06-28T10:00:00").toDate(),
    end: moment("2023-06-28T11:00:00").toDate(),
    title: "Some random crap",
  },
  {
    start: moment("2023-06-24T14:00:00").toDate(),
    end: moment("2023-06-24T15:30:00").toDate(),
    title: "More random crap",
  },
];

const localizer = momentLocalizer(moment);


export default function TestCalendar() {
const scheduleManager = useScheduleManager();

const formats = useMemo(() => {
    return {
      dayFormat: (date, culture, localizer) => {
        return localizer.format(date, "ddd [\r\n]DD", culture);
      },
      eventTimeRangeFormat: (times, culture, localizer) => {
        let { start, end } = times;
        var diff = (end.getTime() - start.getTime()) / 1000;
        diff /= 60;
  
        if (Math.abs(Math.round(diff)) <= 30) {
          // check if event duration is 30 min or less
          let timeRange30m = localizer.format(start, "h A", culture);
          // eslint-disable-next-line eqeqeq
          if (start.getMinutes() != 0) {
            timeRange30m = localizer.format(start, "h:mm A", culture);
          }
          return timeRange30m;
        } else {
          // check if event duration is more than 30 min
          // eslint-disable-next-line eqeqeq
          if (start.getMinutes() == 0 && end.getMinutes() == 0) {
            // check if events are on o'clock
            if (
              // eslint-disable-next-line eqeqeq
              (start.getHours() < 12 && start.getHours() != 24 && end.getHours() < 12) ||
              (start.getHours() >= 12 && end.getHours() >= 12)
            ) {
              // check if events am or pm
              return `${localizer.format(start, "h", culture)} - ${localizer.format(end, "h A", culture)}`;
            } else {
              // check if events am - pm
              return `${localizer.format(start, "h A", culture)} - ${localizer.format(end, "h A", culture)}`;
            }
          } else {
            // events are not o'clock
            if ((start.getHours() < 12 && end.getHours() < 12) || (start.getHours() >= 12 && end.getHours() >= 12)) {
              // check if events am or pm
              return `${localizer.format(start, "h:mm", culture)} - ${localizer.format(end, "h:mm A", culture)}`;
            } else {
              // check if events am - pm
              return `${localizer.format(start, "h:mm A", culture)} - ${localizer.format(end, "h:mm A", culture)}`;
            }
          }
        }
      },
    };
  }, []);

  return <BasicCalendar 
            events={scheduleManager.events} 
            format = {formats}
            localizer = {localizer}
            defaultView ={"week"}
            views = {{week: true}}
            onRangeChange = {scheduleManager.rangeChange}
        />;
}