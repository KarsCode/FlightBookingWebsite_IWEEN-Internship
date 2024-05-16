import { useState } from 'react';
import { PiAirplaneInFlight } from "react-icons/pi";
import { LuBedDouble } from "react-icons/lu";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const Navbar = ({ handleIconClick }) => {
  const [selectedIcon, setSelectedIcon] = useState('flight');

  const handleIconClickInternal = (iconName) => {
    setSelectedIcon(iconName);
    handleIconClick(iconName);
  };

  return (
    <div className="rounded-3xl w-1/3 h-[100px] flex justify-around items-center shadow-md bg-white font-semibold">
      <div className={`flex flex-col items-center ${selectedIcon === 'flight' ? 'text-orange-500' : ''}`} onClick={() => handleIconClickInternal('flight')}>
        <div>
          <PiAirplaneInFlight size={28} />
        </div>
        Flight
      </div>

      <div className={`flex flex-col items-center ${selectedIcon === 'hotel' ? 'text-orange-500' : ''}`} onClick={() => handleIconClickInternal('hotel')}>
        <div>
          <LuBedDouble size={28} />
        </div>
        Hotel
      </div>

      <div className={`flex flex-col items-center ${selectedIcon === 'bus' ? 'text-orange-500' : ''}`} onClick={() => handleIconClickInternal('bus')}>
        <div>
          <MdOutlineDirectionsBus size={28} />
        </div>
        Bus
      </div>

      <div className={`flex flex-col items-center ${selectedIcon === 'insurance' ? 'text-orange-500' : ''}`} onClick={() => handleIconClickInternal('insurance')}>
        <div>
          <GoShieldCheck size={28} />
        </div>
        Insurance
      </div>

      <div className={`flex flex-col items-center ${selectedIcon === 'visa' ? 'text-orange-500' : ''}`} onClick={() => handleIconClickInternal('visa')}>
        <div>
          <IoEarthOutline size={28} />
        </div>
        Visa
      </div>
    </div>
  );
};

export default Navbar;
