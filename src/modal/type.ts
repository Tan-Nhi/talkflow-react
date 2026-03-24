
type TaskStatus = 'todo' | 'inprogress' | 'done'

interface ITask {
    id: string
    title: string
    description?: string
    status: TaskStatus
    deadline?: string
    priority: 'low' | 'medium' | 'high'
    createdAt: string
}

interface IStats {
    total: number
    done: number
    overdue: number
    dueSoon: number
}


export { TaskStatus, ITask, IStats };