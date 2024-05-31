/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navigate, useLocation } from 'react-router-dom';
import Select from 'react-select';

// eslint-disable-next-line react/prop-types
const LandingSearch = () => {
    const location = useLocation();
    const today = new Date();
    const [selectedDepartDate, setSelectedDepartDate] = useState(new Date());
    const [selectedReturnDate, setSelectedReturnDate] = useState(null);
    const [departCity, setDepartCity] = useState(null);
    const [destinationCity, setDestinationCity] = useState(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [travelClass, setTravelClass] = useState('Economy');
    const [cityOptions, setCityOptions] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [departCityInput, setDepartCityInput] = useState('');
    const [destinationCityInput, setDestinationCityInput] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tripData = {
            origin: searchParams.get('origin'),
            destination: searchParams.get('destination'),
            onwarddate: searchParams.get('onwarddate'),
            returndate: searchParams.get('returndate'),
            numadults: searchParams.get('numadults'),
            numchildren: searchParams.get('numchildren'),
            numinfants: searchParams.get('numinfants'),
            prefclass: searchParams.get('prefclass') === 'Y' ? 'Economy' : searchParams.get('prefclass')
        };

        setSelectedDepartDate(new Date(tripData.onwarddate));
        setSelectedReturnDate(tripData.returndate ? new Date(tripData.returndate) : null);
        setDepartCity({ value: tripData.origin, label: tripData.origin });
        setDestinationCity({ value: tripData.destination, label: tripData.destination });
        setAdults(parseInt(tripData.numadults));
        setChildren(parseInt(tripData.numchildren));
        setInfants(parseInt(tripData.numinfants));
        setTravelClass(tripData.prefclass);
    }, [location]);

    const handleDepartDateChange = (date) => {
        setSelectedDepartDate(date);
    };

    const handleReturnDateChange = (date) => {
        setSelectedReturnDate(date);
    };


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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);



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

    const handleSearch = () => {
        if (!departCity.value || !destinationCity.value) {
            window.alert("Please fill in all required fields: Depart City, Arrival City, and Depart Date");
            return;
        }

        if (departCity.value === destinationCity.value) {
            window.alert("Depart City and Destination City Cannot be the Same");
            return;
        }
        const sessionToken = localStorage.getItem('TransactionStatus');
        const onwardDate = selectedDepartDate.toISOString().split('T')[0];
        const returnDate = selectedReturnDate ? selectedReturnDate.toISOString().split('T')[0] : '';

        const urlParams = new URLSearchParams({
            actioncode: 'FSAPIV4',
            agentid: 'SUPER',
            opid: 'FS000',
            sessiontoken: sessionToken,
            origin: departCity.value,
            destination: destinationCity.value,
            onwarddate: onwardDate,
            returndate: returnDate,
            numadults: adults,
            numchildren: children,
            numinfants: infants,
            journeytype: 'OneWay',
            prefclass: 'Y',
            requestformat: 'JSON',
            resultformat: 'JSON',
            searchtype: 'normal',
            numresults: 100
        });

        const customUrl = `/landing?${urlParams.toString()}`;
        window.location.href = customUrl
        //setRedirect(customUrl);
    };
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className='flex flex-col sm:flex-row gap-3 text-white items-center pl-2 pr-2 sm:pl-24 sm:pt-10 sm:pr-0 '>
            <div className='flex flex-col text-left w-full sm:w-48 bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs">From</div>
                <Select
                    value={departCity}
                    onChange={(selectedOption) => {
                        setDepartCity(selectedOption);
                    }}
                    onInputChange={(inputValue) => {
                        setDepartCityInput(inputValue);
                        setSearchInput(inputValue); // Update searchInput state
                    }}
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
                            color: 'black'
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

            <div className='flex flex-col text-left w-full sm:w-48 bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs">To</div>
                <Select
                    value={destinationCity}
                    onChange={(selectedOption) => {
                        setDestinationCity(selectedOption);
                    }}
                    onInputChange={(inputValue) => {
                        setDestinationCityInput(inputValue);
                        setSearchInput(inputValue); // Update searchInput state
                    }}
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
                            color: 'black'
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

            <div className='flex flex-col w-full sm:w-48 h-[70px]  bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs text-left">Depart</div>
                <DatePicker
                    selected={selectedDepartDate}
                    onChange={handleDepartDateChange}
                    dateFormat='dd/MM/yyyy'
                    className='flex font-normal bg-transparent text-sm text-white rounded-sm h-[35px] w-full text-center border-b border-white'
                    popperClassName='date-picker-popper'
                    minDate={today}
                />
            </div>

            <div className='flex flex-col w-full sm:w-48 h-[70px] bg-white bg-opacity-10 p-2 rounded-md'>
                <div className="text-xs text-left">Return</div>
                <DatePicker
                    selected={selectedReturnDate}
                    onChange={handleReturnDateChange}
                    dateFormat='dd/MM/yyyy'
                    className='flex font-normal bg-transparent text-sm text-white rounded-sm h-[35px] w-full text-center border-b border-white'
                    minDate={selectedDepartDate || today}   
                />
            </div>

            <div className='flex flex-col w-full sm:w-48 h-[70px] bg-white bg-opacity-10 p-2 rounded-md justify-center'>
                <div className="text-xs text-left">Passenger/Class</div>
                <div className="dropdown pt-1 flex left-0">
                    
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-none flex w-full sm:w-[180px] sm:text-sm text-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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


            <button className="flex justify-center w-64 bg-[#E0621A] p-[15px] rounded-md" onClick={handleSearch}>Search</button>

        </div>
    );
}

export default LandingSearch;
