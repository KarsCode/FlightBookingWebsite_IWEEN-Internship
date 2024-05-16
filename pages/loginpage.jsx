import Header from '../components/HeaderLogin/header'
import Footer from '../components/Footer/footer'
import Login from '../components/Login/login'

const loginpage = () => {
  return (
    <div>
      <div className='bg-hero bg-cover bg-bottom'>
    <div className='flex flex-col'>
      <Header />
      <div>
        <Login/>
      </div>
      <Footer/>
    </div>

  </div>
    </div>
  )
}

export default loginpage
