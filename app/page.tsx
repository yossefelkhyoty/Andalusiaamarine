/**
 * ANDALUSIA MARINE - V5.2 (Clean UI Version)
 * REMOVED 'ALL' FILTER + SHIPS AS DEFAULT
 */

"use client"
import React, { useState, useEffect } from 'react'
import { Anchor, Settings, Layout, Phone, Facebook, Sun, Moon, Mail, Send as SendIcon, CheckCircle, Shield, Zap, Wrench, ArrowRight as LucideArrowRight, Ship, Compass, Loader2 } from 'lucide-react'

export default function Home() {
  const [lang, setLang] = useState('ar')
  const [filter, setFilter] = useState('ships') // Back to 'ships' as default
  const [isDark, setIsDark] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const t = (en: string, ar: string) => (lang === 'en' ? en : ar)

  // FETCH LIVE DATA FROM VERCEL POSTGRES
  useEffect(() => {
    setLoading(true)
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
            setItems(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('DB Sync Offline')
        setLoading(false)
      })
  }, [])

  return (
    <div className={`${isDark ? 'dark bg-slate-950' : 'bg-white'} min-h-screen transition-colors duration-500 overflow-x-hidden italic`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-all">
            <img src="/images/logo.png" className="h-10 md:h-14" alt="Logo" />
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-slate-950 dark:text-white">Andalusia Marine</h1>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-10 font-bold uppercase text-sm tracking-widest text-slate-800 dark:text-slate-200">
                <a href="#services" className="hover:text-amber-600 transition-colors uppercase">{t('Services', 'خدماتنا')}</a>
                <a href="#portfolio" className="hover:text-amber-600 transition-colors uppercase">{t('Portfolio', 'المعرض')}</a>
                <a href="#why-us" className="hover:text-amber-600 transition-colors uppercase">{t('Why Us', 'لماذا نحن')}</a>
                <a href="#contact" className="hover:text-amber-600 transition-colors uppercase">{t('Contact', 'تواصل')}</a>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-sm font-black border border-slate-200 dark:border-slate-700 hover:border-amber-600 transition-all dark:text-white">{lang.toUpperCase()}</button>
               <button onClick={() => setIsDark(!isDark)} className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-950 dark:text-white">
                  {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-screen flex items-center bg-slate-900 overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-40">
           <img src="/images/yacht-tourism-project.jpeg" className="w-full h-full object-cover" alt="Hero" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-left rtl:text-right">
           <div className="max-w-4xl">
              <h2 className="text-amber-500 font-bold tracking-[0.5em] uppercase text-xs mb-8 italic">{t('EXCELLENCE', 'التميز في أعماق البحار')}</h2>
              <h3 className="text-5xl md:text-[6.5rem] font-black text-white leading-[0.85] tracking-tighter uppercase mb-12 italic">
                 ANDALUSIA <br /> <span className="text-amber-500">MARINE</span>
              </h3>
              <p className="text-xl md:text-2xl text-slate-300 font-light max-w-xl mb-12 leading-relaxed opacity-90 italic">
                 {t('Integrated Marine Solutions: Trading • Maintenance • Shipbuilding', 'حلول متكاملة للمعدات البحرية وبناء السفن: بيع – صيانة – تصنيع بأعلى معايير الجودة')}
              </p>
              <div className="flex flex-wrap gap-5">
                 <a href="#services" className="bg-white text-slate-950 hover:bg-amber-600 hover:text-white px-12 py-6 font-black uppercase text-[11px] tracking-widest transition-all italic">{t('Services', 'خدماتنا')}</a>
                 <a href="#portfolio" className="border-2 border-white/20 text-white px-12 py-6 font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all italic">{t('Portfolio', 'المعرض')}</a>
              </div>
           </div>
        </div>
      </header>

      {/* SECTION 1: SERVICES */}
      <section id="services" className="py-24 bg-white dark:bg-slate-950 transition-colors">
         <div className="max-w-7xl mx-auto px-6 text-center italic">
            <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('CORE SOLUTIONS', 'ماذا نقدم')}</h4>
            <h5 className="text-4xl md:text-6xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-20 italic">{t('Services', 'خدماتنا المتميزة')}</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] text-left rtl:text-right group hover:bg-amber-600 hover:border-amber-600 transition-all shadow-sm">
                  <Settings className="w-16 h-16 text-amber-600 group-hover:text-white mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors italic">{t('Marine Maintenance', 'صيانة المحركات والأنظمة')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed italic">{t('Total overhauls and technical repairs with real field reliability.', 'عمرات كاملة وإصلاحات تقنية لجميع أنواع المحركات (Caterpillar, Cummins, etc.) باعتمادية ميدانية حقيقية.')}</p>
               </div>
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] text-left rtl:text-right group hover:bg-slate-950 hover:border-slate-950 transition-all shadow-sm">
                  <Anchor className="w-16 h-16 text-amber-600 mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors italic">{t('Equipment Trading', 'تجارة المعدات البحرية')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed italic">{t('Supplying engines, gearboxes, and propulsion systems from global brands.', 'توريد المحركات، الجيربوكس، وأنظمة الدفع من أفضل الماركات العالمية مع شهادات فحص فنية.')}</p>
               </div>
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] text-left rtl:text-right group hover:bg-slate-950 hover:border-slate-950 transition-all shadow-sm">
                  <Ship className="w-16 h-16 text-amber-600 mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors italic">{t('Naval Architecture', 'بناء وتصميم السفن')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed italic">{t('Advanced design and construction of fishing fleets and luxury yachts.', 'تصميم وبناء أساطيل الصيد واليخوت السياحية باستخدام تقنيات ومخططات هندسية متطورة.')}</p>
               </div>
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] text-left rtl:text-right group hover:bg-amber-600 hover:border-amber-600 transition-all shadow-sm">
                  <Wrench className="w-16 h-16 text-amber-600 group-hover:text-white mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors italic">{t('Technical Consultation', 'الاستشارات الهندسية')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed italic">{t('Field evaluation and engineering reports for marine systems.', 'تقييم ميداني وتقارير هندسية للأنظمة البحرية ودمج المحركات والأنظمة للمشغلين البحريين.')}</p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 2: PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
         <div className="max-w-7xl mx-auto px-6 text-center italic">
            <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('TECHNICAL PORTFOLIO', 'معرض الأعمال')}</h4>
            <h5 className="text-4xl md:text-7xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-16 italic">{t('Projects', 'مشاريعنا')}</h5>
            
            <div className="flex flex-wrap justify-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-full max-w-fit mx-auto border border-slate-200 dark:border-slate-700 shadow-inner mb-24 transition-all">
               {['ships', 'engines', 'propulsion', 'maintenance'].map((cat) => (
                 <button 
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-amber-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-amber-600'}`}>
                   {t(cat.toUpperCase(), cat === 'ships' ? 'السفن' : cat === 'engines' ? 'المحركات بحرية' : cat === 'propulsion' ? 'أنظمة الدفع و المخفضات' : 'الصيانة و قطع الغيار')}
                 </button>
               ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 animate-pulse">
                    <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{t('Loading Projects...', 'جارِ تحميل المشاريع...')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all">
                   {items.filter(item => item.category === filter && !item.isHidden).map(item => (
                     <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl bg-slate-200 border border-slate-100 dark:border-slate-800 transition-all">
                        <img src={item.media_path} className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110" alt={item.title_en} />
                        <div className="absolute inset-0 bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12 text-left rtl:text-right transform translate-y-8 group-hover:translate-y-0">
                           <span className="text-amber-600 font-black text-xs uppercase tracking-[0.3em] mb-4">{t(item.orange_label_en, item.orange_label_ar)}</span>
                           <h6 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight mb-4 tracking-tight">{t(item.title_en, item.title_ar)}</h6>
                           <p className="text-slate-400 font-bold text-sm tracking-wide opacity-80">{t(item.desc_en, item.desc_ar)}</p>
                        </div>
                     </div>
                   ))}
                </div>
            )}
         </div>
      </section>

      {/* WHY US + CONTACT sections maintained... */}
      <section id="why-us" className="py-24 bg-white dark:bg-slate-950 transition-colors italic">
         <div className="max-w-7xl mx-auto px-6 text-center italic">
            <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('STANDARDS', 'معايير الأندلس')}</h4>
            <h5 className="text-4xl md:text-6xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-24 italic">{t('Why Us', 'لماذا نحن')}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><Shield className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('Naval Expertise', 'هندسة بخبرة')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">{t('A specialized team with extensive experience in marine systems.', 'فريقنا يضم مهندسين متخصصين بخبرة واسعة في صيانة وتصميم الأنظمة البحرية.')}</p>
               </div>
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><Layout className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('One-Stop Hub', 'كل ما تحتاجه')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">{t('Supplying engines, gearboxes, and building specialized vessels.', 'نقدم خدمات متكاملة تشمل الصيانة، البيع والشراء، وبناء السفن لتوفير حلول شاملة.')}</p>
               </div>
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><Zap className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('Supply Speed', 'سرعة التوريد')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">{t('Providing high-quality marine equipment (new/used) with full support.', 'نوفر معدات بحرية عالية الجودة وقطع غيار أصلية مع ضمانات استمرارية الدعم الفني.')}</p>
               </div>
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><CheckCircle className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('Field Partners', 'شركاء النجاح')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic">{t('We understand the challenges and work on-site in dry docks.', 'نفهم تحديات البحر ونعمل مباشرة على السفن في الأحواض الجافة لضمان الكفاءة.')}</p>
               </div>
            </div>
         </div>
      </section>

      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors italic">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center italic">
            <div className="text-left rtl:text-right italic">
               <h6 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 mb-8 italic">{t('PARTNERSHIP', 'شراكة النجاح')}</h6>
               <h5 className="text-5xl md:text-[6rem] font-black text-slate-950 dark:text-white leading-[0.85] tracking-tighter uppercase mb-16 italic">{t('START YOUR\nJOURNEY', 'ابدأ\nرحلتك')}</h5>
               <div className="space-y-12 italic">
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 bg-amber-600 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110"><Mail className="w-7 h-7" /></div>
                     <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('EMAIL US', 'راسلنا مباشرة')}</p><a href="mailto:aymanarfa@andulisaamarina.com" className="text-base md:text-2xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all font-sans italic break-all">aymanarfa@andulisaamarina.com</a></div>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110"><Phone className="w-7 h-7" /></div>
                     <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('CALL US', 'اتصل بينا')}</p><a href="tel:+201030067465" className="text-3xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all font-sans tracking-tight italic">{t('+20 10 3006 7465', '01030067465')}</a></div>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110"><Facebook className="w-7 h-7" /></div>
                     <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('FOLLOW US', 'تابعنا على فيسبوك')}</p><a href="https://www.facebook.com/AndalusiaMarine" target="_blank" className="text-2xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all uppercase italic">{t('Andalusia Marine', 'الأندلس مارين')}</a></div>
                  </div>
               </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-700 italic">
               <form className="space-y-8 italic">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left rtl:text-right italic">
                     <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('NAME', 'الاسم')}</label><input className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all font-bold dark:text-white italic" /></div>
                     <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('EMAIL', 'الإيميل')}</label><input className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all font-bold dark:text-white italic" /></div>
                  </div>
                  <div className="space-y-2 text-left rtl:text-right italic">
                     <label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('DETAILS', 'التفاصيل')}</label>
                     <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all resize-none font-bold dark:text-white italic"></textarea>
                  </div>
                  <button className="w-full bg-amber-600 hover:bg-amber-500 text-white py-8 rounded-[3rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl shadow-amber-600/30 flex items-center justify-center gap-4 italic">{t('SEND REQUEST', 'إرسال الطلب')} <LucideArrowRight className="w-5 h-5" /></button>
               </form>
            </div>
         </div>
      </section>

      <footer className="py-16 bg-white dark:bg-slate-950 text-center border-t border-slate-200 dark:border-slate-900 opacity-60 italic">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">© 2026 ANDALUSIA MARINE – EXCELLENCE AT SEA.</p>
      </footer>
    </div>
  )
}
