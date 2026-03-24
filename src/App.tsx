import { useState } from 'react'
import './App.css'
import FilterBar from './components/filterbar'
import HeaderPage from './components/header'
import StatsBar from './components/statsbar'
import TaskBoard from './components/taskboard'
import TaskModalCreate from './components/taskmodal'



const App = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<string>("")

  const handleOpenAdd = () => {
    setModalOpen(true);
  }
  return (
    <>
      <div className="app">
        <div className="bg-grid"></div>
        <div className="container">
          <HeaderPage
            handleOpenAdd={handleOpenAdd}
          />
          <StatsBar />
          <FilterBar />
          <TaskBoard />
        </div>
        {modalOpen && (
          <TaskModalCreate
            onClose={() => { setModalOpen(false) }}
          />
        )}
      </div>
    </>
  )
}

export default App
