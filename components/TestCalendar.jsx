'use client'
import moment from "moment";
import BasicCalendar from "./BasicCalendar.jsx";
import { useEffect } from 'react';
import { useScheduleManager } from "../hooks/useScheduleManager";
import { useDrawerManager } from "../hooks/useDrawerManager";
import {useMemo, useCallback, useState} from 'react';
import { Calendar, CalendarProps, momentLocalizer } from "react-big-calendar";
import "../styles/calendar.css";
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Tab, Tabs } from "@mui/material";



const localizer = momentLocalizer(moment);


export default function TestCalendar({channelId}) {
const scheduleManager = useScheduleManager(channelId);
const drawerManager = useDrawerManager(scheduleManager.range);

const [currentTabIndex, setCurrentTabIndex] = useState(0);
 
  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

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

  const eventStyleGetter = useCallback((event, start, end, isSelected) => {


    let backgroundColor = "";
    let opacity = 0;
    if (isSelected) {
        backgroundColor = "white";
        opacity = 1;
    }
    // if the event is currently going on, it will be highlighted
    else if ((moment(start).unix() <= moment().unix()) && (moment().unix() <= moment(end).unix())) {
        backgroundColor = "#0043d6";
        opacity = 1;
    }
    else {
        backgroundColor = "#0043d6";
        opacity = 0.7;
    }

    let selectedClassName = "";
    if (isSelected) {
      selectedClassName = "bigCalendarSelectedEvent";
    }

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "6px",
      opacity: opacity,
      color: "white",
      border: "1px solid",
      borderColor: "#01426A",
    };

    return {
      className: selectedClassName,
      style: style,
    };
  }, []);

  return (
    <div>
        <BasicCalendar 
            style={{
                height: '150%'
            }}
            events={scheduleManager.events} 
            format = {formats}
            localizer = {localizer}
            defaultView ={"week"}
            views = {{week: true}}
            onRangeChange = {scheduleManager.rangeChange}
            eventPropGetter = {eventStyleGetter}
            onSelectEvent = {drawerManager.eventSelected}
        />
        <Drawer 
            anchor={"right"} 
            open={drawerManager.isOpen} 
            onClose={drawerManager.isClosed}
            PaperProps={{
                sx: { 
                    maxWidth: "50%",
                    p: "2.5em"
                },
              }}>
            <Typography className="font-bold text-4xl">
                {drawerManager.title}
            </Typography>
            <br/>
            <Tabs 
                value={currentTabIndex} 
                onChange={handleTabChange}
                sx={{
                    ".Mui-selected": {
                        color: "#0043d6",
                        fontWeight: "bold"
                    }
                }}
                TabIndicatorProps={{
                    style: {
                      backgroundColor: "#0043d6"
                }
                }}>
                <Tab label='Program' />
                <Tab label='Episode' />
            </Tabs>
            <br/>

            {currentTabIndex === 0 &&
            <div>
                <Grid container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={4}>
                        <Typography className="text-gray-400 text-lg">Description</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography>{drawerManager.description}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography className="text-gray-400 text-lg">Start</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography>{drawerManager.startTime}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography className="text-gray-400 text-lg">End</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography>{drawerManager.endTime}</Typography>
                    </Grid>
                </Grid>

                {drawerManager.image16x9 && 
                <div>
                    <Divider textAlign="center" className="text-gray-400 text-lg pt-8" component="div" sx={{ borderTopWidth: "50px" }}>16x9 Thumbnail</Divider>
                        <br/>
                        <div><img src={drawerManager.image16x9}/></div>
                </div>
                }

                {drawerManager.image4x3 &&
                <div>
                    <Divider textAlign="center" className="text-gray-400 text-lg pt-8" component="div" sx={{ borderTopWidth: "50px" }}>16x9 Thumbnail</Divider>
                        <br/>
                        <div>4x3 Image: <img src={drawerManager.image4x3}/></div>
                </div>
                }

                {drawerManager.image3x4 &&
                <div>
                    <Divider textAlign="center" className="text-gray-400 text-lg pt-8" component="div" sx={{ borderTopWidth: "50px" }}>16x9 Thumbnail</Divider>
                        <br/>
                        <div>3x4 Image: <img src={drawerManager.image3x4}/></div>
                </div>
                }

                {drawerManager.image2x1 &&
                <div>
                    <Divider textAlign="center" className="text-gray-400 text-lg pt-8" component="div" sx={{ borderTopWidth: "50px" }}>16x9 Thumbnail</Divider>
                        <br/>
                        <div>2x1 Image: <img src={drawerManager.image2x1}/></div>
                </div>
                }

                {drawerManager.image1x1 &&
                <div>
                    <Divider textAlign="center" className="text-gray-400 text-lg pt-8" component="div" sx={{ borderTopWidth: "50px" }}>16x9 Thumbnail</Divider>
                        <br/>
                        <div>1x1 Image: <img src={drawerManager.image1x1}/></div>
                </div>
                }
            </div>
            }
            
            {currentTabIndex === 1 &&
            <div>
                <Grid container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={4}>
                        <Typography className="text-gray-400 text-lg">Episode Title</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography>{drawerManager.episodeTitle && 
                        <div>{drawerManager.episodeTitle}</div>}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography className="text-gray-400 text-lg">Episode Description</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography>{drawerManager.episodeDesc && 
                        <div>{drawerManager.episodeDesc}</div>}</Typography>
                    </Grid>
                </Grid>
            </div>
            }
        </Drawer>
    </div>

  );
        
}