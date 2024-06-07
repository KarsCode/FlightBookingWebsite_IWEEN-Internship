/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const PaymentOptions = ({ selectedPaymentOption, handlePaymentOptionSelect }) => {
    return (
        <div className='flex flex-col shadow-sm border-2 border-gray-100 bg-white rounded-md text-left gap-3'>
            <div className='border-b-2  border-gray-300'>
                <div className='text-xl font-semibold p-4'>
                    Payment Options
                </div>
            </div>
            <div className='flex flex-col sm:flex-row text-xl items-center h-full'>
                <div className={`sm:border-r-2 w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'creditdebit' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('creditdebit')}>
                    Credit/Debit
                </div>
                <div className={`sm:border-r-2 w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'netbanking' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('netbanking')}>
                    Netbanking
                </div>
                <div className={`sm:border-r-2 w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'upi' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('upi')}>
                    UPI
                </div>
                <div className={`w-1/4 flex justify-center pb-4 ${selectedPaymentOption === 'wallet' ? 'text-orange-500' : ''}`} onClick={() => handlePaymentOptionSelect('wallet')}>
                    Wallet
                </div>
            </div>
        </div>
    )
}

export default PaymentOptions
