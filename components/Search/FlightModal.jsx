/* eslint-disable react/prop-types */
import { useState } from "react";
import RoundTrip from './Flight/RoundTrip';

const FlightModal = ({ onTripDataSelect, onSearchTypeChange }) => {
    const [selectedOption, setSelectedOption] = useState('OneWay');
    const [selectedCheckbox, setSelectedCheckbox] = useState('normal');
    

    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setSelectedOption(event.target.value);
        onSearchTypeChange(event.target.value);  // Pass selected option to parent
    };

    const handleCheckboxChange = (event) => {
        setSelectedCheckbox(event.target.value);
        onSearchTypeChange(event.target.value);  // Pass selected checkbox to parent
    };

    return (
        <div className="flex flex-col sm:flex-row items-center">
            <div className="pt-8 sm:pt-10 sm:pl-5">
                <div className="flex flex-col items-center sm:flex-row sm:w-full sm:justify-items-start font-medium">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="OneWay"
                            value="OneWay"
                            checked={selectedOption === 'OneWay'}
                            onChange={handleRadioChange}
                        />
                        <label
                            className={`form-check-label ${selectedOption === 'OneWay' ? 'font-bold' : 'font-normal'}`}
                            htmlFor="OneWay"
                        >
                            One way
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="RoundTrip"
                            value="RoundTrip"
                            checked={selectedOption === 'RoundTrip'}
                            onChange={handleRadioChange}
                        />
                        <label
                            className={`form-check-label ${selectedOption === 'RoundTrip' ? 'font-bold' : 'font-normal'}`}
                            htmlFor="RoundTrip"
                        >
                            Round Trip
                        </label>
                    </div>
                </div>

                {selectedOption === 'OneWay' && <RoundTrip tripMode={'OneWay'} onTripDataSelect={onTripDataSelect} />}
                {selectedOption === 'RoundTrip' && <RoundTrip tripMode={'RoundTrip'} onTripDataSelect={onTripDataSelect} />}

                <div className="pb-[50px] pt-4 text-sm sm:text-normal sm:font-medium flex justify-center pl-5 sm:pl-0">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            value="normal"
                            checked={selectedCheckbox === 'normal'}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Regular</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value="student"
                            checked={selectedCheckbox === 'student'}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="inlineCheckbox2">Student Fare</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox4"
                            value="seniorcitizen"
                            checked={selectedCheckbox === 'seniorcitizen'}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="inlineCheckbox4">Senior Citizen </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightModal;
