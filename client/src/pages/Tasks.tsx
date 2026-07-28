import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllTasksApi, deleteTaskApi, updateTaskApi } from "../api/tasks.api";
import type { Task } from "../types";
import { TasksFilterBar } from "../components/tasks/TasksFilterBar";
import { TasksTable } from "../components/tasks/TasksTable";

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
        <div className="space-y-6 max-w-7xl mx-auto text-right ">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-slate-900">
                        جميع المهام
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                        متابعة وتغير حالات لكافة المهام عبر جميع المشاريع في
                        مكان واحد.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/tasks/new")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-xs flex items-center gap-2"
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
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
};

export default Tasks;
