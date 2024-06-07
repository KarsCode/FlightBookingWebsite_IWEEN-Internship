/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
const GSTDetails = ({gstEmail,gstHolderName,setGstEmail,gstNumber,gstPhoneNumber,setGstNumber,setGstHolderName,setGstPhoneNumber}) => {
    return (
        <div className='flex flex-col shadow-sm p-4 border-2 border-gray-100 bg-white rounded-md text-left gap-3'>
            <div className='font-semibold text-xl border-b-2 border-gray-300 pb-3'>
                GST Details for business travellers (optional)
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='sm:w-1/3'>
                    <Form.Control type="text" placeholder="GST Holder Name" aria-label="GST Holder Name"
                        value={gstHolderName}
                        onChange={(e) => setGstHolderName(e.target.value)} />
                </div>
                <div className='sm:w-1/3'>
                    <Form.Control type="text" placeholder="GST Number" aria-label="GST Number"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)} />
                </div>
                <div className='sm:w-1/3'>
                    <Form.Control type="email" placeholder="Email" aria-label="Email"
                        value={gstEmail}
                        onChange={(e) => setGstEmail(e.target.value)} />
                </div>
                <div className='sm:w-1/3'>
                    <Form.Control type="tel" placeholder="Number" aria-label="Number"
                        value={gstPhoneNumber}
                        onChange={(e) => setGstPhoneNumber(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default GSTDetails
