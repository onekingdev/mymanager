// ** React Imports
import { Link } from 'react-router-dom';
import { customInterIceptors } from '../../../lib/AxiosProvider';

import { useRef, useEffect, useState, useMemo } from 'react';
// ** Reactstrap Imports
import { Button } from 'reactstrap'
import { getMetadata } from 'video-metadata-thumbnails';
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import { useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// ** Styles
import '@styles/base/pages/page-misc.scss'
import { flat } from 'postcss-rtl/lib/affected-props';


const Video = () => {
    const API = customInterIceptors();
    const { token } = useParams();
    // console.log(token)
    const decoded = jwt.decode(token);
    // console.log("this is decoded data", decoded);
    // ** Hooks
    const { skin } = useSkin();
    const videoRef = useRef(null); 
    const [total, setTotal] = useState(0);
    const [isRun, setIsRun] = useState(false);
    const handleTimeUpdate = (event) => {
        const currentTime = event.target.currentTime; 
        const percentageWatched = (currentTime / total) * 100;
        if (percentageWatched > decoded.percentage && isRun === false) {
            API.post('/automation/setVideoWatch', decoded);
            setIsRun(true);
        }
      };
    const totalDuration = async() => {
        const blob = await fetch(decoded.url).then((r) => r.blob()); // Replace 'url' with your video file's URL
        const metadata = await getMetadata(blob);
        setTotal(metadata.duration); 
    }
    useEffect(()=> {
        totalDuration()
    }, [])
    // useMemo(()=> {
        
    //     console.log(total)
    //     console.log(percentageWatched, decoded.percentage)
    //     if (percentageWatched > decoded.percentage && isRun === false) {
    //         API.post('/automation/setVideoWatch', decoded)
    //         isRun = true;
    //         // console.log('setvideo')
    //         // if (isRun==1) {
    //         //     console.log(isRun)
    //         // }
            
    //     }
    // }, [currentTime])

    const illustration = skin === 'dark' ? 'error-dark.svg' : 'error.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default
    return (
        <div className="misc-wrapper">
           <video ref={videoRef} src={decoded.url} onTimeUpdate={handleTimeUpdate} controls height="500px" />
        </div>
    )
}
export default Video
