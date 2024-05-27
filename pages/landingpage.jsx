import { useLocation } from 'react-router-dom'
import './landingpage.css';
import LandingSearch from '../components/Landing/LandingSearch';
import Filters from '../components/Landing/Filters';
import FlightList from '../components/Landing/FlightList';

const LandingPage = () => {
    // Access the location state using useLocation hook
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const tripData = location.state && location.state.tripData;
    const fetchFlightOptions = async () => {
        console.log(tripData)
        try {
            const sessionToken = localStorage.getItem('TransactionStatus');
            const url = `https://b2b.jasyatra.com/v2dispatch.jsp?actioncode=FSAPIV4&agentid=SUPER&opid=FS000&sessiontoken=${sessionToken}&xmlorjson=%3Cflightsearchrequest%3E%3Ccredentials%3E%3Cusername%3EAPIUSER%3C/username%3E%3Cpassword%3EAPIUSER%3C/password%3E%3Cofficeid%3ESUPER%3C/officeid%3E%3C/credentials%3E%3Corigin%3E${tripData.departCity.value}%3C/origin%3E%3Cdestination%3E${tripData.destinationCity.value}%3C/destination%3E%3Conwarddate%3E${tripData.selectedDepartDate.toISOString().split('T')[0]}%3C/onwarddate%3E%3Creturndate%3E${tripData.selectedReturnDate ? tripData.selectedReturnDate.toISOString().split('T')[0] : ''}%3C/returndate%3E%3Cnumadults%3E${tripData.adults}%3C/numadults%3E%3Cnumchildren%3E${tripData.children}%3C/numchildren%3E%3Cnuminfants%3E${tripData.infants}%3C/numinfants%3E%3Cjourneytype%3EOneWay%3C/journeytype%3E%3Cprefclass%3EY%3C/prefclass%3E%3Crequestformat%3EJSON%3C/requestformat%3E%3Cresultformat%3EJSON%3C/resultformat%3E%3Csearchtype%3Enormal%3C/searchtype%3E%3Csortkey%3E%3C/sortkey%3E%3Cissbt%3Efalse%3C/issbt%3E%3Cprofileid%3E%3C/profileid%3E%3Cnumresults%3E100%3C/numresults%3E%3Cactionname%3EFLIGHTSEARCH%3C/actionname%3E%3Cpreddeptimewindow%3Enull%3C/preddeptimewindow%3E%3Cprefarrtimewindow%3Enull%3C/prefarrtimewindow%3E%3Cprefcarrier%3E6E%3C/prefcarrier%3E%3Cexcludecarriers/%3E%3Crefundtype%3EAll%3C/refundtype%3E%3Clayovertime%3E%3C/layovertime%3E%3Cpromocode%3E%3C/promocode%3E%3C/flightsearchrequest%3E`;
    
            const response = await fetch(url);
            const data = await response.json();
            console.log(data? data:'')
            // Process the fetched flight options data as needed
        } catch (error) {
            console.error('Error fetching flight options:', error);
        }
    };

    return (
        <div>
            <div className='gradient-bg'>
                <div className='flex flex-col pb-50'>
                    <div onClick={()=>{fetchFlightOptions();}}>
                        <LandingSearch tripData = { tripData }/>
                    </div>
                    <div className='flex gap-12'>
                        <div className='pl-24 pt-20 pb-20'>
                            <Filters/>
                        </div>
                        <div className='mt-[65px] w-full'>
                            <FlightList/>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default LandingPage;
