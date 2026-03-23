
const TaskCard = () => {
    return (
        <>
            <div className={`card priority}`}>
                <div className="card-top">
                    <span className={`priority-dot priority`} title={`Ưu tiên: `} />
                    <div className="card-actions">
                        <button className="card-btn" title="Sửa">✎</button>
                        <button className="card-btn card-btn-del" title="Xóa">✕</button>
                    </div>
                </div>

                <h3 className="card-title">tiêu đề</h3>
                <p className="card-desc">Description</p>

                <div className="card-footer">

                    <span className={`deadline `}>

                    </span>

                    <button
                        className={`status-btn status`}

                    >

                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskCard