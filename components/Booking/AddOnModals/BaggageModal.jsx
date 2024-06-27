/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const BaggageModal = ({ content, onSave, flightlegs, initialSelectedBaggage }) => {
    const [selectedLeg, setSelectedLeg] = useState(0);
    const [travellers, setTravellers] = useState([]);
    const [selectedBaggages, setSelectedBaggages] = useState(initialSelectedBaggage || {});
    const [selectedTraveller, setSelectedTraveller] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const numAdults = parseInt(params.get('numadults')) || 0;
        const numChildren = parseInt(params.get('numchildren')) || 0;
        const numInfants = parseInt(params.get('numinfants')) || 0;

        const travellersArray = [];

        for (let i = 1; i <= numAdults; i++) {
            travellersArray.push({ type: 'Adult', id: i });
        }
        for (let i = 1; i <= numChildren; i++) {
            travellersArray.push({ type: 'Child', id: i });
        }
        for (let i = 1; i <= numInfants; i++) {
            travellersArray.push({ type: 'Infant', id: i });
        }

        setTravellers(travellersArray);
        setSelectedTraveller(travellersArray[0]); // Default to the first traveller
    }, []);

    const handleLegSelect = (index) => {
        setSelectedLeg(index);
    };

    const handleTravellerSelect = (traveller) => {
        setSelectedTraveller(traveller);
    };

    const handleBaggageSelect = (baggage) => {
        if (!selectedTraveller) return;

        // Remove any existing baggage for the same traveller and leg
        const key = `${selectedLeg}-${selectedTraveller.type}-${selectedTraveller.id}`;
        const updatedBaggage = [baggage]; // Only allow one baggage selection
        setSelectedBaggages(prevState => ({
            ...prevState,
            [key]: updatedBaggage
        }));
    };

    const handleBaggageRemove = (traveller) => {
        const key = `${selectedLeg}-${traveller.type}-${traveller.id}`;
        setSelectedBaggages(prevState => {
            const newState = { ...prevState };
            delete newState[key];
            return newState;
        });
    };

    const baggageOptions = content.list?.CarrierSSR?.filter(item => item.ssrtype === 'baggage') || [];

    const totalCost = Object.values(selectedBaggages).flat().reduce((sum, baggage) => sum + baggage.chargeableamount, 0);

    const handleSaveBaggages = () => {
        // Calculate total cost
        const totalCost = Object.values(selectedBaggages).flat().reduce((sum, baggage) => sum + baggage.chargeableamount, 0);
        // Call onSave prop to pass back selected baggages and total cost to parent component
        onSave(selectedBaggages, totalCost);
    };

    return (
        <div className='lexend-deca font-normal'>
            <div className="flex flex-col">
                <div className="flex gap-2">
                    {flightlegs.map((leg, index) => (
                        <div
                            key={index}
                            className={`font-semibold text-xl cursor-pointer p-2 ${selectedLeg === index ? 'bg-orange-100 underline underline-offset-8 decoration-orange-600' : ''}`}
                            onClick={() => handleLegSelect(index)}
                        >
                            {leg.origin} - {leg.destination}
                        </div>
                    ))}
                </div>

                <div className='flex flex-col gap-2 pt-10'>
                    {travellers.map((traveller, index) => {
                        const key = `${selectedLeg}-${traveller.type}-${traveller.id}`;
                        const selectedBaggageList = selectedBaggages[key] || [];
                        return (
                            <div key={index} className={`border-2 rounded-md border-orange-400 sm:w-1/4 ${selectedTraveller?.id === traveller.id && selectedTraveller?.type === traveller.type ? 'bg-orange-100' : ''}`} onClick={() => handleTravellerSelect(traveller)}>
                                <div className='p-6 flex flex-col'>
                                    <div className='font-semibold'>
                                        {traveller.type} {traveller.id}
                                    </div>
                                    <div className='text-gray-400'>
                                        {selectedBaggageList.length > 0 ? (
                                            selectedBaggageList.map((baggage, baggageIndex) => (
                                                <div key={baggageIndex} className='flex justify-between items-center'>
                                                    <div className='border-b-2 pt-2'>{baggage.ssrname}</div>
                                                    <button
                                                        className='bg-red-500 text-white p-1 rounded text-xs'
                                                        onClick={() => handleBaggageRemove(traveller)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            'Select baggage'
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='flex flex-wrap gap-4 pt-10'>
                    {baggageOptions.map((baggage, index) => (
                        <div key={index} className={`border-2 rounded-md border-blue-400 p-4 `}>
                            <div className='flex gap-4 items-center'>
                                <div>
                                    <img src={baggage.ImgUrl} alt={baggage.ssrname} className='w-16 h-16' />
                                </div>
                                <div className='flex flex-col gap-6'>
                                    <div>{baggage.ssrname}</div>
                                    <div> Rs. {baggage.chargeableamount}</div>
                                </div>
                                <div className='bg-orange-500 rounded-md flex items-center'>
                                    <button className='p-2' onClick={() => handleBaggageSelect(baggage)}>Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='pt-10'>
                    <div className='font-semibold text-xl'>Total Baggage Cost: Rs. {totalCost}</div>
                </div>
                <div className='pt-4 ml-auto'>
                    <button className='bg-blue-500 text-white px-10 py-2 rounded' onClick={handleSaveBaggages}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default BaggageModal;
