/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FaRegMoon } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const Filters = ({ onFilterChange,maxPrice}) => {

  console.log('Filters',maxPrice)

  const [selectedAirline, setSelectedAirline] = useState('');
  const [priceRange, setPriceRange] = useState([1010, maxPrice||40000]);
  const [selectedDepartTime, setSelectedDepartTime] = useState([]);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState([]);
  const [selectedFarePolicy, setSelectedFarePolicy] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [flightNumber, setFlightNumber] = useState('');

  const handleAirlineChange = (event) => {
    const airline = event.target.value;
    if (selectedAirline === airline) {
      setSelectedAirline('');
    } else {
      setSelectedAirline(airline);
    }
  };

  const handlePriceRangeChange = (event) => {
    const x = event.target.value;
    setPriceRange([priceRange[0], x]);
  };
  const handleDepartTimeChange = (time) => {
    let timeRange = [];
    switch (time) {
      case '00-06':
        timeRange = [0, 600];
        break;
      case '06-12':
        timeRange = [600, 1200];
        break;
      case '12-18':
        timeRange = [1200, 1800];
        break;
      case '18-24':
        timeRange = [1800, 2400];
        break;
      default:
        timeRange = [];
    }
    if (
      selectedDepartTime.length === 2 &&
      selectedDepartTime[0] === timeRange[0] &&
      selectedDepartTime[1] === timeRange[1]
    ) {
      setSelectedDepartTime([]);
    } else {
      setSelectedDepartTime(timeRange);
    }
  };
  const handleArrivalTimeChange = (time) => {
    let timeRange = [];
    switch (time) {
      case '00-06':
        timeRange = [0, 600];
        break;
      case '06-12':
        timeRange = [600, 1200];
        break;
      case '12-18':
        timeRange = [1200, 1800];
        break;
      case '18-24':
        timeRange = [1800, 2400];
        break;
      default:
        timeRange = [];
    }
    if (
      selectedArrivalTime.length === 2 &&
      selectedArrivalTime[0] === timeRange[0] &&
      selectedArrivalTime[1] === timeRange[1]
    ) {
      setSelectedArrivalTime([]);
    } else {
      setSelectedArrivalTime(timeRange);
    }
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


  useEffect(() => {
    onFilterChange({
      selectedAirline,
      priceRange,
      selectedDepartTime,
      selectedArrivalTime,
      // selectedFarePolicy,
      flightNumber
    });
  }, [selectedAirline, priceRange, selectedDepartTime, selectedArrivalTime, selectedFarePolicy, flightNumber]);

 


  return (
    <div className='flex flex-col bg-white rounded-lg p-4 shadow-md'>
      <div className='p-4 border-b border-gray-300'>
        <div className='text-md font-semibold mb-2'>Search By Airlines</div>
        <div className='flex flex-col gap-2 text-sm items-center'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              value='Indigo'
              id='airlineIndigo'
              checked={selectedAirline === 'Indigo'}
              onChange={handleAirlineChange}
            />
            <label className='form-check-label' htmlFor='airlineIndigo'>
              Indigo
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              value='Spicejet'
              id='airlineSpicejet'
              checked={selectedAirline === 'Spicejet'}
              onChange={handleAirlineChange}
            />
            <label className='form-check-label' htmlFor='airlineSpicejet'>
              Spicejet
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              value='Vistara'
              id='airlineVistara'
              checked={selectedAirline === 'Vistara'}
              onChange={handleAirlineChange}
            />
            <label className='form-check-label' htmlFor='airlineVistara'>
              Vistara
            </label>
          </div>
        </div>
      </div>

      <div className='p-4 border-b border-gray-300'>
        <div className='text-md font-semibold mb-2 text-left'>Price Range</div>
        <div className='flex items-start flex-col'>
          <span className='text-sm pb-2 text-left'>Rs {priceRange[0].toLocaleString()} - Rs {priceRange[1].toLocaleString()}</span>
          <input
            type='range'
            min='1010'
            max='40000'
            value={priceRange[1]}
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
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime[0] === 0? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleDepartTimeChange(selectedDepartTime === '00-06' ? '' : '00-06')}
          >
            <img src='/sunrise.png' width='25' height='5' />
            <span>00 - 06</span>
          </button>
          <button
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime[0] === 600 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleDepartTimeChange(selectedDepartTime === '06-12' ? '' : '06-12')}
          >
            <img src='/sunup.png' width='25' height='5' />
            <span>06 - 12</span>
          </button>
          <button
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime[0] === 1200 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleDepartTimeChange(selectedDepartTime === '12-18' ? '' : '12-18')}
          >
            <img src='/sunset.png' width='25' height='5' />
            <span>12 - 18</span>
          </button>
          <button
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedDepartTime[0] === 1800 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
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
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime[0]===0 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleArrivalTimeChange(selectedArrivalTime === '00-06' ? '' : '00-06')}
          >
            <img src='/sunrise.png' width='25' height='5' />
            <span>00 - 06</span>
          </button>
          <button
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime[0]===600 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleArrivalTimeChange(selectedArrivalTime === '06-12' ? '' : '06-12')}
          >
            <img src='/sunup.png' width='25' height='5' />
            <span>06 - 12</span>
          </button>
          <button
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime[0]===1200 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handleArrivalTimeChange(selectedArrivalTime === '12-18' ? '' : '12-18')}
          >
            <img src='/sunset.png' width='25' height='5' />
            <span>12 - 18</span>
          </button>
          <button
            className={`flex rounded-full items-center gap-1 text-xs p-1 w-[80px] h-[35px] text-center ${selectedArrivalTime[0]===1800 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
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


      <div className='p-3 border border-gray-300 bg-gray-200'>
        <div className='text-lg font-semibold mb-2'>Filter by flight number</div>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Enter flight no."
            className="w-full px-2 py-1 focus:outline-none"
            onChange={handleFlightNumberChange}
          />
        </div>
      </div>


    </div>
  );
}

export default Filters;
