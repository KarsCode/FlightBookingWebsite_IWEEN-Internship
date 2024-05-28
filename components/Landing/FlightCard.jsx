/* eslint-disable react/prop-types */
import { useState } from 'react';

const FlightCard = ({ flight }) => {
    const [activeTab, setActiveTab] = useState('FlightDetails');
    console.log(flight.flightlegs)

    const handleTabChange = (tabName) => setActiveTab(tabName);

    // Helper function to format time from 4-digit number to "HH:MM AM/PM" format
    const formatTime = (time) => {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    // Helper function to convert duration from minutes to "hours minutes" format
    const formatDuration = (duration) => {
        if (duration < 60) {
            return `${duration} minute${duration !== 1 ? 's' : ''}`;
        } else {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;

            if (minutes === 0) {
                return `${hours} hour${hours !== 1 ? 's' : ''}`;
            } else {
                return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
        }
    };



    return (
        <div className="flex flex-col bg-white rounded-3xl gap-1">
            <div className="flex gap-10 items-center justify-around pt-2">
                {/* Logo and name */}
                <div className="flex items-center gap-2 p-1">
                    <div className=''>
                        <img src='/planeimg.png' width="70" alt="Airline logo" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">
                            {flight.flightlegs[0].validatingcarriername}
                        </div>
                        <div className="text-gray-400 text-xs text-left">
                            {flight.flightlegs[0].flightnumber}
                        </div>
                    </div>
                </div>

                {/* Depart date */}
                <div className="flex flex-col">
                    <div className="font-semibold text-xl">
                        {formatTime(flight.flightlegs[0].deptime)}
                    </div>
                    <div className="text-gray-400 text-sm text-left">
                        {flight.flightlegs[0].origin_name}
                    </div>
                </div>

                {/* Stopover, duration bar */}
                <div className="flex flex-col p-3 items-center">
                    <div className="text-[#06539A]">
                        {formatDuration(flight.flightlegs[0].journeyduration)}
                    </div>
                    <div className="text-sm text-gray-400">
                        {flight.flightlegs[0].stopover == "" ? flight.flightlegs[0].stopover : 'No Stopover'}
                    </div>
                </div>

                {/* Arrival date */}
                <div className="flex flex-col">
                    <div className="font-semibold text-xl">
                        {formatTime(flight.flightlegs[0].arrtime)}
                    </div>
                    <div className="text-gray-400 text-sm text-right">
                        {flight.flightlegs[0].destination_name}
                    </div>
                </div>

                {/* Fare */}
                <div className="flex flex-col pl-10">
                    <div className="font-semibold text-xl text-[#06539A]">
                        {flight.flightfare.totalbasefare}
                    </div>
                    <div className="text-gray-400 text-xs text-left">
                        {/* Original Fare Placeholder */}
                    </div>
                </div>

                {/* Book now */}
                <div className="flex flex-col">
                    <div>
                        <button className="border border-[#06539A] text-[#06539A] rounded-3xl px-5 py-2 shadow-md transition duration-300 ease-in-out hover:bg-[#06539A] hover:text-white">
                            View Price
                        </button>
                    </div>

                    <div className="">
                        <button
                            className="text-orange-400 underline text-sm pt-1"
                            data-toggle="modal"
                            data-target="#ModalCenter"
                            onClick={() => handleTabChange('FlightDetails')}
                        >
                            Flight Details
                        </button>

                        <div className="modal" id="ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content w-max">
                                    <div className="modal-header justify-between">
                                        <h5 className="modal-title font-bold" id="ModalLongTitle">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span className="text-black">Close</span>
                                        </button>
                                    </div>
                                    <div>
                                        <div className="flex flex-col">
                                            <div className="flex bg-gray-200 w-full p-2 text-sm gap-3">
                                                <div>
                                                    <button
                                                        className={`rounded-2xl px-2 py-1 focus:outline-none  ${activeTab === 'FlightDetails' ? 'bg-orange-500 text-white' : 'bg-white text-gray-400'}`}
                                                        onClick={() => handleTabChange('FlightDetails')}
                                                    >
                                                        Flight Details
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className={`rounded-2xl px-2 py-1 focus:outline-none ${activeTab === 'FareSummary' ? 'bg-orange-500 text-white' : 'bg-white text-gray-400'}`}
                                                        onClick={() => handleTabChange('FareSummary')}
                                                    >
                                                        Fare Summary
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className={`rounded-2xl px-2 py-1 focus:outline-none ${activeTab === 'Cancellation' ? 'bg-orange-500 text-white' : 'bg-white text-gray-400'}`}
                                                        onClick={() => handleTabChange('Cancellation')}
                                                    >
                                                        Cancellation
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        className={`rounded-2xl px-2 py-1 focus:outline-none ${activeTab === 'ChangeDate' ? 'bg-orange-500 text-white' : 'bg-white text-gray-400'}`}
                                                        onClick={() => handleTabChange('ChangeDate')}
                                                    >
                                                        Change Date
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-orange-500 text-sm text-left px-3">
                Earn additional ₹ 83 Promo Cash
            </div>
        </div>
    );
};

export default FlightCard;
