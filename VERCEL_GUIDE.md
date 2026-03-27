# ⚓️ Andalusia Marine - Vercel Deployment Guide

إليك الخطوات النهائية لتحويل الموقع من جهازك إلى الإنترنت (Live):

### 1. الرفع على GitHub
*   قم بإنشاء مستودع (Repository) جديد على GitHub باسم `Andalusia_marine`.
*   ارفع ملفات المشروع عليه.

### 2. الربط بـ Vercel
*   ادخل على [Vercel.com](https://vercel.com) واضغط **"Add New Project"**.
*   اختر مستودع GitHub الخاص بك.

### 3. إعداد قاعدة البيانات (مهم جداً)
*   داخل لوحة تحكم Vercel للمشروع، اذهب إلى تبويب **Storage**.
*   اختر **Connect Database** ثم اختر **Postgres**.
*   بعد الإنشاء، سيقوم Vercel تلقائياً بإضافة روابط الـ API في إعدادات المشروع.

### 4. تشغيل قاعدة البيانات لأول مرة
افتح الـ Terminal في جهازك (داخل مجلد المشروع) وشغل هذه الأوامر بعد ربط Vercel CLI:

```powershell
# 1. دفع هيكل البيانات للجداول
npx prisma db push

# 2. تعبئة الـ 23 مشروعاً الأصليين
npx prisma db seed
```

### ⛵️ مبروك!
موقعك الآن متاح للعالم، وكل تعديل تقوم به من `/admin` سيحفظ في قاعدة البيانات الحقيقية وسيظهر للزوار فوراً.

**Andalusia Marine – Excellence at Sea.** ⚓️🛡✨
