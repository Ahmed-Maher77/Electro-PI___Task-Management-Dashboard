import React, { useState } from 'react';
import { BookOpen, Key, Terminal, Code2, Server, Check, Copy } from 'lucide-react';

export const Docs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'auth' | 'projects' | 'tasks' | 'webhooks'>('overview');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-right select-none">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">التوثيق الفني وواجهات API</h1>
        <p className="text-xs text-slate-500 font-medium">
          الدليل المرجعي الكامل للمطورين لربط المنظومات وتأمين الاتصالات البرمجية مع Electro-Pi.
        </p>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold text-slate-600">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          نظرة عامة
        </button>
        <button
          onClick={() => setActiveTab('auth')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'auth'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          المصادقة (Authentication)
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'projects'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          واجهة المشاريع (Projects API)
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'tasks'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          واجهة المهام (Tasks API)
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'webhooks'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          إشعارات Webhooks
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-xs">
            <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>مقدمة عن واجهات Electro-Pi REST API</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                تعتمد واجهات **Electro-Pi REST API** على بروتوكول HTTP وتوفر استجابات بتنسيق JSON المعياري. تُستخدم هذه الواجهات لربط نظم إدارة المهام بالمشاريع الخارجية وتتبع حالة التنفيذ وتوليد التقارير.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-1">
                  <span className="font-bold text-slate-800">عنوان الرابط الرئيسي:</span>
                  <p className="font-mono text-blue-600 text-[11px]">https://api.electro-pi.com/v1</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-1">
                  <span className="font-bold text-slate-800">تنسيق البيانات:</span>
                  <p className="font-mono text-slate-600 text-[11px]">application/json</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-1">
                  <span className="font-bold text-slate-800">حد الطلبات (Rate Limit):</span>
                  <p className="font-mono text-slate-600 text-[11px]">1000 طلب / دقيقة</p>
                </div>
              </div>
            </div>

            {/* HTTP Response Status Codes */}
            <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">رموز استجابة HTTP (Response Status Codes)</h3>
              <div className="divide-y divide-slate-100">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-600">200 OK</span>
                  <span className="text-slate-600">تمت العملية بنجاح وتم إرجاع البيانات المطلوبة.</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-600">201 Created</span>
                  <span className="text-slate-600">تم إنشاء العنصر بنجاح (مشروع أو مهمة جديدة).</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-600">400 Bad Request</span>
                  <span className="text-slate-600">بيانات الطلب غير صالحة أو مفقودة.</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-mono font-bold text-red-600">401 Unauthorized</span>
                  <span className="text-slate-600">رمز المصادقة مفقود أو غير صالحة الجلسة.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth Tab */}
        {activeTab === 'auth' && (
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Key className="w-4 h-4 text-blue-600" />
              <span>المصادقة وتأمين الطلبات (Authentication)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              تتطلب جميع واجهات البرمجة تمرير رمز المميز **Bearer JWT Token** في ترويسة الطلب `Authorization`.
            </p>

            <div className="relative bg-slate-900 text-slate-100 rounded-md p-4 font-mono text-[11px] dir-ltr text-left overflow-x-auto">
              <button
                onClick={() => handleCopy('Authorization: Bearer <YOUR_JWT_TOKEN>', 'auth-header')}
                className="absolute top-3 right-3 text-slate-400 hover:text-white p-1"
              >
                {copiedSnippet === 'auth-header' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre>Authorization: Bearer YOUR_JWT_TOKEN</pre>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>واجهة المشاريع (GET /api/projects)</span>
            </div>

            <p className="text-slate-600">استرجاع قائمة المشاريع المتاحة للمستخدم الموثق.</p>

            <div className="relative bg-slate-900 text-slate-100 rounded-md p-4 font-mono text-[11px] dir-ltr text-left overflow-x-auto">
              <pre>{`curl -X GET "https://api.electro-pi.com/api/projects" \\
  -H "Authorization: Bearer <TOKEN>"`}</pre>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Code2 className="w-4 h-4 text-blue-600" />
              <span>إنشاء مهمة جديدة (POST /api/projects/:id/tasks)</span>
            </div>

            <div className="relative bg-slate-900 text-slate-100 rounded-md p-4 font-mono text-[11px] dir-ltr text-left overflow-x-auto">
              <pre>{`curl -X POST "https://api.electro-pi.com/api/projects/653f1a2/tasks" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "إعداد خوادم التجميع",
    "priority": "high",
    "status": "doing"
  }'`}</pre>
            </div>
          </div>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Server className="w-4 h-4 text-blue-600" />
              <span>إشعارات Webhooks الحية</span>
            </div>
            <p className="text-slate-600">
              يقوم نظام Webhooks بإرسال إشعار لحظي فور تغيير حالة المهمة أو إضافة مشاريع جديدة.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Docs;
