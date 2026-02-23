

# ترقية نظام الألوان والخطوط - Pearl Luxe System

## الرؤية
تحويل الموقع من "crystal dark" إلى نظام "Pearl Luxe" - يجمع بين الإضاءة اللؤلؤية (pearlescent iridescence) مع درجات platinum/champagne أكثر دفئاً وتناسقاً. الهدف هو إحساس Cartier/Chanel الرقمي.

## المشاكل الحالية
- الألوان كتير ومشتتة (coral + sage + lavender + cyan + amber + gold) - بتحسسك إنه مفيش هوية واحدة
- الفونتات كتير (6 فونتات!) وبعضهم زي Unbounded مش بيدي إحساس luxury
- الـ section backgrounds كلها درجات navy متقاربة جداً - مفيش تباين كافي
- مفيش إضاءة لؤلؤية حقيقية - الـ shimmer الحالي بسيط
- الأرقام والـ labels بتستخدم أكتر من فونت بشكل عشوائي

## الحل

### 1. تقليل الألوان لـ 3 أساسية فقط (Refined Triad)
- **Pearl** (الأساسي): champagne/warm white بدل الـ cream البارد - `40 20% 92%`
- **Rose Gold** (الـ accent الدافئ): أنعم وأفخم من الـ coral الحالي - `12 45% 68%`  
- **Platinum Blue** (الـ accent البارد): بدل sage/cyan - `220 25% 72%`
- **إلغاء** lavender كلون مستقل - هيبقى جزء من الـ pearlescent gradient بس

### 2. نظام الفونتات - تقليل لـ 4 فقط
- **Display**: Playfair Display (يفضل - كلاسيكي وفخم)
- **Heading/UI**: Manrope (يفضل - نظيف ومودرن)
- **Body**: DM Sans (يفضل)
- **Mono**: IBM Plex Mono (يفضل)
- **إلغاء** Cormorant (Script) - Playfair italic هيعمل نفس الدور بشكل أفضل وأكثر تناسقاً
- **إلغاء** Unbounded (Display Alt) - ثقيل جداً ومش luxury - هيتبدل بـ Manrope bold أو Playfair bold

### 3. إضاءة لؤلؤية حقيقية (Pearlescent System)
- gradient جديد متعدد الألوان بيتحرك ببطء على الخلفيات
- تأثير "pearl sheen" على الـ headings - gradient بيلمع زي اللؤلؤ الحقيقي
- overlay لؤلؤي خفيف جداً على الـ sections
- تحديث الـ shimmer ليبقى أكثر واقعية (pearl → rose gold → platinum → pearl)

### 4. خلفيات الأقسام - تباين أفضل
- تدرج أكثر وضوحاً بين الأقسام مع لمسة لؤلؤية خفيفة
- بعض الأقسام هتاخد undertone دافئ (rose gold glow) وبعضها بارد (platinum glow)

## التفاصيل التقنية

### الملفات اللي هتتعدل

#### `src/index.css` - التغيير الأكبر
- تحديث كل الـ CSS variables (الألوان، الـ gradients، الـ shadows)
- تحديث `--gradient-text` للـ pearl effect
- إضافة `@keyframes pearl-sheen` - إضاءة لؤلؤية تمر على النص
- تحديث `.shimmer-text` و `.shimmer-stroke` بألوان pearl
- إضافة `.pearl-glow` utility - هالة لؤلؤية خفيفة
- تحديث الـ glass effects بألوان pearl بدل coral
- تحديث الـ scrollbar و selection colors
- إزالة font-script و font-display-alt من الـ utilities واستبدالهم

#### `tailwind.config.ts`
- إزالة `script` و `display-alt` من fontFamily
- تحديث أسماء الألوان

#### كل ملفات الـ Sections (Hero, Manifesto, Craft, Works, Process, Studio, Clients, Journal, FinalCTA)
- استبدال `font-script` بـ `font-display italic`
- استبدال `font-display-alt` بـ `font-heading font-bold` أو `font-display font-bold`
- تحديث مراجع الألوان (`sage` → `platinum-blue`, `lavender` → يتم حذفها أو دمجها)
- تحديث الـ accent colors في كل section
- إضافة pearl glow effects حيث مناسب

#### `src/components/layout/Navbar.tsx`
- تحديث ألوان الـ nav links والـ CTA button

#### `src/components/layout/Footer.tsx`
- تحديث الألوان والفونتات

#### `src/components/ui/NeonBorder.tsx` و `MagneticButton.tsx`
- تحديث الـ gradient ألوان لتتماشى مع الـ pearl system

#### `src/components/ui/WorkModal.tsx`
- تحديث الألوان والفونتات داخل الـ modal

#### `src/components/ui/LoadingScreen.tsx`
- تحديث ألوان الـ loading bar والـ counter

#### `src/components/ui/SectionDivider.tsx`
- تحديث الألوان الافتراضية

### الألوان الجديدة (CSS Variables)
```text
--pearl:         40 20% 92%          (warm white/champagne)
--pearl-dim:     40 20% 92% / 0.06
--rose-gold:     12 45% 68%          (refined rose gold)
--rose-gold-dim: 12 45% 68% / 0.08
--rose-gold-glow:12 45% 68% / 0.15
--platinum:      220 25% 72%         (cool platinum blue)
--platinum-dim:  220 25% 72% / 0.08

(coral, sage, lavender يتحولوا لأسماء aliases للتوافق)
```

### Pearl Sheen Keyframe
```text
@keyframes pearl-sheen {
  0%, 100% { background-position: 200% center; }
  50%      { background-position: -200% center; }
}
```

### التغييرات في الفونتات بالتفصيل
- كل `font-script italic` → `font-display italic`
- كل `font-display-alt font-extrabold` → `font-heading font-extrabold` (للعناوين الكبيرة)
- إزالة الـ Google Fonts import لـ Cormorant و Unbounded (تقليل حجم التحميل)

### ملاحظة مهمة
التغييرات هتكون تدريجية ومتسقة - كل section هيتحدث بنفس النمط عشان الموقع يبان unified. الـ accent colors هتتقلل من 3 (coral/sage/lavender) لـ 2 (rose-gold/platinum) مع استخدام الـ pearl gradient للتنويع.

