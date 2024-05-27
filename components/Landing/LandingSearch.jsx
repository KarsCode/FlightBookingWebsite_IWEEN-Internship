/* eslint-disable react/prop-types */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

// eslint-disable-next-line react/prop-types
const LandingSearch = ({tripData}) => {
    const today = new Date();
    const [selectedDepartDate, setSelectedDepartDate] = useState(tripData?.selectedDepartDate || today);
    const [selectedReturnDate, setSelectedReturnDate] = useState(tripData?.selectedReturnDate||null);
    const [departCity, setDepartCity] = useState(tripData?.departCity || null);
    const [destinationCity, setDestinationCity] = useState(tripData?.destinationCity || null);
    const [adults, setAdults] = useState(tripData?.adults||1);
    const [children, setChildren] = useState(tripData?.children||0);
    const [infants, setInfants] = useState(tripData?.infants||0);
    const [travelClass, setTravelClass] = useState(tripData?.travelClass||'Economy');

    const handleDepartDateChange = (date) => {
        setSelectedDepartDate(date);
    };

    const handleReturnDateChange = (date) => {
        setSelectedReturnDate(date);
    };

    // Sample city options
    const cityOptions = [
        { value: 'DEL', label: 'New Delhi' },
        { value: 'BOM', label: 'Mumbai' },
        { value: 'BLR', label: 'Bangalore' },
        { value: 'CCU', label: 'Kolkata' },
        // Add more city options as needed
    ];
    const renderAdultButtons = () => {
        const adultButtons = [];
        for (let i = 1; i <= 9; i++) {
            adultButtons.push(
                <button
                    key={i}
                    className={`btn ${adults === i ? 'btn-primary text-xs' : 'btn-outline-primary text-xs'}`}
                    onClick={() => setAdults(i)}
                >
                    {i}
                </button>
            );
        }
        return adultButtons;
    };

    const renderChildrenButtons = () => {
        const childrenButtons = [];
        for (let i = 0; i <= 9; i++) {
            childrenButtons.push(
                <button
                    key={i}
                    className={`btn ${children === i ? 'btn-primary text-xs' : 'btn-outline-primary text-xs'}`}
                    onClick={() => setChildren(i)}
                >
                    {i}
                </button>
            );
        }
        return childrenButtons;
    };

    const renderInfantsButtons = () => {
        const infantsButtons = [];
        for (let i = 0; i <= 9; i++) {
            infantsButtons.push(
                <button
                    key={i}
                    className={`btn ${infants === i ? 'btn-primary text-xs' : 'btn-outline-primary text-xs'}`}
                    onClick={() => setInfants(i)}
                >
                    {i}
                </button>
            );
        }
        return infantsButtons;
    };

    return (
        <div className='flex gap-3 text-white items-center pl-24 pt-10'>
            <div className='flex flex-col text-left w-48 bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs">From</div>
                <Select
                    value={departCity}
                    onChange={setDepartCity}
                    options={cityOptions}
                    placeholder="Departure"
                    className='text-sm'
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            color: 'white',
                        }),
                        menu: provided => ({
                            ...provided,
                            overflow: 'hidden', // Hide the default scrollbar
                        }),
                        menuList: provided => ({
                            ...provided,
                            maxHeight: '140px', // Adjust the max height as needed
                            overflowY: 'auto', // Enable vertical scrolling
                            color:'black'
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: 'white',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: 'white',
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: 'white',
                        }),
                        
                        // You can add more styles as needed
                    }}
                />
            </div>

            <div className='flex flex-col text-left w-48 bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs">To</div>
                <Select
                    value={destinationCity}
                    onChange={setDestinationCity}
                    options={cityOptions}
                    placeholder="Destination"
                    className='text-sm'
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            color: 'white',
                        }),
                        menu: provided => ({
                            ...provided,
                            overflow: 'hidden', // Hide the default scrollbar
                        }),
                        menuList: provided => ({
                            ...provided,
                            maxHeight: '140px', // Adjust the max height as needed
                            overflowY: 'auto', // Enable vertical scrolling
                            color:'black'
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: 'white',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: 'white',
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: 'white',
                        }),
                        
                        // You can add more styles as needed
                    }}

                />
            </div>

            <div className='flex flex-col w-48 h-[70px]  bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs text-left">Depart</div>
                <DatePicker
                    selected={selectedDepartDate}
                    onChange={handleDepartDateChange}
                    dateFormat='dd/MM/yyyy'
                    className='flex font-normal bg-transparent text-sm text-white rounded-sm h-[35px] text-center border-b border-white'
                    popperClassName='date-picker-popper'
                    minDate={today}
                />
            </div>           

            <div className='flex flex-col w-48 h-[70px] bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs text-left">Return</div>
                <DatePicker
                    selected={selectedReturnDate}
                    onChange={handleReturnDateChange}
                    dateFormat='dd/MM/yyyy'
                    className='flex font-normal bg-transparent text-sm text-white rounded-sm h-[35px] text-center border-b border-white'
                    minDate={selectedDepartDate || today}
                />
            </div>

            {/* <div className='flex flex-col w-48 bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs text-left">Passenger/Class</div>
                <div className="text-lg font-medium">Economy</div>
            </div> */}
                        <div className='flex flex-col w-48 h-[70px] bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs text-left">Passenger/Class</div>
                <div className="dropdown pt-1 text-left">
                    <button className="btn btn-secondary dropdown-toggle text-black bg-white flex w-[180px] text-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {adults}A+{children}C+{infants}I | {travelClass}
                    </button>
                    <div className="dropdown-menu bg-red-100 rounded-lg" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item hover:bg-transparent text-black">
                            <div className="d-flex text-sm flex-col align-items-start">
                                <span className="font-bold mr-2">Adults(12y+):</span>
                                <div className="btn-group mr-2 p-2">
                                    {renderAdultButtons()}
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-item hover:bg-transparent text-black">
                            <div className="d-flex text-sm flex-col align-items-start">
                                <span className="font-bold mr-2">Children(2y-12y):</span>
                                <div className="btn-group mr-2 p-2">
                                    {renderChildrenButtons()}
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-item hover:bg-transparent text-black">
                            <div className="d-flex text-sm flex-col align-items-start">
                                <span className="font-bold mr-2">Infants(&lt;2y):</span>
                                <div className="btn-group p-2">
                                    {renderInfantsButtons()}
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={() => setTravelClass('Economy')}>Economy</button>
                        <button className="dropdown-item" onClick={() => setTravelClass('Business')}>Business</button>
                        <button className="dropdown-item" onClick={() => setTravelClass('First Class')}>First Class</button>
                    </div>
                </div>
            </div>


            <button className="flex justify-center w-64 bg-[#E0621A] p-[15px] rounded-md">Search</button>

        </div>
    );
}

export default LandingSearch;




// {adults}A+{children}C+{infants}I | {travelClass}