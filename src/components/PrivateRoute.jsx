import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

// Route guard component
const PrivateRoute = ({ element }) => {
  const user = auth.currentUser;

  if (user) {
    console.log("authenticated");
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
