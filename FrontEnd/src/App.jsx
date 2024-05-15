import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./page/Index";
import Nav from "./page/component/Navigator";
import ViewProfile from "./page/component/View-Profile";
import Footer from "./page/component/Footer";
import Form from "./page/component/Form";
import AdminPage from "./page/Admin-Page";
import Activity from "./page/Activity";
import SignIn from "./page/login/Sign-in";
import SignUp from "./page/login/Sign-up";
import Resources from "./page/Resources";
import Tools from "./page/Tools";
import UserProfile from "./page/User-Profile";
import UserProfileSettings from "./page/User-Profile-Settings";
import ResetPassword from "./page/login/Reset-Password";
import PasswordResetEmail from "./page/login/Password-Reset-Email";
import TokenValidation from "./page/login/Token-Validation";
import TeamList from "./page/team/Team-List";
import Team from "./page/team/Team";
import ViewActivity from "./page/component/View-Activity";
import FAQs from "./page/FAQs";
import NotFoundPage from './page/component/Error404';
import { Context } from "./context";
import { Spinner } from "react-bootstrap";

import { check } from './http/userAPI';

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
        console.log("User is not authenticated :(", error)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  console.log("App iduser: ", user._userId)

  if (loading) {
    return <Spinner animation={"grow"} />;
  }


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/form" element={<Form />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/view-activity/:activityId" element={<ViewActivity />} />
        <Route path="/view-profile/:userId" element={<ViewProfile />} />
        <Route path="/password-reset-email" element={<PasswordResetEmail />} />
        <Route path="/token-validation" element={<TokenValidation />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {user._isAuth ? ( <Route path="/user-profile" element={<UserProfile />} /> ) : ( <Route path="/user-profile" element={<Navigate to="/error404" />} /> )}
        {user._isAuth ? ( <Route path="/team-list" element={<TeamList />} /> ) : ( <Route path="/team-list" element={<Navigate to="/error404" />} /> )}
        {user._isAuth ? ( <Route path="/:teamId" element={<Team />} /> ) : ( <Route path="/:teamId" element={<Navigate to="/error404" />} /> )}
        {user._isAuth ? ( <Route path="/user-profile-settings" element={<UserProfileSettings />} /> ) : ( <Route path="/user-profile-settings" element={<Navigate to="/error404" />} /> )}
        {user._isAuth && user._defaultRole === 'administrador' ? ( <Route path="/admin-page" element={<AdminPage />} /> ) : ( <Route path="/admin-page" element={<Navigate to="/" />} /> )}
        {user._isAuth === false ? ( <Route path="/sign-in" element={<SignIn />} /> ) : ( <Route path="/sign-in" element={<Navigate to="/" />} /> )}
        {user._isAuth === false ? ( <Route path="/sign-up" element={<SignUp />} /> ) : ( <Route path="/sign-in" element={<Navigate to="/" />} /> )}

        <Route path="/error404" element={<NotFoundPage />} />

        <Route path="*" element={<Navigate to="/error404" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
