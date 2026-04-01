/**
 * ANDALUSIA MARINE - V5.5 (Interactive Icons)
 * ALL ICONS ARE NOW DIRECT LINKS FOR MAXIMUM ACCESSIBILITY
 */

"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Anchor, Settings, Layout, Phone, Facebook, Sun, Moon, Mail, Send as SendIcon, CheckCircle, Shield, Zap, Wrench, ArrowRight as LucideArrowRight, Ship, Compass, Loader2, MessageCircle, X } from 'lucide-react'

export default function Home() {
   const [lang, setLang] = useState('ar')
   const [filter, setFilter] = useState('ships')
   const [isDark, setIsDark] = useState(false)
   const [items, setItems] = useState<any[]>([])
   const [loading, setLoading] = useState(true)
   const [selectedItem, setSelectedItem] = useState<any>(null)
   const didFetchRef = useRef(false)

   const t = (en: string, ar: string) => (lang === 'en' ? en : ar)
   const isRemoteSrc = (src: string) => /^https?:\/\//i.test(src)

   useEffect(() => {
      // Prevent double-fetch in React Strict Mode (dev only) which can skew Lighthouse/TBT during local audits.
      if (didFetchRef.current) return
      didFetchRef.current = true
      setLoading(true)
      fetch('/api/projects')
         .then(res => res.json())
         .then(data => {
            if (!data.error) setItems(data)
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
         <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all shadow-lg shadow-slate-950/5">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
               <div
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center gap-2 md:gap-4 cursor-pointer hover:opacity-80 transition-all flex-shrink-0">
                  <Image
                     src="/images/logo.png"
                     alt="Logo"
                     width={64}
                     height={64}
                     priority
                     className="h-8 sm:h-10 md:h-14 lg:h-16 w-auto"
                  />
                  <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter text-slate-950 dark:text-white whitespace-nowrap">Andalusia Marine</h1>
               </div>

               <div className="flex items-center gap-3 md:gap-8 lg:gap-12">
                  <div className="hidden lg:flex gap-8 font-black uppercase text-[11px] lg:text-[12px] tracking-widest text-slate-800 dark:text-slate-200">
                     <a href="#services" className="hover:text-amber-600 transition-colors uppercase whitespace-nowrap">{t('Services', 'خدماتنا')}</a>
                     <a href="#portfolio" className="hover:text-amber-600 transition-colors uppercase whitespace-nowrap">{t('Portfolio', 'المعرض')}</a>
                     <a href="#why-us" className="hover:text-amber-600 transition-colors uppercase whitespace-nowrap">{t('Why Us', 'لماذا نحن')}</a>
                     <a href="#location" className="hover:text-amber-600 transition-colors uppercase whitespace-nowrap">{t('Location', 'موقعنا')}</a>
                     <a href="#contact" className="hover:text-amber-600 transition-colors uppercase whitespace-nowrap">{t('Contact', 'تواصل')}</a>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 p-1">
                        <button aria-label="Arabic Language" onClick={() => setLang('ar')} className={`px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest transition-all ${lang === 'ar' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>AR</button>
                        <button aria-label="English Language" onClick={() => setLang('en')} className={`px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest transition-all ${lang === 'en' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>EN</button>
                     </div>
                     <button aria-label="Toggle Dark Mode" onClick={() => setIsDark(!isDark)} className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-950 dark:text-white">
                        {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
                     </button>
                  </div>
               </div>
            </div>
         </nav>

         <main>
            {/* HERO SECTION */}
            <header className="relative h-screen flex items-center bg-slate-900 overflow-hidden pt-20">
               <div className="absolute inset-0 opacity-40">
                  <Image
                     src="/images/yacht-tourism-project.jpeg"
                     alt="Hero"
                     fill
                     priority
                     sizes="100vw"
                     className="object-cover"
                  />
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

            {/* SERVICES */}
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
                        <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed italic">{t('Advanced design and construction of fishing fleets and luxury yachts.', 'تصميم وبناء أساطيل الصيد واليخوت السياحية باستخدام تقنيات ومخططاتها هندسية متطورة.')}</p>
                     </div>
                     <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] text-left rtl:text-right group hover:bg-amber-600 hover:border-amber-600 transition-all shadow-sm">
                        <Wrench className="w-16 h-16 text-amber-600 group-hover:text-white mb-10 transition-colors" />
                        <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors italic">{t('Technical Consultation', 'الاستشارات الهندسية')}</h6>
                        <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed italic">{t('Field evaluation and engineering reports for marine systems.', 'تقييم ميداني وتقارير هندسية للأنظمة البحرية ودمج المحركات والأنظمة للمشغلين البحريين.')}</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* PORTFOLIO */}
            <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
               <div className="max-w-7xl mx-auto px-6 text-center italic">
                  <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('TECHNICAL PORTFOLIO', 'معرض الأعمال')}</h4>
                  <h5 className="text-4xl md:text-7xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-16 italic">{t('Projects', 'مشاريعنا')}</h5>
                  <div className="flex flex-wrap justify-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-full max-w-fit mx-auto border border-slate-200 dark:border-slate-700 shadow-inner mb-24 transition-all">
                     {['ships', 'engines', 'propulsion', 'maintenance'].map((cat) => (
                        <button
                           key={cat}
                           onClick={() => setFilter(cat)}
                           className={`px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-amber-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-amber-600'}`}>
                           {t(cat.toUpperCase(), cat === 'ships' ? 'السفن' : cat === 'engines' ? 'المحركات بحرية' : cat === 'propulsion' ? 'أنظمة الدفع و المخفضات' : 'الصيانة و قطع الغيار')}
                        </button>
                     ))}
                  </div>

                  {loading ? (
                     <div className="flex flex-col items-center justify-center py-24 gap-4 animate-pulse"><Loader2 className="w-12 h-12 text-amber-600 animate-spin" /><p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">{t('Loading Projects...', 'جارِ تحميل المشاريع...')}</p></div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all min-h-[600px]">
                        {items.filter(item => item.category === filter && !item.isHidden).map(item => (
                           <div key={item.id} onClick={() => setSelectedItem(item)} className="group relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl bg-slate-200 border border-slate-100 dark:border-slate-800 transition-all cursor-pointer">
                              {item.media_type === 'video' ? (
                                 <video src={item.media_path} className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110" autoPlay muted loop playsInline preload="auto" />
                              ) : (
                                 isRemoteSrc(item.media_path) ? (
                                    <img
                                       src={item.media_path}
                                       alt={item.title_en}
                                       className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110"
                                       loading="lazy"
                                       decoding="async"
                                    />
                                 ) : (
                                    <Image
                                       src={item.media_path}
                                       alt={item.title_en}
                                       fill
                                       sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                       className="object-cover transition-all duration-[2s] group-hover:scale-110"
                                       loading="lazy"
                                    />
                                 )
                              )}
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

            {/* WHY US + CONTACT */}
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

            {/* LOCATION MAP */}
            <section id="location" className="py-24 bg-white dark:bg-slate-950 transition-colors italic">
               <div className="max-w-7xl mx-auto px-6 text-center italic">
                  <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('OUR BASE', 'مقرنا الميداني')}</h4>
                  <h5 className="text-4xl md:text-6xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-16 italic">{t('Visit Us', 'موقعنا')}</h5>
                  <div className="w-full h-[500px] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
                     <iframe
                        title="Andalusia Marine Location"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        loading="lazy"
                        src="https://maps.google.com/maps?q=31.386801,30.418779&z=15&output=embed"
                        className="w-full h-full border-0"
                     ></iframe>
                  </div>
                  <div className="mt-12 flex flex-col items-center gap-6">
                     <a
                        href="https://www.google.com/maps?q=31.386801,30.418779"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-amber-600/20 flex items-center gap-4 group mx-auto"
                     >
                        <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                        {t('Open in Google Maps', 'افتح في خرائط جوجل')}
                     </a>
                     <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-[9px] italic opacity-60">
                        {t('31°23\'12.5"N 30°25\'07.6"E • ROSSETTA, EGYPT', 'إحداثيات المقر: رشيد، مدينة البحيرة، مصر')}
                     </p>
                  </div>
               </div>
            </section>

            <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors italic">
               <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center italic">
                  <div className="text-left rtl:text-right italic">
                     <h6 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 mb-8 italic">{t('PARTNERSHIP', 'شراكة النجاح')}</h6>
                     <h5 className="text-5xl md:text-[6rem] font-black text-slate-950 dark:text-white leading-[0.85] tracking-tighter uppercase mb-16 italic">{t('START YOUR\nJOURNEY', 'ابدأ\nرحلتك')}</h5>
                     <div className="space-y-8 italic">

                        {/* EMAIL */}
                        <div className="flex items-start gap-8 group">
                           <a aria-label="Send us an email" href="mailto:aymanarafa@andalusiaamarine.com" className="w-16 h-16 bg-amber-600 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 hover:bg-amber-500"><Mail className="w-7 h-7" /></a>
                           <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('EMAIL US', 'راسلنا مباشرة')}</p><a href="mailto:aymanarafa@andalusiaamarine.com" className="text-sm md:text-xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all font-sans italic break-all">aymanarafa@andalusiaamarine.com</a></div>
                        </div>

                        {/* PHONE + WHATSAPP HUB */}
                        <div className="flex items-start gap-8 group">
                           <div className="flex flex-wrap gap-3">
                              <a aria-label="Call us by phone" href="tel:+201030067465" className="w-16 h-16 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 hover:bg-slate-800 dark:hover:bg-slate-100"><Phone className="w-7 h-7" /></a>
                              <a aria-label="Message us on WhatsApp" href="https://wa.me/201030067465" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-green-500 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform hover:scale-110 animate-pulse"><MessageCircle className="w-8 h-8" /></a>
                           </div>
                           <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('CALL OR WHATSAPP', 'اتصل أو وتساب')}</p><a href="tel:+201030067465" className="text-3xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all font-sans tracking-tighter italic">{t('+20 10 3006 7465', '01030067465')}</a><p className="text-[9px] font-black uppercase text-green-500 mt-2 tracking-widest">{t('CLICK ICON FOR DIRECT CHAT', 'اضغط على الأيقونات للتواصل المباشر')}</p></div>
                        </div>

                        {/* FACEBOOK 1 */}
                        <div className="flex items-start gap-8 group">
                           <a aria-label="Visit our Facebook profile" href="https://www.facebook.com/share/1CdRAdMNcb/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 hover:bg-blue-500"><Facebook className="w-7 h-7" /></a>
                           <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('FOLLOW US', 'تابعنا على فيسبوك')}</p><a href="https://www.facebook.com/share/1CdRAdMNcb/" target="_blank" rel="noopener noreferrer" className="text-xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all uppercase italic">Ayman Hassan</a></div>
                        </div>

                        {/* FACEBOOK 2 */}
                        <div className="flex items-start gap-8 group">
                           <a aria-label="Visit our Facebook page" href="https://www.facebook.com/elwaleed.company" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-blue-700 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 hover:bg-blue-600"><Facebook className="w-7 h-7" /></a>
                           <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('FACEBOOK PAGE', 'صفحة فيسبوك البديلة')}</p><a href="https://www.facebook.com/elwaleed.company" target="_blank" rel="noopener noreferrer" className="text-xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all uppercase italic">Andalusia Marine Page</a></div>
                        </div>

                        {/* TIKTOK */}
                        <div className="flex items-start gap-8 group">
                           <a aria-label="Follow us on TikTok" href="https://www.tiktok.com/@aymanhassan3391?_r=1&_t=ZS-952SjedJ1fB" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-black text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 hover:bg-slate-900 text-white">
                              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.32-.23 6.64-.32 9.96-.06 1.4-.38 2.85-1.16 4.04-1.12 1.72-3.13 2.72-5.18 2.91-2.15.22-4.47-.46-5.94-2.13-1.47-1.63-1.93-4.1-1.25-6.12.59-1.5 1.83-2.73 3.33-3.32 1.1-.47 2.33-.53 3.51-.31-.11 1.48-.22 2.95-.33 4.43-.8-.24-1.74-.23-2.48.33-.86.6-1.14 1.71-.85 2.67.24.96 1.15 1.72 2.15 1.72 1.05-.03 2.05-.8 2.37-1.8.31-1.01.27-2.08.27-3.13l.03-14.04z" /></svg>
                           </a>
                           <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('TIKTOK', 'تيك توك')}</p><a href="https://www.tiktok.com/@aymanhassan3391?_r=1&_t=ZS-952SjedJ1fB" target="_blank" rel="noopener noreferrer" className="text-xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all italic tracking-tight font-sans">aymanhassan3391</a></div>
                        </div>

                     </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-700 italic">
                     <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const name = formData.get('contact_name');
                        const email = formData.get('contact_email');
                        const details = formData.get('contact_details');
                        
                        const subject = encodeURIComponent(`New Inquiry from ${name}`);
                        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${details}`);
                        window.location.href = `mailto:aymanarafa@andalusiaamarine.com?subject=${subject}&body=${body}`;
                     }} className="space-y-8 italic">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left rtl:text-right italic">
                           <div className="space-y-2"><label htmlFor="contact_name" className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('NAME', 'الاسم')}</label><input id="contact_name" name="contact_name" required className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all font-bold dark:text-white italic" /></div>
                           <div className="space-y-2"><label htmlFor="contact_email" className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('EMAIL', 'الإيميل')}</label><input id="contact_email" name="contact_email" type="email" required className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all font-bold dark:text-white italic" /></div>
                        </div>
                        <div className="space-y-2 text-left rtl:text-right italic">
                           <label htmlFor="contact_details" className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('DETAILS', 'التفاصيل')}</label>
                           <textarea id="contact_details" name="contact_details" required rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all resize-none font-bold dark:text-white italic"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white py-8 rounded-[3rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl shadow-amber-600/30 flex items-center justify-center gap-4 italic">{t('SEND REQUEST', 'إرسال الطلب')} <LucideArrowRight className="w-5 h-5" /></button>
                     </form>
                  </div>
               </div>
            </section>
         </main>

         <footer className="py-16 bg-white dark:bg-slate-950 text-center border-t border-slate-200 dark:border-slate-900 opacity-60 italic">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">© 2026 ANDALUSIA MARINE – EXCELLENCE AT SEA.</p>
         </footer>
         {selectedItem && (
            <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500">
               <button onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }} className="absolute top-10 right-10 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white z-[110]"><X className="w-8 h-8" /></button>
               <div className="relative w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
                  {selectedItem.media_type === 'video' ? (
                     <video src={selectedItem.media_path} className="w-full h-full object-contain bg-black" autoPlay controls muted playsInline />
                  ) : (
                     isRemoteSrc(selectedItem.media_path) ? (
                        <img
                           src={selectedItem.media_path}
                           alt={selectedItem.title_en}
                           className="w-full h-full object-contain bg-black"
                           loading="lazy"
                           decoding="async"
                        />
                     ) : (
                        <Image
                           src={selectedItem.media_path}
                           alt={selectedItem.title_en}
                           fill
                           sizes="(min-width: 1280px) 1152px, 100vw"
                           className="object-contain bg-black"
                        />
                     )
                  )}
               </div>
            </div>
         )}
      </div>
   )
}
