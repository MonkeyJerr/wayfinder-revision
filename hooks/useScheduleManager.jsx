import { useEffect, useCallback, useRef, useState } from "react";
import moment from "moment";
import {buildProgramByIdAndWindowUrl} from "../apiCalls/apiEndpoints.jsx"
import {baseURL} from '../app/constants'


export function useScheduleManager(id) {
    const [events, setEvents] = useState();
    // const[dummyEvents, setDummyEvents] = useState();
    const [start, setStart] = useState("");
    const [isLoading, setLoading] = useState(true);

    // set range on load to the current real time week
    const [range, setRange] = useState([moment(new Date).startOf('isoWeek').unix(), moment(new Date).endOf('isoWeek').unix()]);
    console.log(range)

    const rangeChange = useCallback((range) => {
        setRange([Math.floor(Date.parse(range[0]) / 1000), Math.floor(Date.parse(range[range.length-1]) / 1000)]);

      }, []); 

    // render all the events for the current week when the range changes, so on load and when the next or back button is pressed
      useEffect(() => {
        if (range !== undefined) {
            renderEvents();
        }
     }, [range, id]);


    async function getEvents() {
        let url = buildProgramByIdAndWindowUrl(baseURL, id, range[0], range[1])
        setLoading(true);
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    
    async function renderEvents() {
        let events = await getEvents();
        let eventList = [];
        events.forEach(event => {
            let eventObj = {
                            title: event.program.title, 
                            start: moment(event.startTime).toDate(), 
                            end: moment(event.endTime).toDate(), 
                            description: event.program.description,
                            id: event.program.id,
                            repeating: event.repeating
                           };
            eventList.push(eventObj);
        });

        setEvents(eventList)

    }

    function createEventsFromRange(range, title) {
        const events = [];
        const startMoment = moment.unix(range[0]).subtract(1, 'days').hour(0); // Change to 12AM
        const endMoment = moment.unix(range[0]).subtract(1, 'days').hour(24); // Change to 12PM
    
        const daysInRange = moment.unix(range[1]).diff(startMoment, 'days');
    
        for (let i = 0; i <= daysInRange; i++) {
            const event = {
                title: title,
                start: startMoment.clone().add(i, 'days').toDate(),
                end: endMoment.clone().add(i, 'days').toDate()
            };
            events.push(event);
        }
        // setLoading(true);
        // console.log(isLoading);
        return events;
    }

    const dummyEvents = createEventsFromRange([range[0], range[1]], "Loading Events");
    
     //store title, start and end time in an array
    return {
        events : isLoading ? dummyEvents : events,
        range,
        isLoading,
        rangeChange
    };
}
