import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProjectsApi, deleteProjectApi, updateProjectApi } from "../api/projects.api";
import type { Project } from "../types";
import type { RootState } from "../store";
import { ProjectsFilterBar } from "../components/projects/ProjectsFilterBar";
import { ProjectsTable } from "../components/projects/ProjectsTable";
import { Spinner } from "../components/Loader";

export const Projects: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Edit Modal State pre-filled with real data
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editSubtitle, setEditSubtitle] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editStatus, setEditStatus] = useState<"in-progress" | "critical" | "on-hold" | "completed">("in-progress");
    const [editProgress, setEditProgress] = useState<number>(0);
    const [isSaving, setIsSaving] = useState(false);

    // Filters
    const [statusFilter, setStatusFilter] = useState("all");
    const [leadFilter, setLeadFilter] = useState("all");

    // Real Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await getProjectsApi();
            setProjects(res.data || []);
        } catch (err: any) {
            setError(err.message || "فشل تحميل قائمة المشاريع");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Open edit modal and load real project fields
    const handleOpenEditModal = (p: Project) => {
        const isOwner = p.ownerId && currentUser?.id && p.ownerId === currentUser.id;
        const isAdmin = currentUser?.role === "admin";

        if (p.ownerId && !isOwner && !isAdmin) {
            alert("فقط منشئ المشروع يملك صلاحية تعديل أو حذف هذا المشروع.");
            return;
        }

        setEditingProject(p);
        setEditTitle(p.title || "");
        setEditSubtitle(p.subtitle || "");
        setEditDesc(p.description || "");
        setEditStatus(p.status || "in-progress");
        setEditProgress(p.progress || 0);
    };

    // Save edited project changes to backend API
    const handleSaveProjectEdits = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject) return;
        const projectId = editingProject._id || editingProject.id || "";

        try {
            setIsSaving(true);
            const res = await updateProjectApi(projectId, {
                title: editTitle,
                subtitle: editSubtitle,
                description: editDesc,
                status: editStatus,
                progress: editProgress,
            });

            setProjects(
                projects.map((item) =>
                    (item._id || item.id) === projectId ? res.data : item
                )
            );
            setEditingProject(null);
        } catch (err: any) {
            alert(err.message || "فشل حفظ تعديلات المشروع");
        } finally {
            setIsSaving(false);
        }
    };

    // Enforce creator permissions on project deletion
    const handleDeleteProject = async (p: Project) => {
        const projectId = p._id || p.id || "";

        const isOwner =
            p.ownerId && currentUser?.id && p.ownerId === currentUser.id;
        const isAdmin = currentUser?.role === "admin";

        if (p.ownerId && !isOwner && !isAdmin) {
            alert("فقط منشئ المشروع يملك صلاحية تعديل أو حذف هذا المشروع.");
            return;
        }

        if (!confirm(`هل أنت تأكد من رغبتك في حذف المشروع (${p.title})؟`))
            return;
        try {
            await deleteProjectApi(projectId);
            setProjects(
                projects.filter((item) => (item._id || item.id) !== projectId),
            );
        } catch (err: any) {
            alert(err.message || "فشل حذف المشروع");
        }
    };

    // Filter projects list
    const filteredProjects = projects.filter((p) => {
        const matchesStatus =
            statusFilter === "all" || p.status === statusFilter;
        const matchesLead =
            leadFilter === "all" ||
            (p.leadName && p.leadName.includes(leadFilter));
        return matchesStatus && matchesLead;
    });

    // Calculate real pagination slices
    const totalItems = filteredProjects.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return (
        <div className="space-y-6 max-w-7xl mx-auto text-right">
            {/* Top Filter Bar */}
            <ProjectsFilterBar
                statusFilter={statusFilter}
                leadFilter={leadFilter}
                onStatusChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                }}
                onLeadChange={(val) => {
                    setLeadFilter(val);
                    setCurrentPage(1);
                }}
            />

            {/* Main Table */}
            <ProjectsTable
                loading={loading}
                error={error}
                projects={paginatedProjects}
                totalItems={totalItems}
                totalPages={totalPages}
                currentPage={currentPage}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={setCurrentPage}
                onEditProject={handleOpenEditModal}
                onDeleteProject={handleDeleteProject}
            />

            {/* Edit Project Modal */}
            {editingProject && (
                <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-slate-200 rounded-md p-6 w-full max-w-md space-y-4 text-xs">
                        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                            تعديل تفاصيل المشروع ({editingProject.title})
                        </h2>

                        <form onSubmit={handleSaveProjectEdits} className="space-y-3">
                            <div className="space-y-1">
                                <label className="block font-semibold text-slate-700">
                                    عنوان المشروع
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
                                    العنوان الفرعي
                                </label>
                                <input
                                    type="text"
                                    value={editSubtitle}
                                    onChange={(e) => setEditSubtitle(e.target.value)}
                                    className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block font-semibold text-slate-700">
                                    وصف المشروع
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
                                        الحالة
                                    </label>
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value as any)}
                                        className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                    >
                                        <option value="in-progress">قيد التنفيذ</option>
                                        <option value="critical">حرج</option>
                                        <option value="on-hold">معلق</option>
                                        <option value="completed">مكتمل</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="block font-semibold text-slate-700">
                                        نسبة الإنجاز (%)
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={editProgress}
                                        onChange={(e) =>
                                            setEditProgress(parseInt(e.target.value, 10) || 0)
                                        }
                                        className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingProject(null)}
                                    className="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 font-medium"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-medium flex items-center gap-1.5"
                                >
                                    {isSaving ? <Spinner size="sm" /> : null}
                                    <span>{isSaving ? "جاري الحفظ..." : "حفظ التغيرات"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
