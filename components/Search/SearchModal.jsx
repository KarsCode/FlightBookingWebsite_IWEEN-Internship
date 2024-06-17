/* eslint-disable no-unused-vars */
import { useState } from "react";
import FlightModal from "./FlightModal";

// eslint-disable-next-line react/prop-types
const SearchModal = ({ selectedIcon, onTripDataSelect, onSearchTypeChange }) => {
    const [searchType, setSearchType] = useState('normal');

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        onSearchTypeChange(type)
    };

    return (
        <div className="bg-white rounded-2xl">
            {selectedIcon === 'flight' && (
                <FlightModal
                    onTripDataSelect={onTripDataSelect}
                    onSearchTypeChange={handleSearchTypeChange}
                />
            )}
        </div>
    );
};

export default SearchModal;
