import { useLocation } from 'react-router-dom'
import './landingpage.css';
import LandingSearch from '../components/Landing/LandingSearch';
import Filters from '../components/Landing/Filters';
import FlightList from '../components/Landing/FlightList';
import { useEffect, useState } from 'react';

const LandingPage = () => {
    // Access the location state using useLocation hook
    const location = useLocation();
    const [tripData, setTripData] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tripData = {
            actioncode: searchParams.get('actioncode'),
            agentid: searchParams.get('agentid'),
            opid: searchParams.get('opid'),
            sessiontoken: searchParams.get('sessiontoken'),
            origin: searchParams.get('origin'),
            destination: searchParams.get('destination'),
            onwarddate: searchParams.get('onwarddate'),
            returndate: searchParams.get('returndate'),
            numadults: searchParams.get('numadults'),
            numchildren: searchParams.get('numchildren'),
            numinfants: searchParams.get('numinfants'),
            journeytype: searchParams.get('journeytype'),
            prefclass: searchParams.get('prefclass'),
            requestformat: searchParams.get('requestformat'),
            resultformat: searchParams.get('resultformat'),
            searchtype: searchParams.get('searchtype'),
            numresults: searchParams.get('numresults'),
        };

        setTripData(tripData);
    }, [location]);

    return (
        <div>
            <div className='gradient-bg'>
                <div className='flex flex-col pb-50'>
                    <div onClick={()=>{console.log(tripData.origin)}}>
                        <LandingSearch tripData = { tripData }/>
                    </div>
                    <div className='flex gap-12'>
                        <div className='pl-24 pt-20 pb-20'>
                            <Filters/>
                        </div>
                        <div className='mt-[65px] w-full'>
                            <FlightList/>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default LandingPage;
