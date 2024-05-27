import BusModal from "./BusModal"
import FlightModal from "./FlightModal"

// eslint-disable-next-line react/prop-types
const SearchModal = ({selectedIcon,onTripDataSelect}) => {
  return (
    <div className="flex p-2 bg-white rounded-3xl">
      {selectedIcon === 'flight' && <FlightModal onTripDataSelect={onTripDataSelect}/>} 
      {selectedIcon === 'bus' && <BusModal/>}
        
    </div>

  )
}

export default SearchModal
