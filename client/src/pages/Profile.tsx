import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setUser } from '../store/authSlice';
import { updateProfileApi } from '../api/auth.api';
import { ProfileInfoForm } from '../components/profile/ProfileInfoForm';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(currentUser?.name || 'أحمد ماهر');
  const [email, setEmail] = useState(currentUser?.email || 'ahmed.maher@electro-pi.com');
  const [role] = useState('قائد تطوير البرمجيات');
  const [department, setDepartment] = useState('البنية التحتية والتطوير');

  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrMsg, setProfileErrMsg] = useState('');

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

  const handleDeleteAccount = () => {
    if (confirm('هل أنت تأكد من رغبتك في حذف الحساب نهائياً؟ هذا الإجراء غير قابل للتراجع!')) {
      alert('تم تقديم طلب حذف الحساب.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-right">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">الملف الشخصي للمستخدم</h1>
        <p className="text-xs text-slate-500 font-medium">
          إدارة إعدادات حسابك وتفضيلات البيانات الشخصية.
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
