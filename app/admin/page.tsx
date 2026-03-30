/**
 * ANDALUSIA MARINE - ADMIN LIVE V12.0 (MOBILE RESPONSIVE)
 * FULL MOBILE SUPPORT + SIDEBAR TOGGLE + OPTIMIZED LAYOUT
 */

"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Layout, Upload, Trash2, LogOut, ChevronLeft, Plus, Edit3, Settings, Save, X, Eye, EyeOff, Lock, Anchor, Image as ImageIcon, Search, Film, Loader2, MoreVertical, KeyRound } from 'lucide-react'

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

   // 🛡 MOBILE UI STATES
   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
   const [showSettings, setShowSettings] = useState(false)
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [adminPassword, setAdminPassword] = useState('andalusia2026')

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
      // Load password from DB
      fetch('/api/settings?key=admin_password')
         .then(r => r.json())
         .then(d => { if (d.value) setAdminPassword(d.value) })
         .catch(() => {})
   }, [])

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      if (password === adminPassword) {
         setIsLoggedIn(true)
         if (rememberMe) localStorage.setItem('andalusia_admin_active', 'true')
      } else alert('Access Key Invalid!')
   }

   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Pre-check size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
         alert('File too large! Max is 50MB for free plan.')
         return
      }

      setIsSyncing(true)
      try {
         const { supabase } = await import('../../lib/supabase')
         const fileName = `${Date.now()}-${file.name}`
         const { data, error } = await supabase.storage
            .from('projects')
            .upload(fileName, file, { cacheControl: '3600', upsert: false })

         if (error) throw error

         const { data: { publicUrl } } = supabase.storage
            .from('projects')
            .getPublicUrl(fileName)

         if (publicUrl) {
            const type = file.type.startsWith('video') ? 'video' : 'image'
            setEditForm({ ...editForm, media_path: publicUrl, media_type: type })
         }
      } catch (err: any) {
         alert('Cloud Sync Failed: ' + (err.message || 'Check Supabase Keys'))
         console.error(err)
      } finally {
         setIsSyncing(false)
      }
   }

   const deleteProject = async (id: number) => {
      if (!confirm('Proceed to Permanently Wipe this Record?')) return
      setIsSyncing(true)
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      if (res.ok) fetchItems()
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
         alert('DB Sync Failed: ' + (err.details || err.error))
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
            <div className="w-full max-w-md bg-slate-900 p-8 md:p-12 rounded-[3.5rem] border border-slate-800 shadow-2xl transition-all">
               <div className="flex justify-center mb-8"><div className="p-5 bg-amber-600 rounded-full shadow-xl shadow-amber-600/30"><Lock className="w-8 h-8 text-white" /></div></div>
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
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans italic relative">

         {/* TOP BAR - all screen sizes */}
         <div className="flex items-center justify-between px-6 py-4 bg-slate-950 text-white fixed top-0 w-full z-[100] shadow-xl">
            <div className="flex items-center gap-3"><Anchor className="w-6 h-6 text-amber-600" /><span className="text-lg font-black tracking-tighter uppercase italic">ANDALUSIA</span></div>
            <div className="relative">
               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-xl transition-all flex flex-col gap-1.5 items-center justify-center w-10 h-10">
                  <span className="block w-5 h-0.5 bg-white rounded-full"></span>
                  <span className="block w-5 h-0.5 bg-white rounded-full"></span>
                  <span className="block w-5 h-0.5 bg-white rounded-full"></span>
               </button>
               {isSidebarOpen && (
                  <div className="absolute top-14 right-0 w-64 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-4 duration-200">
                     <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsSidebarOpen(false); }} className="w-full flex items-center gap-4 px-6 py-4 text-white hover:bg-amber-600 transition-all text-[11px] font-black uppercase tracking-widest">
                        <Layout className="w-4 h-4" /> Global Database
                     </button>
                     <div className="border-t border-slate-800">
                        <button onClick={() => { setShowSettings(true); setIsSidebarOpen(false); }} className="w-full flex items-center gap-4 px-6 py-4 text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-all text-[11px] font-black uppercase tracking-widest">
                           <KeyRound className="w-4 h-4" /> Change Password
                        </button>
                     </div>
                     <div className="border-t border-slate-800">
                        <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem('andalusia_admin_active'); setIsSidebarOpen(false); }} className="w-full flex items-center gap-4 px-6 py-4 text-red-400 hover:bg-red-950 transition-all text-[11px] font-black uppercase tracking-widest">
                           <LogOut className="w-4 h-4" /> Exit Console
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
         {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[150]" />}


         <main className="flex-grow w-full p-6 md:p-12 lg:p-16 pt-20 italic transition-all overflow-x-hidden">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 italic"><div><h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-2">Maritime Inventory Hub</h3><h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950">System Console</h4></div><a href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 border-b border-slate-200 pb-1 italic transition-all">Go Live</a></header>

            {isSyncing && <div className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 bg-slate-950 text-white px-6 md:px-8 py-3 md:py-4 rounded-full z-[120] shadow-2xl border border-amber-600/30 flex items-center gap-4 animate-bounce"><Loader2 className="w-5 h-5 text-amber-500 animate-spin" /><span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Global Syncing...</span></div>}

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 lg:gap-16 italic">
               <div className="xl:col-span-3 space-y-12">
                  <section className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 italic">
                     <h5 className="text-xl md:text-2xl font-black uppercase flex items-center gap-4 text-slate-950 mb-10 md:mb-12 italic">{editingId ? <Edit3 className="w-8 h-8 text-amber-600" /> : <Plus className="w-8 h-8 text-amber-600" />}{editingId ? 'Modify System Record' : 'Inject New Data'}</h5>
                     <div className="space-y-8 md:space-y-12 italic">
                        <div className="relative">
                           <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                           <div onClick={() => !isSyncing && fileInputRef.current?.click()} className={`p-10 md:p-16 border-4 border-dashed border-slate-100 rounded-[3rem] text-center group hover:border-amber-400 hover:bg-amber-50/10 transition-all cursor-pointer bg-slate-50 relative overflow-hidden h-[250px] md:h-[300px] flex flex-col justify-center items-center italic ${isSyncing ? 'opacity-50' : ''}`}>
                              {editForm.media_path && <div className="absolute inset-0 transition-opacity">{editForm.media_type === 'video' ? <video src={editForm.media_path} className="w-full h-full object-cover opacity-60" autoPlay muted loop /> : <img src={editForm.media_path} className="w-full h-full object-cover opacity-60" alt="Preview" />}<div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]"></div></div>}
                              <div className="relative z-10 space-y-4 italic"><div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform">{editForm.media_type === 'video' ? <Film className="w-6 h-6 text-blue-600" /> : <Upload className="w-6 h-6 text-amber-600" />}</div><div><p className="text-[10px] font-black uppercase text-slate-950 tracking-widest italic">Upload Global Media</p><p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Direct Cloud Injection</p></div>{editForm.media_path && <span className="inline-block bg-green-500 text-white px-5 py-2 rounded-full text-[8px] font-black uppercase shadow-lg shadow-green-500/20 animate-pulse">Synced</span>}</div>
                           </div>
                        </div>
                        <div className="space-y-4 italic"><label className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full italic">1. Identity Markers (Mandatory)</label><div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 italic"><input value={editForm.title_en} onChange={(e) => setEditForm({ ...editForm, title_en: e.target.value })} className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 md:p-6 font-black outline-none focus:border-amber-600 shadow-sm transition-all italic text-sm" placeholder="Name (EN)" /><input dir="rtl" value={editForm.title_ar} onChange={(e) => setEditForm({ ...editForm, title_ar: e.target.value })} className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 md:p-6 font-black outline-none focus:border-amber-600 shadow-sm transition-all italic text-sm" placeholder="الاسم بالعربي" /></div></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-8 md:p-10 bg-slate-50 rounded-[3rem] border border-slate-100 italic transition-all">
                           <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="md:col-span-2 w-full bg-white border-none rounded-2xl p-6 outline-none font-black text-xs uppercase shadow-sm mb-2 transition-all focus:ring-1 focus:ring-amber-600"><option value="ships">السفن (Ships)</option><option value="engines">المحركات بحرية (Engines)</option><option value="propulsion">أنظمة الدفع و المخفضات (Propulsion)</option><option value="maintenance">الصيانة و قطع الغيار (Maintenance)</option></select>
                           <input value={editForm.orange_label_en} onChange={(e) => setEditForm({ ...editForm, orange_label_en: e.target.value })} className="bg-white border-none rounded-xl p-4 font-bold outline-none italic shadow-sm text-xs" placeholder="Marker (EN)" /><input dir="rtl" value={editForm.orange_label_ar} onChange={(e) => setEditForm({ ...editForm, orange_label_ar: e.target.value })} className="bg-white border-none rounded-xl p-4 font-bold outline-none italic shadow-sm text-xs" placeholder="الماركة (عربي)" /><input value={editForm.desc_en} onChange={(e) => setEditForm({ ...editForm, desc_en: e.target.value })} className="bg-white border-none rounded-xl p-4 font-bold outline-none italic shadow-sm text-xs" placeholder="Metadata (EN)" /><input dir="rtl" value={editForm.desc_ar} onChange={(e) => setEditForm({ ...editForm, desc_ar: e.target.value })} className="bg-white border-none rounded-xl p-4 font-bold outline-none italic shadow-sm text-xs" placeholder="التفاصيل (عربي)" /><div className="md:col-span-2 space-y-2 italic"><label className="text-[8px] font-black uppercase text-slate-400 italic">Cloud Storage URL</label><input disabled value={editForm.media_path} className="w-full bg-white border-none rounded-xl p-4 font-bold outline-none shadow-sm italic opacity-60 text-xs truncate" placeholder="Waiting for Injection..." /></div>
                        </div>
                        <button disabled={isSyncing} onClick={saveToDb} className={`w-full bg-slate-950 hover:bg-slate-900 text-white py-6 md:py-8 rounded-[3rem] font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-4 italic ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}><Save className="w-6 h-6" /> PUSH TO LIVE DATABASE</button>
                     </div>
                  </section>
               </div>

               <div className="xl:col-span-2 space-y-6 md:space-y-8 italic">
                  <div className="bg-slate-950 p-8 md:p-10 rounded-[3.5rem] shadow-2xl border border-slate-800 space-y-6 md:space-y-8 italic"><h5 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-4 text-white italic"><ImageIcon className="w-4 h-4 text-amber-500" /> Active Master Sync</h5><div className="relative italic"><Search className="absolute left-6 top-6 w-5 h-5 text-slate-500 shadow-xl" /><input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Global Filter..." className="w-full bg-slate-900 border-none rounded-2xl p-6 pl-16 text-white outline-none focus:ring-1 focus:ring-amber-600 font-black italic shadow-inner" /></div></div>
                  <div className="space-y-4 md:space-y-5 overflow-y-auto max-h-[1000px] md:max-h-[1400px] pr-2 custom-scrollbar italic">
                     {items.filter(it => it.title_en?.toLowerCase().includes(search.toLowerCase()) || it.title_ar?.includes(search)).map(it => (
                        <div key={it.id} className={`flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-[2.5rem] md:rounded-[3rem] border transition-all group relative italic ${it.isHidden ? 'bg-slate-100 opacity-60 grayscale' : 'bg-white shadow-sm hover:border-amber-100 border-slate-100 hover:shadow-xl'}`}>
                           {it.media_type === 'video' ? <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600"><Film className="w-6 h-6 md:w-8 md:h-8" /></div> : <img src={it.media_path} className="w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] object-cover bg-slate-100 shadow-inner" />}
                           <div className="flex-grow overflow-hidden text-left rtl:text-right italic"><p className="font-black text-[11px] md:text-[12px] uppercase truncate text-slate-950 mb-1 italic">{it.title_en}</p><span className="text-amber-600 text-[8px] md:text-[8px] font-black uppercase tracking-tighter italic">{it.category}</span></div>
                           <div className="flex flex-col gap-2 italic">
                              <button onClick={() => toggleVisibility(it.id, it.isHidden)} className={`p-2 shadow-sm transition-all ${it.isHidden ? 'bg-amber-600 text-white rounded-lg' : 'bg-slate-50 text-slate-400 hover:text-amber-600 rounded-lg'}`}>{it.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                              <button onClick={() => { setEditingId(it.id); setEditForm(it); setIsSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="p-2 bg-slate-50 text-slate-400 hover:text-amber-600 rounded-lg transition-all shadow-sm"><Edit3 className="w-4 h-4" /></button>
                              <button onClick={() => deleteProject(it.id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </main>

         {/* PASSWORD CHANGE MODAL */}
         {showSettings && (
            <div className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6">
               <div className="w-full max-w-md bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-700 space-y-6">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-600 rounded-2xl"><KeyRound className="w-5 h-5 text-white" /></div>
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">Change Password</h3>
                     </div>
                     <button onClick={() => { setShowSettings(false); setNewPassword(''); setConfirmPassword(''); }} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">New Password</label>
                        <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-slate-800 rounded-2xl p-5 text-white font-bold outline-none focus:ring-2 focus:ring-amber-600 transition-all" autoFocus />
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Confirm Password</label>
                        <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-800 rounded-2xl p-5 text-white font-bold outline-none focus:ring-2 focus:ring-amber-600 transition-all" />
                     </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                     <button onClick={() => { setShowSettings(false); setNewPassword(''); setConfirmPassword(''); }} className="flex-1 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all">Cancel</button>
                     <button onClick={async () => {
                        if (!newPassword) return alert('Enter a new password!')
                        if (newPassword !== confirmPassword) return alert('Passwords do not match!')
                        try {
                           const res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'admin_password', value: newPassword }) })
                           if (!res.ok) throw new Error()
                           setAdminPassword(newPassword); setNewPassword(''); setConfirmPassword(''); setShowSettings(false);
                           alert('Password updated successfully!')
                        } catch { alert('Failed to save password!') }
                     }} className="flex-1 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-xl shadow-amber-600/20">Save Password</button>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
