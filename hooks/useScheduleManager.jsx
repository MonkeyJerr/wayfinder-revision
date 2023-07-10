import { useEffect, useCallback, useRef, useState } from "react";
import moment from "moment";
import {buildProgramByIdAndWindowUrl} from "../apiCalls/apiEndpoints.jsx"


export function useScheduleManager() {
    const [events, setEvents] = useState();
    const [start, setStart] = useState("what");
    // set range on load to the current real time week
    const [range, setRange] = useState([moment(new Date).startOf('isoWeek').unix(), moment(new Date).endOf('isoWeek').unix()]);

    const rangeChange = useCallback((range) => {
        setRange([Math.floor(Date.parse(range[0]) / 1000), Math.floor(Date.parse(range[range.length-1]) / 1000)]);

      }, []); 
    
    // render all the events for the current week when the range changes, so on load and when the next or back button is pressed
      useEffect(() => {
        if (range !== undefined) {
            renderEvents();
        }
     }, [range]);

    async function getEvents() {
        let url = buildProgramByIdAndWindowUrl(2, range[0], range[1])
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    
    async function renderEvents() {
        let events = await getEvents();
        let eventList = [];
        events.forEach(event => {
            let eventObj = {title: event.program.title, start: moment(event.startTime).toDate(), end: moment(event.endTime).toDate()};
            eventList.push(eventObj);
        });

        setEvents(eventList)

    }



     //store title, start and end time in an array
    return {
        events,
        rangeChange
    };
}
