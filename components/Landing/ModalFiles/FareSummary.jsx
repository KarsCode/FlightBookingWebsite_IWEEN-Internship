/* eslint-disable react/prop-types */

const FareSummary = ({ flight }) => {
  return (
    <div className='flex flex-col w-full'>

      <div className="flex justify-between text-white bg-[#06539A] py-2 pl-6">
        <div className="w-1/2">
          FARE BREAKUP SUMMARY
        </div>
        <div className="w-1/2">
          Amount INR
        </div>
      </div>

      <div className='flex flex-col py-2 pl-6'>
        <div className='flex justify-between'>
          <div className="w-1/2">
            Basic Amount
          </div>
          <div className="w-1/2">
            {flight.flightfare.totalbasefare}
          </div>
        </div>
      </div>

      <div className='flex flex-col py-2 pl-6'>
        <div className='flex justify-between'>
          <div className="w-1/2">
            Service Fee
          </div>
          <div className="w-1/2">
            {flight.flightfare.servicefee}
          </div>
        </div>
      </div>

      <div className='flex flex-col py-2 pl-6'>
        <div className='flex justify-between'>
          <div className="w-1/2">
            Tax and Others
          </div>
          <div className="w-1/2">
            {flight.flightfare.totaltax}
          </div>
        </div>
      </div>

      <div className='flex flex-col py-2 pl-6'>
        <div className='flex justify-between'>
          <div className="w-1/2">
            YQ Amount
          </div>
          <div className="w-1/2">
            {flight.flightfare.totalyq}
          </div>
        </div>
      </div>

      <div className='flex flex-col py-2 pl-6'>
        <div className='flex justify-between'>
          <div className="w-1/2">
            Discount
          </div>
          <div className="w-1/2">
            {flight.flightfare.discount}
          </div>
        </div>
      </div>

      <div className='flex flex-col bg-orange-500 text-white py-2 pl-6'>
        <div className='flex justify-between'>
          <div className="w-1/2">
            Total Net
          </div>
          <div className="w-1/2">
            {flight.flightfare.totalnet}
          </div>
        </div>
      </div>

      <div className="flex gap-4 p-4">
        <div className="flex flex-col w-1/2">
          <div className="flex justify-between text-white bg-[#06539A] p-2">
            <div>
              CANCELLATION CHARGES PER PAX
            </div>
          </div>
          <div className="flex justify-between sm:font-semibold border-2 border-gray-400 rounded-sm p-2">
            <div className="w-1/2">TIMELINE</div>
            <div className="w-1/2">PENALTY</div>
          </div>
          <div className="flex justify-between border-2 border-gray-400 rounded-sm p-2">
            <div className="w-1/2">0-0 Hour</div>
            <div className="w-1/2">As per Airline Policy</div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 h-32">
          <div className="flex justify-between text-white bg-[#06539A] p-2">
            <div>
              RESCHEDULE CHARGES PER PAX
            </div>
          </div>
          <div className="flex justify-between sm:font-semibold border-2 border-gray-400 rounded-sm p-2">
            <div className="w-1/2">TIMELINE</div>
            <div className="w-1/2">PENALTY</div>
          </div>
          <div className="flex justify-between border-2 border-gray-400 rounded-sm p-2">
            <div className="w-1/2">0-0 Hour</div>
            <div className="w-1/2">₹ 0.00 + Difference In Fare</div>
          </div>
        </div>
      </div>


      <div className="text-gray-400 text-left p-4 text-sm">
        Disclaimer :
        <ul>
          <li>Check-in for all Domestic Flights Closes 45 Minutes prior to the scheduled departure, Failure to check -in at least 45 minutes prior will result in the fare being forfeited.</li>
          <li>If Ticket Fare is lower than Cancellation penalty then Basic Fare Plus Fuel Surcharge will be charged as cancellation Fee, only statutory taxes will be refunded.</li>
          <li>Re-issue not advisable if Ticket fare is lower than Re-issue charges, better cancel and issue new ticket.</li>
          <li>INFANT - No Re-issue & Cancel Fee applicable for Infant Ticket except for Air Asia, INFANT TICKETS ARE NON REFUNDABLE ON AIR ASIA.</li>
          <li>Partial Cancellation is not allowed on tickets booked under special discounted Round trip fares.</li>
          <li>No Show means, if a ticket is not cancelled within the stipulated time.</li>
          <li>Tickets booked under Sale / Promo Fare are Non Refundable, Above Cancel/Re-issue Penalty is applicable for Refundable Fares only, For Fares Marked as Non Refundable only statutory taxes will be refunded.</li>
          <li>Family Fare- Cancellation in respect of the booking made under family fare shall only be permissible if minimum of four (04) passengers are retained in the booking.</li>
          <li>ANY AMOUNT PAID TOWARDS SEAT, MEAL, EXTRA BAGGAGE BOOKING IN AIR ASIA ARE NON REFUNDABLE IN CASE OF TICKET CANCELLATION.</li>
          <li>The above Fare Rules are just a guideline for your convenience and is subject to changes by the Airline from time to time.</li>
        </ul>

      </div>



    </div>
  );
}

export default FareSummary;
