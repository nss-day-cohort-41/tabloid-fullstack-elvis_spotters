import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { MasterProvider } from "./providers/MasterProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <MasterProvider>
          <Header />
          <ApplicationViews />
        </MasterProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
