import type { IStats } from "../model/type";

interface Props {
    stats: IStats;
}

const StatsBar = (Props: Props) => {
    const { stats } = Props

    const percentage = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    return <>
        <div className="stats-bar">
            <div className="stat-item">
                <span className="stat-num">{stats.total}</span>
                <span className="stat-label">Tổng công việc</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
                <span className="stat-num stat-done">{stats.done}</span>
                <span className="stat-label">Hoàn thành</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
                <span className="stat-num stat-overdue">{stats.overdue}</span>
                <span className="stat-label">Quá hạn</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item stat-progress-item">
                <span className="stat-label">Tiến độ</span>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${percentage}%` }} />
                </div>
                <span className="stat-pct">{percentage}%</span>
            </div>
        </div>
    </>
}

export default StatsBar