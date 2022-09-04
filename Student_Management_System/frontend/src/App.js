import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserContext from "./userContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from './screens/StuList/StuList.js';
import StudentRegister from "./screens/StuReg/StuReg.js"
import StudentUpdate from './screens/StuReg/StuEdit.js';

function App() {
  return (
    <div className="App">
<UserContext.Provider
        value={{editItem:[
          
        ]}}
      >
    <BrowserRouter>
       <Routes>
         <Route exact path="/" element={<StudentList/>} />
         <Route exact path="/StudentRegister" element={<StudentRegister/>} />
         <Route exact path="/StudentUpdate" element={<StudentUpdate/>} />
       </Routes>
    </BrowserRouter>

    </UserContext.Provider>

    </div>
  );
}

export default App;
