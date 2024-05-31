    /* eslint-disable no-unused-vars */
    import { useEffect, useState } from 'react';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import Select from 'react-select';

    // eslint-disable-next-line react/prop-types
    const RoundTrip = ({ tripMode, onTripDataSelect }) => {
        const [cityOptions, setCityOptions] = useState([]);
        const [searchInput, setSearchInput] = useState('');

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchCityOptions = async () => {
            try {
                const sessionToken = localStorage.getItem('TransactionStatus');
                const response = await fetch(`https://b2b.jasyatra.com/v2dispatch.jsp?actioncode=SEARCHAIR&opid=FS000&searchkey=${searchInput}&sessiontoken=${sessionToken}`);
                const data = await response.json();
                const airports = data?.Root?.Result?.AirportDetail || [];
                const options = airports.map(airport => ({
                    value: airport.AirportCode,
                    label: airport.AirportName,
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
        const [departCity, setDepartCity] = useState(null);
        const [destinationCity, setDestinationCity] = useState(null);
        const [departCityInput, setDepartCityInput] = useState('');
        const [destinationCityInput, setDestinationCityInput] = useState('');

        const handleDepartDateChange = (date) => {
            setSelectedDepartDate(date);
            handleTripDataSelect();

            if (selectedReturnDate && date > selectedReturnDate) {
                setSelectedReturnDate(null);
            }
        }
            ;

        const handleReturnDateChange = (date) => {

            setSelectedReturnDate(date);
            handleTripDataSelect();

        };

        const handleDepartDatePickerToggle = (isDatePickerOpen) => {
            setIsDepartDatePickerOpen(isDatePickerOpen);
        };

        const handleAdultsChange = (value) => {
            setAdults(value);
            handleTripDataSelect();

        };

        const handleChildrenChange = (value) => {
            setChildren(value);
            handleTripDataSelect();

        };

        const handleInfantsChange = (value) => {
            setInfants(value);
            handleTripDataSelect();

        };

        const renderAdultButtons = () => {
            const adultButtons = [];
            for (let i = 1; i <= 9; i++) {
                adultButtons.push(
                    <button
                        key={i}
                        className={`btn ${adults === i ? 'btn-primary text-xs' : 'btn-outline-primary text-xs'}`}
                        onClick={(e) => { handleAdultsChange(i); e.stopPropagation(); handleTripDataSelect(); }}
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
                        onClick={(e) => { handleChildrenChange(i); e.stopPropagation(); handleTripDataSelect(); }}
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
                        onClick={(e) => { handleInfantsChange(i); e.stopPropagation(); handleTripDataSelect(); }}
                    >
                        {i}
                    </button>
                );
            }

            return infantsButtons;
        };

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
            };
            // Call the onTripDataSelect function with the trip data
            onTripDataSelect(tripData);
        }


        return (

            <div className={`flex flex-col sm:flex-row gap-2 text-lg pt-4 items-center sm:items-start ${isDepartDatePickerOpen ? 'pb-40' : ''} ${isDropdownOpen ? 'pb-12' : ''}`}>
                <div className='flex flex-col items-center sm:flex-row gap-[2px]'>
                    <div className='flex flex-col items-start font-light w-[240px] sm:h-[104px]  pb-2 pl-2 border-1 border-black rounded-md'>
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
                            className='w-[220px] font-semibold text-sm text-left'
                            onMenuOpen={() => { setIsDropdownOpen(true) }}
                            onMenuClose={() => { setIsDropdownOpen(false); handleTripDataSelect(); }}
                            styles={{
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
                        />
                        <div>{departCity ? departCity.value : ''}</div>
                    </div> 
                    <div className='flex flex-col items-start font-light w-[240px] sm:h-[104px] pl-2 pb-2 border-1 border-black rounded-md'>
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
                            className='w-[220px] font-semibold text-sm text-left'
                            onMenuOpen={() => { setIsDropdownOpen(true) }}
                            onMenuClose={() => { setIsDropdownOpen(false); handleTripDataSelect(); }}
                            styles={{
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

                        />
                        <div>{destinationCity ? destinationCity.value : ''}</div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center gap-[2px]'>
                    <div className='flex flex-col items-start font-light w-[240px] sm:h-[104px] pl-2 border-1 border-black rounded-md'>
                        <div>Depart Date</div>
                        <div className='font-semibold'>
                            <DatePicker
                                selected={selectedDepartDate}
                                onChange={handleDepartDateChange}
                                dateFormat='dd/MM/yyyy'
                                className='font-semibold text-sm'
                                popperClassName='date-picker-popper'
                                minDate={today}
                                onCalendarOpen={() => handleDepartDatePickerToggle(true)}
                                onCalendarClose={() => { handleDepartDatePickerToggle(false); handleTripDataSelect(); }}
                            />
                        </div>
                        <div>
                            {selectedDepartDate && (
                                <div>{selectedDepartDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                            )}
                        </div>
                    </div>

                    <div className={`flex flex-col items-start font-light w-[240px] sm:h-[104px] pl-2 border-1 ${tripMode === 'OneWay' ? 'bg-gray-300 ' : ''}border-black rounded-md`} style={{ pointerEvents: tripMode === 'OneWay' ? 'none' : 'auto' }}>
                        <div>Return Date</div>
                        <div className='font-semibold'>
                            <DatePicker
                                selected={selectedReturnDate}
                                onChange={handleReturnDateChange}
                                dateFormat='dd/MM/yyyy'
                                className={`font-semibold text-sm ${tripMode === 'OneWay' ? 'bg-gray-300' : ''}`}
                                popperClassName='date-picker-popper'
                                minDate={selectedDepartDate}
                                disabled={tripMode === 'OneWay'}
                                onCalendarOpen={() => handleDepartDatePickerToggle(true)}
                                onCalendarClose={() => { handleDepartDatePickerToggle(false); handleTripDataSelect(); }}
                            />
                        </div>
                        <div>
                            {selectedReturnDate && (
                                <div>{selectedReturnDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                            )}
                        </div>
                    </div>

                </div>
                <div className='flex flex-col items-start font-light w-[240px] sm:h-[104px] pl-2 border-1 border-black rounded-md'>
                    <div>Travellers, Class</div>
                    <div className="dropdown ">
                        <button className="btn btn-secondary dropdown-toggle text-black bg-white top-auto bottom-[100%]" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setIsDropdownOpen(!isDropdownOpen); handleTripDataSelect(); }}>
                            {adults + children + infants} Travellers, {travelClass}
                        </button>
                        <div className="dropdown-menu bg-red-100" aria-labelledby="dropdownMenuButton">
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
                            <button className="dropdown-item" onClick={() => {setTravelClass('Economy');handleTripDataSelect();}}>Economy</button>
                            <button className="dropdown-item" onClick={() => {setTravelClass('P Economy');handleTripDataSelect();}}>Premium Economy</button>
                            <button className="dropdown-item" onClick={() => {setTravelClass('Business');handleTripDataSelect();}}>Business</button>
                            <button className="dropdown-item" onClick={() => {setTravelClass('First Class');handleTripDataSelect();}}>First Class</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default RoundTrip;
