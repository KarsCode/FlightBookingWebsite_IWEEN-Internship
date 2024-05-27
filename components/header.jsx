import { useLocation } from 'react-router-dom';
import LoginHeader from './HeaderLogin/headerlogin';
import DefaultHeader from './HeaderElse/headerelse';

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div>
      {isLoginPage ? <LoginHeader /> : <DefaultHeader />}
    </div>
  );
};

export default Header;
