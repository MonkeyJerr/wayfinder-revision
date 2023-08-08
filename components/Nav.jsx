'use client'

import React from 'react';
import "../styles/calendar.css";

import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


import {buildChannels} from "../apiCalls/apiEndpoints.jsx";
import HighQualityIcon from '@mui/icons-material/HighQuality';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {baseURL} from '../app/constants'




const Nav = ({onChannelChange}) => {
    const [channelId, setChannelId] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [buttonSelect, setButtonSelect] = useState(false);
    const [mainTitle, setMainTitle] = useState("CBS Sports HQ");
    // const scheduleManager = useScheduleManager(channelId);
    async function getChannels() {
        let url = buildChannels(baseURL);
        // fetch(url).then((response) => {
        //     response.json()
        // })
        // .then(response => {
        //     setData(response);
        //     console.log(response);
        // })
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function renderChannels() {
        let channel = await getChannels();
        let channelList = [];
        channel.forEach(channel => {
            let channelObj = {
                            id: channel.id, 
                            title: channel.name
                           };
            channelList.push(channelObj);
        });
        setData(channelList)
    }

    useEffect(() => {
        renderChannels();
     }, []);


  return (
    <div>
    <Box sx={{ 
        flexGrow: 1
        }}>
      <AppBar position="static" sx={{backgroundColor: "#0043d6"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="font-semibold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {mainTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer 
        anchor={"left"} 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        PaperProps={{
            sx: { 
                maxWidth: "25%",
                pt: '2em'
            }
        }}>
        <List>
        {data.map((text) => {
        const selectedChannelId = (channelId === text.id)   
        return (
          <ListItem key={text.id} disablePadding>
            <ListItemButton
                selected = {selectedChannelId}
                onClick={() => {
                    setIsOpen(false);
                    onChannelChange(text.id);
                    setButtonSelect((prev) => !prev);
                    setChannelId(text.id);
                    setMainTitle(text.title)
                    }
                }
                className={`text-xl hover:bg-gray-100 ${!selectedChannelId && "!text-gray-400"} ${selectedChannelId && "main-blue"}`}
                // sx={{
                //     "&.Mui-selected": {
                //       backgroundColor: "#2e8b57",
                //       textDecoration: "bold"
                //     },
                //     "&.Mui-focusVisible": {
                //       backgroundColor: "#2e8b57"
                //     },
                //     ":hover": {
                //       color: "white",
                //       textDecoration: "underline"
                //     }
                //   }}
                >
                <ListItemIcon>
                    {text.id === 2 && <HighQualityIcon className={`${!selectedChannelId && "!text-gray-400"} ${selectedChannelId && "main-blue"}`}/>}
                    {text.id === 4 && <VisibilityIcon className={`${!selectedChannelId && "!text-gray-400"} ${selectedChannelId && "main-blue"}`}/>}
                    {text.id === 5 && <SportsSoccerIcon className={`${!selectedChannelId && "!text-gray-400"} ${selectedChannelId && "main-blue"}`}/>}

              </ListItemIcon>
              <ListItemText 
                primary={text.title}
                ></ListItemText>
            </ListItemButton>
          </ListItem>
        )})}
        </List>
    </Drawer>
    </div>
  )
}

export default Nav