import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./page/component/Navigator";
import Footer from "./page/component/Footer";
import { Context } from "./context";
import { Spinner } from "react-bootstrap";
import { check } from './http/userAPI';

const Index = lazy(() => import('./page/Index'));
const Form = lazy(() => import('./page/component/Form'));
const Activity = lazy(() => import('./page/Activity'));
const Resources = lazy(() => import('./page/Resources'));
const Tools = lazy(() => import('./page/Tools'));
const About = lazy(() => import('./page/About'));
const ViewActivity = lazy(() => import('./page/component/View-Activity'));
const ViewResources = lazy(() => import('./page/component/View-Resources'));
const ViewProfile = lazy(() => import('./page/component/View-Profile'));
const PasswordResetEmail = lazy(() => import('./page/login/Password-Reset-Email'));
const ResetPassword = lazy(() => import('./page/login/Reset-Password'));
const UserProfile = lazy(() => import('./page/User-Profile'));
const UserProfileSettings = lazy(() => import('./page/User-Profile-Settings'));
const AdminPage = lazy(() => import('./page/Admin-Page'));
const TeamList = lazy(() => import('./page/team/Team-List'));
const Team = lazy(() => import('./page/team/Team'));
const SignIn = lazy(() => import('./page/login/Sign-in'));
const SignUp = lazy(() => import('./page/login/Sign-up'));
const NotFoundPage = lazy(() => import('./page/component/Error404'));

const App = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthenticated = await check();
        user.setIsAuth(true);
        user.setUserId(isAuthenticated.token.idTeacher);
        user.setDefaultRole(isAuthenticated.token.role);
      } catch (error) {
        user.setIsAuth(false);
        user.setUser({});
        console.log("User is not authenticated :(", error);
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

  return (
      <Suspense fallback={<div className="d-flex justify-content-center align-items-center vh-100"><Spinner animation="grow" /></div>}>
      <Nav />
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
          {user._isAuth ? ( <Route path="/user-profile" element={<UserProfile />} /> ) : ( <Route path="/user-profile" element={<Navigate to="/error404" />} /> )}
          {user._isAuth ? ( <Route path="/team-list" element={<TeamList />} /> ) : ( <Route path="/team-list" element={<Navigate to="/error404" />} /> )}
          {user._isAuth ? ( <Route path="/team/:teamId" element={<Team />} /> ) : ( <Route path="/team/:teamId" element={<Navigate to="/error404" />} /> )}
          {user._isAuth ? ( <Route path="/user-profile-settings" element={<UserProfileSettings />} /> ) : ( <Route path="/user-profile-settings" element={<Navigate to="/error404" />} /> )}
          {user._isAuth && user._defaultRole === 'administrador' ? ( <Route path="/admin-page" element={<AdminPage />} /> ) : ( <Route path="/admin-page" element={<Navigate to="/" />} /> )}
          {user._isAuth === false ? ( <Route path="/sign-in" element={<SignIn />} /> ) : ( <Route path="/sign-in" element={<Navigate to="/" />} /> )}
          {user._isAuth === false ? ( <Route path="/sign-up" element={<SignUp />} /> ) : ( <Route path="/sign-in" element={<Navigate to="/" />} /> )}

          <Route path="/error404" element={<NotFoundPage />} />

          <Route path="/resource/view-resource/:resourceId" element={<ViewResources />} />

          {/* <Route path="*" element={<Navigate to="/error404" />} /> */}
        </Routes>
      <Footer />
      </Suspense>
  );
};

export default App;
