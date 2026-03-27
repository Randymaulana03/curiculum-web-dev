import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, Clock } from 'lucide-react';

const initialData = [
  {
    id: 1,
    title: "Bulan 1: Fondasi & Logika",
    weeks: "Minggu 1-4",
    isOpen: true,
    subTopics: [
      { id: 11, task: "HTML5 Deep Dive (Semantic, Forms)", status: "Pending", notes: "" },
      { id: 12, task: "CSS3 (Flexbox & Grid Layout)", status: "Pending", notes: "" },
      { id: 13, task: "JavaScript ES6+ (Arrow, Destructuring)", status: "Pending", notes: "" },
      { id: 14, task: "Asynchronous JS (Promises & Async/Await)", status: "Pending", notes: "" },
      { id: 15, task: "DOM manipulation & Event Handling", status: "Pending", notes: "" },
    ]
  },
  {
    id: 2,
    title: "Bulan 2: Transisi ke Profesional",
    weeks: "Minggu 5-8",
    isOpen: false,
    subTopics: [
      { id: 21, task: "Git & GitHub Version Control", status: "Pending", notes: "" },
      { id: 22, task: "TypeScript Fundamentals", status: "Pending", notes: "" },
      { id: 23, task: "Tailwind CSS Utility-First", status: "Pending", notes: "" },
    ]
  },
  {
    id: 3,
    title: "Bulan 3: Framework & Fullstack",
    weeks: "Minggu 9-12",
    isOpen: false,
    subTopics: [
      { id: 31, task: "Next.js App Router & Routing", status: "Pending", notes: "" },
      { id: 32, task: "Server vs Client Components", status: "Pending", notes: "" },
      { id: 33, task: "Database with Supabase/Prisma", status: "Pending", notes: "" },
      { id: 34, task: "Final Project & Vercel Deployment", status: "Pending", notes: "" },
    ]
  }
];

export default function CurriculumApp() {
  const [data, setData] = useState(() => {
    // Mengambil data dari Local Storage saat pertama kali load
    const saved = localStorage.getItem('myCurriculum');
    return saved ? JSON.parse(saved) : initialData;
  });

  // Simpan data ke Local Storage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('myCurriculum', JSON.stringify(data));
  }, [data]);

  const toggleAccordion = (id) => {
    setData(data.map(item => item.id === id ? { ...item, isOpen: !item.isOpen } : item));
  };

  const updateSubTopic = (parentId, subId, field, value) => {
    setData(data.map(parent => {
      if (parent.id === parentId) {
        return {
          ...parent,
          subTopics: parent.subTopics.map(sub => 
            sub.id === subId ? { ...sub, [field]: value } : sub
          )
        };
      }
      return parent;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
            Hii Rann... Here 90-Day Web Dev Architect
          </h1>
          <p className="mt-2 text-slate-400 text-lg">Personal Learning Dashboard</p>
        </header>

        <div className="space-y-4">
          {data.map((section) => (
            <div key={section.id} className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden shadow-lg">
              {/* Header Accordion */}
              <button 
                onClick={() => toggleAccordion(section.id)}
                className="w-full flex items-center justify-between p-5 bg-[#1e293b] hover:bg-[#2d3a4f] transition-colors"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-mono text-blue-400">{section.weeks}</span>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                {section.isOpen ? <ChevronUp /> : <ChevronDown />}
              </button>

              {/* Content Dropdown */}
              {section.isOpen && (
                <div className="p-4 border-t border-slate-700 bg-[#161e2d]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-150">
                      <thead>
                        <tr className="text-slate-500 text-xs uppercase tracking-wider">
                          <th className="pb-3 pl-2 text-left">Topik</th>
                          <th className="pb-3 text-left">Status</th>
                          <th className="pb-3 text-left">Catatan Hambatan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {section.subTopics.map((sub) => (
                          <tr key={sub.id} className="group">
                            <td className="py-4 pr-4 font-medium text-slate-300">{sub.task}</td>
                            <td className="py-4 pr-4">
                              <select 
                                value={sub.status}
                                onChange={(e) => updateSubTopic(section.id, sub.id, 'status', e.target.value)}
                                className={`text-xs font-bold rounded-md px-2 py-1 outline-none appearance-none cursor-pointer
                                  ${sub.status === 'Done' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                    sub.status === 'Ongoing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                                    'bg-slate-700 text-slate-400'}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Done">Done</option>
                              </select>
                            </td>
                            <td className="py-4">
                              <textarea 
                                value={sub.notes}
                                onChange={(e) => updateSubTopic(section.id, sub.id, 'notes', e.target.value)}
                                placeholder="Klik untuk mencatat progress..."
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all h-10 group-hover:h-20"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>


          
        <footer className="mt-12 text-center text-slate-500 pb-10">
          <p className="text-sm">let's be better.</p>
        </footer>
      </div>
    </div>
  );
}