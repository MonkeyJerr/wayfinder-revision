import Player from '../components/player.jsx'
import TestCalendar from "../components/TestCalendar.jsx";
import React, { useCallback, useMemo } from "react";


const page = () => {

  return (
    <div>
    <div style={{height: "100vh"}}>
        <TestCalendar
        />
    </div>
    </div>
  )
}

export default page