/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlightCard from './FlightCard';
import { getUrlParams } from '../../utils/params';
import './FlightList.css'

const FlightList = () => {
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
            const carriers = ['SG', '6E', 'UK'];
            const allFlights = [];

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

                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    const carrierFlights = data.flightsearchresponse.flightjourneys.flatMap(journey =>
                        journey.flightoptions.flatMap(option => option.recommendedflight)
                    );
                    allFlights.push(...carrierFlights);
                } catch (error) {
                    console.error('Error fetching flights:', error);
                    setIsLoading(false);
                }
            }
            allFlights.sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare);
            setFlights(allFlights);
            console.log(flights)
            setIsLoading(false);
        };

        fetchFlights();
    }, [location]);

    useEffect(() => {
        if (selectedButton === 'Cheapest Flights') {
            setFlights([...flights].sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare));
        } else if (selectedButton === 'Shortest Duration') {
            console.log(flights[0].flightlegs.length)
            setFlights([...flights].sort((a, b) => {
                const totalDurationA = a.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);
                const totalDurationB = b.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);
                return totalDurationA - totalDurationB;
            }));

        }
        // console.log(flights[0].flightlegs.length)
    }, [selectedButton]);

    if (isLoading) {
        return (
            <div className='flex items-center justify-center'>
                <div className='loader mt-80'>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-5/6">
            <div className="text-left text-4xl font-semibold text-white">
                Flights from {flights[0].flightlegs[0].origin_name} to {flights[0].flightlegs[flights[0].flightlegs.length-1].destination_name}
            </div>

            <div className="flex items-center h-[60px] bg-gray-300 rounded-xl">
                <button
                    className={`w-1/3 h-full rounded-xl text-center ${selectedButton === 'Cheapest Flights' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none`}
                    onClick={() => handleButtonClick('Cheapest Flights')}
                >
                    Cheapest Flights
                </button>
                <button
                    className={`w-1/3 h-full rounded-md text-center ${selectedButton === 'Shortest Duration' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none`}
                    onClick={() => handleButtonClick('Shortest Duration')}
                >
                    Shortest Duration
                </button>
                <button
                    className={`w-1/3 h-full rounded-xl text-center ${selectedButton === 'Departure Arrival' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none`}
                    onClick={() => handleButtonClick('Departure Arrival')}
                >
                    Departure Arrival
                </button>
            </div>

            <div className='flex flex-col gap-3 pt-3'>
                {flights.map((flight) => (
                    <FlightCard key={flight.nextraflightkey} flight={flight} />
                ))}
            </div>
        </div>
    );
};

export default FlightList;
