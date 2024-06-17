/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import airlineLogos from "../../utils/logos";

const FlightDetails = ({ flight, type }) => {

    const departureDate = flight.flightlegs[0].depdate;
    const journeyDuration = flight.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);
    const stopoverCount = flight.flightlegs.length - 1;
    const stopoverText = stopoverCount === 0 ? 'Non-stop' : `${stopoverCount} Stop${stopoverCount > 1 ? 's' : ''}`;
    const [showModal, setShowModal] = useState(false);
    const [fareRules, setFareRules] = useState(null);

    // Fetch opid and flightkey from URL parameter
    const [opid, setOpid] = useState('');
    const [flightkey, setFlightkey] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const opidParam = params.get('opid');
        var flightkeyParam;
        if (type === 'outbound') {
            flightkeyParam = params.get('cachekeyow');
        }
        else {
            flightkeyParam = params.get('cachekeytw');
        }


        if (opidParam) {
            setOpid(opidParam);
        }
        if (flightkeyParam) {
            setFlightkey(flightkeyParam);
        }
    }, []);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const formatDate = (dateString) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours}h ${minutes}min`;
    };

    const calculateStopoverTime = (currentLeg, nextLeg) => {
        if (!nextLeg) return ''; // No stopover if it's the last leg

        const currentArrivalTime = currentLeg.arrtime;
        const nextDepartureTime = nextLeg.deptime;

        // Parse hours and minutes from HHMM format
        const currentArrivalHours = Math.floor(currentArrivalTime / 100);
        const currentArrivalMinutes = currentArrivalTime % 100;

        const nextDepartureHours = Math.floor(nextDepartureTime / 100);
        const nextDepartureMinutes = nextDepartureTime % 100;

        // Convert times to total minutes of the day
        const currentArrivalTotalMinutes = currentArrivalHours * 60 + currentArrivalMinutes;
        const nextDepartureTotalMinutes = nextDepartureHours * 60 + nextDepartureMinutes;

        // Calculate stopover time in minutes
        let stopoverTimeInMinutes;
        if (nextDepartureTotalMinutes >= currentArrivalTotalMinutes) {
            stopoverTimeInMinutes = nextDepartureTotalMinutes - currentArrivalTotalMinutes;
        } else {
            stopoverTimeInMinutes = (nextDepartureTotalMinutes + 24 * 60) - currentArrivalTotalMinutes;
        }

        // Convert stopover time to hours and minutes format
        const hours = Math.floor(stopoverTimeInMinutes / 60);
        const minutes = stopoverTimeInMinutes % 60;

        return `${hours}h ${minutes}min`;
    };

    const handleViewFareRules = async () => {
        console.log(flight)
        const sessionToken = localStorage.getItem('TransactionStatus'); // Retrieve session token from localStorage
        // Construct API request parameters
        const params = new URLSearchParams({
            actioncode: 'GETFARERULES',
            agentid: 'SUPER',
            farerulejson: JSON.stringify({
                farerulerequest: {
                    selectedflight: flightkey,
                    selectedflight_return: "",
                    domint: "domestic"
                }
            }),
            opid: opid,
            sessiontoken: sessionToken
        });

        const apiUrl = `https://b2b.jasyatra.com/v2dispatch.jsp?${params}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setFareRules(data.farerules_html[0]);
        } catch (error) {
            console.error('Error fetching fare rules:', error);
        }
    };

    const parseBaggageWeight = (bagweight) => {
        if (!bagweight) {
            return 'N/A';
        }
        const adtMatch = bagweight.match(/ADT@(\d+)/);
        return adtMatch ? `${adtMatch[1]}kg` : 'N/A';
    };

    if (!flight) {
        return <div className="">Loading</div>;
    }

    return (
        <div className="flex flex-col bg-white shadow-sm p-4 border-2 border-gray-100 rounded-md">
            <div className="flex justify-between pb-8 border-b-2 border-gray-300">
                <div className="flex flex-col text-left">
                    <div className="font-semibold text-xl">
                        {flight.flightlegs[0].origin_name} ({flight.flightlegs[0].origin}) → {flight.flightlegs[flight.flightlegs.length - 1].destination_name} ({flight.flightlegs[flight.flightlegs.length - 1].destination})
                    </div>
                    <div className="text-sm text-gray-400">
                        One Way | {formatDate(departureDate)} | {stopoverText} | {formatDuration(journeyDuration)}
                    </div>
                </div>

                <div className="flex items-center sm:p-2 text-sm text-white bg-[#06539A] rounded-md">
                    <button onClick={() => { handleViewFareRules(); openModal(); }}>
                        View Fare Rules
                    </button>
                    <Modal show={showModal} onHide={closeModal} size="xl">
                        <Modal.Header closeButton>
                            <Modal.Title>Fare Rules</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                !fareRules && (

                                    <div className='flex items-center justify-center h-20 py-36 sm:py-0 bg-white sm:bg-none'>
                                        <div className='loader '></div>
                                    </div>
                                )
                            }


                            {fareRules && (
                                <div className="overflow-auto" dangerouslySetInnerHTML={{ __html: JSON.parse(fareRules).html }} />
                            )}
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            {flight.flightlegs.map((leg, index) => (
                <div key={index} className="flex flex-col gap-3 pt-3">
                    <div className="flex gap-3">
                        <div>
                            <img
                                src={airlineLogos[leg.validatingcarriername]}
                                width="70"
                                alt="Airline logo"
                                className="rounded-md"
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="uppercase text-orange-500">
                                    {leg.validatingcarriername}
                                </div>
                                <div>
                                    {leg.validatingcarrier}-{leg.flightnumber}
                                </div>
                            </div>
                            <div className="text-gray-400 uppercase text-sm">
                                {leg.cabinclass}
                            </div>
                        </div>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-2">
                                <div className="font-semibold">
                                    {formatTime(leg.deptime)} - {leg.origin_name}   {leg.depterminal}
                                </div>
                                <div className="text-gray-400">
                                    | {formatDate(leg.depdate)}
                                </div>
                            </div>

                            <div className="text-sm text-gray-400">
                                Travel Time: {formatDuration(leg.journeyduration)}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="font-semibold">
                                    {formatTime(leg.arrtime)} - {leg.destination_name}  {leg.arrterminal}
                                </div>
                                <div className="text-gray-400">
                                    | {formatDate(leg.arrdate)}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <div className="text-gray-400 border-2 border-gray-300 rounded-md">
                                <div className="p-1">
                                    Check In: {parseBaggageWeight(leg.bagweight)}
                                </div>
                            </div>
                        </div>

                        {index < flight.flightlegs.length - 1 && (
                            <div className="text-sm pt-4 w-full text-blue-500 flex justify-center ">
                                <div className='bg-gray-200 w-full p-1'>
                                    Stopover Time: {calculateStopoverTime(leg, flight.flightlegs[index + 1])}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FlightDetails;
