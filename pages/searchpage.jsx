/* eslint-disable no-unused-vars */
import './searchpage.css'
import Header from '../components/header'
import Navbar from '../components/Search/Navbar';
import SearchModal from '../components/Search/SearchModal'
import SearchOffers from '../components/Search/SearchOffers'
import Footer from '../components/Footer/footer'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SearchPage = () => {
    // State to manage the selected icon
    const [selectedIcon, setSelectedIcon] = useState('flight');
    const [redirect, setRedirect] = useState(false);
    const [tripData, setTripData] = useState(null); // State to store trip data
    const [searchType, setSearchType] = useState('normal'); // State to store the search type

    const adjustToLocalTimezone = (date) => {
        if (!date) return null;
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('T')[0];
    };

    // Function to handle icon click
    const handleIconClick = (iconName) => {
        setSelectedIcon(iconName);
    };

    // Function to handle trip data selection
    const handleTripDataSelect = (tripData) => {
        // Update the selected trip data state
        setTripData(tripData);
    };

    // Function to handle search type change
    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    // Function to handle the search action
    const handleSearch = () => {
        // Check if required fields are missing
        if (tripData.tripMode === 'OneWay') {
            if (!tripData || !tripData.departCity || !tripData.destinationCity) {
                window.alert("Please fill in all required fields: Depart City, Arrival City, and Depart Date");
                return;
            }
        }
        if (tripData.tripMode === 'RoundTrip') {
            if (!tripData || !tripData.departCity || !tripData.destinationCity || !tripData.selectedReturnDate) {
                window.alert("Please fill in all required fields: Depart City, Arrival City, Depart Date, and Return Date");
                return;
            }
        }

        // Check if Depart City and Arrival City are the same
        if (tripData.departCity.value === tripData.destinationCity.value) {
            window.alert("Depart City and Destination City Cannot be the Same");
            return;
        }

        // If all checks pass, construct the URL with search parameters
        const sessionToken = localStorage.getItem('TransactionStatus');
        const onwardDate = adjustToLocalTimezone(tripData.selectedDepartDate)
        const returnDate = tripData.selectedReturnDate ? adjustToLocalTimezone(tripData.selectedReturnDate) : '';
        const urlParams = new URLSearchParams({
            actioncode: 'FSAPIV4',
            agentid: 'SUPER',
            opid: 'FS000',
            sessiontoken: sessionToken,
            origin: tripData.departCity.value,
            destination: tripData.destinationCity.value,
            onwarddate: onwardDate,
            returndate: returnDate,
            numadults: tripData.adults,
            numchildren: tripData.children,
            numinfants: tripData.infants,
            journeytype: tripData.tripMode,
            prefclass: 'Y',
            requestformat: 'JSON',
            resultformat: 'JSON',
            searchtype: searchType,  // Add the search type here
            numresults: 100
        });

        const customUrl = `/landing?${urlParams.toString()}`;

        // Redirect to the constructed URL
        setRedirect(customUrl);
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <div className='content'>
                <div className="flex flex-col items-center p-2">
                    <div className="sm:absolute flex w-full justify-center pt-10 sm:px-4 sm:pt-12 z-3">
                        <Navbar handleIconClick={handleIconClick} />
                    </div>
                    <div className="w-full flex flex-col sm:flex-row justify-center sm:mt-[110px] sm:z-2">
                        <SearchModal
                            selectedIcon={selectedIcon}
                            onTripDataSelect={handleTripDataSelect}
                            onSearchTypeChange={handleSearchTypeChange}
                        />
                    </div>
                    <div className="w-1/3 text-xl font-bold sm:z-3 p-2 sm:mt-[-20px] bg-[#E0621A] text-white rounded-full transition duration-300 ease-in-out">
                        <button
                            className="w-full"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SearchPage;
