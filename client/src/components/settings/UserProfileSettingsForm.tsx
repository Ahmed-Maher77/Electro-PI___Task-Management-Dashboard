import React, { useRef } from 'react';
import { Camera, User as UserIcon, Trash2 } from 'lucide-react';

interface UserProfileSettingsFormProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
  avatarUrl: string;
  setAvatarUrl: (val: string) => void;
}

export const UserProfileSettingsForm: React.FC<UserProfileSettingsFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  role,
  setRole,
  phone,
  setPhone,
  bio,
  setBio,
  avatarUrl,
  setAvatarUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      
      {/* Header Info */}
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-sm font-bold text-slate-900">البيانات الشخصية والصورة</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">تحديث الصورة الرمزية وتفاصيل الاتصال الخاصة بك.</p>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center gap-5 py-2">
        <div className="relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-300"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl border-2 border-slate-300">
              {name ? name.charAt(0).toUpperCase() : <UserIcon className="w-8 h-8" />}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 left-0 bg-slate-900 hover:bg-blue-600 text-white p-1.5 rounded-full border-2 border-white transition-colors"
            title="تحديث الصورة"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-1.5 text-center sm:text-right">
          <p className="font-bold text-slate-900 text-sm">صورة الملف الشخصي</p>
          <p className="text-[11px] text-slate-500">
            يدعم صيغ JPG و PNG و GIF بحجم أقصى 5 ميجابايت.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md font-semibold text-xs transition-colors"
            >
              تحميل صورة جديدة
            </button>
            {avatarUrl && (
              <button
                type="button"
                onClick={() => setAvatarUrl('')}
                className="text-red-600 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors flex items-center gap-1"
                title="إزالة الصورة"
              >
                <Trash2 className="w-4 h-4" />
                <span>إزالة</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700">الاسم الكامل</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="أدخل اسمك الكامل..."
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@electro-pi.com"
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700">المسمى الوظيفي</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="مثال: مطور واجهات / قائد فريق"
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700">رقم الهاتف</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+20 100 000 0000"
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none text-left dir-ltr"
          />
        </div>
      </div>

      {/* Bio Textarea */}
      <div className="space-y-1.5">
        <label className="block font-bold text-slate-700">نبذة عن المستخدم (Bio)</label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="اكتب نبذة مختصرة عن خبرتك واهتماماتك المهنية..."
          className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none resize-none"
        />
      </div>

    </div>
  );
};
