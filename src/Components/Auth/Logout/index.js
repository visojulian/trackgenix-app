import { logout } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import LogoutButton from 'Components/Shared/Logout';

const LogoutEntity = () => {
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logout());

  return (
    <>
      <LogoutButton onClick={logoutUser} />
    </>
  );
};

export default LogoutEntity;
