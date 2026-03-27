/**
 * ANDALUSIA MARINE - ADMIN LIVE V11.1 (VERBOSE ERRORS)
 * HANDLES REAL ERROR MESSAGES FROM BLOB API
 */

"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Layout, Upload, Trash2, LogOut, ChevronLeft, Plus, Edit3, Settings, Save, X, Eye, EyeOff, Lock, Anchor, Image as ImageIcon, Search, Film, Loader2 } from 'lucide-react'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<any>({ category: 'ships', title_ar: '', title_en: '', orange_label_ar: '', orange_label_en: '', desc_ar: '', desc_en: '', media_path: '', media_type: 'image' })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchItems = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    if (!data.error) setItems(data)
  }

  useEffect(() => {
    const session = localStorage.getItem('andalusia_admin_active')
    if (session === 'true') setIsLoggedIn(true)
    fetchItems()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'andalusia2026') {
        setIsLoggedIn(true)
        if (rememberMe) localStorage.setItem('andalusia_admin_active', 'true')
    } else alert('Access Key Invalid!')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsSyncing(true)
    try {
        const res = await fetch(`/api/upload?filename=${file.name}`, {
          method: 'POST',
          body: file,
        })
        const blob = await res.json()
        
        if (blob.url) {
            const type = file.type.startsWith('video') ? 'video' : 'image'
            setEditForm({ ...editForm, media_path: blob.url, media_type: type })
        } else {
            // 🛡 DISPLAY REAL ERROR FROM SERVER
            console.error('SYSTEM_ERROR:', blob.details || blob.error)
            alert('Cloud Sync Failed: ' + (blob.details || blob.error || 'Unknown Vercel Error'))
        }
    } catch (err: any) {
        alert('Network Connection Broken - Check Admin Terminal')
    } finally {
        setIsSyncing(false)
    }
  }

  const deleteProject = async (id: number) => {
    if (!confirm('Proceed to Permanently Wipe this Record?')) return
    
    setIsSyncing(true)
    const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
        fetchItems()
    } else {
        alert('Delete Operation Aborted - System Error')
    }
    setIsSyncing(false)
  }

  const saveToDb = async () => {
    if (!editForm.title_ar || !editForm.title_en) return alert('Titles are Mandatory!')
    
    setIsSyncing(true)
    const method = editingId ? 'PUT' : 'POST'
    const payload = editingId ? { ...editForm, id: editingId } : editForm

    const res = await fetch('/api/projects', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        fetchItems()
        setEditingId(null)
        setEditForm({ category: 'ships', title_ar: '', title_en: '', orange_label_ar: '', orange_label_en: '', desc_ar: '', desc_en: '', media_path: '', media_type: 'image' })
    } else {
        const err = await res.json()
        alert('DB Sync Failed: ' + err.error)
    }
    setIsSyncing(false)
  }

  const toggleVisibility = async (id: number, currentStatus: boolean) => {
     await fetch('/api/projects', {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id, isHidden: !currentStatus })
     })
     fetchItems()
  }

  if (!isLoggedIn) {
     return (
       <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center italic">
          <div className="w-full max-w-md bg-slate-900 p-12 rounded-[4rem] border border-slate-800 shadow-2xl transition-all">
             <div className="flex justify-center mb-10"><div className="p-5 bg-amber-600 rounded-full shadow-xl shadow-amber-600/30"><Lock className="w-8 h-8 text-white" /></div></div>
             <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative"><input type={showPass ? "text" : "password"} placeholder="Enter Admin Key" className="w-full bg-slate-800 border-none rounded-2xl p-6 text-white outline-none focus:ring-2 focus:ring-amber-600 font-bold" value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors">{showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div>
                <div className="flex items-center gap-3 px-2"><input type="checkbox" id="rem" className="w-5 h-5 rounded bg-slate-800 text-amber-600 cursor-pointer" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /><label htmlFor="rem" className="text-[10px] font-black uppercase text-slate-400 tracking-widest cursor-pointer leading-none">Stay Signed In</label></div>
                <button className="w-full bg-amber-600 hover:bg-amber-500 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">Open Terminal</button>
             </form>
          </div>
       </div>
     )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans italic">
      <aside className="w-72 bg-slate-950 text-white p-10 flex flex-col fixed h-screen z-50 transition-all italic">
         <div className="flex items-center gap-3 mb-20 px-2 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><Anchor className="w-8 h-8 text-amber-600 group-hover:rotate-12 transition-all" /><h2 className="text-xl font-black uppercase tracking-tighter">ANDALUSIA</h2></div>
         <nav className="space-y-4 flex-grow italic"><button className="w-full flex items-center gap-5 p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all bg-amber-600 text-white shadow-xl italic"><Layout className="w-4 h-4" /> Global Database</button></nav>
         <button onClick={() => {setIsLoggedIn(false); localStorage.removeItem('andalusia_admin_active');}} className="flex items-center gap-5 p-5 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all mt-auto border-t border-slate-900 pt-10 italic"><LogOut className="w-4 h-4" /> Exit Console</button>
      </aside>

      <main className="flex-grow pl-[20rem] p-16 italic">
         <header className="flex justify-between items-center mb-16 italic"><div><h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-2">Maritime Inventory Hub</h3><h4 className="text-6xl font-black uppercase tracking-tighter text-slate-950">System Console</h4></div><a href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 border-b border-slate-200 pb-1 italic transition-all">Go Live</a></header>

         {isSyncing && <div className="fixed top-10 right-10 bg-slate-950 text-white px-8 py-4 rounded-full z-[100] shadow-2xl border border-amber-600/30 flex items-center gap-5 animate-bounce"><Loader2 className="w-5 h-5 text-amber-500 animate-spin" /><span className="text-[10px] font-black uppercase tracking-widest">Global Upload Syncing...</span></div>}

         <div className="grid grid-cols-1 xl:grid-cols-5 gap-16 italic">
            <div className="xl:col-span-3 space-y-12">
               <section className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100 italic transition-all">
                  <h5 className="text-2xl font-black uppercase flex items-center gap-4 text-slate-950 mb-12 italic transition-all">{editingId ? <Edit3 className="w-8 h-8 text-amber-600" /> : <Plus className="w-8 h-8 text-amber-600" />}{editingId ? 'Modify System Record' : 'Inject New Data'}</h5>
                  <div className="space-y-12 italic">
                     <div className="relative">
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                        <div onClick={() => !isSyncing && fileInputRef.current?.click()} className={`p-16 border-4 border-dashed border-slate-100 rounded-[3.5rem] text-center group hover:border-amber-400 hover:bg-amber-50/10 transition-all cursor-pointer bg-slate-50 relative overflow-hidden h-[300px] flex flex-col justify-center items-center italic ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {editForm.media_path && <div className="absolute inset-0 transition-opacity">{editForm.media_type === 'video' ? <video src={editForm.media_path} className="w-full h-full object-cover opacity-60 transition-all" autoPlay muted loop /> : <img src={editForm.media_path} className="w-full h-full object-cover opacity-60 transition-all" alt="Preview"/>}<div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]"></div></div>}
                            <div className="relative z-10 space-y-5 italic transition-all"><div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform">{editForm.media_type === 'video' ? <Film className="w-8 h-8 text-blue-600" /> : <Upload className="w-8 h-8 text-amber-600" />}</div><div className="space-y-2 italic"><p className="text-[12px] font-black uppercase text-slate-950 tracking-widest italic">Upload Global Media</p><p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Direct Cloud Injection</p></div>{editForm.media_path && <span className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase shadow-lg shadow-green-500/20 italic animate-pulse">Synced & Ready</span>}</div>
                        </div>
                     </div>
                     <div className="space-y-4 italic"><label className="text-[11px] font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full italic shadow-sm shadow-amber-600/10">1. Identity Markers (Mandatory)</label><div className="grid grid-cols-1 md:grid-cols-2 gap-6 italic"><input value={editForm.title_en} onChange={(e) => setEditForm({...editForm, title_en: e.target.value})} className="w-full bg-white border-2 border-slate-100 rounded-2xl p-6 font-black outline-none focus:border-amber-600 shadow-sm transition-all italic" placeholder="Name (EN)" /><input dir="rtl" value={editForm.title_ar} onChange={(e) => setEditForm({...editForm, title_ar: e.target.value})} className="w-full bg-white border-2 border-slate-100 rounded-2xl p-6 font-black outline-none focus:border-amber-600 shadow-sm transition-all italic" placeholder="الاسم بالعربي" /></div></div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 bg-slate-50 rounded-[3.5rem] border border-slate-100 italic transition-all">
                        <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})} className="md:col-span-2 w-full bg-white border-none rounded-2xl p-8 outline-none font-black text-xs uppercase shadow-sm mb-4 transition-all focus:ring-1 focus:ring-amber-600"><option value="ships">السفن (Ships)</option><option value="engines">المحركات بحرية (Engines)</option><option value="propulsion">أنظمة الدفع و المخفضات (Propulsion)</option><option value="maintenance">الصيانة و قطع الغيار (Maintenance)</option></select>
                        <input value={editForm.orange_label_en} onChange={(e) => setEditForm({...editForm, orange_label_en: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none italic shadow-sm" placeholder="Marker (EN)" /><input dir="rtl" value={editForm.orange_label_ar} onChange={(e) => setEditForm({...editForm, orange_label_ar: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none italic shadow-sm" placeholder="الماركة (عربي)" /><input value={editForm.desc_en} onChange={(e) => setEditForm({...editForm, desc_en: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none italic shadow-sm" placeholder="Metadata (EN)" /><input dir="rtl" value={editForm.desc_ar} onChange={(e) => setEditForm({...editForm, desc_ar: e.target.value})} className="bg-white border-none rounded-xl p-5 font-bold outline-none italic shadow-sm" placeholder="التفاصيل (عربي)" /><div className="md:col-span-2 space-y-2 italic"><label className="text-[9px] font-black uppercase text-slate-400 italic">Cloud Storage URL</label><input disabled value={editForm.media_path} className="w-full bg-white border-none rounded-xl p-4 font-bold outline-none shadow-sm italic opacity-60" placeholder="Waiting for Cloud Injection..." /></div>
                     </div>
                     <button disabled={isSyncing} onClick={saveToDb} className={`w-full bg-slate-950 hover:bg-slate-900 text-white py-8 rounded-[3rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-4 italic ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}><Save className="w-6 h-6" /> PUSH TO LIVE DATABASE</button>
                  </div>
               </section>
            </div>

            <div className="xl:col-span-2 space-y-8 italic">
               <div className="bg-slate-950 p-10 rounded-[4.5rem] shadow-2xl border border-slate-800 space-y-8 italic"><h5 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-4 text-white italic"><ImageIcon className="w-4 h-4 text-amber-500" /> Inventory Insights</h5><div className="relative italic"><Search className="absolute left-6 top-6 w-5 h-5 text-slate-500 shadow-xl" /><input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Global Filter..." className="w-full bg-slate-900 border-none rounded-2xl p-6 pl-16 text-white outline-none focus:ring-1 focus:ring-amber-600 font-black italic shadow-inner" /></div></div>
               <div className="space-y-5 overflow-y-auto max-h-[1400px] pr-4 custom-scrollbar italic">
                  {items.filter(it => it.title_en?.toLowerCase().includes(search.toLowerCase()) || it.title_ar?.includes(search)).map(it => (
                     <div key={it.id} className={`flex items-center gap-6 p-6 rounded-[3rem] border transition-all group relative italic ${it.isHidden ? 'bg-slate-100 opacity-60 grayscale' : 'bg-white shadow-sm hover:border-amber-100 border-slate-100 hover:shadow-xl'}`}>
                        {it.media_type === 'video' ? <div className="w-20 h-20 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600"><Film className="w-8 h-8" /></div> : <img src={it.media_path} className="w-20 h-20 rounded-[1.5rem] object-cover bg-slate-100 shadow-inner" />}
                        <div className="flex-grow overflow-hidden text-left rtl:text-right italic"><p className="font-black text-[12px] uppercase truncate text-slate-950 mb-1 italic">{it.title_en}</p><span className="text-amber-600 text-[8px] font-black uppercase tracking-tighter italic">{it.category}</span></div>
                        <div className="flex flex-col gap-2 italic">
                           <button onClick={() => toggleVisibility(it.id, it.isHidden)} className={`p-3 rounded-xl shadow-sm transition-all ${it.isHidden ? 'bg-amber-600 text-white' : 'bg-slate-50 text-slate-400 hover:text-amber-600'}`}>{it.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                           <button onClick={() => {setEditingId(it.id); setEditForm(it); window.scrollTo({top:0, behavior:'smooth'})}} className="p-3 bg-slate-50 text-slate-400 hover:text-amber-600 rounded-xl transition-all shadow-sm"><Edit3 className="w-4 h-4" /></button>
                           <button onClick={() => deleteProject(it.id)} className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
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
