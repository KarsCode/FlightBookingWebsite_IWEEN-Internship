/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { components } from 'react-select';

// Function to generate the flag emoji from the country code
const getFlagEmoji = (countryCode) => {
    return [...countryCode.toUpperCase()]
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .reduce((a, b) => `${a}${b}`);
};

// Custom option component to display the flag, airport name, and code
const CustomOption = (props) => {
    return (
        <components.Option {...props}>
            <span> {props.data.name} - {getFlagEmoji(props.data.countryCode)}</span>
        </components.Option>
    );
};

const RoundTrip = ({ tripMode, onTripDataSelect }) => {
    const [cityOptions, setCityOptions] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const fetchCityOptions = async () => {
        try {
            const sessionToken = localStorage.getItem('TransactionStatus');
            const response = await fetch(`https://b2b.jasyatra.com/v2dispatch.jsp?actioncode=SEARCHAIR&opid=FS000&searchkey=${searchInput}&sessiontoken=${sessionToken}`);
            const data = await response.json();
            const airports = data?.Root?.Result?.AirportDetail || [];
            const options = airports.map(airport => ({
                value: airport.AirportCode,
                label: airport.AirportLocation.split(',')[0],
                countryCode: airport.CountryCode,
                location: airport.AirportLocation,
                name: airport.AirportName,
            }));
            setCityOptions(options);
        } catch (error) {
            console.error('Error fetching city options:', error);
        }
    };

    useEffect(() => {
        if (searchInput.trim() !== '') {
            fetchCityOptions();
        } else {
            setCityOptions([]);
        }
    }, [searchInput]);

    const today = new Date();
    const [selectedDepartDate, setSelectedDepartDate] = useState(today);
    const [selectedReturnDate, setSelectedReturnDate] = useState(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [travelClass, setTravelClass] = useState('Economy');
    const [isDepartDatePickerOpen, setIsDepartDatePickerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [departCity, setDepartCity] = useState({ value: 'IDR', label: 'Indore', countryCode: 'IN', location: 'Indore,India', name: 'Indore' }); 
    const [destinationCity, setDestinationCity] = useState({ value: 'DEL', label: 'New Delhi', countryCode: 'IN', location: 'New Delhi, India', name: 'Indira Gandhi Intl' });
    const [departCityInput, setDepartCityInput] = useState('');
    const [destinationCityInput, setDestinationCityInput] = useState('');

    const handleDepartDateChange = (date) => {
        setSelectedDepartDate(date);

        if (selectedReturnDate && date > selectedReturnDate) {
            setSelectedReturnDate(null);
        }
    };

    const handleReturnDateChange = (date) => {
        setSelectedReturnDate(date);
    };

    const handleDepartDatePickerToggle = (isDatePickerOpen) => {
        setIsDepartDatePickerOpen(isDatePickerOpen);
    };

    const handleAdultsChange = (value) => {
        setAdults(value);
    };

    const handleChildrenChange = (value) => {
        setChildren(value);
    };

    const handleInfantsChange = (value) => {
        setInfants(value);
    };

    const renderAdultButtons = () => {
        const adultButtons = [];
        for (let i = 1; i <= 9; i++) {
            adultButtons.push(
                <button
                    key={i}
                    className={`btn ${adults === i ? 'btn-primary text-xs' : 'btn-outline-primary text-xs'}`}
                    onClick={(e) => { handleAdultsChange(i); e.stopPropagation(); }}
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
                    className={`btn ${children === i ? 'btn-primary  text-xs' : 'btn-outline-primary text-xs'}`}
                    onClick={(e) => { handleChildrenChange(i); e.stopPropagation(); }}
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
                    onClick={(e) => { handleInfantsChange(i); e.stopPropagation(); }}
                >
                    {i}
                </button>
            );
        }
        return infantsButtons;
    };

    // Use useEffect to call handleTripDataSelect whenever relevant state variables change
    useEffect(() => {
        handleTripDataSelect();
    }, [selectedDepartDate, selectedReturnDate, adults, children, infants, travelClass, departCity, destinationCity, tripMode]);

    const handleTripDataSelect = () => {
        // Gather trip data from state or other relevant sources
        const tripData = {
            selectedDepartDate,
            selectedReturnDate,
            adults,
            children,
            infants,
            travelClass,
            departCity,
            destinationCity,
            tripMode,
        };
        // Call the onTripDataSelect function with the trip data
        onTripDataSelect(tripData);
    };

    return (
        <div className={`flex flex-col sm:flex-row sm:gap-2 gap-3 text-lg pt-4 items-center sm:items-start ${isDepartDatePickerOpen ? 'pb-40' : ''} ${isDropdownOpen ? 'pb-12' : ''}`}>
            <div className='flex flex-col sm:flex-row sm:gap-[2px] gap-3'>
                <div className='flex flex-col items-start font-light sm:w-[240px] sm:h-[104px] pb-2 pl-2 border-1 border-gray-300 rounded-md'>
                    <div>Depart From</div>
                    <Select
                        value={departCity}
                        onChange={(selectedOption) => {
                            setDepartCity(selectedOption);
                        }}
                        onInputChange={(inputValue) => {
                            setDepartCityInput(inputValue);
                            setSearchInput(inputValue); // Update searchInput state
                        }}
                        inputValue={departCityInput}
                        options={departCityInput ? cityOptions : []}
                        placeholder="Select Depart City"
                        noOptionsMessage={() => departCityInput ? 'No options' : 'Type to search'}
                        className='w-[220px] font-semibold text-md text-left'
                        onMenuOpen={() => { setIsDropdownOpen(true) }}
                        onMenuClose={() => { setIsDropdownOpen(false); }}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                border: 'none',
                                boxShadow: 'none',
                            }),
                            menu: provided => ({
                                ...provided,
                                overflow: 'hidden', // Hide the default scrollbar
                            }),
                            menuList: provided => ({
                                ...provided,
                                maxHeight: '140px', // Adjust the max height as needed
                                overflowY: 'auto', // Enable vertical scrolling
                            }),
                            // You can add more styles as needed
                        }}
                        components={{ Option: CustomOption }} // Use the custom option component
                    />
                    <div>{departCity ? `${departCity.name} (${getFlagEmoji(departCity.countryCode)})` : ''}</div>
                </div>
                <div className='flex flex-col items-start font-light sm:w-[240px] sm:h-[104px] pl-2 pb-2 border-1 border-gray-300 rounded-md w-full'>
                    <div>Going To</div>
                    <Select
                        value={destinationCity}
                        onChange={(selectedOption) => {
                            setDestinationCity(selectedOption);
                        }}
                        onInputChange={(inputValue) => {
                            setDestinationCityInput(inputValue);
                            setSearchInput(inputValue); // Update searchInput state
                        }}
                        inputValue={destinationCityInput}
                        options={destinationCityInput ? cityOptions : []}
                        placeholder="Select Destination"
                        noOptionsMessage={() => destinationCityInput ? 'No options' : 'Type to search'}
                        className='w-[220px] font-semibold text-normal text-left'
                        onMenuOpen={() => { setIsDropdownOpen(true) }}
                        onMenuClose={() => { setIsDropdownOpen(false); }}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                border: 'none',
                                boxShadow: 'none',
                            }),
                            menu: provided => ({
                                ...provided,
                                overflow: 'hidden', // Hide the default scrollbar
                            }),
                            menuList: provided => ({
                                ...provided,
                                maxHeight: '140px', // Adjust the max height as needed
                                overflowY: 'auto', // Enable vertical scrolling
                            }),
                            // You can add more styles as needed
                        }}
                        components={{ Option: CustomOption }} // Use the custom option component
                    />
                    <div>{destinationCity ? `${destinationCity.name} (${getFlagEmoji(destinationCity.countryCode)})` : ''}</div>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row items-center sm:gap-[2px] gap-3'>
                <div className='flex flex-col items-start font-light sm:w-[240px] sm:h-[104px] pl-2 border-1 border-gray-300 rounded-md'>
                    <div>Depart Date</div>
                    <div className='font-semibold'>
                        <DatePicker
                            selected={selectedDepartDate}
                            onChange={handleDepartDateChange}
                            dateFormat='dd/MM/yyyy'
                            className='font-semibold text-md w-full'
                            popperClassName='date-picker-popper'
                            minDate={today}
                            onCalendarOpen={() => handleDepartDatePickerToggle(true)}
                            onCalendarClose={() => handleDepartDatePickerToggle(false)}
                        />
                    </div>
                    <div>
                        {selectedDepartDate && (
                            <div>{selectedDepartDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                        )}
                    </div>
                </div>

                <div className={`flex flex-col items-start font-light w-[240px] sm:h-[104px] pl-2 border-1 ${tripMode === 'OneWay' ? 'bg-gray-300 ' : ''}border-gray-300 rounded-md`} style={{ pointerEvents: tripMode === 'OneWay' ? 'none' : 'auto' }}>
                    <div>Return Date</div>
                    <div className='font-semibold'>
                        <DatePicker
                            selected={selectedReturnDate}
                            onChange={handleReturnDateChange}
                            dateFormat='dd/MM/yyyy'
                            className={`font-semibold text-md ${tripMode === 'OneWay' ? 'bg-gray-300' : ''} w-full`}
                            popperClassName='date-picker-popper'
                            minDate={selectedDepartDate}
                            disabled={tripMode === 'OneWay'}
                            onCalendarOpen={() => handleDepartDatePickerToggle(true)}
                            onCalendarClose={() => handleDepartDatePickerToggle(false)}
                        />
                    </div>
                    <div>
                        {selectedReturnDate && (
                            <div>{selectedReturnDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-start font-light sm:w-[240px] sm:h-[104px] pl-2 border-1 border-gray-300 rounded-md'>
                <div>Travellers, Class</div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle text-black bg-white top-auto bottom-[100%]" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {adults + children + infants} Travellers, {travelClass}
                    </button>
                    <div className="dropdown-menu overflow-auto bg-red-100" aria-labelledby="dropdownMenuButton">
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
                        <button className="dropdown-item" onClick={() => setTravelClass('P Economy')}>Premium Economy</button>
                        <button className="dropdown-item" onClick={() => setTravelClass('Business')}>Business</button>
                        <button className="dropdown-item" onClick={() => setTravelClass('First Class')}>First Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoundTrip;
