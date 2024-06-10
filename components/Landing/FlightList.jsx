/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import FlightCard from './FlightCard';
import { getUrlParams } from '../../utils/params';
import './FlightList.css';

const FlightList = ({ filters, onMaxPriceChange }) => {
    const location = useLocation();
    const params = getUrlParams(location);
    const [selectedButton, setSelectedButton] = useState('Cheapest Flights');
    const [flight0, setFlight0] = useState([]);
    const [flight1, setFlight1] = useState([]);
    const [currentFlights, setCurrentFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showNetFare, setShowNetFare] = useState(false);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName === selectedButton ? '' : buttonName);
    };

    const fetchFlights = useCallback(async () => {
        const carriers = ['6E', 'SG', 'UK', 'QP'];
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
                    <searchtype>normal</searchtype>
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
        if (selectedButton === 'Cheapest Flights') {
            setCurrentFlights([...currentFlights].sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare));
        } else if (selectedButton === 'Shortest Duration') {
            setCurrentFlights([...currentFlights].sort((a, b) => {
                const totalDurationA = a.flightlegs?.reduce((total, leg) => total + leg.journeyduration, 0) || 0;
                const totalDurationB = b.flightlegs?.reduce((total, leg) => total + leg.journeyduration, 0) || 0;
                return totalDurationA - totalDurationB;
            }));
        } else if (selectedButton === 'Departure Arrival') {
            setCurrentFlights([...currentFlights].sort((a, b) => {
                const departureTimeA = a.flightlegs[0]?.deptime || 0;
                const departureTimeB = b.flightlegs[0]?.deptime || 0;
                return departureTimeA - departureTimeB;
            }));
        }
    }, [selectedButton]);

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
        (!filters.flightNumber || flight.flightlegs.some(leg => leg.flightnumber === filters.flightNumber))
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
        setCurrentFlights(flight0);
    };

    const handleFlight1Click = () => {
        setCurrentFlights(flight1);
    };

    return (
        <div className="flex flex-col gap-2 pl-2 pr-2 sm:pr-24 sm:pl-2">
            {flight0.length > 0 &&  (
                <div className='flex flex-row justify-between'>
                    <div className="text-left text-lg sm:text-4xl font-semibold sm:text-white">
                        Flights from {currentFlights[0].flightlegs[0]?.origin_name || 'Unknown'} to {currentFlights[0].flightlegs[currentFlights[0].flightlegs.length - 1]?.destination_name || 'Unknown'}
                    </div>
                    <div className='sm:text-white font-semibold'onClick={toggleNetFare}>
                        {showNetFare ? 'Hide Net Fare' : 'Show Net Fare'}
                    </div>
                </div>
            )}
            {params.journeytype === 'RoundTrip' && (
                <div className='flex items-center w-full bg-gray-300 rounded-xl'>
                    <button
                        className={`w-1/2 h-full rounded-xl text-center ${currentFlights === flight0 ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none p-2`}
                        onClick={handleFlight0Click}
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold'>
                                {flight0[0].flightlegs[0].origin_name || 'Unknown'}-{flight0[0].flightlegs[0].destination_name}
                            </div>
                            <div>
                                {flight0[0].flightlegs[0].depdate}
                            </div>
                        </div>
                    </button>
                    <button
                        className={`w-1/2 h-full rounded-xl text-center ${currentFlights === flight1 ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none p-2`}
                        onClick={handleFlight1Click}
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <div className='font-semibold'>
                                {flight1[0].flightlegs[0].origin_name || 'Unknown'}-{flight1[0].flightlegs[0].destination_name}
                            </div>
                            <div>
                                {flight1[0].flightlegs[0].depdate}
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
                        <FlightCard key={flight.nextraflightkey} flight={flight} showNetFare={showNetFare} />
                    ))
                )}
            </div>
        </div>
    );
};

export default FlightList;

