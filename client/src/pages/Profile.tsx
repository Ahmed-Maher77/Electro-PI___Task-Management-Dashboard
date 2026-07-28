import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, Lock, Smartphone, Camera, Check, AlertCircle } from 'lucide-react';
import type { RootState } from '../store';
import { setUser } from '../store/authSlice';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // Personal Info Form State
  const [name, setName] = useState(currentUser?.name || 'ألكسندر ستيرلينج');
  const [email, setEmail] = useState(currentUser?.email || 'alex.sterling@enterprise-dev.io');
  const [role] = useState('مهندس DevOps رئيسي (Lead DevOps Engineer)');
  const [department, setDepartment] = useState('البنية التحتية السحابية (Cloud Infrastructure)');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 2FA State
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Handle Profile Update
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(setUser({ ...currentUser, name, email }));
    }
    setProfileSuccessMsg('تم تحديث المعلومات الشخصية بنجاح');
    setTimeout(() => setProfileSuccessMsg(''), 3000);
  };

  // Handle Password Update
  const handleUpdatePassword = (e: React.FormEvent) => {
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

    setPasswordMsg({ type: 'success', text: 'تم تحديث كلمة المرور بنجاح' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Handle Account Deletion
  const handleDeleteAccount = () => {
    if (confirm('هل أنت تأكد من رغبتك في حذف الحساب نهائياً؟ هذا الإجراء غير قابل للتراجع!')) {
      alert('تم إرسال طلب حذف الحساب للإدارة.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-right select-none">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">الملف الشخصي للمستخدم</h1>
        <p className="text-xs text-slate-500 font-medium">
          إدارة إعدادات حسابك وتفضيلات الأمان والخصوصية.
        </p>
      </div>

      {/* Card 1: Personal Information */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            المعلومات الشخصية (PERSONAL INFORMATION)
          </h2>
          <span className="text-[11px] font-mono text-slate-400">ID: USR-9942</span>
        </div>

        <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
          
          {profileSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{profileSuccessMsg}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            {/* Avatar with Edit Badge */}
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 text-2xl overflow-hidden">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 left-0 bg-blue-600 text-white p-1 rounded-full border-2 border-white shadow-none">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full text-xs">
              
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">الصلاحية / المسمى الوظيفي</label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value={role}
                    className="w-full bg-slate-100 text-slate-500 border border-slate-200 rounded-md px-3.5 py-2.5 cursor-not-allowed pl-9"
                  />
                  <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">القسم / الإدارة</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-md transition-colors text-xs"
            >
              تحديث الملف الشخصي
            </button>
          </div>

        </form>
      </div>

      {/* Card 2: Security & Authentication */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            الأمان والتحقق (SECURITY & AUTHENTICATION)
          </h2>
        </div>

        <div className="p-6 space-y-6 text-xs">
          
          {/* Change Password Section */}
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">تغيير كلمة المرور</h3>

            {passwordMsg && (
              <div
                className={`p-3 rounded-md border text-xs flex items-center gap-2 ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {passwordMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <div className="space-y-3 max-w-lg">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-700">كلمة المرور الحالية</label>
                  <span className="text-[11px] text-slate-400 font-normal">التحقق مطلوب للتغييرات</span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  placeholder="أدخل كلمة المرور الجديدة"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور الجديدة"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Requirements Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-2 max-w-lg">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                <span>متطلبات كلمة المرور:</span>
              </div>
              <ul className="list-disc list-inside text-slate-500 text-[11px] space-y-1 pr-2">
                <li>12 حرفاً على الأقل</li>
                <li>يجب أن تحتوي على رمز خاص واحد على الأقل</li>
                <li>لا يجب أن تطابق آخر 5 كلمات مرور سابقة</li>
              </ul>
            </div>

            <div className="flex justify-start pt-1">
              <button
                type="submit"
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                تحديث كلمة المرور
              </button>
            </div>
          </form>

          {/* 2FA Banner Box */}
          <div className="border border-slate-200 bg-slate-50/50 rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">التحقق بخطوتين (2FA)</p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  تعزيز أمان حسابك عن طريق تفعيل رمز التحقق بخطوتين عند تسجيل الدخول.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIs2FAEnabled(!is2FAEnabled)}
              className={`px-4 py-2 rounded-md font-medium text-xs transition-colors ${
                is2FAEnabled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {is2FAEnabled ? 'مفعل (2FA Enabled)' : 'تفعيل التحقق بخطوتين'}
            </button>
          </div>

        </div>

      </div>

      {/* Card 3: Terminate Account */}
      <div className="bg-red-50/30 border border-red-200 rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div>
          <h3 className="font-bold text-red-700">إنهاء الحساب</h3>
          <p className="text-slate-500 text-[11px] mt-0.5">
            حذف ملفك الشخصي وكافة البيانات المرتبطة به نهائياً. هذا الإجراء لا يمكن التراجع عنه.
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
