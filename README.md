# TaskFlow - Quản Lý Công Việc Cá Nhân

Ứng dụng SPA quản lý công việc cá nhân, xây dựng bằng React 19 + TypeScript + Vite.

---

## Cài đặt và chạy local

### Yêu cầu

- Node.js >= 18.x
- npm >= 9.x (hoặc yarn)

### Các bước

1. **Clone repo**

   git clone https://github.com/Tan-Nhi/talkflow-react.git
   cd taskflow-react

2. **Cài dependencies**

   npm install

3. **Chạy development server**
   npm run dev
   => App chạy tại http://localhost:3000
4. **Buid production**
   npm run build
5. **Chạy production server**
   npm run preview

---

## Cấu trúc thư mục

taskflow-react/
├── src/
│ ├── components/
│ │ ├── header.tsx # Logo + nút thêm task
│ │ ├── statsbar.tsx # Thống kê nhanh + progress bar
│ │ ├── Fflterbar.tsx # Tìm kiếm + lọc theo status
│ │ ├── taskboard.tsx # Kanban 3 cột
│ │ ├── taskcard.tsx # Card hiển thị từng task
│ │ └── taskmodal.tsx # Modal thêm/sửa task
│ ├── utils/
│ │ ├── storage.ts # localStorage helpers
│ │ └── date.ts # Xử lý deadline, overdue, due soon
│ ├── model
| | ├── type.ts # TypeScript interfaces & types
│ ├── App.tsx # Root component, state management
│ ├── App.css # Toàn bộ CSS (design system)
│ ├── main.tsx # Entry point
│ └── index.css # Global reset
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
└── README.md

---

## Tại sao tôi lại làm vậy ?

### 1. State Management — chỉ dùng `useState` + `useMemo`

Đề bài yêu cầu quản lý task list với thêm/sửa/xóa/lọc. Scope nhỏ, không cần Redux hay Zustand. Dùng `useState` ở root `App.tsx` và truyền prop xuống — đơn giản, dễ debug, không over-engineering.

`useMemo` được dùng cho `filteredTasks` và `stats` để tránh tính toán lại mỗi render không cần thiết.

### 2. Lưu trữ — `localStorage` với custom helpers

Vì đề bài không yêu cầu backend, `localStorage` là lựa chọn phù hợp nhất cho persistence giữa các session. Toàn bộ logic được tách vào `src/utils/storage.ts` để dễ swap sang IndexedDB hay API sau này nếu cần.

Pattern dùng: `loadTasks` là lazy initializer của `useState`, `saveTasks` được gọi qua `useEffect` mỗi khi `tasks` thay đổi.

### 3. Không dùng thư viện UI component (MUI, Ant Design...)

Toàn bộ UI được viết bằng CSS thuần với CSS Variables — giảm bundle size, kiểm soát hoàn toàn design, không bị ràng buộc bởi design system của bên thứ ba. Responsive được handle bằng CSS Grid + Media Query.

### 4. Kanban view theo cột

Đề bài yêu cầu "hiển thị theo trạng thái". Thay vì list đơn giản, chọn layout Kanban 3 cột (TODO / In Progress / Done) vì trực quan hơn và phổ biến trong thực tế quản lý công việc. Filter theo status vẫn hoạt động trên kanban — ẩn task không khớp ở mọi cột.

### 5. Deadline warnings — 2 mức

- **Quá hạn** (`isOverdue`): deadline < now && status ≠ done → viền đỏ + icon ⚠
- **Sắp hạn** (`isDueSoon`): 0 < deadline - now < 48h → viền vàng + icon ⏰

Ngưỡng 48h được chọn vì phù hợp với nhịp làm việc thực tế (đủ thời gian phản ứng mà không gây alert quá sớm).

### 6. Priority field

Đề bài không đề cập nhưng priority là thuộc tính thiết yếu của task management. Implemented với 3 mức (Low/Medium/High), hiển thị bằng colored dot trên card. High priority có glow effect đỏ để nổi bật.

### 7. TypeScript strict mode

`tsconfig.app.json` bật `strict: true`, `noUnusedLocals`, `noUnusedParameters` để đảm bảo type safety tối đa ngay từ đầu.

---

## Tính Năng

| Tính năng  | Chi tiết                                               |
| ---------- | ------------------------------------------------------ |
| Thêm task  | Modal với validation                                   |
| Sửa task   | Mở lại modal với data sẵn                              |
| Xóa task   | Xóa ngay lập tức                                       |
| Đổi status | Nút inline trên card(TODO > In Progress > Done > ... ) |
| Tìm kiếm   | Realtime theo title + descriptiom                      |
| Lọc status | Tabs: Tất cả / TODO/ In Progress/ Done                 |
| Deadline   | Cảnh báo overdue (đỏ) + sắp hạn (vàng)                 |
| Thống kê   | Tổng / Hoàn thành / Quá hạn / Phần trăm tiến độ        |
| Lưu trữ    | localStorage - không mất khi tắt tab                   |

---

## Cải thiện nếu có thêm thời gian

1. **Drag & Drop** giữa các cột Kanban (dùng `@dnd-kit/core`) — UX trực quan hơn thay vì nút bấm.
2. **Tags / Labels** — gán nhãn màu cho task để phân loại theo project hoặc context.
3. **Notifications** — Web Notifications API để nhắc nhở deadline ngay cả khi tab không active.
4. **Multiple boards** — quản lý nhiều project riêng biệt, mỗi project là 1 kanban board.
5. **Backend + Auth** — thay localStorage bằng Supabase/Firebase để sync across devices và hỗ trợ collaboration.
6. **Export** — xuất task list ra CSV/PDF để báo cáo hoặc backup.
7. **Undo/Redo** — pattern Command History để hoàn tác xóa nhầm.

---

Tan-Nhi Dev © 2026
