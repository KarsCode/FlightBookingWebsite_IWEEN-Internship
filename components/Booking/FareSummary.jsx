/* eslint-disable react/prop-types */

const FareSummary = ({ outboundFlight, returnFlight,totalMealCost }) => {

    const calculateTotalBaseFare = (flight) => {
        if (!flight) return 0;
        return flight.flightfare.totalbasefare;
    };

    const calculateServiceFee = (flight) => {
        if (!flight) return 0;
        return flight.flightfare.servicefee;
    };

    const calculateTotalTax = (flight) => {
        if (!flight) return 0;
        return flight.flightfare.totaltax;
    };

    const calculateDiscount = (flight) => {
        if (!flight) return 0;
        return flight.flightfare.discount;
    };

    const calculateTotalFare = (flight) => {
        if (!flight) return 0;
        return flight.flightfare.totalnet;
    };

    return (
        <div className='bg-white shadow-sm border-2 border-gray-300 rounded-md flex flex-col text-left'>
            <div className='text-xl font-semibold border-b-2 border-gray-300'>
                <div className='pl-4 sm:pl-12 py-4'>
                    FARE SUMMARY
                </div>
            </div>
            <div className='flex flex-col text-sm'>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Base Fare : ₹{calculateTotalBaseFare(outboundFlight) + calculateTotalBaseFare(returnFlight)}
                    </div>
                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Service Fees : ₹{calculateServiceFee(outboundFlight) + calculateServiceFee(returnFlight)}
                    </div>
                </div>
                <div className='border-b border-gray-300'>
                    { totalMealCost!=0 && <div className='pl-4 sm:pl-12 pt-3'>
                        Meal Fares : ₹{totalMealCost}
                    </div>}
                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Taxes and Fee : ₹{calculateTotalTax(outboundFlight) + calculateTotalTax(returnFlight)}
                    </div>
                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Discounts : ₹{(calculateDiscount(outboundFlight) + calculateDiscount(returnFlight)).toFixed(2)}
                    </div>
                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3 text-md font-semibold'>
                        TOTAL FARE: ₹{(calculateTotalFare(outboundFlight) + calculateTotalFare(returnFlight)).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FareSummary;
