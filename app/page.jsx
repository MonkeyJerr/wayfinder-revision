'use client'
import TestCalendar from "../components/TestCalendar.jsx";
import React, { useState, useEffect } from "react";
import { Roboto } from 'next/font/google';
import Nav from '../components/Nav'


 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],

})


const page = () => {
    const [channelId, setChannelId] = useState(2);

  return (
    <div>
    <Nav onChannelChange = {setChannelId}/>
    <div className={`pt-4 ${roboto.className}`} style={{height: "100vh"}}>
        <TestCalendar channelId = {channelId}/>
    </div>
    </div>
  )
}

export default page