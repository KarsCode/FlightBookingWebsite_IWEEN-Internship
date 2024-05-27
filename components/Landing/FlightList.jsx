import { useState } from 'react';

const FlightList = () => {
    const [selectedButton, setSelectedButton] = useState('');

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName === selectedButton ? '' : buttonName);
    };

    return (
        <div className="flex flex-col gap-2 w-5/6">
            <div className="text-left text-4xl font-semibold text-white">
                Flights from X to X
            </div>

            <div className="flex items-center h-[60px] bg-gray-300 rounded-xl">
                <button
                    className={`w-1/3 h-full rounded-xl text-center ${selectedButton === 'Cheapest Flights' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none`}
                    onClick={() => handleButtonClick('Cheapest Flights')}
                >
                    Cheapest Flights
                </button>
                <button
                    className={`w-1/3 h-full rounded-md text-center ${selectedButton === 'Shortest Duration' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none`}
                    onClick={() => handleButtonClick('Shortest Duration')}
                >
                    Shortest Duration
                </button>
                <button
                    className={`w-1/3 h-full rounded-xl text-center ${selectedButton === 'Departure Arrival' ? 'bg-[#06539A] text-white' : 'bg-gray-300'} hover:bg-[#06539A] hover:text-white focus:outline-none`}
                    onClick={() => handleButtonClick('Departure Arrival')}
                >
                    Departure Arrival
                </button>
            </div>
        </div>
    );
};

export default FlightList;
