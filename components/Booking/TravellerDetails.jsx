/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const TravellerDetails = ({mobileNumber,setMobileNumber,emailAddress,setEmailAddress}) => {
    return (
        <div className='flex flex-col bg-white shadow-sm p-4 border-2 border-gray-100 rounded-md text-left gap-2'>
            <div className='p-2 text-xl font-semibold border-b-2 border-gray-300'>
                Traveller Details
            </div>
            <div className='text-gray-400 flex flex-col'>
                Contact Information (Your ticket and flight info will be sent here)
                <div className='flex gap-4 pt-3'>
                    <div>
                        <InputGroup className="mb-3 h-full">
                            <Form.Control
                                placeholder="Mobile Number"
                                aria-label="MobileNumber"
                                aria-describedby="MobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                    <div>
                        <InputGroup className="mb-3 h-full">
                            <Form.Control
                                placeholder="Email Address"
                                aria-label="EmailId"
                                aria-describedby="EmailId"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <div className='pt-3 flex flex-col'>
                <div className='text-xl text-orange-500'>
                    Traveller Details
                </div>
                <div className='text-sm text-gray-400'>
                    (Name must be entered as per government valid ID Proof)
                </div>
                <div className='font-semibold'>
                    Adult 1
                </div>

                <div className='flex flex-row gap-2'>
                    <div className='w-1/3'>
                        <Form.Select aria-label="Select Title" defaultValue="Select Title">
                            <option disabled>Select Title</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                        </Form.Select>
                    </div>
                    <div className='w-1/3'>
                        <Form.Control placeholder="First Name" aria-label="First Name" />
                    </div>
                    <div className='w-1/3'>
                        <Form.Control placeholder="Last Name" aria-label="Last Name" />
                    </div>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}

export default TravellerDetails
