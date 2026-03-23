
const StatsBar = () => {
    return <>
        <div className="stats-bar">
            <div className="stat-item">
                <span className="stat-num">10</span>
                <span className="stat-label">Tổng công việc</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
                <span className="stat-num stat-done">3</span>
                <span className="stat-label">Hoàn thành</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
                <span className="stat-num stat-overdue">3</span>
                <span className="stat-label">Quá hạn</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item stat-progress-item">
                <span className="stat-label">Tiến độ</span>
                <div className="progress-track">
                    <div className="progress-fill" />
                </div>
                <span className="stat-pct">50%</span>
            </div>
        </div>
    </>
}

export default StatsBar