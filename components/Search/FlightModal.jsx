/* eslint-disable react/prop-types */
import { useState } from "react";
import RoundTrip from './Flight/RoundTrip';

const FlightModal = ({ onTripDataSelect }) => {
    const [selectedOption, setSelectedOption] = useState('oneway');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="sm:pt-10 sm:pl-5">
            <div className="flex flex-col items-center sm:flex-row sm:w-full sm:justify-items-start font-medium">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="oneway"
                        value="oneway"
                        checked={selectedOption === 'oneway'}
                        onChange={handleRadioChange}
                    />
                    <label
                        className={`form-check-label ${selectedOption === 'oneway' ? 'font-bold' : 'font-normal'}`}
                        htmlFor="oneway"
                    >
                        One way
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="roundtrip"
                        value="roundtrip"
                        checked={selectedOption === 'roundtrip'}
                        onChange={handleRadioChange}
                    />
                    <label
                        className={`form-check-label ${selectedOption === 'roundtrip' ? 'font-bold' : 'font-normal'}`}
                        htmlFor="roundtrip"
                    >
                        Round Trip
                    </label>
                </div>
            </div>

            {selectedOption === 'oneway' && <RoundTrip tripMode={'OneWay'} onTripDataSelect={onTripDataSelect} />}
            {selectedOption === 'roundtrip' && <RoundTrip tripMode={'RoundTrip'} onTripDataSelect={onTripDataSelect} />}

            <div className="pb-[50px] pt-4 text-sm sm:text-normal sm:font-medium flex">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                    <label className="form-check-label" htmlFor="inlineCheckbox1">Non Stop Flights</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                    <label className="form-check-label" htmlFor="inlineCheckbox2">Student Fare</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
                    <label className="form-check-label" htmlFor="inlineCheckbox3">Armed Forces </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" />
                    <label className="form-check-label" htmlFor="inlineCheckbox4">Nearby airports </label>
                </div>
            </div>
        </div>
    );
};

export default FlightModal;
