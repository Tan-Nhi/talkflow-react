import { useState } from "react";
import type { ITask, TaskStatus, TFormState } from "../model/type";

interface Props {
    task: ITask | null
    handleSave: (data: Omit<ITask, 'id' | 'createAt'>) => void
    onClose: () => void
}

const TaskModal = ({ task, handleSave, onClose }: Props) => {

    const [form, setForm] = useState<TFormState>({
        title: task?.title ?? '',
        description: task?.description ?? '',
        status: task?.status ?? 'todo',
        deadline: task?.deadline ? task.deadline.split('T')[0] : '',
        priority: task?.priority ?? 'medium',
        error: ''
    })

    const handleSubmit = () => {
        if (!form.title.trim()) {
            setForm(prev => ({ ...prev, error: 'Tên công việc không được để trống' }))
            return
        }
        handleSave({
            title: form.title.trim(),
            description: form.description.trim() || undefined,
            status: form.status,
            deadline: form.deadline ? new Date(form.deadline).toISOString() : undefined,
            priority: form.priority,
        })
    }

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <h2>{task ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <div className="field">
                        <label>Tên công việc *</label>
                        <input
                            value={form.title}
                            onChange={e => setForm(prev => ({ ...prev, title: e.target.value, error: '' }))}
                            placeholder="Nhập tên công việc..."
                            className={form.error ? 'input-error' : ''}
                        />
                        {form.error && <span className="error-msg">{form.error}</span>}
                    </div>
                    <div className="field">
                        <label>Mô tả</label>
                        <textarea
                            value={form.description}
                            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Mô tả chi tiết (tùy chọn)..."
                            rows={3}
                        />
                    </div>
                    <div className="field-row">
                        <div className="field">
                            <label>Trạng thái</label>
                            <select
                                value={form.status}
                                onChange={e => setForm(prev => ({ ...prev, status: e.target.value as TaskStatus }))}
                            >
                                <option value="todo">TODO</option>
                                <option value="inprogress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Ưu tiên</label>
                            <select
                                value={form.priority}
                                onChange={e => setForm(prev => ({ ...prev, priority: e.target.value as TFormState['priority'] }))}
                            >
                                <option value="low">Thấp</option>
                                <option value="medium">Trung bình</option>
                                <option value="high">Cao</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label>Deadline</label>
                        <input
                            type="date"
                            value={form.deadline}
                            onChange={e => setForm(prev => ({ ...prev, deadline: e.target.value }))}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Hủy</button>
                    <button className="btn-save" onClick={handleSubmit}>
                        {task ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal