import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as ROUTES from '@/router/routes';
import { selectAuth } from '@/redux/auth/selectors';

import Login from '@/component/login/Login';
import AppRouter from '@/router/AppRouter';

function AppWrapper() {
  const { isAuthorize } = useSelector(selectAuth);

  // Disalbe Login

  // if (!isAuthorize)
  //   return (
  //     <Routes>
  //       <Route
  //         path={ROUTES.LOGIN}
  //         exact

  //         element={<Login />}

  //         element={<Login />}
  //       />
  //       <Route
  //         path={ROUTES.HOME_PAGE}
  //         exact
  //         element={<Login />}
  //       />
  //       <Route
  //         path={ROUTES.NOT_FOUND}
  //         element={
  //           <Navigate
  //             to={ROUTES.HOME_PAGE}
  //             replace
  //           />
  //         }
  //       />
  //     </Routes>
  //   );
  // else

  return <AppRouter />;
}

export default AppWrapper;
