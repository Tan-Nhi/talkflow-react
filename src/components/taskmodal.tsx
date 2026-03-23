
const TaskModal = () => {
    return (
        <>
            <div className="modal-overlay" >
                <div className="modal">
                    <div className="modal-header">
                        <h2>Thêm công việc mới</h2>
                        <button className="modal-close">×</button>
                    </div>
                    <div className="modal-body">
                        <div className="field">
                            <label>Tên công việc *</label>
                            <input
                                placeholder="Nhập tên công việc..."
                                className='input-error'
                            />
                            <span className="error-msg">error</span>
                        </div>
                        <div className="field">
                            <label>Mô tả</label>
                            <textarea
                                placeholder="Mô tả chi tiết (tùy chọn)..."
                                rows={3}
                            />
                        </div>
                        <div className="field-row">
                            <div className="field">
                                <label>Trạng thái</label>
                                <select >
                                    <option value="todo">TODO</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Ưu tiên</label>
                                <select >
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


                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" >Hủy</button>
                        <button className="btn-save">
                            Thêm mới
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskModal