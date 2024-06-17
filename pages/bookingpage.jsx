/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Booking from '../components/Booking/Booking';

const BookingPage = () => {
  const location = useLocation();
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const sessionToken = params.get('sessiontoken');
        const actioncode = params.get('actioncode');
        const agentid = params.get('agentid');
        const cachekeyow = params.get('cachekeyow');
        const opid = params.get('opid');
        const triptype = params.get('triptype')

        // Construct URLSearchParams with required parameters
        const urlParams = new URLSearchParams({
          actioncode: actioncode,
          agentid: agentid,
          cachekeyow: cachekeyow,
          opid: 'FS000',
          resultformat: 'jsonv2',
          sessiontoken: sessionToken,
          triptype: triptype,
        });

        // Conditionally add cachekeytw if it exists
        const cachekeytw = params.get('cachekeytw');
        if (cachekeytw) {
          urlParams.append('cachekeytw', cachekeytw);
        }

        // Construct the API URL with URLSearchParams
        const apiUrl = `https://b2b.jasyatra.com/v2dispatch.jsp?${urlParams.toString()}`;

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();
        setFlightData(data.NextraPricingResponseV4);
        
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlightData();
  }, [location.search]);

  return (
    <div className='relative bg-custom-gradient h-full'>
      <div>
        <Booking flightData={flightData} />
      </div>
    </div>
  );
};

export default BookingPage;
