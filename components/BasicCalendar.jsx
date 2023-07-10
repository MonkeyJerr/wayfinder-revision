'use client'

import moment from 'moment'
import {
  Calendar as BigCalendar,
  CalendarProps,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'


const mLocalizer = momentLocalizer(moment)

export default function Calendar(props) {
    return <BigCalendar {...props} localizer = {mLocalizer}/>
}
