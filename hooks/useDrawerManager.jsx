import { useEffect, useCallback, useRef, useState } from "react";
import moment from "moment";
import {buildThumbnailsByEventIdNonRepeat, buildThumbnailsByEventIdRepeat} from "../apiCalls/apiEndpoints.jsx"


//pass in open or not
export function useDrawerManager(range) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();


    // create an object for all the images

    const [image16x5, setImage16x5] = useState();
    const [image16x9, setImage16x9] = useState();
    const [image4x3, setImage4x3] = useState();
    const [image3x4, setImage3x4] = useState();
    const [image2x1, setImage2x1] = useState();
    const [image1x1, setImage1x1] = useState();

    const [episodeTitle, setEpisodeTitle] = useState();
    const [episodeDesc, setEpisodeDesc] = useState();



    async function getImages(images) {
        try {
            let res = await fetch(images);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    const eventSelected = useCallback((event, target) => {
        setIsOpen(true);
        setTitle(event.title);
        setDescription(event.description);
        console.log(event.start);
        setStartTime(moment(event.start).format('dddd, MM/DD/YYYY, h:mm a'));
        setEndTime(moment(event.end).format('dddd, MM/DD/YYYY, h:mm a'));
        let images;
        // get the thumbnails for selected event
        if (event.repeating) {
            images = buildThumbnailsByEventIdRepeat(event.id, Math.floor(event.start.getTime())/1000, Math.floor(event.end.getTime())/1000);
            console.log(images);
        }

        else {
            images = buildThumbnailsByEventIdNonRepeat(event.id);

        }

        // when a user selects a slot, then just use the start and end time of the slot selected for the window
        console.log(images);
        getImages(images).then(
            (data) => {
                setImage16x5(data.image16x5);
                setImage16x9(data.image16x9);
                setImage4x3(data.image4x3);
                setImage3x4(data.image3x4);
                setImage2x1(data.image2x1);
                setImage1x1(data.image1x1);

                setEpisodeTitle(data.episode.title);
                setEpisodeDesc(data.episode.description);

            }
        )

      }, []); 
    
    const isClosed = useCallback((event, reason) => {
        setIsOpen(false);
      }, []); 

    return {
        isOpen,
        title,
        description,
        startTime,
        endTime,
        image16x5,
        image16x9,
        image4x3,
        image3x4,
        image2x1,
        image1x1,
        episodeTitle,
        episodeDesc,
        eventSelected,
        isClosed
    };
}