/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaPlane } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const FlightDetails = ({ flight }) => {

    const airlineLogos = {
        'Indigo': '/IndiGo-Logo.png',
        'Vistara': '/Vistara-Logo.png',
        'Spicejet': '/SpiceJet-Logo.png',
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const parseBagWeight = (bagWeightStr) => {
        const bags = bagWeightStr.split('-').filter(Boolean);
        const parsedBags = bags.map(bag => {
            const [type, weight] = bag.split('@');
            return `${type}: ${weight}kg`;
        });
        return parsedBags.join(', ');
    };

    const totalJourneyDuration = flight.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);

    return (
        <div className="flex flex-col sm:w-[800px]">
            {flight.flightlegs.map((leg, index) => (
                <div key={index} className="pb-16">
                    <div className='pt-2 pb-2 flex gap-8'>
                        <div>
                            <img
                                src={airlineLogos[leg.validatingcarriername]}
                                width="90"
                                alt="Airline logo"
                                className='rounded-md'
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="font-semibold">
                                {leg.validatingcarriername}
                            </div>
                            <div className="text-gray-400">
                                {leg.validatingcarrier}{leg.flightnumber}
                            </div>
                            <div>
                                Seats left: {leg.numseatsavailable}
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-500 text-white py-2 pl-4">
                        One Way • {leg.origin_name} to {leg.destination_name} • {formatDate(leg.depdate)}
                    </div>

                    <div className="flex justify-between px-4 pt-2">
                        <div>
                            Flight Duration
                        </div>
                        <div>
                            {formatDuration(leg.journeyduration)}
                        </div>
                    </div>

                    <div className="px-4 pt-2 text-gray-500">
                        {leg.carrier} {leg.flightnumber}
                    </div>

                    <div className="pt-10 flex justify-between px-4">
                        <div className="flex flex-col">
                            <div className="text-2xl font-semibold">
                                {formatTime(leg.deptime)}
                            </div>
                            <div>
                                {formatDate(leg.depdate)}
                            </div>
                        </div>
                        <div className="text-[#06539A]">
                            <FaPlane />
                        </div>
                        <div className="flex flex-col text-right">
                            <div className="text-2xl font-semibold">
                                {formatTime(leg.arrtime)}
                            </div>
                            <div>
                                {formatDate(leg.arrdate)}
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex justify-between px-4">
                        <div className="flex flex-col">
                            <div className="text-2xl font-semibold">
                                {leg.origin_name}
                            </div>
                            <div className="font-light text-gray-500">
                                Departure Terminal: {leg.depterminal}
                            </div>

                        </div>

                        <div className="flex flex-col text-right">
                            <div className="text-2xl font-semibold">
                                {leg.destination_name}
                            </div>
                            <div className="font-light text-gray-500">
                                Destination Terminal: {leg.arrterminal}
                            </div>

                        </div>

                    </div>

                    <div className="px-4 py-2">
                        {parseBagWeight(leg.bagweight)}
                    </div>

                    <div className="px-4 py-4 border-b-2 border-gray-300">
                        <div className="flex gap-2 items-center">
                            <FaRegClock size={20} /> {formatDuration(leg.journeyduration)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FlightDetails;
