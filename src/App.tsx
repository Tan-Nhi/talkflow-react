import { useEffect, useMemo, useState } from 'react'
import './App.css'
import FilterBar from './components/filterbar'
import HeaderPage from './components/header'
import StatsBar from './components/statsbar'
import TaskBoard from './components/taskboard'
import TaskModal from './components/taskmodal'
import type { IFilterState, ITask, TaskStatus } from './model/type'
import { loadTacks, saveTasks } from './utils/storage'
import { isDueSoon, isOverdue } from './utils/date'



const App = () => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>(loadTacks); //get data từ localStorage
  const [filter, setFilter] = useState<IFilterState>({ search: '', status: 'all' });
  const [editTask, setEditTask] = useState<ITask | null>(null);

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const handleOpenAdd = () => {
    setEditTask(null);
    setModalOpen(true);

  }
  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => isOverdue(t)).length,
    dueSoon: tasks.filter(t => isDueSoon(t)).length,
  }), [tasks])

  const filteredTask = useMemo(() => {
    return tasks.filter(t => {
      const matchSearch = t.title.toLocaleLowerCase().includes(filter.search.toLowerCase()) ||
        t.description?.toLowerCase().includes(filter.search.toLowerCase());
      const matchStatus = filter.status === 'all' || t.status === filter.status

      return matchSearch && matchStatus
    })
  }, [tasks, filter])

  const handleSave = (data: Omit<ITask, 'id' | 'createAt'>) => {
    if (editTask) {
      setTasks(prev => prev.map(t => t.id === editTask.id ? { ...t, ...data } : t))
    } else {
      const newTask: ITask = {
        ...data,
        id: crypto.randomUUID(),
        createAt: new Date().toISOString()
      }
      setTasks(prev => [...prev, newTask])
    }
    setModalOpen(false);
    setEditTask(null);
  }

  const handleEdit = (task: ITask) => {
    setEditTask(task);
    setModalOpen(true);
  }

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  return (
    <>
      <div className="app">
        <div className="bg-grid"></div>
        <div className="container">
          <HeaderPage
            handleOpenAdd={handleOpenAdd}
          />

          <StatsBar
            stats={stats}
          />

          <FilterBar
            filter={filter}
            setFilter={setFilter}
          />

          <TaskBoard
            filteredTask={filteredTask}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
          />

        </div>
        {modalOpen && (
          <TaskModal
            task={editTask}
            handleSave={handleSave}
            onClose={() => {
              setModalOpen(false);
              setEditTask(null)
            }}
          />
        )}
      </div>
    </>
  )
}

export default App
