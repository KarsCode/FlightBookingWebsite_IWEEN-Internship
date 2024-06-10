/* eslint-disable react/prop-types */
import { useState } from 'react';
import FlightDetails from './ModalFiles/FlightDetails';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { IoClose } from "react-icons/io5";
import FareSummary from './ModalFiles/FareSummary';
import { Navigate } from 'react-router-dom';
import FareRules from './ModalFiles/FareRules';

// Define a mapping for airline logos
const airlineLogos = {
    'Indigo': '/IndiGo-Logo.png',
    'Vistara': '/Vistara-Logo.png',
    'Spicejet': '/SpiceJet-Logo.png',
    'Akasa Air': '/Akasa-Logo.png'
    // Add other airlines and their logos here
};

const FlightCard = ({ flight,showNetFare }) => {
    const [activeTab, setActiveTab] = useState(''); 
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(null);



    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const urlParams = new URLSearchParams(window.location.search);

    // Extracting query parameters
    const numadults = urlParams.get('numadults') || '';
    const numchildren = urlParams.get('numchildren') || '';
    const numinfants = urlParams.get('numinfants') || '';

    const handleViewPrice = () => {
        const sessionToken = localStorage.getItem('TransactionStatus');
        const urlParams = new URLSearchParams({
            actioncode: 'FSTAXESV4',
            agentid: 'JY86528',
            cachekeyow: flight.nextraflightkey,
            opid: 'FS000',
            resultformat: 'jsonv2',
            sessiontoken: sessionToken,
            triptype: 'oneway',
            numadults: numadults,
            numchildren: numchildren,
            numinfants: numinfants
            // Add other necessary parameters here based on flight data
        });
        const bookingUrl = `/booking?${urlParams.toString()}`;
        setRedirect(bookingUrl);
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    const formatTime = (time) => {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }; 
    
    const formatDuration = (duration) => {
        if (duration < 60) {
            return `${duration} minute${duration !== 1 ? 's' : ''}`;
        } else {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const totalJourneyDuration = flight.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);

    const lastLegIndex = flight.flightlegs.length - 1;
    const lastLeg = flight.flightlegs[lastLegIndex];

    return (
        <div className="flex flex-col bg-white rounded-3xl w-3/4 sm:w-full gap-1">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 items-center justify-around pt-2">
                {/* Logo and name */}
                <div className="flex items-center gap-2 p-1">
                    <div className='w-16 h-16 flex items-center'>
                        <img
                            src={airlineLogos[flight.flightlegs[0].validatingcarriername]}
                            width="70"
                            alt="Airline logo"
                            className='rounded-md'
                        />
                    </div>
                    <div className="flex flex-col pl-2">
                        <div className="font-semibold">
                            {flight.flightlegs[0].validatingcarriername}
                        </div>
                        <div className="text-gray-400 text-xs sm:text-left">
                            {flight.flightlegs[0].validatingcarrier}{flight.flightlegs[0].flightnumber}
                        </div>
                    </div>
                </div>

                {/* Depart date */}
                <div className="flex flex-col">
                    <div className="font-semibold text-xl">
                        {formatTime(flight.flightlegs[0].deptime)}
                    </div>
                    <div className="text-gray-400 text-sm sm:text-left">
                        {flight.flightlegs[0].origin_name}
                    </div>
                </div>

                {/* Stopover, duration bar */}
                <div className="flex flex-col p-3 items-center">
                    <div className="text-[#06539A]">
                        {formatDuration(totalJourneyDuration)}
                    </div>
                    <div className="text-sm text-gray-400">
                        {flight.flightlegs.length === 1 ? 'No Stopover' : `${flight.flightlegs.length - 1} Stopover${flight.flightlegs.length > 2 ? 's' : ''}`}
                    </div>
                </div>

                {/* Arrival date */}
                <div className="flex flex-col">
                    <div className="font-semibold text-xl">
                        {formatTime(lastLeg.arrtime)}
                    </div>
                    <div className="text-gray-400 text-sm sm:text-right">
                        {lastLeg.destination_name}
                    </div>
                </div>

                {/* Fare */}
                <div className="flex flex-col sm:pl-10">
                    <div className="font-semibold text-xl text-[#06539A]">
                        {formatCurrency(flight.flightfare.totalbasefare)}
                    </div>
                    {showNetFare && (<div className="text-gray-400 text-sm text-left">
                        {formatCurrency(flight.flightfare.totalnet)}
                    </div>)}
                    
                </div>

                {/* Book now */}
                <div className="flex flex-col">
                    <div>
                        <button className="border border-[#06539A] text-[#06539A] rounded-3xl px-5 py-2 shadow-md transition duration-300 ease-in-out hover:bg-[#06539A] hover:text-white" onClick={handleViewPrice}>
                            View Price
                        </button>
                    </div>

                    <button
                        className="text-orange-400 underline text-sm pt-1"
                        onClick={() => { handleTabChange('FlightDetails'); setOpen(true); }}
                    >
                        Flight Details
                    </button>

                    <div className=''>
                    <Dialog open={open} onClose={handleClose} className=' lexend-deca font-normal' maxWidth='md'>
                        <DialogTitle className='bg-white pb-2'>
                            <div className='flex gap-20 items-center justify-between'>
                                <div className='lexend-deca font-semibold'>
                                    Flight Details
                                </div>
                                <div className='text-gray-500' onClick={handleClose}>
                                    <IoClose size={30}/>  
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogContent className='p-0 w-full'>
                            <div className="flex bg-gray-200 p-2 text-sm gap-10 h-[55px] overflow-auto">
                                <button
                                    className={`rounded-2xl sm:px-2 sm:py-1 px-6 focus:outline-none ${activeTab === 'FlightDetails' ? 'bg-orange-500 text-white' : 'bg-white text-gray-400'}`}
                                    onClick={() => handleTabChange('FlightDetails')}
                                >
                                    Flight Details
                                </button>
                                <button
                                    className={`rounded-2xl px-2 py-1 focus:outline-none ${activeTab === 'FareSummary' ? 'bg-orange-500 text-white' : 'bg-white text-gray-400'}`}
                                    onClick={() => handleTabChange('FareSummary')}
                                >
                                    Fare Summary
                                </button>
                                <button
                                    className={`rounded-2xl px-2 py-1 focus:outline-none ${activeTab === 'FareRules' ? 'bg-orange-500 text-white' : 'bg-white text-gray-400'}`}
                                    onClick={() => handleTabChange('FareRules')}
                                >
                                    Fare Rules
                                </button>
                            </div>

                            {/* Render content based on activeTab */}
                            {activeTab === 'FlightDetails' && (
                                <FlightDetails flight={flight} />
                            )}
                            {activeTab === 'FareSummary' && (
                                <div>
                                    <FareSummary flight={flight}/>
                                </div>
                            )}
                            {activeTab === 'FareRules' && (
                                <div>
                                    <FareRules flight={flight}/>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                    </div>
                </div>
            </div>

            <div className="text-orange-500 text-sm sm:text-left px-3">
                Earn additional ₹ 83 Promo Cash
            </div>
        </div>
    );
};

export default FlightCard;

