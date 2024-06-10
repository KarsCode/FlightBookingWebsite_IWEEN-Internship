/* eslint-disable react/prop-types */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const TravellerDetails = ({
    mobileNumber,
    setMobileNumber,
    emailAddress,
    setEmailAddress,
}) => { 

    const urlParams = new URLSearchParams(window.location.search);

    // Extracting query parameters
    const numberOfAdults = parseInt(urlParams.get('numadults')) || 0;
    const numberOfChildren = parseInt(urlParams.get('numchildren')) || 0;
    const numberOfInfants = parseInt(urlParams.get('numinfants')) || 0;

    // State to track form validation
    const [formValidated, setFormValidated] = useState(false);

    // State to track traveller details
    const [travellerDetails, setTravellerDetails] = useState({
        adults: [],
        children: [],
        infants: []
    });

    // Handle changes in traveller details
    const handleTravellerDetailsChange = (type, index, field, value) => {
        const updatedDetails = { ...travellerDetails };
        updatedDetails[type][index] = {
            ...updatedDetails[type][index],
            [field]: value
        };
        setTravellerDetails(updatedDetails);
    };

    // Validate if all required fields are filled
    const validateForm = () => {
        let formIsValid = true;
        // Validate adult details
        travellerDetails.adults.forEach(adult => {
            if (!adult.title || !adult.firstName || !adult.lastName) {
                formIsValid = false;
            }
        });
        // Validate children details
        travellerDetails.children.forEach(child => {
            if (!child.title || !child.firstName || !child.lastName) {
                formIsValid = false;
            }
        });
        // Validate infant details
        travellerDetails.infants.forEach(infant => {
            if (!infant.title || !infant.firstName || !infant.lastName) {
                formIsValid = false;
            }
        });

        setFormValidated(formIsValid);
    };

    // Render traveller fields based on type and count
    const renderTravellerFields = (travellerType, count) => {
        const fields = [];
        for (let i = 1; i <= count; i++) {
            fields.push(
                <div key={`${travellerType}-${i}`} className='flex flex-row gap-2'>
                    <div className='w-1/8'>
                        <Form.Select
                            aria-label={`Select Title ${i}`}
                            defaultValue="Select Title"
                            onChange={(e) => handleTravellerDetailsChange(travellerType.toLowerCase() + 's', i - 1, 'title', e.target.value)}
                        >
                            <option disabled>Select Title</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                        </Form.Select>
                    </div>
                    <div className='w-1/3'>
                        <Form.Control
                            placeholder="First Name"
                            aria-label={`First Name ${i}`}
                            onChange={(e) => handleTravellerDetailsChange(travellerType.toLowerCase() + 's', i - 1, 'firstName', e.target.value)}
                        />
                    </div>
                    <div className='w-1/3'>
                        <Form.Control
                            placeholder="Last Name"
                            aria-label={`Last Name ${i}`}
                            onChange={(e) => handleTravellerDetailsChange(travellerType.toLowerCase() + 's', i - 1, 'lastName', e.target.value)}
                        />
                    </div>
                </div>
            );
        }
        return fields;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        if (formValidated) {
            // Proceed with booking submission or other actions
            console.log('Form submitted:', travellerDetails);
        } else {
            alert('Please fill in all traveller details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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

                    {/* Render adult travellers */}
                    {numberOfAdults > 0 && [...Array(numberOfAdults)].map((_, index) => (
                        <div key={`adult-${index + 1}`}>
                            <div className='font-semibold'>
                                Adult {index + 1}
                            </div>
                            {renderTravellerFields('Adult', 1)}
                        </div>
                    ))}

                    {/* Render children travellers */}
                    {numberOfChildren > 0 && [...Array(numberOfChildren)].map((_, index) => (
                        <div key={`child-${index + 1}`}>
                            <div className='font-semibold'>
                                Child {index + 1}
                            </div>
                            {renderTravellerFields('Child', 1)}
                        </div>
                    ))}

                    {/* Render infant travellers */}
                    {numberOfInfants > 0 && [...Array(numberOfInfants)].map((_, index) => (
                        <div key={`infant-${index + 1}`}>
                            <div className='font-semibold'>
                                Infant {index + 1}
                            </div>
                            {renderTravellerFields('Infant', 1)}
                        </div>
                    ))}
                </div>

                
            </div>
        </form>
    );
};

export default TravellerDetails;
