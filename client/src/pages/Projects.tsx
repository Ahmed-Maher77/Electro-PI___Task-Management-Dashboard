import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProjectsApi, deleteProjectApi } from "../api/projects.api";
import type { Project } from "../types";
import type { RootState } from "../store";
import { ProjectsFilterBar } from "../components/projects/ProjectsFilterBar";
import { ProjectsTable } from "../components/projects/ProjectsTable";

export const Projects: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    // Enforce creator permissions on project deletion
    const handleDeleteProject = async (p: Project) => {
        const projectId = p._id || p.id || "";

        // Authorization check: only project creator or admin can edit/delete
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
        <div className="space-y-6 max-w-7xl mx-auto text-right ">
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
                onDeleteProject={handleDeleteProject}
            />
        </div>
    );
};

export default Projects;
