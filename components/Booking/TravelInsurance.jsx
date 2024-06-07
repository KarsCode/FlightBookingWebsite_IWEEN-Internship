/* eslint-disable react/prop-types */

import Form from 'react-bootstrap/Form';

const TravelInsurance = ({insuranceOption,setInsuranceOption}) => {
    return (
        <div className="flex flex-col bg-white shadow-sm p-4 border-2 bordery-gray-100 rounded-md text-left">
            <div className="border-b-2 pb-3 text-xl border-gray-300 font-semibold">
                Travel Insurance
            </div>

            <div className="text-xl text-[#06539A] pt-2">
                ₹199/ Traveller
            </div>

            <div>
                <Form>
                    <div className='flex flex-col gap-3 mt-3 mb-3'>
                        <Form.Check
                            type={'radio'}
                            id={`InsuranceYes`}
                            name="insurance"
                            label={'Yes, Secure my trip for ₹ 199/traveller'}
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
            </div>
        </div>
    )
}

export default TravelInsurance
