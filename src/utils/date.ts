import type { ITask } from "../model/type";


const isOverdue = (task: ITask): boolean => {
    if (!task.deadline || task.status === 'done')
        return false;

    return new Date(task.deadline) < new Date()
}

const isDueSoon = (task: ITask): boolean => {
    if (!task.deadline || task.status === 'done')
        return false;
    const now = new Date();
    const deadline = new Date(task.deadline);
    const diff = deadline.getTime() - now.getTime()
    return diff > 0 && diff < 1000 * 60 * 60 * 24 * 2; //2 ngày
}


const formatDate = (iso: string) => {
    // dùng để chuyển từ quốc tế sang ngày giờ VN  
    // năm-tháng-ngày thành ngày-tháng-năm
    return new Date(iso).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

}


export { isOverdue, isDueSoon, formatDate }