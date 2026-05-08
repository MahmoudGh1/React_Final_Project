import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function ProtectedRoute({ children, role }) {
  const currentUser = useSelector(state => state.users.currentUser);
  const navigate = useNavigate();

  if (!currentUser) {
    return navigate("/login")
  }

  if (role && currentUser.role !== role){
    return navigate("/home")
  }

  return children;
}

// https://dev.to/nightfury/private-protected-and-public-routes-in-react-router-v6-with-real-time-mern-stack-example-3fmk
// https://www.robinwieruch.de/react-router-private-routes/

// this website is insane:
  // https://react.wiki/router/protected-routes/

// https://fireship.dev/react-router-protected-routes-authentication