/**
 * ANDALUSIA MARINE - V4.3 (Next.js Node.js Version)
 * COMPLETE 23-ITEM RESTORED DATASET
 */

"use client"
import React, { useState } from 'react'
import { Anchor, Settings, Layout, Phone, Facebook, Sun, Moon, Mail, Send as SendIcon, CheckCircle, Shield, Zap, Wrench, ArrowRight as LucideArrowRight, Ship, Compass } from 'lucide-react'

// FULLY RESTORED 23-ITEM DATASET (PROTECTED)
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

export default function Home() {
  const [lang, setLang] = useState('ar')
  const [filter, setFilter] = useState('ships')
  const [isDark, setIsDark] = useState(false)

  const t = (en: string, ar: string) => (lang === 'en' ? en : ar)

  return (
    <div className={`${isDark ? 'dark bg-slate-950' : 'bg-white'} min-h-screen transition-colors duration-500 overflow-x-hidden italic`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-all">
            <img src="/images/logo.png" className="h-10 md:h-14" alt="Logo" />
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-slate-950 dark:text-white">Andalusia Marine</h1>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-10 font-bold uppercase text-[10px] tracking-widest text-slate-800 dark:text-slate-200">
                <a href="#services" className="hover:text-amber-600 transition-colors uppercase">{t('Services', 'خدماتنا')}</a>
                <a href="#portfolio" className="hover:text-amber-600 transition-colors uppercase">{t('Portfolio', 'المعرض')}</a>
                <a href="#why-us" className="hover:text-amber-600 transition-colors uppercase">{t('Why Us', 'لماذا نحن')}</a>
                <a href="#contact" className="hover:text-amber-600 transition-colors uppercase">{t('Contact', 'تواصل')}</a>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-[10px] font-black border border-slate-200 dark:border-slate-700 hover:border-amber-600 transition-all dark:text-white">{lang.toUpperCase()}</button>
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
              <h2 className="text-amber-500 font-bold tracking-[0.5em] uppercase text-xs mb-8">{t('EXCELLENCE', 'التميز في أعماق البحار')}</h2>
              <h3 className="text-5xl md:text-[6.5rem] font-black text-white leading-[0.85] tracking-tighter uppercase mb-12">
                 ANDALUSIA <br /> <span className="text-amber-500">MARINE</span>
              </h3>
              <p className="text-xl md:text-2xl text-slate-300 font-light max-w-xl mb-12 leading-relaxed opacity-90 italic">
                 {t('Integrated Marine Solutions: Trading • Maintenance • Shipbuilding', 'حلول متكاملة للمعدات البحرية وبناء السفن: بيع – صيانة – تصنيع بأعلى معايير الجودة')}
              </p>
              <div className="flex flex-wrap gap-5">
                 <a href="#services" className="bg-white text-slate-950 hover:bg-amber-600 hover:text-white px-12 py-6 font-black uppercase text-[11px] tracking-widest transition-all">{t('Services', 'خدماتنا')}</a>
                 <a href="#portfolio" className="border-2 border-white/20 text-white px-12 py-6 font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all">{t('Portfolio', 'المعرض')}</a>
              </div>
           </div>
        </div>
      </header>

      {/* SECTION 1: SERVICES */}
      <section id="services" className="py-24 bg-white dark:bg-slate-950 transition-colors">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('CORE SOLUTIONS', 'ماذا نقدم')}</h4>
            <h5 className="text-4xl md:text-6xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-20">{t('Services', 'خدماتنا المتميزة')}</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] text-left rtl:text-right group hover:bg-amber-600 hover:border-amber-600 transition-all shadow-sm">
                  <Settings className="w-16 h-16 text-amber-600 group-hover:text-white mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors">{t('Marine Maintenance', 'صيانة المحركات والأنظمة')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed">{t('Total overhauls and technical repairs with real field reliability.', 'عمرات كاملة وإصلاحات تقنية لجميع أنواع المحركات (Caterpillar, Cummins, etc.) باعتمادية ميدانية حقيقية.')}</p>
               </div>
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] text-left rtl:text-right group hover:bg-slate-950 hover:border-slate-950 transition-all shadow-sm">
                  <Anchor className="w-16 h-16 text-amber-600 mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors">{t('Equipment Trading', 'تجارة المعدات البحرية')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed">{t('Supplying engines, gearboxes, and propulsion systems from global brands.', 'توريد المحركات، الجيربوكس، وأنظمة الدفع من أفضل الماركات العالمية مع شهادات فحص فنية.')}</p>
               </div>
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] text-left rtl:text-right group hover:bg-slate-950 hover:border-slate-950 transition-all shadow-sm">
                  <Ship className="w-16 h-16 text-amber-600 mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors">{t('Naval Architecture', 'بناء وتصميم السفن')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed">{t('Advanced design and construction of fishing fleets and luxury yachts.', 'تصميم وبناء أساطيل الصيد واليخوت السياحية باستخدام تقنيات ومخططات هندسية متطورة.')}</p>
               </div>
               <div className="p-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] text-left rtl:text-right group hover:bg-amber-600 hover:border-amber-600 transition-all shadow-sm">
                  <Wrench className="w-16 h-16 text-amber-600 group-hover:text-white mb-10 transition-colors" />
                  <h6 className="text-3xl font-black mb-6 group-hover:text-white dark:text-white uppercase transition-colors">{t('Technical Consultation', 'الاستشارات الهندسية')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors text-lg leading-relaxed">{t('Field evaluation and engineering reports for marine systems.', 'تقييم ميداني وتقارير هندسية للأنظمة البحرية ودمج المحركات والأنظمة للمشغلين البحريين.')}</p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 2: PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('TECHNICAL PORTFOLIO', 'معرض الأعمال')}</h4>
            <h5 className="text-4xl md:text-7xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-16">{t('Projects', 'مشاريعنا')}</h5>
            
            <div className="flex flex-wrap justify-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-full max-w-fit mx-auto border border-slate-200 dark:border-slate-700 shadow-inner mb-24">
               {['ships', 'engines', 'propulsion', 'maintenance'].map((cat) => (
                 <button 
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-amber-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-amber-600'}`}>
                   {t(cat.toUpperCase(), cat === 'ships' ? 'السفن' : cat === 'engines' ? 'المحركات بحرية' : cat === 'propulsion' ? 'أنظمة الدفع و المخفضات' : 'الصيانة و قطع الغيار')}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {INITIAL_ITEMS.filter(item => item.category === filter && !item.isHidden).map(item => (
                 <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-[3.5rem] shadow-2xl bg-slate-200 border border-slate-100 dark:border-slate-800">
                    <img src={item.media_path} className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110" alt={item.title_en} />
                    <div className="absolute inset-0 bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12 text-left rtl:text-right transform translate-y-8 group-hover:translate-y-0">
                       <span className="text-amber-600 font-black text-xs uppercase tracking-[0.3em] mb-4">{t(item.orange_label_en, item.orange_label_ar)}</span>
                       <h6 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight mb-4 tracking-tight">{t(item.title_en, item.title_ar)}</h6>
                       <p className="text-slate-400 font-bold text-sm tracking-wide opacity-80">{t(item.desc_en, item.desc_ar)}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 3: WHY US */}
      <section id="why-us" className="py-24 bg-white dark:bg-slate-950 transition-colors">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h4 className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs mb-4">{t('STANDARDS', 'معايير الأندلس')}</h4>
            <h5 className="text-4xl md:text-6xl font-black uppercase text-slate-950 dark:text-white tracking-tighter mb-24">{t('Why Us', 'لماذا نحن')}</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><Shield className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('Naval Expertise', 'هندسة بخبرة')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t('A specialized team with extensive experience in marine systems.', 'فريقنا يضم مهندسين متخصصين بخبرة واسعة في صيانة وتصميم الأنظمة البحرية.')}</p>
               </div>
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><Layout className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('One-Stop Hub', 'كل ما تحتاجه')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t('Supplying engines, gearboxes, and building specialized vessels.', 'نقدم خدمات متكاملة تشمل الصيانة، البيع والشراء، وبناء السفن لتوفير حلول شاملة.')}</p>
               </div>
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><Zap className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('Supply Speed', 'سرعة التوريد')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t('Providing high-quality marine equipment (new/used) with full support.', 'نوفر معدات بحرية عالية الجودة وقطع غيار أصلية مع ضمانات استمرارية الدعم الفني.')}</p>
               </div>
               <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/10 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform"><CheckCircle className="w-8 h-8 text-amber-600" /></div>
                  <h6 className="text-xl font-black mb-4 dark:text-white uppercase italic">{t('Field Partners', 'شركاء النجاح')}</h6>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t('We understand the challenges and work on-site in dry docks.', 'نفهم تحديات البحر ونعمل مباشرة على السفن في الأحواض الجافة لضمان الكفاءة.')}</p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 4: CONTACT US */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="text-left rtl:text-right">
               <h6 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 mb-8">{t('PARTNERSHIP', 'شراكة النجاح')}</h6>
               <h5 className="text-5xl md:text-[6rem] font-black text-slate-950 dark:text-white leading-[0.85] tracking-tighter uppercase mb-16 italic">
                  {t('START YOUR\nJOURNEY', 'ابدأ\nرحلتك')}
               </h5>
               <div className="space-y-12">
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 bg-amber-600 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110"><Mail className="w-7 h-7" /></div>
                     <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('EMAIL US', 'راسلنا مباشرة')}</p><a href="mailto:aymanarfa@andulisaamarina.com" className="text-2xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all font-sans">aymanarfa@andulisaamarina.com</a></div>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110"><Phone className="w-7 h-7" /></div>
                     <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('CALL US', 'اتصل بينا')}</p><a href="tel:+201030067465" className="text-3xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all font-sans tracking-tight">{t('+20 10 3006 7465', '01030067465')}</a></div>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-110"><Facebook className="w-7 h-7" /></div>
                     <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('FOLLOW US', 'تابعنا على فيسبوك')}</p><a href="https://www.facebook.com/AndalusiaMarine" target="_blank" className="text-2xl font-black text-slate-950 dark:text-white hover:text-amber-600 transition-all uppercase">{t('Andalusia Marine', 'الأندلس مارين')}</a></div>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-700">
               <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left rtl:text-right">
                     <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('NAME', 'الاسم')}</label><input className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all font-bold dark:text-white" /></div>
                     <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('EMAIL', 'الإيميل')}</label><input className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all font-bold dark:text-white" /></div>
                  </div>
                  <div className="space-y-2 text-left rtl:text-right">
                     <label className="text-[10px] font-black uppercase text-slate-400 px-4 tracking-widest">{t('DETAILS', 'التفاصيل')}</label>
                     <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 focus:ring-1 focus:ring-amber-600 outline-none transition-all resize-none font-bold dark:text-white"></textarea>
                  </div>
                  <button className="w-full bg-amber-600 hover:bg-amber-500 text-white py-8 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl shadow-amber-600/30 flex items-center justify-center gap-4">
                     {t('SEND REQUEST', 'إرسال الطلب')} <LucideArrowRight className="w-5 h-5" />
                  </button>
               </form>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-white dark:bg-slate-950 text-center border-t border-slate-200 dark:border-slate-900 opacity-60">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">© 2026 ANDALUSIA MARINE – EXCELLENCE AT SEA.</p>
      </footer>
    </div>
  )
}

function ArrowRight({ className }: { className: string }) {
   return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
}
