

const ImportantInformation = () => {
    return (
        <div className='flex flex-col border-red-300 shadow-sm p-4 border-2 rounded-md text-left'>
            <div className='uppercase font-semibold text-xl pb-2'>
                IMPORTANT INFORMATION

            </div>
            <div>
                <ul className='font-light text-gray-400 text-sm'>
                    <li>
                        Check travel guidelines and baggage information below:
                    </li>
                    <li>
                        Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.Wearing a mask/face cover is no longer mandatory. However, all travellers are advised to do so as a precautionary measure.

                    </li>
                    <li>
                        Carry a valid photo identification proof (Driver Licence, Aadhar Card, Pan Card or any other Government recognised photo identification)
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default ImportantInformation
