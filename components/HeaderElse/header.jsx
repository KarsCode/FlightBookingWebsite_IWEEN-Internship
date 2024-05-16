import { PiAirplaneInFlight } from "react-icons/pi";
import { LuBedDouble } from "react-icons/lu";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

    const [activeIcon, setActiveIcon] = useState('');

  return (
    <div className="flex font-bold items-start pt-[2rem] pl-[6rem]">
      <Link to="/">
        <img src="../../public/logo.png" width="150" height="50" />
      </Link>

      <div className="flex gap-10 align-middle items-center ml-auto pr-[3rem]">

        <div onClick={() => setActiveIcon('PiAirplaneInFlight')}>
          <PiAirplaneInFlight color={activeIcon === 'PiAirplaneInFlight' ? 'orange' : 'white'} size={30} />
        </div>
        <div onClick={() => setActiveIcon('LuBedDouble')}>
          <LuBedDouble color={activeIcon === 'LuBedDouble' ? 'orange' : 'white'} size={22} />
        </div>
        <div onClick={() => setActiveIcon('MdOutlineDirectionsBus')}>
          <MdOutlineDirectionsBus color={activeIcon === 'MdOutlineDirectionsBus' ? 'orange' : 'white'} size={22} />
        </div>
        <div onClick={() => setActiveIcon('GoShieldCheck')}>
          <GoShieldCheck color={activeIcon === 'GoShieldCheck' ? 'orange' : 'white'} size={22} />
        </div>
        <div onClick={() => setActiveIcon('IoEarthOutline')}>
          <IoEarthOutline color={activeIcon === 'IoEarthOutline' ? 'orange' : 'white'} size={22} />
        </div>

        <div className="text-xs underline text-white">
            Main Balance - Rs 0
        </div>

        <div className="bg-[#06539A] w-[25px] rounded-full">
            A
        </div>

        <div className="text-white text-xs">
            Akhil Gupta
        </div>

      </div>
    </div>
  );
};

export default Header;
