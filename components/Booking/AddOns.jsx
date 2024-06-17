/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MealModal from "./AddOnModals/MealModal";
import { SiApachecouchdb } from "react-icons/si";
import { GiBowlOfRice } from "react-icons/gi";
import { MdLuggage } from "react-icons/md";

const AddOns = ({ flightData, setTotalMealMainCost }) => {
    const [opid, setOpid] = useState('');
    const [sessionToken, setSessionToken] = useState('');
    const [showMealModal, setShowMealModal] = useState(false);
    const [showBaggageModal, setShowBaggageModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedMeals, setSelectedMeals] = useState({}); // To store the selected meals
    const [totalMealCost, setTotalMealCost] = useState(0);

    useState(() => {
        const params = new URLSearchParams(window.location.search);
        const opidParam = params.get('opid');
        if (opidParam) {
            setOpid(opidParam);
        }

        const sessionToken = localStorage.getItem('TransactionStatus');
        if (sessionToken) {
            setSessionToken(sessionToken);
        }
    }, []);

    const handleAddMealSelect = async () => {
        const apiUrl = 'https://b2b.jasyatra.com/v2dispatch.jsp';

        const params = new URLSearchParams({
            actioncode: 'GETSSRV4',
            opid: 'FS000', // Default opid if not taken from URL
            selectedflight: flightData.bookingkey, // Adjust this based on your flight data structure
            sessiontoken: sessionToken,
            triptype: 'onward'
            // Add other necessary parameters here based on meal selection
        });

        const fullUrl = `${apiUrl}?${params.toString()}`;

        try {
            setShowMealModal(true); // Show meal modal after API call
            const response = await fetch(fullUrl);
            const data = await response.json();
            console.log('API response for meals:', data);
            setModalContent(data.ApiStatus.Result); // Set modal content based on API response

        } catch (error) {
            console.error('Error fetching meal data:', error);
        }
    };

    const handleAddBaggageSelect = async () => {
        const apiUrl = 'https://b2b.jasyatra.com/v2dispatch.jsp';

        const params = new URLSearchParams({
            actioncode: 'GETSSRV4',
            opid: 'FS000', // Default opid if not taken from URL
            selectedflight: flightData.bookingkey, // Adjust this based on your flight data structure
            sessiontoken: sessionToken,
            triptype: 'onward'
            // Add other necessary parameters here based on baggage selection
        });

        const fullUrl = `${apiUrl}?${params.toString()}`;

        try {
            setShowBaggageModal(true);
            const response = await fetch(fullUrl);
            const data = await response.json();
            console.log('API response for baggage:', data);
            setModalContent(data.Result); // Set modal content based on API response

        } catch (error) {
            console.error('Error fetching baggage data:', error);
        }
    };

    const handleSaveMeals = (meals, totalCost) => {
        setSelectedMeals(meals);
        setTotalMealCost(totalCost); // Update total meal cost

        // Pass totalCost to parent component using setTotalMealMainCost prop
        setTotalMealMainCost(totalCost);

        setShowMealModal(false);
        setModalContent(''); // Reset modal content
    };

    const closeMealModal = () => {
        setShowMealModal(false);
        setModalContent(''); // Reset modal content
    };

    const closeBaggageModal = () => {
        setShowBaggageModal(false);
        setModalContent(''); // Reset modal content
    };

    return (
        <div className='flex flex-col shadow-sm p-4 border-2 border-gray-100 bg-white rounded-md text-left gap-3'>
            <div className='font-semibold text-xl border-b-2 border-gray-300 pb-3'>
                Add on (optional)
            </div>
            <div className='flex flex-col sm:flex-row gap-4 items-center'>
                {flightData.flightjourneys[0].flightoptions[0].recommendedflight[0].seatmapavailable === 'true' &&
                    <div className='border-2 border-blue-400 flex justify-center rounded-md'>
                        <div className='p-3 flex items-center justify-around gap-4'>
                            <SiApachecouchdb className='text-orange-500' size={30} />
                            Seat Selection
                        </div>
                    </div>}
                {flightData.flightjourneys[0].flightoptions[0].recommendedflight[0].ssravailable === 'true' &&
                    <div className="flex gap-4 sm:flex-row flex-col">
                        <div className='border-2 border-blue-400 flex justify-center rounded-md'>
                            <div className='p-3 flex items-center justify-around gap-4 cursor-pointer' onClick={handleAddMealSelect}>
                                <GiBowlOfRice className='text-orange-500' size={30} />
                                Add Meals
                            </div>
                        </div>
                        <div className=' border-2 border-blue-400 flex justify-center rounded-md'>
                            <div className='p-3 flex items-center justify-around gap-4 cursor-pointer' onClick={handleAddBaggageSelect}>
                                <div>
                                    <MdLuggage className='text-orange-500' size={30} />
                                </div>
                                <div>
                                    Add Baggage
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>

            {/* Meal Modal */}
            <Modal show={showMealModal} onHide={closeMealModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title className="font-bold">Meals</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MealModal
                        content={modalContent}
                        flightlegs={flightData.flightjourneys[0].flightoptions[0].recommendedflight[0].flightlegs}
                        onSave={handleSaveMeals} // Pass the callback to save meals
                        initialSelectedMeals={selectedMeals} // Pass the initial selected meals
                        setTotalMealCost={setTotalMealCost} // Pass the function to update total meal cost
                    />
                </Modal.Body>
            </Modal>

            {/* Baggage Modal */}
            <Modal show={showBaggageModal} onHide={closeBaggageModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title className='font-bold'>Baggage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalContent}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddOns;

