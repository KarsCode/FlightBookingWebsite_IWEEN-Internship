import './searchpage.css'
import Header from '../components/HeaderElse/header'
import Navbar from '../components/Search/Navbar';
import SearchModal from '../components/Search/SearchModal'
import Footer from '../components/Footer/footer'
import { useState } from 'react';
import SearchOffers from '../components/Search/SearchOffers';

const SearchPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedIcon, setSelectedIcon] = useState('flight');

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    console.log(iconName); // You can handle the iconName data here
  };

  return (
    <div>
      {/* Content on top of the gradient */}
      <div className="content font-normal">
        <div className=''>
        <Header/> 
        </div>
      <div className='flex flex-col items-center'>
        <div className='absolute flex w-full justify-center px-4 pt-20 z-3'>
          <Navbar handleIconClick={handleIconClick} />
        </div>
        <div className='flex justify-center mt-[140px] z-2'>
          <SearchModal selectedIcon={selectedIcon}/>
        </div>

        <div className=' w-1/3 text-xl font-bold z-3 p-2 mt-[-20px] bg-[#E0621A] text-white rounded-full transition duration-300 ease-in-out transform hover:scale-105'>
          <button className='relative'>
            Search
          </button>
        </div>

        <div className='mt-[100px] w-full flex justify-center z-0'>
        <SearchOffers/>
        </div>
      </div>

      


      <div className='pt-48'>
       <Footer/>
      </div>


      
      </div>


     

    </div>
  );
};

export default SearchPage;
