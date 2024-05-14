import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

import CreateForm from './pages/Form/CreateForm'
import SubmitForm from './pages/Form/SubmitForm'
import ViewResponses from './pages/Form/ViewResponses'
import Forms from './pages/Form/Forms';
import Responses from './pages/Form/Responses';
import TopRatedAstrologers from './pages/Dashboard/TopRatedAstrologers';
import CompareAstrologers from './pages/Dashboard/CompareAstrologers';
import BestAstrologers from './pages/Dashboard/BestAstrologers';
import AstrologersWithMaxOrders from './pages/Dashboard/AstrologersWithMaxOrders';
import AllAstrologers from './pages/Dashboard/AllAstrologers';
import Astrologer from './pages/Dashboard/Astrologer';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Kestrotalk Dashboard | Kestrotalk - Admin Dashboard" />
              <ECommerce />
            </>
          }
        />
        <Route
          path='/astrologers/all'
          element={
            <>
              <PageTitle title="All Astrologers | Kestrotalk - Admin Dashboard" />
              <AllAstrologers />
            </>
          }
        />

<Route
          path='/astrologers/view'
          element={
            <>
              <PageTitle title="View Astrologer | Kestrotalk - Admin Dashboard" />
              <Astrologer />
            </>
          }
        />
        <Route
          path='/astrologers/best'
          element={
            <>
              <PageTitle title="Best Astrologers | Kestrotalk - Admin Dashboard" />
              <BestAstrologers />
            </>
          }
        />
        <Route
          path='/astrologers/maximum-orders'
          element={
            <>
              <PageTitle title="Astrologers With Maximum Orders | Kestrotalk - Admin Dashboard" />
              <AstrologersWithMaxOrders />
            </>
          }
        />
        <Route
          path='/astrologers/top'
          element={
            <>
              <PageTitle title="Top Rated Astrologers | Kestrotalk - Admin Dashboard" />
              <TopRatedAstrologers />
            </>
          }
        />
        <Route
          path='/astrologers/compare'
          element={
            <>
              <PageTitle title="Compare Astrologers | Kestrotalk - Admin Dashboard" />
              <CompareAstrologers />
            </>
          }
        />

        <Route
          path='/astrologers/calls'
          element={
            <>
              <PageTitle title="Calls List Astrologers | Kestrotalk - Admin Dashboard" />
              <CompareAstrologers />
            </>
          }
        />

        <Route
          path='/astrologers/hide'
          element={
            <>
              <PageTitle title="Hide Astrologers Panel | Kestrotalk - Admin Dashboard" />
              <CompareAstrologers />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Kestrotalk - Admin Dashboard" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Kestrotalk - Admin Dashboard" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/create-form"
          element={
            <>
              <PageTitle title="Create Form" />
              <CreateForm />
            </>
          }
        />
        <Route
          path="/payments/astrologers"
          element={
            <>
              <PageTitle title="Responses" />
              <Responses />
            </>
          }
        />
        <Route
          path="/payments/users"
          element={
            <>
              <PageTitle title="Form" />
              <Forms />
            </>
          }
        />
        <Route
          path="/forms/submit-form"
          element={
            <>
              <PageTitle title="Submit Form" />
              <SubmitForm />
            </>
          }
        />

        <Route
          path="/forms/response"
          element={
            <>
              <PageTitle title="View Response" />
              <ViewResponses />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Kestrotalk - Admin Dashboard" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Kestrotalk - Admin Dashboard" />
              <Tables />
            </>
          }
        />
        <Route
          path="pages/settings"
          element={
            <>
              <PageTitle title="Settings | Kestrotalk - Admin Dashboard" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Kestrotalk - Admin Dashboard" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Kestrotalk - Admin Dashboard" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Kestrotalk - Admin Dashboard" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Kestrotalk - Admin Dashboard" />
              <SignIn />
            </>
          }
        />
        {/* <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Kestrotalk - Admin Dashboard" />
              <SignUp />
            </>
          }
          
        /> */}
      </Routes>
    </>
  );
}

export default App;
