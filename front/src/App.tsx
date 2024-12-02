import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import Profile from './pages/Profile';
import Tables from './pages/Tables';
import DefaultLayout from './layout/DefaultLayout';
import BeersList from './pages/BeersList';
import CheckInPage from './pages/CheckInPage';
import UserProfilePage from './pages/UserPage';
import Feed from './pages/Feed/Feed';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Untappd" />
              <Feed />
            </>
          }
        />
        <Route
          path="/beers"
          element={
            <>
              <PageTitle title="Beers" />
              <BeersList />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile " />
              <Profile />
            </>
          }
        />

        <Route
          path="/my-check-ins"
          element={
            <>
              <PageTitle title="My Check Ins" />
              <Tables />
            </>
          }
        />

        <Route
          path="/statistics"
          element={
            <>
              <PageTitle title="Statistics" />
              <Chart />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />
        <Route
          path="/check-in-page"
          element={
            <>
              <PageTitle title="Check In" />
              <CheckInPage />
            </>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <>
              <PageTitle title="Visit user profile" />
              <UserProfilePage />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
