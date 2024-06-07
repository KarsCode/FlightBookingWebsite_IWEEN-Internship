/* eslint-disable react/prop-types */


const FareSummary = ({ flight }) => {
    return (
        <div className='bg-white shadow-sm border-2 border-gray-300 rounded-md flex flex-col text-left'>
            <div className='text-xl font-semibold border-b-2 border-gray-300'>
                <div className=' pl-4 sm:pl-24 py-4'>
                    FARE SUMMARY
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-24 pt-3 text-lg'>
                        Base Fare : ₹{flight.flightfare.totalbasefare}
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-24 pt-3 text-lg'>
                        1 x Adult
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-24 pt-3 text-lg'>
                        Service Fees
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-24 pt-3 text-lg'>
                        Taxes and Fee : ₹{flight.flightfare.totaltax}
                    </div>

                </div>
                <div className='border-b border-gray-300'>
                    <div className='pl-4 sm:pl-24 pt-3 text-xl font-semibold'>
                        TOTAL FARE:  ₹{flight.flightfare.totalnet}
                    </div>

                </div>


            </div>
        </div>
    )
}

export default FareSummary
