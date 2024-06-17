/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

const TravelInsurance = ({ insuranceOption, setInsuranceOption }) => {
    const [numAdults, setNumAdults] = useState(0);
    const [numChildren, setNumChildren] = useState(0);
    const [nominees, setNominees] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const numAdultsParam = parseInt(params.get('numadults'), 10);
        const numChildrenParam = parseInt(params.get('numchildren'), 10);

        if (!isNaN(numAdultsParam)) {
            setNumAdults(numAdultsParam);
        }

        if (!isNaN(numChildrenParam)) {
            setNumChildren(numChildrenParam);
        }
    }, []);

    useEffect(() => {
        if (insuranceOption === 'yes') {
            setNominees(Array(numAdults + numChildren).fill(''));
        } else {
            setNominees([]);
        }
    }, [insuranceOption, numAdults, numChildren]);

    const handleNomineeChange = (index, value) => {
        const newNominees = [...nominees];
        newNominees[index] = value;
        setNominees(newNominees);
    };

    return (
        <div className="flex flex-col bg-white shadow-sm p-4 border-2 border-gray-100 rounded-md text-left">
            <div className="border-b-2 pb-3 text-xl border-gray-300 font-semibold">
                Travel Insurance
            </div>

            <div className="text-xl text-[#06539A] pt-2">
                ₹61/ traveller (Infant is Not Eligible)
            </div>

            <div>
                <Form>
                    <div className='flex flex-col gap-3 mt-3 mb-3'>
                        <Form.Check
                            type={'radio'}
                            id={`InsuranceYes`}
                            name="insurance"
                            label={'Yes, Secure my trip for ₹ 61/traveller'}
                            checked={insuranceOption === 'yes'}
                            onChange={() => setInsuranceOption('yes')}
                        />
                        <Form.Check
                            type={'radio'}
                            id={`InsuranceNo`}
                            name="insurance"
                            label={'No, I will book without travel insurance.'}
                            checked={insuranceOption === 'no'}
                            onChange={() => setInsuranceOption('no')}
                        />
                    </div>
                </Form>

                {insuranceOption === 'yes' && (
                    <div className="mt-4 sm:w-1/3">
                        {[...Array(numAdults)].map((_, index) => (
                            <div key={`adult-${index}`} className="mb-3">
                                <Form.Label>Nominee For Adult {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nominees[index] || ''}
                                    onChange={(e) => handleNomineeChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        {[...Array(numChildren)].map((_, index) => (
                            <div key={`child-${index + numAdults}`} className="mb-3">
                                <Form.Label>Nominee For Child {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nominees[index + numAdults] || ''}
                                    onChange={(e) => handleNomineeChange(index + numAdults, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='text-gray-400 text-sm'>
                By adding insurance I agree to the Terms & Conditions and confirm all passengers are between 2 to 70 years of age. I hereby declare and understand that Jasyatra Tours and Travels Pvt Ltd. facilitates the access of third party travel insurance to its customer. I shall not mark-up or charge any additional amount for facilitating the access of third party travel insurance to the end customer.
            </div>
        </div>
    )
}

export default TravelInsurance;
