/**
 * ANDALUSIA MARINE - SEEDER V1
 * POPULATES DATABASE WITH ORIGINAL 23 PROJECTS
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = [
    // SHIPS (5)
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

    // PROPULSION (5)
    { id: 15, category: 'propulsion', isHidden: false, orange_label_en: 'REINTJES WAF 264L', orange_label_ar: 'رينتجيس WAF 264L', title_en: 'Marine Gearbox', title_ar: 'جيربوكس بحري', desc_en: 'Technical Transmission', desc_ar: 'نظام نقل الحركة', media_path: '/images/marine-gearbox-reintjes-waf264l.jpeg' },
    { id: 16, category: 'propulsion', isHidden: false, orange_label_en: 'REINTJES WAF 440', orange_label_ar: 'رينتجيس WAF 440', title_en: 'Heavy Duty Gearbox', title_ar: 'جيربوكس للأعمال الشاقة', desc_en: 'Durable Solution', desc_ar: 'حل نقل طاقة متين', media_path: '/images/Reintjes WAF 440.jpg' },
    { id: 17, category: 'propulsion', isHidden: false, orange_label_en: 'Bronze Propeller', orange_label_ar: 'رفاص برونزي', title_en: 'Precision Casting', title_ar: 'صب دقيق', desc_en: 'High Performance', desc_ar: 'دفع عالي الأداء', media_path: '/images/boat-propeller-bronze.jpeg' },
    { id: 18, category: 'propulsion', isHidden: false, orange_label_en: 'Flexible Coupling', orange_label_ar: 'كوبلن مرن', title_en: 'Transmission System', title_ar: 'نظام نقل الحركة', desc_en: 'Vibration Control', desc_ar: 'التحكم في الاهتزاز', media_path: '/images/marine-flexible-coupling.jpeg' },
    { id: 19, category: 'propulsion', isHidden: false, orange_label_en: 'Marine Turbocharger', orange_label_ar: 'شاحن توربيني بحري', title_en: 'Charging System', title_ar: 'نظام شحن', desc_en: 'Engine Efficiency', desc_ar: 'كفاءة محرك معززة', media_path: '/images/و شاحن توربيني (Turbocharger).jpeg' },

    // MAINTENANCE (4)
    { id: 20, category: 'maintenance', isHidden: false, orange_label_en: 'Rocker Arms', orange_label_ar: 'روافع الصمامات', title_en: 'Internal Gear System', title_ar: 'نظام تروس داخلي', desc_en: 'Engine Valve Control', desc_ar: 'تحكم في صمامات المحرك', media_path: '/images/Rocker Arms).jpeg' },
    { id: 21, category: 'maintenance', isHidden: false, orange_label_en: 'Marine Differential', orange_label_ar: 'ديفرنشال بحري', title_en: 'Power Distribution', title_ar: 'توزيع الطاقة', desc_en: 'Torque Transfer', desc_ar: 'نقل عزم موثوق', media_path: '/images/marine-maintenance-differential.jpeg' },
    { id: 22, category: 'maintenance', isHidden: false, orange_label_en: 'CAT Hydraulic Pump', orange_label_ar: 'مضخة هيدروليك CAT', title_en: 'Technical System', title_ar: 'نظام تقني', desc_en: 'Fluid Control', desc_ar: 'التحكم في السوائل', media_path: '/images/هذا المنتج عبارة عن مضخة هيدروليكية لحفارة Caterpillar. .jpeg' },
    { id: 23, category: 'maintenance', isHidden: false, orange_label_en: 'CAT / STAMFORD', orange_label_ar: 'كات / ستامفورد', title_en: 'Marine Generator Set', title_ar: 'مولد كهرباء بحري', desc_en: 'Primary Power Supply', desc_ar: 'مصدر طاقة أساسي', media_path: '/images/هذه الصورة تظهر مولدات ديزل صناعية، وتحديداً محركات من ماركة كاتربيلر (Caterpillar)، مقترنة بمولدات كهربائية من ماركة ستامفورد (Stamford). .jpeg' },
  ]

  // Clear existing (Optional)
  await prisma.project.deleteMany({})

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }
  console.log('✅ DATABASE SEEDED - ALL 23 PROJECTS SYNCED!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })

export {} // Mark as module to prevent 'Cannot redeclare'
