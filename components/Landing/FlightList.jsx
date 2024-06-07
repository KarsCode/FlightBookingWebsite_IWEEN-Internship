
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlightCard from './FlightCard';
import { getUrlParams } from '../../utils/params';
import './FlightList.css'
const FlightList = ({ filters, onMaxPriceChange }) => {
    const location = useLocation();
    const [selectedButton, setSelectedButton] = useState('Cheapest Flights');
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName === selectedButton ? '' : buttonName);
    };



    useEffect(() => {
        const fetchFlights = async () => {
            const params = getUrlParams(location);
            const carriers = ['6E', 'SG', 'UK'];
            let allFlights = [];

            for (const carrier of carriers) {
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
                    <journeytype>OneWay</journeytype>
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

                const sessionToken = localStorage.getItem('TransactionStatus');
                const url = `https://b2b.jasyatra.com/v2dispatch.jsp?actioncode=FSAPIV4&agentid=SUPER&opid=FS000&sessiontoken=${sessionToken}&xmlorjson=${encodeURIComponent(xmlRequest)}`;

                console.log('Fetching flights with request:', xmlRequest); // Debugging line

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    const carrierFlights = data.flightsearchresponse.flightjourneys.flatMap(journey =>
                        journey.flightoptions.flatMap(option => option.recommendedflight)
                    );  
                    allFlights = [...allFlights, ...carrierFlights];
                } catch (error) {
                    console.error('Error fetching flights:', error);
                }
            }

            console.log('All Flights before sorting:', allFlights);
            allFlights.sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare);
            console.log('All Flights after sorting:', allFlights);

            setFlights(allFlights);
            setIsLoading(false);
            console.log(flights);
            const maxPrice = Math.max(...allFlights.map(flight => flight.flightfare.totalbasefare));
            onMaxPriceChange(maxPrice);
            console.log(maxPrice)
        };

        fetchFlights();
    }, [location]);

    useEffect(() => {
        if (selectedButton === 'Cheapest Flights') {
            setFlights([...flights].sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare));
        } else if (selectedButton === 'Shortest Duration') {
            console.log(flights[0].flightlegs[0].flightnumber)
            setFlights([...flights].sort((a, b) => {
                const totalDurationA = a.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);
                const totalDurationB = b.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);
                return totalDurationA - totalDurationB;
            }));

        }
    }, [selectedButton]);


    if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center sm:h-1/3 h-[250px] gap-12'>
                <div className='font-semibold text-xl sm:hidden'>
                    Loding Flights
                </div>
                <div className='loader sm:mt-80'>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 pl-2 pr-2 sm:pr-24 sm:pl-2">
            <div className="text-left text-lg sm:text-4xl font-semibold sm:text-white">
                Flights from {flights[0].flightlegs[0].origin_name} to {flights[0].flightlegs[flights[0].flightlegs.length - 1].destination_name}
            </div>

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
                {flights.length === 0 ? (
                    <div className='text-xl font-semibold'>
                        No Flights Found
                    </div>
                ) : (
                    flights
                        .filter(flight =>
                            (!filters.selectedAirline || filters.selectedAirline === flight.flightlegs[0].validatingcarriername) &&
                            flight.flightfare.totalbasefare <= filters.priceRange[1] &&
                            (filters.selectedDepartTime.length === 0 || // Check if no departure time filter is applied
                                (flight.flightlegs[0].deptime >= filters.selectedDepartTime[0] && // Check if departure time is greater than or equal to selectedDepartTime[0]
                                    flight.flightlegs[0].deptime <= filters.selectedDepartTime[1])) && // Check if departure time is less than or equal to selectedDepartTime[1]
                            (filters.selectedArrivalTime.length === 0 || // Check if no arrival time filter is applied
                                (flight.flightlegs[flight.flightlegs.length - 1].arrtime >= filters.selectedArrivalTime[0] && // Check if arrival time is greater than or equal to selectedArrivalTime[0]
                                    flight.flightlegs[flight.flightlegs.length - 1].arrtime <= filters.selectedArrivalTime[1])) && // Check if arrival time is less than or equal to selectedArrivalTime[1]
                            (!filters.flightNumber || flight.flightlegs.some(leg => leg.flightnumber === filters.flightNumber))
                        )
                        .map(flight => (
                            <FlightCard key={flight.nextraflightkey} flight={flight} />
                        ))
                )}
            </div>

        </div>
    );
};

export default FlightList;
