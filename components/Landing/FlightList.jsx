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
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showNetFare, setShowNetFare] = useState(false);
    const [viewLeg, setViewLeg] = useState('both'); // 'outbound', 'return', or 'both'

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName === selectedButton ? '' : buttonName);
        
    };

    const fetchFlights = useCallback(async () => {
    
        const carriers = ['6E', 'SG', 'UK', 'QP'];
        const sessionToken = localStorage.getItem('TransactionStatus');

        console.log('FlightList: ',params)

        const fetchCarrierFlights = async (carrier) => {
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

                console.log(data);

                return data.flightsearchresponse.flightjourneys?.flatMap(journey =>
                    journey.flightoptions?.flatMap(option => option.recommendedflight) || []
                ) || [];
            } catch (error) {
                console.error('Error fetching flights:', error);
                return [];
            }
        };

        try {
            const allFlights = (await Promise.all(carriers.map(fetchCarrierFlights))).flat();
            allFlights.sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare);

            setFlights(allFlights);
            setIsLoading(false);

            if (allFlights.length > 0) {
                const maxPrice = Math.max(...allFlights.map(flight => flight.flightfare.totalbasefare));
                onMaxPriceChange(maxPrice);
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
            setIsLoading(false);
        }
    }, [params, onMaxPriceChange]);

    useEffect(() => {
        fetchFlights();
    }, [fetchFlights]);

    useEffect(() => {
        if (selectedButton === 'Cheapest Flights') {
            setFlights(prevFlights => [...prevFlights].sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare));
        } else if (selectedButton === 'Shortest Duration') {
            setFlights(prevFlights => [...prevFlights].sort((a, b) => {
                const totalDurationA = a.flightlegs?.reduce((total, leg) => total + leg.journeyduration, 0) || 0;
                const totalDurationB = b.flightlegs?.reduce((total, leg) => total + leg.journeyduration, 0) || 0;
                return totalDurationA - totalDurationB;
            }));
        }
    }, [selectedButton]);

    const filteredFlights = flights.filter(flight =>
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
                <div className='loader sm:mt-80'>
                </div>
            </div>
        );
    }

    const toggleNetFare = () => {
        setShowNetFare(!showNetFare);
    };

    return (
        <div className="flex flex-col gap-2 pl-2 pr-2 sm:pr-24 sm:pl-2">
            {flights.length > 0 && (
                <div className='flex flex-row justify-between'>
                <div className="text-left text-lg sm:text-4xl font-semibold sm:text-white">
                    Flights from {flights[0].flightlegs[0]?.origin_name || 'Unknown'} to {flights[0].flightlegs[flights[0].flightlegs.length - 1]?.destination_name || 'Unknown'}
                </div>
                <div className='sm:text-white font-semibold' onClick={toggleNetFare}> {showNetFare ? 'Hide Net Fare' : 'Show Net Fare'}</div>
                </div>
            )}

            {params.journeytype==='RoundTrip'}
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
                    Departure Arrival
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
