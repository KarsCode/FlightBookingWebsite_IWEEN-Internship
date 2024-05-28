import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlightCard from './FlightCard';
import { getUrlParams } from '../../utils/params';

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
            const carriers = ['6E', 'SG', 'AI', 'IX', 'UK'];
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




                const sessionToken = localStorage.getItem('TransactionStatus')
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

            if (selectedButton === 'Cheapest Flights') {
                allFlights.sort((a, b) => a.flightfare.totalbasefare - b.flightfare.totalbasefare);
            }
            if (selectedButton === 'Shortest Duration') {
                allFlights.sort((a, b) => a.flightlegs[0].journeyduration - b.flightlegs[0].journeyduration);
            }
            console.log("All flights:", allFlights);
            setFlights(allFlights);
            setIsLoading(false);


        };

        fetchFlights();
    }, [location,selectedButton]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-2 w-5/6">
            <div className="text-left text-4xl font-semibold text-white">
                Flights from {flights.length > 0 && flights[0].origin} to {flights.length > 0 && flights[0].destination}
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
