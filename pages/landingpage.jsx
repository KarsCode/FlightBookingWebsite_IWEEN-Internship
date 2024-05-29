import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import the upward arrow icon
import './landingpage.css';
import LandingSearch from '../components/Landing/LandingSearch';
import Filters from '../components/Landing/Filters';
import FlightList from '../components/Landing/FlightList';

const LandingPage = () => {
    // Access the location state using useLocation hook
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
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

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className='gradient-bg'>
                <div className='flex flex-col pb-50'>
                    <div>
                        <LandingSearch />
                    </div>
                    <div className='flex gap-12'>
                        <div className='pl-24 pt-20 pb-20'>
                            <Filters />
                        </div>
                        <div className='mt-[65px] w-full'>
                            <FlightList />
                        </div>
                    </div>
                </div>
            </div>
            <button 
                onClick={scrollToTop} 
                className='fixed bottom-10 right-10 p-3 bg-[#06539A] border-3 border-orange-500 text-white rounded-full shadow-xl hover:bg-orange-500 hover:border-[#06539A] transition duration-400'
                style={{ zIndex: 1000 }} // Ensures the button is always on top
            >
                <FaArrowUp size={20} />
            </button>
        </div>
    );
}

export default LandingPage;
