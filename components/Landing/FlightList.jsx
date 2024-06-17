/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import FlightCard from './FlightCard';
import { getUrlParams } from '../../utils/params';
import { IoMdCloseCircle } from "react-icons/io";
import './FlightList.css';
import airlineLogos from '../../utils/logos';

const FlightList = ({ filters, onMaxPriceChange }) => {

    console.log(filters.selectedFarePolicy)
    
    const location = useLocation();
    const params = getUrlParams(location);
    const [selectedButton, setSelectedButton] = useState('Cheapest Flights');
    const [flight0, setFlight0] = useState([]);
    const [flight1, setFlight1] = useState([]);
    const [trip0, setTrip0] = useState(null); // Initial state set to null
    const [trip1, setTrip1] = useState(null); // Initial state set to null
    const [currentFlights, setCurrentFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showNetFare, setShowNetFare] = useState(false);
    const [selectedFlightSet, setSelectedFlightSet] = useState('flight0'); // New state for selected flight set
    const [redirect, setRedirect] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);

    const numadults = urlParams.get('numadults') || '';
    const numchildren = urlParams.get('numchildren') || '';
    const numinfants = urlParams.get('numinfants') || '';
    const searchtype = urlParams.get('searchtype') || 'normal';


    const handleContinue = () => {
        const sessionToken = localStorage.getItem('TransactionStatus');
        const urlParams = new URLSearchParams({
            actioncode: 'FSTAXESV4',
            agentid: 'JY86528',
            cachekeyow: trip0.nextraflightkey,
            cachekeytw: trip1.nextraflightkey,
            opid: 'FS000',
            resultformat: 'jsonv2',
            sessiontoken: sessionToken,
            triptype: 'roundtrip',
            numadults: numadults,
            numchildren: numchildren,
            numinfants: numinfants
            // Add other necessary parameters here based on flight data
        });
        const bookingUrl = `/booking?${urlParams.toString()}`;
        setRedirect(bookingUrl);
    };

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const handleTripSelect = (flight, selectedFlightSet) => {
        console.log('List', selectedFlightSet);
        if (selectedFlightSet === 'flight0') {
            setTrip0(flight);
            setSelectedFlightSet('flight1')

        } else {
            setTrip1(flight);
            setSelectedFlightSet('flight0')

        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const fetchFlights = useCallback(async () => {
        const carriers = ['UK', '6E', 'SG', 'QP','AI'];
        const sessionToken = localStorage.getItem('TransactionStatus');

        const fetchCarrierFlights = async (carrier, journeyIndex) => {

            
            const xmlRequest = `
                <flightsearchrequest>
                    <credentials>
                        <username>APIUSER</username>
                        <password>APIUSER</password>
                        <officeid>SUPER</officeid>
                    </credentials>
                    <origin>${params.origin}</origin>
                    <destination>${params.destination}</destination>
                    <onwarddate>${params.onwarddate}</onwarddate>
                    <returndate>${params.returndate}</returndate>
                    <numadults>${params.numadults}</numadults>
                    <numchildren>${params.numchildren}</numchildren>
                    <numinfants>${params.numinfants}</numinfants>
                    <journeytype>${params.journeytype}</journeytype>
                    <prefclass>Y</prefclass>
                    <requestformat>JSON</requestformat>
                    <resultformat>JSON</resultformat>
                    <searchtype>${searchtype}</searchtype>
                    <sortkey></sortkey>
                    <issbt>false</issbt>
                    <profileid></profileid>
                    <numresults>100</numresults>
                    <actionname>FLIGHTSEARCH</actionname>
                    <preddeptimewindow>null</preddeptimewindow>
                    <prefarrtimewindow>null</prefarrtimewindow>
                    <prefcarrier>${carrier}</prefcarrier>
                    <excludecarriers/>
                    <refundtype>All</refundtype>
                    <layovertime></layovertime>
                    <promocode></promocode>
                </flightsearchrequest>
            `.trim();

            const url = `https://b2b.jasyatra.com/v2dispatch.jsp?actioncode=FSAPIV4&agentid=SUPER&opid=FS000&sessiontoken=${sessionToken}&xmlorjson=${encodeURIComponent(xmlRequest)}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                return data.flightsearchresponse.flightjourneys[journeyIndex]?.flightoptions?.flatMap(option => option.recommendedflight) || [];
            } catch (error) {
                console.error('Error fetching flights:', error);
                return [];
            }
        };

        try {
            let fetchedFlight0 = [];
            let fetchedFlight1 = [];

            if (params.journeytype === 'RoundTrip') {
                fetchedFlight0 = (await Promise.all(carriers.map(carrier => fetchCarrierFlights(carrier, 0)))).flat();
                fetchedFlight1 = (await Promise.all(carriers.map(carrier => fetchCarrierFlights(carrier, 1)))).flat();
            } else if (params.journeytype === 'OneWay') {
                fetchedFlight0 = (await Promise.all(carriers.map(carrier => fetchCarrierFlights(carrier, 0)))).flat();
            }

            fetchedFlight0.sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare);
            fetchedFlight1.sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare);

            setFlight0(fetchedFlight0);
            setFlight1(fetchedFlight1);
            setCurrentFlights(fetchedFlight0); // Initially show flight0

            setIsLoading(false);

            if (params.journeytype === 'RoundTrip') {
                const maxPrice = Math.max(
                    ...fetchedFlight0.map(flight => flight.flightfare.totalbasefare),
                    ...fetchedFlight1.map(flight => flight.flightfare.totalbasefare)
                );
                onMaxPriceChange(maxPrice);
            } else if (params.journeytype === 'OneWay') {
                const maxPrice = Math.max(...fetchedFlight0.map(flight => flight.flightfare.totalbasefare));
                onMaxPriceChange(maxPrice);
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
            setIsLoading(false);
        }
    }, [location]);

    useEffect(() => {
        fetchFlights();
    }, [fetchFlights]);

    useEffect(() => {
        let sortedFlights = [];
        if (selectedButton === 'Cheapest Flights') {
            sortedFlights = [...currentFlights].sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare);
        } else if (selectedButton === 'Shortest Duration') {
            sortedFlights = [...currentFlights].sort((a, b) => {
                const totalDurationA = a.flightlegs?.reduce((total, leg) => total + leg.journeyduration, 0) || 0;
                const totalDurationB = b.flightlegs?.reduce((total, leg) => total + leg.journeyduration, 0) || 0;
                return totalDurationA - totalDurationB;
            });
        } else if (selectedButton === 'Departure Arrival') {
            sortedFlights = [...currentFlights].sort((a, b) => {
                const departureTimeA = a.flightlegs[0]?.deptime || 0;
                const departureTimeB = b.flightlegs[0]?.deptime || 0;
                return departureTimeA - departureTimeB;
            });
        }
        setCurrentFlights(sortedFlights);
    }, [selectedButton]);

    useEffect(() => {
        if (selectedFlightSet === 'flight0') {
            setCurrentFlights(flight0);
        } else {
            setCurrentFlights(flight1);
        }
    }, [selectedFlightSet, flight0, flight1]);

    const filteredFlights = currentFlights.filter(flight =>
        (!filters.selectedAirline || filters.selectedAirline === flight.flightlegs[0]?.validatingcarriername) &&
        flight.flightfare.totalbasefare <= filters.priceRange[1] &&
        (filters.selectedDepartTime.length === 0 || (
            flight.flightlegs[0]?.deptime >= filters.selectedDepartTime[0] &&
            flight.flightlegs[0]?.deptime <= filters.selectedDepartTime[1]
        )) &&
        (filters.selectedArrivalTime.length === 0 || (
            flight.flightlegs[flight.flightlegs.length - 1]?.arrtime >= filters.selectedArrivalTime[0] &&
            flight.flightlegs[flight.flightlegs.length - 1]?.arrtime <= filters.selectedArrivalTime[1]
        )) &&
        (!filters.flightNumber || flight.flightlegs.some(leg => leg.flightnumber === filters.flightNumber)) &&
        (!filters.selectedFarePolicy.includes('NoStop') || flight.flightlegs.length === 1) &&
        (!filters.selectedFarePolicy.includes('1Stop') || flight.flightlegs.length === 2) &&
        (!filters.selectedFarePolicy.includes('2Stop') || flight.flightlegs.length === 3)
    );

    if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center sm:h-1/3 h-[250px] gap-12'>
                <div className='font-semibold text-xl sm:hidden'>
                    Loading Flights
                </div>
                <div className='loader sm:mt-80'></div>
            </div>
        );
    }

    const toggleNetFare = () => {
        setShowNetFare(!showNetFare);
    };

    const handleFlight0Click = () => {
        setSelectedFlightSet('flight0');
    };

    const handleFlight1Click = () => {
        setSelectedFlightSet('flight1');
    };

    
    
    if (redirect) {
        return <Navigate to={redirect} />;
    }



    return (
        <div className="flex flex-col gap-2 pl-2 pr-2 sm:pr-24 sm:pl-2">
            {flight0.length > 0 && (
                <div className='flex flex-row justify-between'>
                    <div className="text-left text-lg sm:text-4xl font-semibold sm:text-white">
                        Flights from {currentFlights[0].flightlegs[0]?.origin_name || ''} to {currentFlights[0].flightlegs[currentFlights[0].flightlegs.length - 1]?.destination_name || ''}
                    </div>
                    <button
                        className='sm:text-white font-semibold hover:underline cursor-pointer focus:outline-none bg-transparent border-0 p-0'
                        onClick={toggleNetFare}
                    >
                        {showNetFare ? 'Hide Net Fare' : 'Show Net Fare'}
                    </button>
                </div>
            )}
            {params.journeytype === 'RoundTrip' && (
                <div className='flex items-center w-full bg-gray-300 rounded-xl'>
                    <button
                        className={`w-1/2 h-full rounded-xl text-center ${selectedFlightSet === 'flight0' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none p-2`}
                        onClick={handleFlight0Click}
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold'>
                                {flight0[0]?.flightlegs[0].origin_name || 'Unknown'}-{flight0[0]?.flightlegs[flight0[0].flightlegs.length - 1].destination_name}
                            </div>
                            <div>
                                {flight0[0]?.flightlegs[0].depdate}
                            </div>
                        </div>
                    </button>
                    <button
                        className={`w-1/2 h-full rounded-xl text-center ${selectedFlightSet === 'flight1' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none p-2`}
                        onClick={handleFlight1Click}
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold'>
                                {flight1[0]?.flightlegs[0].origin_name || 'Unknown'}-{flight1[0]?.flightlegs[flight1[0]?.flightlegs.length - 1].destination_name}
                            </div>
                            <div>
                                {flight1[0]?.flightlegs[0].depdate}
                            </div>
                        </div>
                    </button>
                </div>
            )}
            <div className="flex items-center w-full h-[60px] bg-gray-300 rounded-xl">
                <button
                    className={`w-1/3 h-full rounded-xl text-center ${selectedButton === 'Cheapest Flights' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none p-2`}
                    onClick={() => handleButtonClick('Cheapest Flights')}
                >
                    Cheapest Flights
                </button>
                <button
                    className={`w-1/3 h-full rounded-md text-center ${selectedButton === 'Shortest Duration' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none p-2`}
                    onClick={() => handleButtonClick('Shortest Duration')}
                >
                    Shortest Duration
                </button>
                <button
                    className={`w-1/3 h-full rounded-xl text-center ${selectedButton === 'Departure Arrival' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none p-2`}
                    onClick={() => handleButtonClick('Departure Arrival')}
                >
                    Early Departure
                </button>
            </div>
            <div className='flex flex-col items-center gap-3 pt-3 pb-3'>
                {filteredFlights.length === 0 ? (
                    <div className='text-xl font-semibold flex flex-col bg-white border-b-2 rounded-md p-10'>
                        <div className='text-red-400'>No Flights Found :(</div>
                        <div className='text-sm'>Please change your filter criteria or Reload Page and try again.</div>
                    </div>
                ) : (
                    filteredFlights.map(flight => (
                        <FlightCard key={flight.nextraflightkey} flight={flight} showNetFare={showNetFare} selectedFlightSet={selectedFlightSet} onTripSelect={handleTripSelect} filters={filters} />
                    ))
                )}
            </div>

            {/* Footer div for displaying trip details */}
            {(trip0 || trip1) && (
                <div className="fixed text-white bg-gradient-to-r from-[#06539A] to-[#252525] bottom-0 left-0 right-0 p-3 shadow-md flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start sm:gap-32 gap-8 text-sm sm:text-md">
                    <div className='flex sm:gap-32 gap-2    '>
                    {trip0 && (
                        <div className="flex flex-col sm:text-left">
                            <div className='text-lg gap-4 flex items-center'>
                                {trip0.flightlegs[0]?.origin} - {trip0.flightlegs[trip0.flightlegs.length - 1].destination}
                                <IoMdCloseCircle
                                    onClick={() => setTrip0(null)} className='text-red-500 cursor-pointer' />
                            </div>
                            <div className='bg-white rounded-lg flex flex-col p-3'>
                                <div className='text-gray-400 sm:text-left'>
                                    Deaprt {trip0.flightlegs[0]?.validatingcarriername}
                                </div>
                                <div className='flex sm:flex-row flex-col pt-2 items-center justify-center'>
                                    <div>
                                        <img
                                            src={airlineLogos[trip0.flightlegs[0].validatingcarriername]}
                                            width="40"
                                            alt="Airline logo"
                                            className=''
                                        />
                                    </div>
                                    <div className='text-black pl-2'>
                                        {formatTime(trip0.flightlegs[0].deptime)} {formatTime(trip0.flightlegs[0].arrtime)}
                                    </div>

                                    <div className='text-[#06539A] text-xl sm:pl-4'>
                                        ₹{trip0.flightfare.totalbasefare}
                                    </div>
                                </div>


                            </div>

                        </div>
                    )}
                    {trip1 && (
                        <div className="flex flex-col sm:text-left">
                            <div className='text-lg flex gap-4 items-center'>
                                {trip1.flightlegs[0]?.origin} - {trip1.flightlegs[trip1.flightlegs.length - 1].destination}
                                <IoMdCloseCircle
                                    onClick={() => setTrip1(null)} className='text-red-500 cursor-pointer' />
                            </div>
                            <div className='bg-white rounded-lg flex flex-col p-3'>
                                <div className='text-gray-400 sm:text-left'>
                                    Deaprt {trip1.flightlegs[0]?.validatingcarriername}
                                </div>
                                <div className='flex sm:flex-row flex-col pt-2 items-center justify-center'>
                                    <div>
                                        <img
                                            src={airlineLogos[trip1.flightlegs[0].validatingcarriername]}
                                            width="40"
                                            alt="Airline logo"
                                            className=''
                                        />
                                    </div>
                                    <div className='text-black pl-2'>
                                        {formatTime(trip1.flightlegs[0].deptime)} {formatTime(trip1.flightlegs[0].arrtime)}
                                    </div>

                                    <div className='text-[#06539A] text-xl sm:pl-4'>
                                        ₹{trip1.flightfare.totalbasefare}
                                    </div>
                                </div>


                            </div>

                        </div>
                    )}
                    </div>
                    <div className='sm:pl-32 flex '>
                    {trip0 && trip1 && (
                        <div className='sm:pt-6 sm:ml-[30%] flex flex-row items-center gap-4'>
                            <div className='text-3xl font-semibold flex'>
                                ₹ 
                                    {trip0.flightfare.totalbasefare + trip1.flightfare.totalbasefare}
                            </div>
                            <button className="border border-[#06539A] text-lg rounded-md py-8 px-4 sm:px-10 shadow-md transition duration-300 ease-in-out hover:bg-orange-500 hover:text-white" onClick={handleContinue}>
                                Continue
                            </button>
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightList;

