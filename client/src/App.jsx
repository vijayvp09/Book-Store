import './App.scss'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/home/Home'
import Add from './components/add/Add'
import Update from './components/update/Update'

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
