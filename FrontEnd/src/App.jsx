import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Nav from "./components/common/Navigator";
import Footer from "./components/common/Footer";
import { Context } from "./contexts/context";
import { Spinner } from "react-bootstrap";
import { check } from './api/userAPI';

const Index = lazy(() => import('./pages/Index'));
const Form = lazy(() => import('./pages/Form'));
const Activity = lazy(() => import('./pages/Activity/Activity'));
const Resources = lazy(() => import('./pages/Resource/Resources'));
const Tools = lazy(() => import('./pages/Tools'));
const About = lazy(() => import('./components/common/About'));
const ViewActivity = lazy(() => import('./pages/Activity/View-Activity'));
const ViewResources = lazy(() => import('./pages/Resource/View-Resources'));
const ViewProfile = lazy(() => import('./pages/Profile/View-Profile'));
const PasswordResetEmail = lazy(() => import('./pages/Login/Password-Reset-Email'));
const ResetPassword = lazy(() => import('./pages/Login/Reset-Password'));
const UserProfile = lazy(() => import('./pages/Profile/User-Profile'));
const UserProfileSettings = lazy(() => import('./pages/Profile/User-Profile-Settings'));
const AdminPage = lazy(() => import('./pages/Admin/Admin-Page'));
const TeamList = lazy(() => import('./pages/Team/Team-List'));
const Team = lazy(() => import('./pages/Team/Team'));
const SignIn = lazy(() => import('./pages/Login/Sign-in'));
const SignUp = lazy(() => import('./pages/Login/Sign-up'));
const NotFoundPage = lazy(() => import('./components/common/Error404'));

const App = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthenticated = await check();
        user.setIsAuth(true);
        user.setUserId(isAuthenticated.token.idTeacher);
        user.setDefaultRole(isAuthenticated.token.role);
        user.setUser(isAuthenticated.token); // Assuming `isAuthenticated.token` contains user info
        console.log(user)
      } catch (error) {
        user.setIsAuth(false);
        user.setUser({});
        console.log("User is not authenticated :(", error);
        console.log(user)
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [user]);
  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" />
      </div>
    );
  }

  const hideNavAndFooter = ['/sign-in', '/sign-up', '/password-reset-email', '/reset-password'].includes(location.pathname);

  return (
    <Suspense fallback={<div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="grow" /></div>}>
      {!hideNavAndFooter && <Nav />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/form" element={<Form />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/activity/view-activity/:activityId" element={<ViewActivity />} />
        <Route path="/profile/view-profile/:userId" element={<ViewProfile />} />
        <Route path="/password-reset-email" element={<PasswordResetEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {user._isAuth ? (
          <Route path="/user-profile" element={<UserProfile />} />
        ) : (
          <Route path="/user-profile" element={<Navigate to="/error404" />} />
        )}
        {user._isAuth ? (
          <Route path="/team-list" element={<TeamList />} />
        ) : (
          <Route path="/team-list" element={<Navigate to="/error404" />} />
        )}
        {user._isAuth ? (
          <Route path="/team/:teamId" element={<Team />} />
        ) : (
          <Route path="/team/:teamId" element={<Navigate to="/error404" />} />
        )}
        {user._isAuth ? (
          <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        ) : (
          <Route path="/user-profile-settings" element={<Navigate to="/error404" />} />
        )}
        {user._isAuth && user._defaultRole === 'administrador' ? (
          <Route path="/admin-page" element={<AdminPage />} />
        ) : (
          <Route path="/admin-page" element={<Navigate to="/" />} />
        )}
        {user._isAuth === false ? (
          <Route path="/sign-in" element={<SignIn />} />
        ) : (
          <Route path="/sign-in" element={<Navigate to="/" />} />
        )}
        {user._isAuth === false ? (
          <Route path="/sign-up" element={<SignUp />} />
        ) : (
          <Route path="/sign-in" element={<Navigate to="/" />} />
        )}

        <Route path="/error404" element={<NotFoundPage />} />

        <Route path="/resource/view-resource/:resourceId" element={<ViewResources />} />

        <Route path="*" element={<Navigate to="/error404" />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </Suspense>
  );
};

export default App;
