import { SiApachecouchdb } from "react-icons/si";
import { GiBowlOfRice } from "react-icons/gi";
import { MdLuggage } from "react-icons/md";
import { IoIosOptions } from "react-icons/io";
const AddOns = () => {
  return (
                    <div className='flex flex-col shadow-sm p-4 border-2 border-gray-100 bg-white rounded-md text-left gap-3'>
                    <div className='font-semibold text-xl border-b-2 border-gray-300 pb-3'>
                        Add on (optional)
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4 items-center'>
                        <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
                            <div className='p-3 flex items-center justify-around gap-4'>
                                <SiApachecouchdb className='text-orange-500' size={30} />
                                Seat Selection
                            </div>
                        </div>
                        <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
                            <div className='p-3 flex items-center justify-around gap-4'>
                                <GiBowlOfRice className='text-orange-500' size={30} />
                                Add Meals
                            </div>
                        </div>
                        <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
                            <div className='p-3 flex items-center justify-around gap-4'>
                                <MdLuggage className='text-orange-500' size={30} />
                                Add Baggage
                            </div>
                        </div>
                        <div className='sm:w-1/4 w-full border-2 border-blue-400 flex justify-center rounded-md'>
                            <div className='p-3 flex items-center justify-around gap-4'>
                                <IoIosOptions className='text-orange-500' size={30} />
                                Other SSR
                            </div>
                        </div>


                    </div>
                 </div>
  )
}

export default AddOns
