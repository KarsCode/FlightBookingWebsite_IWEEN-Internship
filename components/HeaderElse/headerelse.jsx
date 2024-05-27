import { PiAirplaneInFlight } from "react-icons/pi";
import { LuBedDouble } from "react-icons/lu";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [activeIcon, setActiveIcon] = useState('');

  return (
    <div className=" bg-white flex font-bold pb-4 pl-2 pr-6 pt-4 gap-4 sm:pt-0 sm:pr-2 sm:pl-[6rem]">
      <Link to="/" className="pr-4">
        <img src="/logo.png" width="150" height="50" alt="Logo" />
      </Link>

      <div className="flex items-center pr-[3rem] gap-4 sm:ml-auto">
        {/* Dropdown for small screens */}
        <div className="dropdown lg:hidden">
          <button
            className="btn btn-secondary dropdown-toggle flex justify-center bg-black"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FaSearch size={10} color="white" />
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item text-sm" href="#" onClick={() => setActiveIcon('PiAirplaneInFlight')}>Flights</a>
            <a className="dropdown-item text-sm" href="#" onClick={() => setActiveIcon('LuBedDouble')}>Hotels</a>
            <a className="dropdown-item text-sm" href="#" onClick={() => setActiveIcon('MdOutlineDirectionsBus')}>Buses</a>
            <a className="dropdown-item text-sm" href="#" onClick={() => setActiveIcon('GoShieldCheck')}>Insurance</a>
            <a className="dropdown-item text-sm" href="#" onClick={() => setActiveIcon('IoEarthOutline')}>Tours</a>
          </div>
        </div>

        {/* Display options for larger screens */}
        <div className="hidden lg:flex gap-10 items-center">
          <div onClick={() => setActiveIcon('PiAirplaneInFlight')}>
            <PiAirplaneInFlight color={activeIcon === 'PiAirplaneInFlight' ? '#E0621A' : 'grey'} size={30} />
          </div>
          <div onClick={() => setActiveIcon('LuBedDouble')}>
            <LuBedDouble color={activeIcon === 'LuBedDouble' ? '#E0621A' : 'grey'} size={22} />
          </div>
          <div onClick={() => setActiveIcon('MdOutlineDirectionsBus')}>
            <MdOutlineDirectionsBus color={activeIcon === 'MdOutlineDirectionsBus' ? '#E0621A' : 'grey'} size={22} />
          </div>
          <div onClick={() => setActiveIcon('GoShieldCheck')}>
            <GoShieldCheck color={activeIcon === 'GoShieldCheck' ? '#E0621A' : 'grey'} size={22} />
          </div>
          <div onClick={() => setActiveIcon('IoEarthOutline')}>
            <IoEarthOutline color={activeIcon === 'IoEarthOutline' ? '#E0621A' : 'grey'} size={22} />
          </div>
        </div>

        <div className="text-xs underline text-[#06539A] hidden lg:block">
          Main Balance - Rs 0
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex justify-center items-center bg-[#06539A] text-white rounded-full">
            A
          </div>
          <div className="sm:text-xs hidden">Akhil Gupta</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
