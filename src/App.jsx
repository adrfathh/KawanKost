import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/register/Login.jsx";
import SignUp from "./pages/register/SignUp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <SignUp />
//     </>
//   )
// }

// export default App
