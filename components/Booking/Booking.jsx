/* eslint-disable react/prop-types */
// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react/prop-types */
// // /* eslint-disable no-undef */
// // /* eslint-disable react/prop-types */
// import { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { SiApachecouchdb } from "react-icons/si";
// import { GiBowlOfRice } from "react-icons/gi";
// import { MdLuggage } from "react-icons/md";
// import { IoIosOptions } from "react-icons/io";
// import Button from 'react-bootstrap/Button';
// const Booking = ({ flightData }) => {

//     if (!flightData) {
//         return (
//             <div className="text-white">
//                 Loading
//             </div>
//         );
//     }

//     const [insuranceOption, setInsuranceOption] = useState(null);
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [emailAddress, setEmailAddress] = useState('');
//     const [title, setTitle] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [gstHolderName, setGstHolderName] = useState('');
//     const [gstNumber, setGstNumber] = useState('');
//     const [gstEmail, setGstEmail] = useState('');
//     const [gstPhoneNumber, setGstPhoneNumber] = useState('');
//     const [promoCode, setPromoCode] = useState('');
//     const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
//     const [termsChecked, setTermsChecked] = useState(false);
//     const handleSubmitBooking = () => {
//         // Handle booking submission logic here
//         if (!termsChecked) {
//             alert('Please agree to the Terms and Conditions.');
//             return;
//         }
//         // Proceed with booking submission
//         console.log('Booking submitted!');
//     };


//     const flight = flightData.flightjourneys[0].flightoptions[0].recommendedflight[0];
//     console.log(flight)

//     const departureDate = flight.flightlegs[0].depdate;
//     const journeyDuration = flight.flightlegs.reduce((total, leg) => total + leg.journeyduration, 0);
//     const stopoverCount = flight.flightlegs.length - 1;
//     const stopoverText = stopoverCount === 0 ? 'Non-stop' : `${stopoverCount} Stop${stopoverCount > 1 ? 's' : ''}`;
//     const handlePromoCodeChange = (e) => {
//         setPromoCode(e.target.value);
//     };

//     const handleApplyPromoCode = () => {
//         // Logic to apply promo code
//         // You can use promoCode state variable here
//         console.log('Promo code applied:', promoCode);
//     };


//     const airlineLogos = {
//         'Indigo': '/IndiGo-Logo.png',
//         'Vistara': '/Vistara-Logo.png',
//         'Spicejet': '/SpiceJet-Logo.png',
//         // Add other airlines and their logos here
//     };



//     const formatDate = (dateString) => {
//         const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     };

//     const formatTime = (time) => {
//         const hours = Math.floor(time / 100);
//         const minutes = time % 100;
//         const ampm = hours >= 12 ? 'PM' : 'AM';
//         const formattedHours = hours % 12 || 12;
//         const formattedMinutes = minutes.toString().padStart(2, '0');
//         return `${formattedHours}:${formattedMinutes} ${ampm}`;
//     };

//     const formatDuration = (duration) => {
//         const hours = Math.floor(duration / 60);
//         const minutes = duration % 60;
//         return `${hours}h ${minutes}min`;
//     };

//     const handlePaymentOptionSelect = (option) => {
//         setSelectedPaymentOption(option);
//     };

//     const calculateStopoverTime = (currentLeg, nextLeg) => {
//         if (!nextLeg) return ''; // No stopover if it's the last leg

//         const currentArrivalTime = currentLeg.arrtime;
//         const nextDepartureTime = nextLeg.deptime;

//         // Parse hours and minutes from HHMM format
//         const currentArrivalHours = Math.floor(currentArrivalTime / 100);
//         const currentArrivalMinutes = currentArrivalTime % 100;

//         const nextDepartureHours = Math.floor(nextDepartureTime / 100);
//         const nextDepartureMinutes = nextDepartureTime % 100;

//         // Convert times to total minutes of the day
//         const currentArrivalTotalMinutes = currentArrivalHours * 60 + currentArrivalMinutes;
//         const nextDepartureTotalMinutes = nextDepartureHours * 60 + nextDepartureMinutes;

//         // Calculate stopover time in minutes
//         let stopoverTimeInMinutes;
//         if (nextDepartureTotalMinutes >= currentArrivalTotalMinutes) {
//             stopoverTimeInMinutes = nextDepartureTotalMinutes - currentArrivalTotalMinutes;
//         } else {
//             stopoverTimeInMinutes = (nextDepartureTotalMinutes + 24 * 60) - currentArrivalTotalMinutes;
//         }

//         // Convert stopover time to hours and minutes format
//         const hours = Math.floor(stopoverTimeInMinutes / 60);
//         const minutes = stopoverTimeInMinutes % 60;

//         return `${hours}h ${minutes}min`;
//     };



//     return (
//         <div className="flex sm:flex-row flex-col pt-20 pb-10 sm:pl-24 gap-10">
//             <div className="w-full sm:w-2/3 flex flex-col gap-8 sm:p-8 bg-white rounded-md">
//                 <div className="flex flex-col bg-white shadow-sm p-4 border-2 border-gray-100 rounded-md">
//                     <div className="flex justify-between pb-8 border-b-2 border-gray-300">
//                         <div className="flex flex-col text-left">
//                             <div className="font-semibold text-xl">
//                                 {flight.flightlegs[0].origin_name} ({flight.flightlegs[0].origin}) → {flight.flightlegs[flight.flightlegs.length - 1].destination_name} ({flight.flightlegs[flight.flightlegs.length - 1].destination})
//                             </div>
//                             <div className="text-sm text-gray-400">
//                                 One Way | {formatDate(departureDate)} | {stopoverText} | {formatDuration(journeyDuration)}
//                             </div>
//                         </div>

//                         <div className="flex items-center sm:p-2 text-sm text-white bg-[#06539A] rounded-md">
//                             <button>
//                                 View Fare Rules
//                             </button>
//                         </div>
//                     </div>

//                     {flight.flightlegs.map((leg, index) => (
//                         <div key={index} className="flex flex-col gap-3 pt-3">
//                             <div className="flex gap-3">
//                                 <div>
//                                     <img
//                                         src={airlineLogos[leg.validatingcarriername]}
//                                         width="70"
//                                         alt="Airline logo"
//                                         className="rounded-md"
//                                     />
//                                 </div>
//                                 <div className="flex flex-col text-left">
//                                     <div className="flex items-center gap-2 text-sm">
//                                         <div className="uppercase text-orange-500">
//                                             {leg.validatingcarriername}
//                                         </div>
//                                         <div>
//                                             {leg.validatingcarrier}-{leg.flightnumber}
//                                         </div>
//                                     </div>
//                                     <div className="text-gray-400 uppercase text-sm">
//                                         {leg.cabinclass}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="p-3">
//                                 <div className="flex flex-col text-left">
//                                     <div className="flex items-center gap-2">
//                                         <div className="font-semibold">
//                                             {formatTime(leg.deptime)} - {leg.origin_name} {leg.depterminal} Terminal: {leg.depterminal}
//                                         </div>
//                                         <div className="text-gray-400">
//                                             | {formatDate(leg.depdate)}
//                                         </div>
//                                     </div>

//                                     <div className="text-sm text-gray-400">
//                                         Travel Time: {formatDuration(leg.journeyduration)}
//                                     </div>

//                                     <div className="flex items-center gap-2">
//                                         <div className="font-semibold">
//                                             {formatTime(leg.arrtime)} - {leg.destination_name} - Terminal: {leg.arrterminal}
//                                         </div>
//                                         <div className="text-gray-400">
//                                             | {formatDate(leg.arrdate)}
//                                         </div>
//                                     </div>

//                                 </div>

//                                 <div className="flex gap-3 pt-4">
//                                     <div className="text-gray-400 border-2 border-gray-300 rounded-md">
//                                         <div className="p-1">
//                                             Paid Meal
//                                         </div>
//                                     </div>
//                                     <div className="text-gray-400 border-2 border-gray-300 rounded-md">
//                                         <div className="p-1">
//                                             Check In:
//                                         </div>
//                                     </div>
//                                     <div className="text-gray-400 border-2 border-gray-300 rounded-md">
//                                         <div className="p-1">
//                                             Hand Baggage:
//                                         </div>
//                                     </div>

//                                 </div>

//                                 {index < flight.flightlegs.length - 1 && (
//                                         <div className="text-sm pt-4 w-full text-blue-500 flex justify-center ">
//                                             <div className='bg-gray-200 w-full p-1'>
//                                             Stopover Time: {calculateStopoverTime(leg, flight.flightlegs[index + 1])}
//                                             </div>
//                                         </div>
//                                     )}

//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex flex-col bg-white shadow-sm p-4 border-2 bordery-gray-100 rounded-md text-left">
//                     <div className="border-b-2 pb-3 text-xl border-gray-300 font-semibold">
//                         Travel Insurance
//                     </div>

//                     <div className="text-xl text-[#06539A] pt-2">
//                         ₹199/ Traveller
//                     </div>

//                     <div>
//                         <Form>
//                             <div className='flex flex-col gap-3 mt-3 mb-3'>
//                                 <Form.Check
//                                     type={'radio'}
//                                     id={`InsuranceYes`}
//                                     name="insurance"
//                                     label={'Yes, Secure my trip for ₹ 199/traveller'}
//                                     checked={insuranceOption === 'yes'}
//                                     onChange={() => setInsuranceOption('yes')}
//                                 />
//                                 <Form.Check
//                                     type={'radio'}
//                                     id={`InsuranceNo`}
//                                     name="insurance"
//                                     label={'No, I will book without travel insurance.'}
//                                     checked={insuranceOption === 'no'}
//                                     onChange={() => setInsuranceOption('no')}
//                                 />


//                             </div>
//                         </Form>
//                     </div>
//                 </div>

//                 <div className='flex flex-col bg-white shadow-sm p-4 border-2 border-gray-100 rounded-md text-left'>
//                     <div className='uppercase font-semibold text-xl pb-2'>
//                         IMPORTANT INFORMATION

//                     </div>
//                     <div>
//                         <ul className='font-light text-gray-400 text-sm'>
//                             <li>
//                                 Check travel guidelines and baggage information below:
//                             </li>
//                             <li>
//                                 Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.Wearing a mask/face cover is no longer mandatory. However, all travellers are advised to do so as a precautionary measure.

//                             </li>
//                             <li>
//                                 Carry a valid photo identification proof (Driver Licence, Aadhar Card, Pan Card or any other Government recognised photo identification)
//                             </li>
//                         </ul>
//                     </div>

//                 </div>

//                 <div className='flex flex-col text-white  bg-gradient-to-r from-[#050E13] to-[#493900] shadow-sm p-4 border-2 border-yellow-500 rounded-md text-left gap-3'>
//                     <div className='text-[#BC9100] text-2xl font-semibold'>
//                         HERO
//                     </div>
//                     <div className=''>
//                         Complete this booking and add Rs.12076.00 to your Hero Meter for February
//                     </div>
//                     <div className='text-gray-400'>
//                         You are Rs. 75482.00 away from next milestone and unlocking HERO benefits!
//                     </div>

//                 </div>

//                 <div className='flex flex-col bg-white shadow-sm p-4 border-2 border-gray-100 rounded-md text-left gap-2'>
//                     <div className='p-2 text-xl font-semibold border-b-2 border-gray-300'>
//                         Traveller Details
//                     </div>
//                     <div className='text-gray-400 flex flex-col'>
//                         Contact Information (Your ticket and flight info will be sent here)
//                         <div className='flex gap-4 pt-3'>
//                             <div>
//                                 <InputGroup className="mb-3 h-full">
//                                     <Form.Control
//                                         placeholder="Mobile Number"
//                                         aria-label="MobileNumber"
//                                         aria-describedby="MobileNumber"
//                                         value={mobileNumber}
//                                         onChange={(e) => setMobileNumber(e.target.value)}
//                                     />
//                                 </InputGroup>
//                             </div>
//                             <div>
//                                 <InputGroup className="mb-3 h-full">
//                                     <Form.Control
//                                         placeholder="Email Address"
//                                         aria-label="EmailId"
//                                         aria-describedby="EmailId"
//                                         value={emailAddress}
//                                         onChange={(e) => setEmailAddress(e.target.value)}
//                                     />
//                                 </InputGroup>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='pt-3 flex flex-col'>
//                         <div className='text-xl text-orange-500'>
//                             Traveller Details
//                         </div>
//                         <div className='text-sm text-gray-400'>
//                             (Name must be entered as per government valid ID Proof)
//                         </div>
//                         <div className='font-semibold'>
//                             Adult 1
//                         </div>

//                         <div className='flex flex-row gap-2'>
//                             <div className='w-1/3'>
//                                 <Form.Select aria-label="Select Title" defaultValue="Select Title">
//                                     <option disabled>Select Title</option>
//                                     <option value="Mr.">Mr.</option>
//                                     <option value="Ms.">Ms.</option>
//                                     <option value="Mrs.">Mrs.</option>
//                                 </Form.Select>
//                             </div>
//                             <div className='w-1/3'>
//                                 <Form.Control placeholder="First Name" aria-label="First Name" />
//                             </div>
//                             <div className='w-1/3'>
//                                 <Form.Control placeholder="Last Name" aria-label="Last Name" />
//                             </div>
//                         </div>
//                     </div>
//                     <div>

//                     </div>

//                 </div>

//                 <div className='flex flex-col shadow-sm p-4 border-2 border-gray-100 bg-white rounded-md text-left gap-3'>
//                     <div className='font-semibold text-xl border-b-2 border-gray-300 pb-3'>
//                         GST Details for business travellers (optional)
//                     </div>
//                     <div className='flex flex-col sm:flex-row gap-4'>
//                         <div className='sm:w-1/3'>
//                             <Form.Control type="text" placeholder="GST Holder Name" aria-label="GST Holder Name"
//                                 value={gstHolderName}
//                                 onChange={(e) => setGstHolderName(e.target.value)} />
//                         </div>
//                         <div className='sm:w-1/3'>
//                             <Form.Control type="text" placeholder="GST Number" aria-label="GST Number"
//                                 value={gstNumber}
//                                 onChange={(e) => setGstNumber(e.target.value)} />
//                         </div>
//                         <div className='sm:w-1/3'>
//                             <Form.Control type="email" placeholder="Email" aria-label="Email"
//                                 value={gstEmail}
//                                 onChange={(e) => setGstEmail(e.target.value)} />
//                         </div>
//                         <div className='sm:w-1/3'>
//                             <Form.Control type="tel" placeholder="Number" aria-label="Number"
//                                 value={gstPhoneNumber}
//                                 onChange={(e) => setGstPhoneNumber(e.target.value)} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='flex flex-col shadow-sm p-4 border-2 border-gray-100 bg-white rounded-md text-left gap-3'>
//                     <div className='font-semibold text-xl border-b-2 border-gray-300 pb-3'>
//                         Add on (optional)
//                     </div>
//                     <div className='flex flex-col sm:flex-row gap-4 items-center'>
//                         <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
//                             <div className='p-3 flex items-center justify-around gap-4'>
//                                 <SiApachecouchdb className='text-orange-500' size={30} />
//                                 Seat Selection
//                             </div>
//                         </div>
//                         <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
//                             <div className='p-3 flex items-center justify-around gap-4'>
//                                 <GiBowlOfRice className='text-orange-500' size={30} />
//                                 Add Meals
//                             </div>
//                         </div>
//                         <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
//                             <div className='p-3 flex items-center justify-around gap-4'>
//                                 <MdLuggage className='text-orange-500' size={30} />
//                                 Add Baggage
//                             </div>
//                         </div>
//                         <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
//                             <div className='p-3 flex items-center justify-around gap-4'>
//                                 <IoIosOptions className='text-orange-500' size={30} />
//                                 Other SSR
//                             </div>
//                         </div>


//                     </div>
//                 </div>

//                 <div className='flex flex-col shadow-sm border-2 border-gray-100 bg-white rounded-md text-left gap-3'>
//                     <div className='border-b-2  border-gray-300'>
//                         <div className='text-xl font-semibold p-4'>
//                             Payment Options
//                         </div>
//                     </div>
//                     <div className='flex flex-col sm:flex-row text-xl items-center h-full'>
//                         <div className={`sm:border-r-2 w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'creditdebit' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('creditdebit')}>
//                             Credit/Debit
//                         </div>
//                         <div className={`sm:border-r-2 w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'netbanking' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('netbanking')}>
//                             Netbanking
//                         </div>
//                         <div className={`sm:border-r-2 w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'upi' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('upi')}>
//                             UPI
//                         </div>
//                         <div className={`w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'wallet' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('wallet')}>
//                             Wallet
//                         </div>
//                     </div>
//                 </div>

//                 <div className='flex flex-col sm:flex-row justify-between items-center'>
//                     <div className='p-2'>
//                         <Form.Check
//                             type='checkbox'
//                             id={`termsCheckbox`}
//                             label={`I have read and accepted the Terms and Conditions.`}
//                             onChange={(e) => {
//                                 // Handle checkbox change event
//                                 console.log('Terms and Conditions checked:', e.target.checked);
//                             }}
//                         />
//                     </div>

//                     <div className='flex flex-col gap-2'>
//                         <div className='text-3xl font-semibold'>
//                             Rs. {flight.flightfare.totalbasefare}
//                         </div>
//                         <div className='bg-gradient-to-r from-[#06539A] to-[#252525] rounded-md text-white'>
//                             <button className='p-4'>
//                                 Make Payment
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//             </div>

//             <div className='flex flex-col sm:w-1/3 gap-8 sm:pr-10'>
//                 {/* Fare Summary */}
//                 <div className='bg-white shadow-sm border-2 border-gray-300 rounded-md flex flex-col text-left'>
//                     <div className='text-xl font-semibold border-b-2 border-gray-300'>
//                         <div className=' pl-4 sm:pl-24 py-4'>
//                             FARE SUMMARY
//                         </div>
//                     </div>
//                     <div className='flex flex-col'>
//                         <div className='border-b border-gray-300'>
//                             <div className='pl-4 sm:pl-24 pt-3 text-lg'>
//                                 Base Fare : ₹{flight.flightfare.totalbasefare}
//                             </div>

//                         </div>
//                         <div className='border-b border-gray-300'>
//                             <div className='pl-4 sm:pl-24 pt-3 text-lg'>
//                                 1 x Adult
//                             </div>

//                         </div>
//                         <div className='border-b border-gray-300'>
//                             <div className='pl-4 sm:pl-24 pt-3 text-lg'>
//                                 Service Fees
//                             </div>

//                         </div>
//                         <div className='border-b border-gray-300'>
//                             <div className='pl-4 sm:pl-24 pt-3 text-lg'>
//                                 Taxes and Fee : ₹{flight.flightfare.totaltax}
//                             </div>

//                         </div>
//                         <div className='border-b border-gray-300'>
//                             <div className='pl-4 sm:pl-24 pt-3 text-xl font-semibold'>
//                                 TOTAL FARE:  ₹{flight.flightfare.totalnet}
//                             </div>

//                         </div>


//                     </div>
//                 </div>

//                 {/* Hero */}
//                 <div className='flex flex-col text-white bg-gradient-to-r from-[#050E13] to-[#493900] shadow-sm border border-yellow-500 rounded-lg text-left gap-3 '>
//                     <div className='p-4'>
//                         <div className='uppercase text-2xl font-semibold text-[#BC9100]'>
//                             HERO
//                         </div>
//                         <div className=''>
//                             Superstar partners earn upto 0.6% cashback on each booking
//                         </div>
//                     </div>
//                 </div>

//                 {/* Cancellation        */}
//                 <div className='bg-white shadow-sm border-2 border-gray-100 text-left'>
//                     <div className='flex flex-col p-4 gap-2'>
//                         <div className='font-semibold'>
//                             Cancellation & Date change charges
//                         </div>
//                         <div className='text-gray-500 text-sm'>
//                             Cancellation Fee
//                             <br />
//                             A penalty of upto ₹ 3,600 will be charged by the airline, by MakeMyTrip based on how close to the departure date you cancel.
//                             VIEW IMPORTANT RULES
//                             <br />
//                             ₹ 7,449
//                             <br />
//                             Approx Refund
//                         </div>
//                     </div>

//                 </div>

//                 <div className='bg-white shadow-sm border-2 border-gray-100'>
//                     <div className='flex flex-col gap-2 p-3'>
//                         <div className='text-lg font-semibold py-2'>
//                             Apply Promo Code
//                         </div>
//                         <div>
//                             <Form.Control
//                                 id="inputPassword5"
//                                 aria-describedby="passwordHelpBlock"
//                                 placeholder="Apply"
//                                 className='flex text-center border-2 border-black'
//                                 value={promoCode}
//                                 onChange={handlePromoCodeChange}
//                             />
//                         </div>
//                         <div>
//                             <Button className='w-full' bsPrefix='bg-orange-500 rounded-md h-[40px]' onClick={handleApplyPromoCode}>Apply</Button>
//                         </div>
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Booking;

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
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
    const [insuranceOption, setInsuranceOption] = useState(null);
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
        console.log('Booking submitted!');
    };


    if (!flightData) {
        return (
            <div className="text-white">
                Loading
            </div>
        );
    }

    const flight = flightData.flightjourneys[0].flightoptions[0].recommendedflight[0];

    return (

        <div className="flex sm:flex-row flex-col pt-20 pb-10 sm:pl-24 gap-10">
            <div className="w-full sm:w-2/3 flex flex-col gap-8 sm:p-2 bg-white rounded-md">
                <FlightDetails flight={flight} />
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
                <AddOns />
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
                                Rs. {flightData.flightjourneys[0].flightoptions[0].recommendedflight[0].flightfare.totalbasefare}
                            </div>
                            <div className="">
                                <Button className="p-4 bg-gradient-to-r from-[#06539A] to-[#252525] rounded-md text-white" onClick={handleSubmitBooking}>
                                    Make Payment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col sm:w-1/3 gap-8 sm:pr-10'>
                <FareSummary flight={flight} />
                <Cancellation />
                <ApplyPromoCode promoCode={promoCode} handlePromoCodeChange={handlePromoCodeChange} handleApplyPromoCode={handleApplyPromoCode} />

            </div>

        </div>)}
        

            export default Booking;
