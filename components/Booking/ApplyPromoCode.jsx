/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ApplyPromoCode = ({ promoCode, handlePromoCodeChange, handleApplyPromoCode }) => {
    return (
        <div className='bg-white shadow-sm border-2 border-gray-100'>
            <div className='flex flex-col gap-2 p-3'>
                <div className='text-lg font-semibold py-2'>
                    Apply Promo Code
                </div>
                <div>
                    <Form.Control
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Apply"
                        className='flex text-center border-2 border-black'
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                    />
                </div>
                <div>
                    <Button className='w-full' bsPrefix='bg-orange-500 rounded-md h-[40px]' onClick={handleApplyPromoCode}>Apply</Button>
                </div>
            </div>

        </div>
    )
}

export default ApplyPromoCode
