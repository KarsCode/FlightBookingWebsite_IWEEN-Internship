import { useState } from 'react';
import OfferCard from './OfferCard'; // Import the OfferCard component

const SearchOffers = () => {
  const [activeTab, setActiveTab] = useState('All'); // State to track active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Sample offer data array
  const offers = [
    { category: 'Flights', title: 'LIVE NOW: Sale by Vistara!', description: 'Round-trip flights connecting Mumbai and Mauritius starting @ ₹54,600...', imageUrl: '../../public/flightimage.jpeg' },
    { category: 'Flights', title: 'LIVE NOW: Sale by Vistara!', description: 'Round-trip flights connecting Mumbai and Mauritius starting @ ₹54,600...', imageUrl: '../../public/flightimage.jpeg' },
    { category: 'Flights', title: 'LIVE NOW: Sale by Vistara!', description: 'Round-trip flights connecting Mumbai and Mauritius starting @ ₹54,600...', imageUrl: '../../public/flightimage.jpeg' },
    { category: 'Flights', title: 'LIVE NOW: Sale by Vistara!', description: 'Round-trip flights connecting Mumbai and Mauritius starting @ ₹54,600...', imageUrl: '../../public/flightimage.jpeg' },
    { category: 'Hotels', title: 'Special Offer: Luxury Staycation', description: 'Book a deluxe room and get 20% off on your stay!' },
    // Add more offer objects here as needed
  ];

  // Filter offers based on the selected category
  const filteredOffers = activeTab === 'All' ? offers : offers.filter(offer => offer.category === activeTab);

  return (
    <div className='flex flex-col w-4/5 gap-1'>
      <div className='bg-white h-[80px] p-2 rounded-2xl shadow-md flex items-center z-2'>
        <div className="flex items-center gap-6 pl-5">
          <div className="text-2xl font-semibold">
            Offers
          </div>
          <button
            className={`rounded-full px-4 py-2 text-sm ${activeTab === 'All' ? 'text-white bg-blue-500' : 'text-gray-500 border-2 border-gray-400 bg-white'}`}
            onClick={() => handleTabClick('All')}
          >
            All Offers
          </button>
          <button
            className={`rounded-full px-4 py-2 text-sm ${activeTab === 'Flights' ? 'text-white bg-blue-500' : 'text-gray-500 border-2 border-gray-400 bg-white'}`}
            onClick={() => handleTabClick('Flights')}
          >
            Flights
          </button>
          <button
            className={`rounded-full px-4 py-2 text-sm ${activeTab === 'Hotels' ? 'text-white bg-blue-500' : 'text-gray-500 border-2 border-gray-400 bg-white'}`}
            onClick={() => handleTabClick('Hotels')}
          >
            Hotels
          </button>
        </div>
      </div>
      <div className='bg-white p-2 rounded-2xl shadow-md flex items-start mt-[-30px] z-1 overflow-auto max-h-[650px]'>
        <div className="grid grid-cols-2 gap-4 p-5 mt-[0px]">
          {/* Map over the filteredOffers array and render OfferCard components */}
          {filteredOffers.map((offer, index) => (
            <OfferCard key={index} category={offer.category} title={offer.title} description={offer.description} imageUrl={offer.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchOffers;
