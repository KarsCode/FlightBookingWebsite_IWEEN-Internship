

import Footer from '../components/Footer/footer';
import Header from '../components/header';


// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div>
      {/* Common header for all pages */}
      <Header />
      {/* Render children components */}
      {children}
      {/* Common footer for all pages */}
      <div className='mt-auto]'>
        <Footer />
      </div>


    </div>

  );
};

export default Layout;
