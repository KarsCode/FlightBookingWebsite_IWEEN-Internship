import BusModal from "./BusModal"
import FlightModal from "./FlightModal"

// eslint-disable-next-line react/prop-types
const SearchModal = ({selectedIcon}) => {
  return (
    <div className=" relative flex  p-2 bg-white rounded-3xl">
      {selectedIcon === 'flight' && <FlightModal/>} 
      {selectedIcon === 'bus' && <BusModal/>}
        
    </div>

  )
}

export default SearchModal
