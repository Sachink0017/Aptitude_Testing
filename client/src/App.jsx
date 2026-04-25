// import { useState } from 'react'
// import { Toaster } from 'react-hot-toast'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import Home from './pages/Home.jsx';
// import { ChakraProvider } from '@chakra-ui/react'
// import Test from './pages/Test.jsx'
// import NavBar from './components/NavBar.jsx'
// import { UserProvider } from './context/userContext.jsx'
// import AdaptiveTest from './components/AdaptiveTest.jsx'
// import Courses from './components/Courses.jsx'
// function App() {
//   return (
//     <UserProvider>
//     <ChakraProvider>
//     <BrowserRouter>
//     <NavBar/>
//     <Toaster position='bottom-right'/>
//     <Routes>
//       <Route path='/' element={<Home/>}></Route>
//       <Route path='/signin' element={<SignIn/>}></Route>
//       <Route path='/signup' element={<SignUp/>}></Route>
//       <Route path='/test' element={<Test/>}></Route>
//       <Route path='/course' element={<Courses/>}></Route>
//       <Route path="/test/adaptive" element={<AdaptiveTest />} />
      
//     </Routes>
//     </BrowserRouter>
//      </ChakraProvider>
//      </UserProvider>
//   )
// }

// export default App;



import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import Test from './pages/Test.jsx'
import NavBar from './components/NavBar.jsx'
import { UserProvider } from './context/userContext.jsx'
import AdaptiveTest from './components/AdaptiveTest.jsx'
import Courses from './components/Courses.jsx'

// 🔹 Separate component to use useLocation
function AppContent() {
  const location = useLocation();

  // ✅ Routes where Navbar should be hidden
  const hideNavbar =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/test/adpative");

  return (
    <>
      {/* ✅ CONDITIONAL NAVBAR */}
      {!hideNavbar && <NavBar />}

      <Toaster position='bottom-right'/>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/test' element={<Test/>}></Route>
        <Route path='/course' element={<Courses/>}></Route>
        <Route path="/test/adaptive" element={<AdaptiveTest />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  )
}

export default App;



// import { useState } from 'react'
// import { Toaster } from 'react-hot-toast'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import Home from './pages/Home.jsx';
// import { ChakraProvider } from '@chakra-ui/react'
// import Test from './pages/Test.jsx'
// import NavBar from './components/NavBar.jsx'
// import { UserProvider } from './context/userContext.jsx'
// import AdaptiveTest from './components/AdaptiveTest.jsx'

// // 🔹 ADDED IMPORTS
// import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import { Global } from '@emotion/react'

// // 🔹 ADDED COMPONENT (Chakra-safe navbar controller)
// function NavbarVisibilityController() {
//   const location = useLocation();

//   const hideNavbar =
//     location.pathname === '/signup' ||
//     location.pathname === '/signin';

//   return (
//     <Global
//       styles={{
//         nav: {
//           display: hideNavbar ? 'none' : 'flex',
//         },
//       }}
//     />
//   );
// }

// function App() {
//   return (
//     <UserProvider>
//     <ChakraProvider>
//     <BrowserRouter>

//     {/* 🔹 ADDED LINE */}
//     <NavbarVisibilityController />

//     <NavBar/>
//     <Toaster position='bottom-right'/>
//     <Routes>
//       <Route path='/' element={<Home/>}></Route>
//       <Route path='/signin' element={<SignIn/>}></Route>
//       <Route path='/signup' element={<SignUp/>}></Route>
//       <Route path='/test' element={<AdaptiveTest/>}></Route>
//     </Routes>
    
//     </BrowserRouter>
//      </ChakraProvider>
//      </UserProvider>
//   )
// }

// export default App;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";
// const TOTAL_QUESTIONS = 20;

// export default function App() {
//   const [sessionId, setSessionId] = useState(null);
//   const [question, setQuestion] = useState(null);
//   const [selected, setSelected] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [accuracy, setAccuracy] = useState(0);

//   const [questionNo, setQuestionNo] = useState(0);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [testCompleted, setTestCompleted] = useState(false);

//   // 🔹 Start test
//   useEffect(() => {
//     startSession();
//   }, []);

//   const startSession = async () => {
//     const res = await axios.post(`${API}/start`);
//     setSessionId(res.data.session_id);
//     loadQuestion(res.data.session_id);
//   };

//   const loadQuestion = async (sid = sessionId) => {
//     const res = await axios.get(`${API}/question/${sid}`);
//     setQuestion(res.data);
//     setSelected("");
//     setFeedback("");
//   };

//   const submitAnswer = async () => {
//     if (!selected) return;

//     const res = await axios.post(`${API}/answer`, {
//       session_id: sessionId,
//       answer: selected,
//     });

//     setFeedback(
//       res.data.correct
//         ? "✅ Correct"
//         : `❌ Wrong (Correct: ${res.data.correct_option})`
//     );

//     setAccuracy(res.data.accuracy);

//     if (res.data.correct) {
//       setCorrectCount((prev) => prev + 1);
//     }
//   };

//   const nextQuestion = () => {
//     if (questionNo + 1 === TOTAL_QUESTIONS) {
//       setTestCompleted(true);
//     } else {
//       setQuestionNo((prev) => prev + 1);
//       loadQuestion();
//     }
//   };

//   // 🏁 FINAL REPORT
//   if (testCompleted) {
//     return (
//       <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//         <h2>📊 Test Completed</h2>
//         <p><b>Total Questions:</b> {TOTAL_QUESTIONS}</p>
//         <p><b>Correct Answers:</b> {correctCount}</p>
//         <p><b>Accuracy:</b> {accuracy}%</p>

//         <h3>
//           {accuracy >= 70
//             ? "🎉 Excellent Performance!"
//             : accuracy >= 40
//             ? "👍 Good Attempt!"
//             : "📘 Keep Practicing!"}
//         </h3>
//       </div>
//     );
//   }

//   if (!question) return <h3>Loading test...</h3>;

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//       <h2>🎯 Adaptive Aptitude Test</h2>

//       <p>
//         <b>Question:</b> {questionNo + 1} / {TOTAL_QUESTIONS}
//       </p>

//       <p><b>Difficulty:</b> {question.difficulty}</p>
//       <p><b>Accuracy:</b> {accuracy}%</p>

//       <h3>{question.question}</h3>

//       {Object.entries(question.options).map(([key, value]) => (
//         <div key={key}>
//           <label>
//             <input
//               type="radio"
//               name="option"
//               value={key}
//               checked={selected === key}
//               onChange={() => setSelected(key)}
//             />
//             {key}) {value}
//           </label>
//         </div>
//       ))}

//       <div style={{ marginTop: 15 }}>
//         <button onClick={submitAnswer}>Submit</button>

//         <button
//           onClick={nextQuestion}
//           style={{ marginLeft: 10 }}
//           disabled={!feedback}
//         >
//           Next Question
//         </button>
//       </div>

//       <p style={{ marginTop: 10 }}>{feedback}</p>
//     </div>
//   );
// }
