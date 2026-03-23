import TaskCard from "./taskcard"

const TaskBoard = () => {
    return (
        <>
            <div className="board">
                <div className={`column column`}>
                    <div className="column-header">
                        <span className="col-icon">icon</span>
                        <span className="col-label">label</span>
                        <span className="col-count">length</span>
                    </div>
                    <div className="column-body">
                        <div className="col-empty">Không có task</div>
                        <TaskCard />
                    </div>
                </div>


            </div>
        </>
    )
}

export default TaskBoard