

const Booking = () => {
    return (
        <div className="flex pt-32 pb-10 pl-24">
            <div className="w-2/3 flex flex-col gap-2 p-8 bg-white">

                <div className="flex flex-col bg-white shadow-md p-4 border-2 border-gray-100 rounded-md">
                    <div className="flex justify-between pb-8 border-b-2 border-gray-300">
                        <div className="flex flex-col text-left">
                            <div className="font-semibold">
                                DELHI (DEL) → MUMBAI (BOM)
                            </div>
                            <div className="text-sm text-gray-400">
                                One Way | Thu, 25 May 2023 | Non-stop | 2h 45min
                            </div>
                        </div>

                        <div className="flex items-center p-2 text-sm text-white bg-[#06539A] rounded-md">
                            <button>
                                View Fare Rules
                            </button>
                        </div>
                    </div>

                </div>





            </div>

        </div>
    )
}

export default Booking
