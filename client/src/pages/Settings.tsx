import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Check, Save } from "lucide-react";
import type { RootState } from "../store";
import { setUser } from "../store/authSlice";
import { updateProfileApi } from "../api/auth.api";
import {
    SettingsTabs,
    type SettingsTabType,
} from "../components/settings/SettingsTabs";
import { UserProfileSettingsForm } from "../components/settings/UserProfileSettingsForm";
import { NotificationSettingsForm } from "../components/settings/NotificationSettingsForm";
import { SecuritySettingsForm } from "../components/settings/SecuritySettingsForm";
import { Spinner } from "../components/Loader";

export const Settings: React.FC = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [activeTab, setActiveTab] = useState<SettingsTabType>("profile");

    // Profile Form States initialized from logged in user or defaults
    const [name, setName] = useState(currentUser?.name || "أحمد ماهر");
    const [email, setEmail] = useState(
        currentUser?.email || "ahmed.maher@electro-pi.com",
    );
    const [role, setRole] = useState("قائد مهندسي التطوير");
    const [phone, setPhone] = useState("+20 100 123 4567");
    const [bio, setBio] = useState(
        "مهندس برمجيات شغوف بتطوير وتصميم الواجهات ولوحات التحكم المتقدمة.",
    );
    const [avatarUrl, setAvatarUrl] = useState(
        localStorage.getItem("user_avatar") || "",
    );

    // Notifications Form States
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [pushAlerts, setPushAlerts] = useState(true);
    const [taskAlerts, setTaskAlerts] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(false);

    // Status Feedback
    const [isSaving, setIsSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Real End-to-End API Integration
    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavedMsg("");
        setErrorMsg("");

        try {
            setIsSaving(true);
            if (activeTab === "profile") {
                const res = await updateProfileApi({ name, email });
                if (avatarUrl) {
                    localStorage.setItem("user_avatar", avatarUrl);
                } else {
                    localStorage.removeItem("user_avatar");
                }
                if (res.data) {
                    dispatch(setUser({ ...currentUser, ...res.data }));
                }
                setSavedMsg(
                    "تم حفظ بيانات الملف الشخصي بنجاح وتحديث الصورة الرمزية في الجلسة",
                );
            } else if (activeTab === "notifications") {
                setSavedMsg("تم حفظ تفضيلات الإشعارات والتنبيهات بنجاح");
            }
            setTimeout(() => setSavedMsg(""), 4000);
        } catch (err: any) {
            setErrorMsg(
                err.message || "فشل حفظ الإعدادات، يرجى المحاولة مرة أخرى",
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto text-right">
            {/* Page Header */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">
                    إعدادات النظام والبروفايل
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                    إدارة بياناتك الشخصية، تفضيلات التنبيهات، وحماية الحساب في
                    مكان واحد.
                </p>
            </div>

            {/* Tabs Navigation */}
            <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {savedMsg && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>{savedMsg}</span>
                </div>
            )}

            {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                    {errorMsg}
                </div>
            )}

            {activeTab === "security" ? (
                <SecuritySettingsForm />
            ) : (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                    {activeTab === "profile" && (
                        <UserProfileSettingsForm
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            role={role}
                            setRole={setRole}
                            phone={phone}
                            setPhone={setPhone}
                            bio={bio}
                            setBio={setBio}
                            avatarUrl={avatarUrl}
                            setAvatarUrl={setAvatarUrl}
                        />
                    )}

                    {activeTab === "notifications" && (
                        <NotificationSettingsForm
                            emailAlerts={emailAlerts}
                            setEmailAlerts={setEmailAlerts}
                            pushAlerts={pushAlerts}
                            setPushAlerts={setPushAlerts}
                            taskAlerts={taskAlerts}
                            setTaskAlerts={setTaskAlerts}
                            weeklyDigest={weeklyDigest}
                            setWeeklyDigest={setWeeklyDigest}
                        />
                    )}

                    {/* Action Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-xs flex items-center gap-2 cursor-pointer"
                        >
                            {isSaving ? (
                                <Spinner size="sm" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            <span>
                                {isSaving
                                    ? "جاري الحفظ..."
                                    : "حفظ التغيرات والتفضيلات"}
                            </span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Settings;
