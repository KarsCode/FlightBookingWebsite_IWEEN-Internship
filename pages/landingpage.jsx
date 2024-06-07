import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaArrowUp, FaBars } from 'react-icons/fa'; // Import the upward arrow icon
import './landingpage.css';
import LandingSearch from '../components/Landing/LandingSearch';
import Filters from '../components/Landing/Filters';
import FlightList from '../components/Landing/FlightList';

const LandingPage = () => {
    // Access the location state using useLocation hook
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [tripData, setTripData] = useState(null);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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

    const [maxPrice, setMaxPrice] = useState(40000);
    console.log('LandingPage:',maxPrice)


    const [filters, setFilters] = useState({
        selectedAirline: '',
        priceRange: [1010, 40000],
        selectedDepartTime: '',
        selectedArrivalTime: '',
        flightNumber: ''
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    return (
        <div>
            <div className='relative bg-custom-gradient h-full'>
                <div className='flex flex-col pb-50'>
                    <div>
                        <LandingSearch />
                    </div>

                    <div className='flex gap-12'>
                        <div className='pl-24 pt-20 pb-20 hidden sm:block'>
                            <Filters onFilterChange={handleFilterChange} maxPrice={maxPrice} />
                        </div>
                        <div className='mt-[65px] w-full'>
                            {<FlightList filters={filters} onMaxPriceChange={setMaxPrice}/>}
                            
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={scrollToTop}
                className='fixed bottom-10 right-4 p-3 bg-[#06539A] border-3 border-orange-500 text-white rounded-full shadow-xl hover:bg-orange-500 hover:border-[#06539A] transition duration-400'
                style={{ zIndex: 1000 }} // Ensures the button is always on top
            >
                <FaArrowUp size={20} />
            </button>
            <button
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className="fixed top-4 right-4 p-3 bg-[#06539A] text-white rounded-full shadow-xl active:scale-95 transition duration-400 sm:hidden flex gap-2 items-center"
                style={{ zIndex: 1000 }} // Ensures the button is always on top
            >
                <FaBars size={10} />
                <div className='text-xs'>
                    Filter
                </div>
            </button>

            {isFiltersVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 h-3/4 overflow-auto flex-col items-center">
                        <button
                            onClick={() => setIsFiltersVisible(false)}
                            className="mt-4 p-2 bg-orange-500 text-white rounded-full border-2 border-black active:scale-95 transition duration-300"
                        >
                            Close
                        </button>
                        <Filters onFilterChange={handleFilterChange} maxPrice={maxPrice} />

                    </div>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
