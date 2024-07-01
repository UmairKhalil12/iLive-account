import { useSelector } from 'react-redux';
import './App.css';
//import Navbar from './Components/Navbar/Navbar';
import { useEffect } from 'react';
// import Account from './Pages/Account/Account';
import Routing from './Routing/Routing';

function App() {
  const color = useSelector((state) => state.user.color);

  useEffect(() => {
    document.body.className = color ? 'body-darkMode' : 'body-lightMode';
  }, [color]);

  return (
    <div>
      {/* <Account />  */}
      <Routing /> 
    </div>
  );
}

export default App;
