import './App.css';
import MyRoutes from '../Routes/MyRoutes';
import LoginSignin from '../loginSignin/LoginSignin';
import { useSelector } from 'react-redux'

function App() {
  const logedIn = useSelector(state => state.logedIn)
  return (
    <>
      {/* {
        logedIn ?
          <MyRoutes />
          :
          <LoginSignin />
      } */}
      <MyRoutes />
    </>
  );
}

export default App;