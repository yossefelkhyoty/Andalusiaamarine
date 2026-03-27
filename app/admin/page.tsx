/**
 * ANDALUSIA MARINE - ADMIN PORTAL V9 (Complete Data & Persistently Enhanced)
 * FULL 23 ITEMS RESTORED + UNIFIED UPLOAD + SEARCH + PERSISTENCE
 */

"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Layout, Upload, Trash2, LogOut, ChevronLeft, Plus, Edit3, Settings, Save, X, Eye, EyeOff, Lock, Anchor, Image as ImageIcon, Search, Film } from 'lucide-react'

// RESTORE FULL 23-ITEM DATASET (NEVER TRUNCATED AGAIN)
const INITIAL_ITEMS = [
  // SHIPS
  { id: 1, category: 'ships', isHidden: false, orange_label_en: 'Shipbuilding', orange_label_ar: 'بناء سفن', title_en: 'Modern Fishing Vessel', title_ar: 'سفينة صيد حديثة', desc_en: 'Ocean-grade design', desc_ar: 'تصميم بمواصفات عالمية', media_path: '/images/fishing-vessel-modern.jpeg' },
  { id: 2, category: 'ships', isHidden: false, orange_label_en: 'Shipbuilding', orange_label_ar: 'بناء سفن', title_en: 'Heavy Fishing Ship', title_ar: 'سفينة صيد ثقيلة', desc_en: 'Oceanic fleet excellence', desc_ar: 'تميز في الأساطيل البحرية', media_path: '/images/الصيد سفينه.jpeg' },
  { id: 3, category: 'ships', isHidden: false, orange_label_en: 'Shipbuilding', orange_label_ar: 'بناء سفن', title_en: 'Project 01: Fishing Fleet', title_ar: 'مشروع ٠١: أسطول صيد', desc_en: 'Custom fleet construction', desc_ar: 'بناء أسطول مخصص', media_path: '/images/fishing-vessel-project-01.jpeg' },
  { id: 4, category: 'ships', isHidden: false, orange_label_en: 'Projects', orange_label_ar: 'مشاريع', title_en: "Luxury Yacht 'Arrow'", title_ar: "يخت فاخر 'Arrow'", desc_en: 'High-end naval architecture', desc_ar: 'هندسة معمارية بحرية راقية', media_path: '/images/هذا هو اليخت الفاخر Arrow،.jpeg' },
  { id: 5, category: 'ships', isHidden: false, orange_label_en: 'Projects', orange_label_ar: 'مشاريع', title_en: 'Safari Diving Yacht', title_ar: 'يخت غوص سفاري', desc_en: 'Specialized maritime design', desc_ar: 'تصميم بحري متخصص', media_path: '/images/هذا القارب هو يخت فاخر مصمم لرحلات الغوص والسفاري.jpeg' },
  
  // ENGINES (FULL 9 ITEMS)
  { id: 6, category: 'engines', isHidden: false, orange_label_en: 'Caterpillar 3412', orange_label_ar: 'كاتربيلر ٣٤١٢', title_en: 'Marine Diesel Engine', title_ar: 'محرك ديزل بحري', desc_en: 'Extreme Power', desc_ar: 'أداء عالي القوة', media_path: '/images/marine-engine-caterpillar-3412.jpeg' },
  { id: 7, category: 'engines', isHidden: false, orange_label_en: 'Caterpillar 3408', orange_label_ar: 'كاتربيلر ٣٤٠٨', title_en: 'Marine Diesel Engine', title_ar: 'محرك ديزل بحري', desc_en: 'High Operations Unit', desc_ar: 'وحدة عمليات فعالة', media_path: '/images/marine-engine-caterpillar-3408.jpeg' },
  { id: 8, category: 'engines', isHidden: false, orange_label_en: 'MTU SERIES', orange_label_ar: 'فئة MTU', title_en: 'High Speed Drive', title_ar: 'دفع عالي السرعة', desc_en: 'German Excellence', desc_ar: 'تميز ألماني', media_path: '/images/marine-engine-mtu.jpeg' },
  { id: 9, category: 'engines', isHidden: false, orange_label_en: 'DOOSAN L 126TIM', orange_label_ar: 'دوسان L 126TIM', title_en: 'Heavy Duty Power', title_ar: 'قوة للأعمال الشاقة', desc_en: 'Transport Engine', desc_ar: 'محرك نقل ثقيل', media_path: '/images/marine-engine-doosan-l126.jpeg' },
  { id: 10, category: 'engines', isHidden: false, orange_label_en: 'Detroit Diesel 8V92', orange_label_ar: 'ديترويت ديزل 8V92', title_en: 'Marine Power Module', title_ar: 'وحدة طاقة بحرية', desc_en: 'Reliable Torque', desc_ar: 'عزم دوران موثوق', media_path: '/images/marine-engine-detroit-8v92.jpeg' },
  { id: 11, category: 'engines', isHidden: false, orange_label_en: 'DEUTZ 6L913', orange_label_ar: 'ديوتز 6L913', title_en: 'Technical Marine Unit', title_ar: 'وحدة بحرية فنية', desc_en: 'Sustainable Engineering', desc_ar: 'هندسة مستدامة', media_path: '/images/marine-engine-deutz-6l913.jpeg' },
  { id: 12, category: 'engines', isHidden: false, orange_label_en: 'MAN D2866', orange_label_ar: 'مان D2866', title_en: 'Precision Marine Engine', title_ar: 'محرك بحري دقيق', desc_en: 'High Efficiency', desc_ar: 'كفاءة عالية', media_path: '/images/marine-engine-man-d2866.jpeg' },
  { id: 13, category: 'engines', isHidden: false, orange_label_en: 'Yanmar 6NHL', orange_label_ar: 'يانمار 6NHL', title_en: 'Reliable Marine Power', title_ar: 'طاقة بحرية موثوقة', desc_en: 'Compact Solutions', desc_ar: 'حلول مدمجة', media_path: '/images/marine-engine-yanmar-6nhl.jpeg' },
  { id: 14, category: 'engines', isHidden: false, orange_label_en: 'Volvo Penta DH10A', orange_label_ar: 'فولفو بنتا DH10A', title_en: 'Marine Power Platform', title_ar: 'منصة طاقة بحرية', desc_en: 'Technical Standards', desc_ar: 'معايير تقنية', media_path: '/images/marine-engine-volvo-dh10a.jpeg' },

  // PROPULSION
  { id: 15, category: 'propulsion', isHidden: false, orange_label_en: 'REINTJES WAF 264L', orange_label_ar: 'رينتجيس WAF 264L', title_en: 'Marine Gearbox', title_ar: 'جيربوكس بحري', desc_en: 'Technical Transmission', desc_ar: 'نظام نقل الحركة', media_path: '/images/marine-gearbox-reintjes-waf264l.jpeg' },
  { id: 16, category: 'propulsion', isHidden: false, orange_label_en: 'REINTJES WAF 440', orange_label_ar: 'رينتجيس WAF 440', title_en: 'Heavy Duty Gearbox', title_ar: 'جيربوكس للأعمال الشاقة', desc_en: 'Durable Solution', desc_ar: 'حل نقل طاقة متين', media_path: '/images/Reintjes WAF 440.jpg' },
  { id: 17, category: 'propulsion', isHidden: false, orange_label_en: 'Bronze Propeller', orange_label_ar: 'رفاص برونزي', title_en: 'Precision Casting', title_ar: 'صب دقيق', desc_en: 'High Performance', desc_ar: 'دفع عالي الأداء', media_path: '/images/boat-propeller-bronze.jpeg' },
  { id: 18, category: 'propulsion', isHidden: false, orange_label_en: 'Flexible Coupling', orange_label_ar: 'كوبلن مرن', title_en: 'Transmission System', title_ar: 'نظام نقل الحركة', desc_en: 'Vibration Control', desc_ar: 'التحكم في الاهتزاز', media_path: '/images/marine-flexible-coupling.jpeg' },
  { id: 19, category: 'propulsion', isHidden: false, orange_label_en: 'Marine Turbocharger', orange_label_ar: 'شاحن توربيني بحري', title_en: 'Charging System', title_ar: 'نظام شحن', desc_en: 'Engine Efficiency', desc_ar: 'كفاءة محرك معززة', media_path: '/images/و شاحن توربيني (Turbocharger).jpeg' },

  // MAINTENANCE
  { id: 20, category: 'maintenance', isHidden: false, orange_label_en: 'Rocker Arms', orange_label_ar: 'روافع الصمامات', title_en: 'Internal Gear System', title_ar: 'نظام تروس داخلي', desc_en: 'Engine Valve Control', desc_ar: 'تحكم في صمامات المحرك', media_path: '/images/Rocker Arms).jpeg' },
  { id: 21, category: 'maintenance', isHidden: false, orange_label_en: 'Marine Differential', orange_label_ar: 'ديفرنشال بحري', title_en: 'Power Distribution', title_ar: 'توزيع الطاقة', desc_en: 'Torque Transfer', desc_ar: 'نقل عزم موثوق', media_path: '/images/marine-maintenance-differential.jpeg' },
  { id: 22, category: 'maintenance', isHidden: false, orange_label_en: 'CAT Hydraulic Pump', orange_label_ar: 'مضخة هيدروليك CAT', title_en: 'Technical System', title_ar: 'نظام تقني', desc_en: 'Fluid Control', desc_ar: 'التحكم في السوائل', media_path: '/images/هذا المنتج عبارة عن مضخة هيدروليكية لحفارة Caterpillar. .jpeg' },
  { id: 23, category: 'maintenance', isHidden: false, orange_label_en: 'CAT / STAMFORD', orange_label_ar: 'كات / ستامفورد', title_en: 'Marine Generator Set', title_ar: 'مولد كهرباء بحري', desc_en: 'Primary Power Supply', desc_ar: 'مصدر طاقة أساسي', media_path: '/images/هذه الصورة تظهر مولدات ديزل صناعية، وتحديداً محركات من ماركة كاتربيلر (Caterpillar)، مقترنة بمولدات كهربائية من ماركة ستامفورد (Stamford). .jpeg' },
]

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [items, setItems] = useState<any[]>(INITIAL_ITEMS)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  
  const [editForm, setEditForm] = useState<any>({ 
    category: 'ships', 
    title_ar: '', 
    title_en: '', 
    orange_label_ar: '', 
    orange_label_en: '', 
    desc_ar: '', 
    desc_en: '', 
    media_path: '', 
    media_type: 'image' 
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // LOGOUT ON REFRESH PREVENTION
  useEffect(() => {
    const session = localStorage.getItem('andalusia_admin_active')
    if (session === 'true') setIsLoggedIn(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'andalusia2026') {
        setIsLoggedIn(true)
        if (rememberMe) localStorage.setItem('andalusia_admin_active', 'true')
    } else alert('Access Key Invalid!')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
        const previewUrl = URL.createObjectURL(file)
        const type = file.type.startsWith('video') ? 'video' : 'image'
        setEditForm({ ...editForm, media_path: previewUrl, media_type: type })
    }
  }

  const saveEdit = () => {
    if (!editForm.title_ar || !editForm.title_en) return alert('Titles are Mandatory!')
    if (editingId) setItems(items.map(it => it.id === editingId ? editForm : it))
    else setItems([{ ...editForm, id: Date.now(), isHidden: false }, ...items])
    setEditingId(null)
    setEditForm({ category: 'ships', title_ar: '', title_en: '', orange_label_ar: '', orange_label_en: '', desc_ar: '', desc_en: '', media_path: '', media_type: 'image' })
    alert('Project Record Sync Success!')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('andalusia_admin_active')
  }

  if (!isLoggedIn) {
     return (
       <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
          <div className="w-full max-w-md bg-slate-900 p-12 rounded-[4rem] border border-slate-800 shadow-2xl">
             <div className="flex justify-center mb-10"><div className="p-5 bg-amber-600 rounded-full shadow-xl shadow-amber-600/30"><Lock className="w-8 h-8 text-white" /></div></div>
             <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                    <input type={showPass ? "text" : "password"} placeholder="Enter Master Key" className="w-full bg-slate-800 border-none rounded-2xl p-6 text-white outline-none focus:ring-2 focus:ring-amber-600 font-bold" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors">{showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
                <div className="flex items-center gap-3 px-2">
                    <input type="checkbox" id="rem" className="w-5 h-5 rounded bg-slate-800 text-amber-600 cursor-pointer" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <label htmlFor="rem" className="text-[10px] font-black uppercase text-slate-400 tracking-widest cursor-pointer leading-none">Stay Logged In</label>
                </div>
                <button className="w-full bg-amber-600 hover:bg-amber-500 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">Sign In</button>
             </form>
          </div>
       </div>
     )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans italic">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-white p-10 flex flex-col fixed h-screen z-50">
         <div className="flex items-center gap-3 mb-20 px-2 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <Anchor className="w-8 h-8 text-amber-600 group-hover:rotate-12 transition-all" />
            <h2 className="text-xl font-black uppercase tracking-tighter">ANDALUSIA</h2>
         </div>
         <nav className="space-y-4 flex-grow">
            <button className="w-full flex items-center gap-5 p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all bg-amber-600 text-white shadow-xl italic"><Layout className="w-4 h-4" /> Global Inventory</button>
         </nav>
         <button onClick={handleLogout} className="flex items-center gap-5 p-5 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all mt-auto border-t border-slate-900 pt-10 italic"><LogOut className="w-4 h-4" /> Exit Portal</button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pl-[20rem] p-16">
         <header className="flex justify-between items-center mb-16 italic">
            <div><h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-2">Andalusia Maritime Command</h3><h4 className="text-6xl font-black uppercase tracking-tighter text-slate-950">Record Editor</h4></div>
         </header>

         <div className="grid grid-cols-1 xl:grid-cols-5 gap-16 italic">
            <div className="xl:col-span-3 space-y-12">
               {/* EDITOR FORM WITH UNIFIED FILE UPLOAD */}
               <section className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100 italic transition-all">
                  <h5 className="text-2xl font-black uppercase flex items-center gap-4 text-slate-950 mb-12">
                     {editingId ? <Edit3 className="w-8 h-8 text-amber-600" /> : <Plus className="w-8 h-8 text-amber-600" />}
                     {editingId ? 'Modify Data Record' : 'Unified Media Upload'}
                  </h5>
                  <div className="space-y-12">
                     <div className="relative">
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="p-16 border-4 border-dashed border-slate-100 rounded-[3.5rem] text-center group hover:border-amber-400 hover:bg-amber-50/10 transition-all cursor-pointer bg-slate-50 relative overflow-hidden h-[300px] flex flex-col justify-center items-center">
                            {editForm.media_path ? (
                                <div className="absolute inset-0">
                                   {editForm.media_type === 'video' ? (
                                       <video src={editForm.media_path} className="w-full h-full object-cover opacity-60" autoPlay muted loop />
                                   ) : (
                                       <img src={editForm.media_path} className="w-full h-full object-cover opacity-60" alt="Preview"/>
                                   )}
                                   <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]"></div>
                                </div>
                            ) : null}
                            <div className="relative z-10 space-y-5">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform">{editForm.media_type === 'video' ? <Film className="w-8 h-8 text-blue-600" /> : <Upload className="w-8 h-8 text-amber-600" />}</div>
                                <div className="space-y-2">
                                    <p className="text-[12px] font-black uppercase text-slate-950 tracking-widest">{t('UPLOAD PROJECT MEDIA', 'ارفع صورة أو فيديو المشروع هنا')}</p>
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">{t('SUPPORTS PHOTO OR VIDEO FILES', 'يدعم ملفات الصور والفيديوهات مباشرة')}</p>
                                </div>
                                {editForm.media_path && <span className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase">Media Selected</span>}
                            </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full italic">1. Title & Details (Mandatory)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input value={editForm.title_en} onChange={(e) => setEditForm({...editForm, title_en: e.target.value})} className="w-full bg-white border-2 border-slate-100 rounded-2xl p-6 font-black outline-none focus:border-amber-600 shadow-sm" placeholder="Title (EN)" /><input dir="rtl" value={editForm.title_ar} onChange={(e) => setEditForm({...editForm, title_ar: e.target.value})} className="w-full bg-white border-2 border-slate-100 rounded-2xl p-6 font-black outline-none focus:border-amber-600 shadow-sm" placeholder="العنوان بالعربي" /></div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 italic">
                        <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})} className="md:col-span-2 w-full bg-white border-none rounded-2xl p-8 outline-none font-black text-xs uppercase shadow-sm mb-4"><option value="ships">السفن (Ships)</option><option value="engines">المحركات بحرية (Engines)</option><option value="propulsion">أنظمة الدفع و المخفضات (Propulsion)</option><option value="maintenance">الصيانة و قطع الغيار (Maintenance)</option></select>
                        <input value={editForm.orange_label_en} onChange={(e) => setEditForm({...editForm, orange_label_en: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none shadow-sm" placeholder="Orange Tag (EN)" /><input dir="rtl" value={editForm.orange_label_ar} onChange={(e) => setEditForm({...editForm, orange_label_ar: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none shadow-sm" placeholder="العنوان العلوي (عربي)" /><input value={editForm.desc_en} onChange={(e) => setEditForm({...editForm, desc_en: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none shadow-sm" placeholder="Description (EN)" /><input dir="rtl" value={editForm.desc_ar} onChange={(e) => setEditForm({...editForm, desc_ar: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none shadow-sm" placeholder="الوصف (عربي)" />
                        <div className="md:col-span-2 space-y-2"><label className="text-[9px] font-black uppercase text-slate-400">Direct Media Path</label><input value={editForm.media_path} onChange={(e) => setEditForm({...editForm, media_path: e.target.value})} className="w-full bg-white border-none rounded-xl p-4 font-bold outline-none shadow-sm" placeholder="/images/your-image.jpg" /></div>
                     </div>
                     <button onClick={saveEdit} className="w-full bg-slate-950 hover:bg-slate-900 text-white py-8 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-4 italic"><Save className="w-6 h-6" /> COMMIT TO SYSTEM</button>
                  </div>
               </section>
            </div>

            <div className="xl:col-span-2 space-y-8">
               {/* SEARCH CENTER */}
               <div className="bg-slate-950 p-10 rounded-[4rem] shadow-2xl border border-slate-800 space-y-8">
                  <h5 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-4 text-white italic"><ImageIcon className="w-4 h-4 text-amber-500" /> Marine Inventory Control</h5>
                  <div className="relative"><Search className="absolute left-6 top-6 w-5 h-5 text-slate-500" /><input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Inventory..." className="w-full bg-slate-900 border-none rounded-2xl p-6 pl-16 text-white outline-none focus:ring-1 focus:ring-amber-600 font-black italic shadow-inner" /></div>
               </div>

               {/* LIST VIEW (FULL 23 ITEMS) */}
               <div className="space-y-5 overflow-y-auto max-h-[1400px] pr-4 custom-scrollbar">
                  {items.filter(it => it.title_en.toLowerCase().includes(search.toLowerCase()) || it.title_ar.includes(search)).map(it => (
                     <div key={it.id} className={`flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all group relative ${it.isHidden ? 'bg-slate-100 opacity-60 grayscale' : 'bg-white shadow-sm hover:shadow-2xl border-slate-100'}`}>
                        {it.media_type === 'video' ? <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600"><Film className="w-8 h-8" /></div> : <img src={it.media_path} className="w-20 h-20 rounded-[1.5rem] object-cover bg-slate-100 shadow-inner" />}
                        <div className="flex-grow overflow-hidden text-left rtl:text-right">
                           <p className="font-black text-[12px] uppercase truncate text-slate-950 mb-1 italic">{it.title_en}</p>
                           <span className="text-amber-600 text-[8px] font-black uppercase tracking-tighter italic">{it.category}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                           <button onClick={() => setItems(items.map(i => i.id === it.id ? { ...i, isHidden: !i.isHidden } : i))} className={`p-3 rounded-xl shadow-sm transition-all ${it.isHidden ? 'bg-amber-600 text-white' : 'bg-slate-50 text-slate-400 hover:text-amber-600'}`}>{it.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                           <button onClick={() => {setEditingId(it.id); setEditForm(it); window.scrollTo({top:0, behavior:'smooth'})}} className="p-3 bg-slate-50 text-slate-400 hover:text-amber-600 rounded-xl transition-all shadow-sm"><Edit3 className="w-4 h-4" /></button>
                           <button className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </main>
    </div>
  )
}

function t(en: string, ar: string) { return en }
