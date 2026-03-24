import type { IFilterState, TaskStatus } from "../model/type"

interface Props {
    filter: IFilterState
    setFilter: (f: IFilterState) => void
}

const statuses: { value: TaskStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Tất cả' },
    { value: 'todo', label: 'TODO' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
]

const FilterBar = (Props: Props) => {
    const { filter, setFilter } = Props
    return (
        <>
            <div className="filter-bar">
                <div className="search-wrap">
                    <span className="search-icon">⌕</span>
                    <input
                        className="search-input"
                        placeholder="Tìm kiếm công việc..."
                        value={filter.search}
                        onChange={e => setFilter({
                            ...filter,
                            search: e.target.value
                        })}
                    />
                    {filter.search && (
                        <button className="search-clear" onClick={() => setFilter({ ...filter, search: '' })}>x</button>
                    )}
                </div>
                <div className="status-tabs">
                    {statuses.map(st => (
                        <button
                            key={st.value}
                            className={`tab ${filter.status === st.value ? 'tab-active' : ''}`}
                            onClick={() => setFilter({
                                ...filter,
                                status: st.value
                            })} >
                            {st.label}
                        </button>
                    ))}
                </div>
            </div >
        </>)
}

export default FilterBar