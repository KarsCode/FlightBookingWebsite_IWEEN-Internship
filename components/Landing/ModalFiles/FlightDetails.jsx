/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const FlightDetails = ({ flight }) => {

    console.log(flight.flightlegs[0].flightnumber)

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

    // Helper function to convert duration from minutes to "hours minutes" format
    const formatDuration = (duration) => {
        if (duration < 60) {
            return `${duration} minute${duration !== 1 ? 's' : ''}`;
        } else {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
    };

    // Helper function to format total base fare as currency without decimals
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0 // This removes decimals
        }).format(amount);
    };


    // Calculate total journey duration by summing up durations of all legs
    const totalJourneyDuration = flight.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);

    // Get the last leg's destination and arrival time
    const lastLegIndex = flight.flightlegs.length - 1;
    const lastLeg = flight.flightlegs[lastLegIndex];


    return (
        <div className="flex flex-col">
            <div className='pt-2 pl-10 flex gap-8'>
                <div>
                    <img
                        src={airlineLogos[flight.flightlegs[0].validatingcarriername]}
                        width="90"
                        alt="Airline logo"
                        className='rounded-md'
                    />
                </div>
                <div className="flex flex-col items-start">
                    <div className="font-semibold">
                        {flight.flightlegs[0].validatingcarriername}
                    </div>
                    <div className="text-gray-400">
                        {flight.flightlegs[0].validatingcarrier}{flight.flightlegs[0].flightnumber}
                    </div>
                    <div>
                        Seats left: {flight.flightlegs[0].numseatsavailable}
                    </div>
                </div>
            </div>

            <div className="bg-orange-400">

            </div>
            
        </div>
    )
}

export default FlightDetails
