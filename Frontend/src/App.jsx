// import React from 'react'
// import Sidebar from './components/Sidebar/Sidebar'
// import Main from './components/Main/Main'

// const App = () => {
//   return (
//     <>
//      <Sidebar/> 
//      <Main/>
//     </>
//   )
// }

// export default App
// import React from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Sidebar from './components/Sidebar/Sidebar'
// import Main from './components/Main/Main'
// import LoginSignup from './components/Pages/LoginSignup' // Adjust the import path as needed

// const App = () => {
//   return (
//     <Router>      
//       <Sidebar />      
//       <Routes>
//         <Route path="/login" element={<LoginSignup />} />
//         <Route path="/" element={<Main />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import LoginSignup from './components/Pages/LoginSignup'; // Adjust the import path as needed

const App = () => {
  return (
    <Router>
      <ConditionalSidebar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
};

const ConditionalSidebar = () => {
  const location = useLocation();
  // Don't show the Sidebar on the login/signup page
  if (location.pathname === '/login') {
    return null;
  }
  return <Sidebar />;
};

export default App;

