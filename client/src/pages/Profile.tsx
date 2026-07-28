import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setUser } from '../store/authSlice';
import { updateProfileApi, updatePasswordApi } from '../api/auth.api';
import { ProfileInfoForm } from '../components/profile/ProfileInfoForm';
import { ProfileSecurityForm } from '../components/profile/ProfileSecurityForm';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(currentUser?.name || 'ألكسندر ستيرلينج');
  const [email, setEmail] = useState(currentUser?.email || 'alex.sterling@enterprise-dev.io');
  const [role] = useState('مهندس DevOps رئيسي');
  const [department, setDepartment] = useState('البنية التحتية السحابية');

  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrMsg, setProfileErrMsg] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccessMsg('');
    setProfileErrMsg('');
    try {
      setIsProfileUpdating(true);
      const res = await updateProfileApi({ name, email });
      if (res.data) {
        dispatch(setUser({ ...currentUser, ...res.data }));
      }
      setProfileSuccessMsg('تم تحديث المعلومات الشخصية في قاعدة البيانات بنجاح');
      setTimeout(() => setProfileSuccessMsg(''), 3000);
    } catch (err: any) {
      setProfileErrMsg(err.message || 'فشل تحديث البيانات، يرجى إعادة المحاولة');
    } finally {
      setIsProfileUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'يرجى ملء كافة حقول كلمة المرور' });
      return;
    }

    if (newPassword.length < 12) {
      setPasswordMsg({ type: 'error', text: 'كلمة المرور يجب أن لا تقل عن 12 حرفاً' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'كلمة المرور الجديدة وتأكيدها غير متطابقين' });
      return;
    }

    try {
      setIsPasswordUpdating(true);
      await updatePasswordApi({ currentPassword, newPassword });
      setPasswordMsg({ type: 'success', text: 'تم تحديث كلمة المرور بنجاح' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.message || 'فشل تحديث كلمة المرور' });
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('هل أنت تأكد من رغبتك في حذف الحساب نهائياً؟ هذا الإجراء غير قابل للتراجع!')) {
      alert('تم تقديم طلب حذف الحساب.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-right ">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">الملف الشخصي للمستخدم</h1>
        <p className="text-xs text-slate-500 font-medium">
          إدارة إعدادات حسابك وتفضيلات الأمان والخصوصية.
        </p>
      </div>

      <ProfileInfoForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        role={role}
        department={department}
        setDepartment={setDepartment}
        isUpdating={isProfileUpdating}
        successMsg={profileSuccessMsg}
        errMsg={profileErrMsg}
        onSubmit={handleUpdateProfile}
        userId={currentUser?.id || 'USR-9942'}
      />

      <ProfileSecurityForm
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isPasswordUpdating={isPasswordUpdating}
        passwordMsg={passwordMsg}
        onPasswordSubmit={handleUpdatePassword}
        is2FAEnabled={is2FAEnabled}
        setIs2FAEnabled={setIs2FAEnabled}
      />

      <div className="bg-red-50/30 border border-red-200 rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div>
          <h3 className="font-bold text-red-700">إنهاء الحساب</h3>
          <p className="text-slate-500 text-[11px] mt-0.5">
            حذف ملفك الشخصي وكافة البيانات المرتبطة به نهائياً.
          </p>
        </div>

        <button
          onClick={handleDeleteAccount}
          className="border border-red-300 text-red-600 hover:bg-red-50 bg-white font-medium py-2 px-4 rounded-md transition-colors whitespace-nowrap"
        >
          حذف الحساب
        </button>
      </div>
    </div>
  );
};

export default Profile;
