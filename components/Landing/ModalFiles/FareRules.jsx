/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const FareRules = ({ flight }) => {

    const airlineLogos = {
        'Indigo': '/IndiGo-Logo.png',
        'Vistara': '/Vistara-Logo.png',
        'Spicejet': '/SpiceJet-Logo.png',
        // Add other airlines and their logos here
    };
    
    return (
        <div className='border-2 shadow-md rounded-xl p-4 m-4'>
            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <div className='font-semibold'>
                        Cancellation Refund Policy
                    </div>
                    <div className='text-blue-500'>
                        View Rules
                    </div>

                </div>


                <div className='flex pt-4 gap-3'>
                    <div className=''>
                        <img
                            src={airlineLogos[flight.flightlegs[0].validatingcarriername]}
                            width="90"
                            alt="Airline logo"
                            className='rounded-md'
                        />
                    </div>

                    <div className='flex flex-col text-sm'>
                        <div className='flex gap-2'>
                            <div className='text-orange-500 uppercase'>
                                {flight.flightlegs[0].validatingcarriername} 
                            </div>
                            <div>
                                {flight.flightlegs[0].validatingcarrier}-{flight.flightlegs[0].flightnumber}
                            </div>

                        </div>
                        <div className='uppercase text-gray-400'>
                            {flight.flightlegs[0].cabinclass}
                        </div>
                    </div>
                </div>


                {/* <div className='font-semibold pt-4'>
                    Cancellation Penalty:
                </div> */}

            </div>
        </div>
    )
}

export default FareRules
