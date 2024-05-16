import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OneWay = () => {
    const today = new Date();
    const [selectedDepartDate, setSelectedDepartDate] = useState(today);
    const [selectedReturnDate, setSelectedReturnDate] = useState(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [travelClass, setTravelClass] = useState('Economy');
    const [isDepartDatePickerOpen, setIsDepartDatePickerOpen] = useState(false);

    const handleDepartDateChange = (date) => {
        setSelectedDepartDate(date);
    };

    const handleReturnDateChange = (date) => {
        setSelectedReturnDate(date);
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

    const handleDepartDatePickerToggle = (isDatePickerOpen) => {
        setIsDepartDatePickerOpen(isDatePickerOpen);
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

    return (
        <div className={`flex gap-2 text-lg pt-4 ${isDepartDatePickerOpen ? 'pb-36' : ''}`}>
            <div className='flex gap-[2px]'>
                <div className='flex flex-col items-start font-light w-[240px] pl-2 border-1 border-black rounded-md'>
                    <div>Depart From</div>
                    <div className='font-semibold'>New Delhi</div>
                    <div>DEL</div>
                </div>
                <div className='flex flex-col items-start font-light w-[240px] pl-2 border-1 border-black rounded-md'>
                    <div>Going To</div>
                    <div className='font-semibold'>Mumbai</div>
                    <div>BOM</div>
                </div>
            </div>

            <div className='flex gap-[2px]'>
                <div className='flex flex-col items-start font-light w-[240px] pl-2 border-1 border-black rounded-md'>
                    <div>Depart Date</div>
                    <div className='font-semibold'>
                        <DatePicker
                            selected={selectedDepartDate}
                            onChange={handleDepartDateChange}
                            dateFormat='dd/MM/yyyy'
                            className='font-semibold text-sm'
                            popperClassName='date-picker-popper'
                            minDate={today}
                            onCalendarOpen={() => handleDepartDatePickerToggle(true)} // Set isDepartDatePickerOpen to true when date picker opens
                            onCalendarClose={() => handleDepartDatePickerToggle(false)} // Set isDepartDatePickerOpen to false when date picker closes
                        />
                    </div>
                    <div>
                        {selectedDepartDate && (
                            <div>{selectedDepartDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col items-start font-light w-[240px] pl-2 border-1 bg-gray-300 border-black rounded-md'
                    style={{ pointerEvents: 'none' }}>
                    <div>Return Date</div>
                    <div className='font-semibold'>
                        <DatePicker
                            selected={selectedReturnDate}
                            onChange={handleReturnDateChange}
                            dateFormat='dd/MM/yyyy'
                            className='font-semibold text-sm bg-gray-300'
                            popperClassName='date-picker-popper'
                        />
                    </div>
                    <div>
                        {selectedReturnDate && (
                            <div>{selectedReturnDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-start font-light w-[240px] pl-2 border-1 border-black rounded-md'>
                <div>
                    Travellers, Class
                </div>
                <div className="dropdown ">
                    <button className="btn btn-secondary dropdown-toggle text-black bg-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <button className="dropdown-item" onClick={() => setTravelClass('Economy')}>Economy</button>
                        <button className="dropdown-item" onClick={() => setTravelClass('Business')}>Business</button>
                        <button className="dropdown-item" onClick={() => setTravelClass('First Class')}>First Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneWay;
