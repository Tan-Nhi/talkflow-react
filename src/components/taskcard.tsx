import type { ITask, TaskStatus } from "../model/type"
import { formatDate, isDueSoon, isOverdue } from "../utils/date"

interface Props {
    task: ITask
    onEdit: (T: ITask) => void
    onDelete: (id: string) => void
    onStatusChange: (id: string, status: TaskStatus) => void
}

const nextStatus: Record<TaskStatus, TaskStatus> = {
    todo: 'inprogress',
    inprogress: 'done',
    done: 'todo'
}

const nextLabel: Record<TaskStatus, string> = {
    todo: 'Bắt đầu',
    inprogress: 'Hoàn thành',
    done: 'Làm lại'
}

const priorityLabel: Record<string, string> = {
    low: 'Thấp',
    medium: 'Trung bình',
    high: 'Cao',
}

const TaskCard = (Props: Props) => {

    const { task, onEdit, onDelete, onStatusChange } = Props
    const overdue = isOverdue(task);
    const soon = isDueSoon(task);
    return (
        <>
            <div className={`card priority-${task.priority} ${overdue ? 'card-overdue' : ''} ${soon ? 'card-soon' : ''}`}>
                <div className="card-top">
                    <span className={`priority-dot priority-${task.priority}`} title={`Ưu tiên: ${priorityLabel[task.priority]}`} />
                    <div className="card-actions">
                        <button className="card-btn" title="Sửa"
                            onClick={() => onEdit(task)}>✎</button>
                        <button className="card-btn card-btn-del" title="Xóa"
                            onClick={() => onDelete(task.id)}>✕</button>
                    </div>
                </div>

                <h3 className="card-title">{task.title}</h3>
                {task.description &&
                    <p className="card-desc">{task.description}</p>
                }

                <div className="card-footer">
                    {task.deadline && (
                        <span className={`deadline ${overdue ? 'deadline-overdue' : soon ? 'deadline-soon' : ''}`}>
                            {overdue ? '⚠ Quá hạn: ' : soon ? '⏰ Sắp hạn: ' : '📅 '}
                            {formatDate(task.deadline)}
                        </span>
                    )}
                    <button
                        className={`status-btn status-${task.status}`}
                        onClick={() => onStatusChange(task.id, nextStatus[task.status])}
                    >
                        {nextLabel[task.status]}
                    </button>


                </div>
            </div>
        </>
    )
}

export default TaskCard