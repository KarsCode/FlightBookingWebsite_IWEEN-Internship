import { useState } from "react";
import OneWay from "./Flight/OneWay";
import RoundTrip from './Flight/RoundTrip'

const FlightModal = () => {
    const [selectedOption, setSelectedOption] = useState('oneway');

    const handleRadioChange = (event) => {
    
      setSelectedOption(event.target.value);
      
    };
  return (
    <div className="pt-10 pl-5 ">
    <div className=" flex w-full justify-items-start font-medium">
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="exampleRadios" id="oneway" value="oneway" checked={selectedOption === 'oneway'}
            onChange={handleRadioChange}/>
        <label className="form-check-label" htmlFor="exampleRadio1">
          One way
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="exampleRadios" id="roundtrip" value="roundtrip" checked={selectedOption === 'roundtrip'}
            onChange={handleRadioChange} />
        <label className="form-check-label" htmlFor="exampleRadio2">
          Round Trip
        </label>
      </div>
      </div>

      {selectedOption === 'oneway' && <OneWay/>}
      {selectedOption === 'roundtrip' && <RoundTrip/>}
    
    <div className="pb-[50px] pt-4 font-medium flex items-start">
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
  )
}

export default FlightModal
