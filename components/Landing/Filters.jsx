import { useState } from 'react';
import {  FaRegMoon } from 'react-icons/fa';

const Filters = () => {
    const [selectedAirline, setSelectedAirline] = useState('');
    const [priceRange, setPriceRange] = useState([1010, 9999]);
    const [selectedDepartTime, setSelectedDepartTime] = useState('');
    const [selectedArrivalTime, setSelectedArrivalTime] = useState('');
    const [selectedFarePolicy, setSelectedFarePolicy] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [flightNumber, setFlightNumber] = useState('');
  
    const handleAirlineChange = (event) => {
      setSelectedAirline(event.target.value);
    };
  
    const handlePriceRangeChange = (event) => {
      const value = event.target.value;
      setPriceRange([value, priceRange[1]]);
    };
  
    const handleDepartTimeChange = (time) => {
      setSelectedDepartTime(time);
    };

    

    const handleArrivalTimeChange = (time) => {
        setSelectedArrivalTime(time);
      };

      const handleFarePolicyChange = (policy) => {
        if (selectedFarePolicy.includes(policy)) {
            setSelectedFarePolicy(selectedFarePolicy.filter(item => item !== policy));
        } else {
            setSelectedFarePolicy([...selectedFarePolicy, policy]);
        }
    };

    const handleFlightNumberChange = (event) => {
        setFlightNumber(event.target.value);
    };
  

  return (
    <div className='flex flex-col bg-white rounded-lg p-4 shadow-md'>
      <div className='p-4 border-b border-gray-300'>
        <div className='text-md font-semibold mb-2 text-left'>Search By Airlines</div>
        <div className='flex flex-col gap-2 text-sm'>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              value='Indigo'
              checked={selectedAirline === 'Indigo'}
              onChange={handleAirlineChange}
              className='h-4 w-4 border border-gray-300 rounded-md checked:border-transparent focus:outline-none'
            />
            <span>Indigo</span>
          </label>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              value='AirAsia'
              checked={selectedAirline === 'AirAsia'}
              onChange={handleAirlineChange}
              className=' h-4 w-4 border border-gray-300 rounded-md checked:border-transparent focus:outline-none'
            />
            <span>AirAsia</span>
          </label>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              value='Kingfisher'
              checked={selectedAirline === 'Kingfisher'}
              onChange={handleAirlineChange}
              className='h-4 w-4 border border-gray-300 rounded-md checked:border-transparent focus:outline-none'
            />
            <span>Kingfisher</span>
          </label>
        </div>
      </div>

      <div className='p-4 border-b border-gray-300'>
        <div className='text-md font-semibold mb-2 text-left'>Price Range</div>
        <div className='flex items-start flex-col'>
            <span className='text-sm pb-2 text-left'>Rs {priceRange[0].toLocaleString()} - Rs {priceRange[1].toLocaleString()}</span>
            <input
            type='range'
            min='1010'
            max='9999'
            value={priceRange[0]}
            onChange={handlePriceRangeChange}
            className='w-full'
            style={{
                appearance: 'none',
                width: '100%',
                height: '5px',
                background: '#ddd',
                outline: 'none',
                opacity: '0.7',
                transition: 'opacity .2s',
            }}
            />
        </div>
     </div>


     <div className='p-4 border-b border-gray-300'>
    <div className='text-md font-semibold mb-2 text-left'>Departure Time</div>
    <div className='grid grid-cols-2 gap-4'>
        <button 
        className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime === '00-06' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
        onClick={() => handleDepartTimeChange(selectedDepartTime === '00-06' ? '' : '00-06')}
        >
        <img src='/sunrise.png' width='25' height='5'/>
        <span>00 - 06</span>
        </button>
        <button 
        className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime === '06-12' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
        onClick={() => handleDepartTimeChange(selectedDepartTime === '06-12' ? '' : '06-12')}
        >
        <img src='/sunup.png' width='25' height='5'/>
        <span>06 - 12</span>
        </button>
        <button 
        className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime === '12-18' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
        onClick={() => handleDepartTimeChange(selectedDepartTime === '12-18' ? '' : '12-18')}
        >
        <img src='/sunset.png' width='25' height='5'/>
        <span>12 - 18</span>
        </button>
        <button 
        className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime === '18-24' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
        onClick={() => handleDepartTimeChange(selectedDepartTime === '18-24' ? '' : '18-24')}
        >
        <FaRegMoon size={20} />
        <span>18 - 24</span>
        </button>
    </div>
    </div>






      <div className='p-4 border-b border-gray-300'>
        <div className='text-md font-semibold mb-2 text-left'>Arrival Time</div>
        <div className='grid grid-cols-2 gap-4'>
            <button 
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime === '00-06' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
            onClick={() => handleArrivalTimeChange(selectedArrivalTime === '00-06' ? '' : '00-06')}
            >
            <img src='/sunrise.png' width='25' height='5'/>
            <span>00 - 06</span>
            </button>
            <button 
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime === '06-12' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
            onClick={() => handleArrivalTimeChange(selectedArrivalTime === '06-12' ? '' : '06-12')}
            >
            <img src='/sunup.png' width='25' height='5'/>
            <span>06 - 12</span>
            </button>
            <button 
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime === '12-18' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
            onClick={() => handleArrivalTimeChange(selectedArrivalTime === '12-18' ? '' : '12-18')}
            >
            <img src='/sunset.png' width='25' height='5'/>
            <span>12 - 18</span>
            </button>
            <button 
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime === '18-24' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
            onClick={() => handleArrivalTimeChange(selectedArrivalTime === '18-24' ? '' : '18-24')}
            >
            <FaRegMoon size={20} />
            <span>18 - 24</span>
            </button>
        </div>
      </div>






      <div className='p-4 border-b border-gray-300'>
                <div className='text-md font-semibold mb-2 text-left'>Fare Policy & No. of stops</div>
                <div className='flex flex-col gap-2 text-sm'>
                    <label className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            value='Non Stop'
                            checked={selectedFarePolicy.includes('Non Stop')}
                            onChange={() => handleFarePolicyChange('Non Stop')}
                            className='h-4 w-4 border border-gray-300 rounded-md checked:bg-[#0B2A5B] checked:border-transparent focus:outline-none'
                        />
                        <span>Non Stop</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            value='Refundable'
                            checked={selectedFarePolicy.includes('Refundable')}
                            onChange={() => handleFarePolicyChange('Refundable')}
                            className='h-4 w-4 border border-gray-300 rounded-md checked:bg-[#0B2A5B] checked:border-transparent focus:outline-none'
                        />
                        <span>Refundable</span>
                    </label>
                    <label className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            value='Same Day Arrival'
                            checked={selectedFarePolicy.includes('Same Day Arrival')}
                            onChange={() => handleFarePolicyChange('Same Day Arrival')}
                            className='h-4 w-4 border border-gray-300 rounded-md checked:bg-[#0B2A5B] checked:border-transparent focus:outline-none'
                        />
                        <span>Same Day Arrival</span>
                    </label>
                </div>
            </div>


            <div className='p-4 border border-gray-300 bg-gray-200'>
                <div className='text-lg font-semibold mb-2'>Filter by flight numbers</div>
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <input
                            type="text"
                            placeholder="Enter flight number"
                            className="w-full px-2 py-1 focus:outline-none"
                            onChange={handleFlightNumberChange}
                        />
                    </div>
        </div>


    </div>
  );
}

export default Filters;
