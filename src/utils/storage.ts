import type { ITask } from "../model/type"

const KEY = 'taskflow_tasks'

const loadTacks = (): ITask[] => {
    try {
        // Lưu data vào localStorage
        const raw = localStorage.getItem(KEY)
        if (!raw) return []; // Nếu raw null thì trả về mảng rỗng
        const data = JSON.parse(raw);
        return data as ITask[];
    } catch (error) {
        console.error("Lỗi parse LocalStorage", error);
        return [];
    }
}

const saveTasks = (tasks: ITask[]): void => {
    localStorage.setItem(KEY, JSON.stringify(tasks));
}
export { loadTacks, saveTasks }