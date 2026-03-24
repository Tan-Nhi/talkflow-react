
export type TaskStatus = 'todo' | 'inprogress' | 'done'

export interface ITask {
    id: string
    title: string
    description?: string
    status: TaskStatus
    deadline?: string
    priority: 'low' | 'medium' | 'high'
    createAt?: string
}

export interface IStats {
    total: number
    done: number
    overdue: number
    dueSoon: number
}

export interface IFilterState {
    search: string
    status: TaskStatus | 'all'
}

export interface TFormState {
    title: string
    description: string
    status: TaskStatus
    deadline: string
    priority: 'low' | 'medium' | 'high'
    error: string
}
