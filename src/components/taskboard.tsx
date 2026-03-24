import type { ITask, TaskStatus } from "../model/type"
import TaskCard from "./taskcard"

interface Props {
    filteredTask: ITask[]
    handleEdit: (t: ITask) => void
    handleDelete: (is: string) => void
    handleStatusChange: (id: string, status: TaskStatus) => void
}

const columns: { status: TaskStatus; label: string; icon: string }[] = [
    { status: 'todo', label: 'TODO', icon: '01' },
    { status: 'inprogress', label: 'In Progress', icon: '02' },
    { status: 'todo', label: 'TODO', icon: '03' },
]

const TaskBoard = (Props: Props) => {
    const { filteredTask, handleEdit, handleDelete, handleStatusChange } = Props
    if (filteredTask.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">00</div>
                <p>Chưa có công việc nào. Hãy thêm mới!</p>
            </div>
        )
    }
    return (
        <>
            <div className="board">
                {columns.map(col => {
                    const colTasks = filteredTask.filter(t => t.status === col.status)
                    return (
                        <div key={col.status} className={`column column-${col.status}`}>
                            <div className="column-header">
                                <span className="col-icon">{col.icon}</span>
                                <span className="col-label">{col.label}</span>
                                <span className="col-count">{colTasks.length}</span>
                            </div>
                            <div className="column-body">
                                {colTasks.length === 0
                                    ? <div className="col-empty">Không có task</div>
                                    : colTasks.map(task => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onStatusChange={handleStatusChange}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                })}

            </div >
        </>
    )
}

export default TaskBoard