/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FlightDetails from './FlightDetails';
import TravelInsurance from './TravelInsurance';
import ImportantInformation from './ImportantInformation';
import HeroSection from './HeroSection';
import TravellerDetails from './TravellerDetails';
import GSTDetails from './GSTDetails';
import AddOns from './AddOns';
import PaymentOptions from './PaymentOptions';
import FareSummary from './FareSummary';
import Cancellation from './Cancellation';
import ApplyPromoCode from './ApplyPromoCode';

const Booking = ({ flightData }) => {
    // State management
    const [insuranceOption, setInsuranceOption] = useState('no');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gstHolderName, setGstHolderName] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [gstEmail, setGstEmail] = useState('');
    const [gstPhoneNumber, setGstPhoneNumber] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('creditdebit');
    const [termsChecked, setTermsChecked] = useState(false);
    const [detailformValidated, setDetailFormValidated] = useState(false);
    const [totalMealCost, setTotalMealCost] = useState(0);
    const [totalBaggageCost, setTotalBaggageCost] = useState(0);

    console.log(totalMealCost)

    // Handlers and functions
    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const handleApplyPromoCode = () => {
        console.log('Promo code applied:', promoCode);
    };

    const handlePaymentOptionSelect = (option) => {
        setSelectedPaymentOption(option);
    };

    const handleSubmitBooking = () => {
        if (!termsChecked) {
            alert('Please agree to the Terms and Conditions.');
            return;
        }
        if (!detailformValidated) {
            alert('Please fill in all fields.');
            return;
        }
        console.log('Booking submitted!');
    };

    if (!flightData) {
        return (
            <div className='flex justify-center py-36 sm:py-0 sm:pb-20 bg-white sm:bg-none'>
                <div className='loader sm:mt-80 '></div>
            </div>
        );
    }

    let outboundFlight = flightData.flightjourneys[0].flightoptions[0].recommendedflight[0];
    let returnFlight = null;

    if (flightData.flightjourneys.length === 2) {
        returnFlight = flightData.flightjourneys[1].flightoptions[0].recommendedflight[0];
    }

    return (
        <div className="flex sm:flex-row flex-col pt-20 pb-10 sm:pl-24 gap-10">
            <div className="w-full sm:w-2/3 flex flex-col gap-8 sm:p-2 bg-white rounded-md">
                <FlightDetails flight={outboundFlight} type='outbound' />
                {returnFlight && <FlightDetails flight={returnFlight} type='inbound' />}
                <TravelInsurance insuranceOption={insuranceOption} setInsuranceOption={setInsuranceOption} />
                <ImportantInformation />
                <HeroSection />
                <TravellerDetails
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    emailAddress={emailAddress}
                    setEmailAddress={setEmailAddress}
                    title={title}
                    setTitle={setTitle}
                    firstName={firstName}
                    setFirstName={setFirstName}
                />
                <GSTDetails
                    gstHolderName={gstHolderName}
                    setGstHolderName={setGstHolderName}
                    gstNumber={gstNumber}
                    setGstNumber={setGstNumber}
                    gstEmail={gstEmail}
                    setGstEmail={setGstEmail}
                    gstPhoneNumber={gstPhoneNumber}
                    setGstPhoneNumber={setGstPhoneNumber}
                />
                {<AddOns flightData ={flightData} setTotalMealMainCost={setTotalMealCost} setTotalBaggageMainCost={setTotalBaggageCost} />}
                <PaymentOptions selectedPaymentOption={selectedPaymentOption} handlePaymentOptionSelect={handlePaymentOptionSelect} />

                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                        <div className="p-2">
                            <Form.Check
                                type="checkbox"
                                id={`termsCheckbox`}
                                label={`I have read and accepted the Terms and Conditions.`}
                                onChange={(e) => setTermsChecked(e.target.checked)}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="text-3xl font-semibold">
                                Rs. {(flightData.flightjourneys[0].flightoptions[0].recommendedflight[0].flightfare.totalnet +
                                    (flightData.flightjourneys.length === 2 ? flightData.flightjourneys[1].flightoptions[0].recommendedflight[0].flightfare.totalnet : 0)
                                    + (totalMealCost? totalMealCost : 0)).toFixed(2)}
                            </div>
                            <div>
                                <button
                                    className={`p-4 rounded-md text-white ${termsChecked ? 'bg-gradient-to-r from-[#06539A] to-[#252525]' : 'bg-gray-400 cursor-not-allowed'}`}
                                    onClick={handleSubmitBooking}
                                    disabled={!termsChecked}
                                >
                                    Make Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col sm:w-1/3 gap-8 sm:pr-10'>
                <FareSummary outboundFlight={outboundFlight} returnFlight={returnFlight} totalMealCost ={totalMealCost} />
                <Cancellation />
                <ApplyPromoCode promoCode={promoCode} handlePromoCodeChange={handlePromoCodeChange} handleApplyPromoCode={handleApplyPromoCode} />
            </div>
        </div>
    );
};

export default Booking;
