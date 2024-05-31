import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";

const Info = () => {
  return (
    <div className="flex flex-col items-start gap-5 max-w-[700px]">
      <div className="pb-6">
        <img src='/logo.png' height='50' width='150' alt="Logo"/>
      </div>

      <div className="flex gap-2 font-semibold sm:items-start">
        <CiLocationOn size={25}/>
        <div className="flex text-left">2/3, A.1, 5th Street, P.P.Garden, Banglore, OPP, HBR laybout , Hennur Cross , 56003, India</div>
      </div>
      <div className="flex gap-2 items-center w-max text-sm sm:text-normal">
        <BsTelephone size={15}/>
        <div className="font-light">+91 376254953</div>
        <div className="font-light">3872895273</div>
        <div className="font-light">3276786287</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-start justify-evenly">
        <CiMail/>
        <div className="font-light">jasyatraoffical@jasyatra.com</div>
        <div className="font-light">sales@jasyatra.com</div>
      </div>
    </div>
  );
};

export default Info;
