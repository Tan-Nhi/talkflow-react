import './App.css'
import FilterBar from './components/filterbar'
import HeaderPage from './components/Header'
import StatsBar from './components/statsbar'
import TaskBoard from './components/taskboard'
import TaskModal from './components/taskmodal'


const App = () => {


  return (
    <>
      <div className="app">
        <div className="bg-grid"></div>
        <div className="container">
          <HeaderPage />
          <StatsBar />
          <FilterBar />
          <TaskBoard />
        </div>
        {/* <TaskModal /> */}
      </div>
    </>
  )
}

export default App
