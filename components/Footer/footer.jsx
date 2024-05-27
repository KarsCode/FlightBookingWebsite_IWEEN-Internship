import Info from '../Footer/info';
import Links from '../Footer/links';

const Footer = () => {
  return (
    <div className='mt-auto p-5 sm:pt-10 sm:px-10 bg-[#D8E2EE]'>
      <div className='flex flex-col sm:flex-row sm:justify-between border-b-2 border-b-grey-400'>
        <div className='pb-5 sm:w-3/5 sm:pb-0'>
          <Info />
        </div>

        <div className='pb-2 sm:ml-0 sm:pt-8 sm:pr-10'>
          <Links />
        </div>
      </div>

      <div className='pt-2 flex flex-col gap-4 sm:flex-row sm:justify-center sm:pt-5 sm:pb-5'>
        <div>Privacy Policy</div>
        <div>Refund & Cancellation</div>
        <div>Terms and Conditions</div>
      </div>
    </div>
  );
};

export default Footer;
