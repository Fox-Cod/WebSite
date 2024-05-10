import React, { useState, useEffect } from 'react';
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
import Friends from "./page/Friends";
import ViewActivity from "./page/component/View-Activity";
import FAQs from "./page/FAQs";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/user-info', { withCredentials: true });
        setIsAuthenticated(true);
        setUserRole(response.data.role);
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole('');
      }
    };

    fetchUserData();
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/form" element={<Form />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/view-activity/:activityId" element={<ViewActivity />} />
        <Route path="/view-profile/:userId" element={<ViewProfile />} />
        <Route path="/team-list" element={<TeamList />} />
        <Route path="/:teamId" element={<Team />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/password-reset-email" element={<PasswordResetEmail />} />
        <Route path="/token-validation" element={<TokenValidation />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {isAuthenticated && userRole === 'administrador' ? ( <Route path="/admin-page" element={<AdminPage />} /> ) : ( <Route path="/admin-page" element={<Navigate to="/" />} /> )}
        
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
