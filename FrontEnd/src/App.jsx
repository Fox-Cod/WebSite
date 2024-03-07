import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./Index";
import Nav from "./component/Navigator";
import ViewProfile from "./component/View-Profile";
import Footer from "./component/Footer";
import Form from "./component/Form";
import AdminPage from "./Admin-Page";
import Activity from "./Activity";
import SignIn from "./login/Sign-in";
import SignUp from "./login/Sign-up";
import Resources from "./Resources";
import Tools from "./Tools";
import UserProfile from "./User-Profile";
import UserProfileSettings from "./User-Profile-Settings";
import ResetPassword from "./login/Reset-Password";
import PasswordResetEmail from "./login/Password-Reset-Email";
import TokenValidation from "./login/Token-Validation";
import TeamList from "./team/Team-List";
import Team from "./team/Team";
import Friends from "./Friends";
import ViewActivity from "./component/View-Activity";
import FAQs from "./FAQs";

const App = () => {
  // const isAuthenticated = true;

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
        {/* <Route path="/user-profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/sign-in" />} /> */}

        <Route path="/faq" element={<FAQs />} />
        <Route path="/view-activity/:activityId" element={<ViewActivity />} />
        <Route path="/view-profile/:userId" element={<ViewProfile />} />
        <Route path="/team-list" element={<TeamList />} />
        <Route path="/team/:teamId" element={<Team />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/password-reset-email" element={<PasswordResetEmail />} />
        <Route path="/token-validation" element={<TokenValidation />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
