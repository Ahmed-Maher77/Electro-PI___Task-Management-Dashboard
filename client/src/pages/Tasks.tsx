import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllTasksApi, deleteTaskApi, updateTaskApi } from "../api/tasks.api";
import type { Task } from "../types";
import { TasksFilterBar } from "../components/tasks/TasksFilterBar";
import { TasksTable } from "../components/tasks/TasksTable";
import { Spinner } from "../components/Loader";

export const Tasks: React.FC = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Search & Filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");

    // Real Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Edit Task Modal State pre-filled with real data
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editAssignee, setEditAssignee] = useState("");
    const [editStatus, setEditStatus] = useState<Task["status"]>("todo");
    const [editPriority, setEditPriority] = useState<Task["priority"]>("medium");
    const [editDueDate, setEditDueDate] = useState("");
    const [isSavingTask, setIsSavingTask] = useState(false);

    const loadTasks = () => {
        setIsLoading(true);
        getAllTasksApi()
            .then((res) => {
                setTasks(res.data || []);
            })
            .catch(() => {})
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleStatusChange = async (
        id: string,
        newStatus: Task["status"],
    ) => {
        try {
            await updateTaskApi(id, { status: newStatus });
            setTasks(
                tasks.map((t) =>
                    (t._id || t.id) === id ? { ...t, status: newStatus } : t,
                ),
            );
        } catch (err: any) {
            alert(err.message || "فشل تحديث حالة المهمة");
        }
    };

    // Open edit modal pre-filled with selected task fields
    const handleOpenEditTaskModal = (task: Task) => {
        setEditingTask(task);
        setEditTitle(task.title || "");
        setEditDesc(task.description || "");
        setEditAssignee(task.assigneeName || "");
        setEditStatus(task.status === "in-progress" ? "doing" : task.status || "todo");
        setEditPriority(task.priority || "medium");
        setEditDueDate(task.dueDate || "");
    };

    // Save edited task changes end-to-end to backend API
    const handleSaveTaskEdits = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask) return;
        const taskId = editingTask._id || editingTask.id || "";

        try {
            setIsSavingTask(true);
            const res = await updateTaskApi(taskId, {
                title: editTitle,
                description: editDesc,
                assigneeName: editAssignee,
                status: editStatus,
                priority: editPriority,
                dueDate: editDueDate,
            });

            setTasks(
                tasks.map((t) =>
                    (t._id || t.id) === taskId ? res.data : t
                )
            );
            setEditingTask(null);
        } catch (err: any) {
            alert(err.message || "فشل حفظ تعديلات المهمة");
        } finally {
            setIsSavingTask(false);
        }
    };

    const handleDeleteTask = async (id: string) => {
        if (confirm("هل أنت تأكد من رغبتك في حذف هذه المهمة؟")) {
            try {
                await deleteTaskApi(id);
                setTasks(tasks.filter((t) => (t._id || t.id) !== id));
            } catch (err: any) {
                alert(err.message || "فشل حذف المهمة");
            }
        }
    };

    const filteredTasks = tasks.filter((t) => {
        const matchesSearch =
            t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (t.taskIdCode &&
                t.taskIdCode.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus =
            statusFilter === "all" || t.status === statusFilter;
        const matchesPriority =
            priorityFilter === "all" || t.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    // Dynamic Pagination Slices
    const totalItems = filteredTasks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-right">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900">
                        جميع المهام
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                        متابعة وتغيير حالات لكافة المهام عبر جميع المشاريع في
                        مكان واحد.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/tasks/new")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-xs flex items-center gap-2 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>إنشاء مهمة</span>
                </button>
            </div>

            {/* Controls Bar */}
            <TasksFilterBar
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                onSearchChange={(val) => {
                    setSearchTerm(val);
                    setCurrentPage(1);
                }}
                onStatusChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                }}
                onPriorityChange={(val) => {
                    setPriorityFilter(val);
                    setCurrentPage(1);
                }}
            />

            {/* Tasks Table Card */}
            <TasksTable
                isLoading={isLoading}
                tasks={paginatedTasks}
                totalItems={totalItems}
                totalPages={totalPages}
                currentPage={currentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={setCurrentPage}
                onStatusChange={handleStatusChange}
                onEditTask={handleOpenEditTaskModal}
                onDeleteTask={handleDeleteTask}
            />

            {/* Edit Task Modal */}
            {editingTask && (
                <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-slate-200 rounded-md p-6 w-full max-w-md space-y-4 text-xs">
                        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                            تعديل تفاصيل المهمة ({editingTask.taskIdCode || "TASK"})
                        </h2>

                        <form onSubmit={handleSaveTaskEdits} className="space-y-3">
                            <div className="space-y-1">
                                <label className="block font-semibold text-slate-700">
                                    عنوان المهمة
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block font-semibold text-slate-700">
                                    وصف المهمة
                                </label>
                                <textarea
                                    rows={3}
                                    value={editDesc}
                                    onChange={(e) => setEditDesc(e.target.value)}
                                    className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none resize-none text-slate-900"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="block font-semibold text-slate-700">
                                        المسند إليه
                                    </label>
                                    <input
                                        type="text"
                                        value={editAssignee}
                                        onChange={(e) => setEditAssignee(e.target.value)}
                                        className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                        placeholder="اسم المطور"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block font-semibold text-slate-700">
                                        تاريخ الاستحقاق
                                    </label>
                                    <input
                                        type="text"
                                        value={editDueDate}
                                        onChange={(e) => setEditDueDate(e.target.value)}
                                        className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                        placeholder="مثال: 30 أكتوبر 2024"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="block font-semibold text-slate-700">
                                        الحالة
                                    </label>
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value as any)}
                                        className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                    >
                                        <option value="todo">قيد الانتظار</option>
                                        <option value="doing">قيد العمل</option>
                                        <option value="review">مراجعة</option>
                                        <option value="done">مكتملة</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="block font-semibold text-slate-700">
                                        الأولوية
                                    </label>
                                    <select
                                        value={editPriority}
                                        onChange={(e) => setEditPriority(e.target.value as any)}
                                        className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                    >
                                        <option value="low">منخفضة</option>
                                        <option value="medium">متوسطة</option>
                                        <option value="high">عالية</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingTask(null)}
                                    className="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 font-medium"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingTask}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-medium flex items-center gap-1.5 cursor-pointer"
                                >
                                    {isSavingTask ? <Spinner size="sm" /> : null}
                                    <span>{isSavingTask ? "جاري الحفظ..." : "حفظ التغيرات"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
