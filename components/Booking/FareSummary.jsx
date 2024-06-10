/* eslint-disable react/prop-types */


const FareSummary = ({ flight }) => {
    return (
        <div className='bg-white shadow-sm border-2 border-gray-300 rounded-md flex flex-col text-left'>
            <div className='text-xl font-semibold border-b-2 border-gray-300'>
                <div className=' pl-4 sm:pl-12 py-4'>
                    FARE SUMMARY
                </div>
            </div>
            <div className='flex flex-col text-sm'>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Base Fare : ₹{flight.flightfare.totalbasefare}
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Service Fees : ₹{flight.flightfare.servicefee}
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Taxes and Fee : ₹{flight.flightfare.totaltax}
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3'>
                        Discounts : ₹{flight.flightfare.discount}
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-12 pt-3 text-md font-semibold'>
                        TOTAL FARE:  ₹{flight.flightfare.totalnet}
                    </div>

                </div>


            </div>
        </div>
    )
}

export default FareSummary
