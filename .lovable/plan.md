

# تطوير الأزرار - Premium Button System

## المشكلة
الأزرار الحالية في الموقع بسيطة جداً وتقليدية - مجرد borders رفيعة بدون عمق أو تأثيرات بصرية متقدمة. مش متناسقة مع مستوى التصميم السينمائي في باقي الموقع.

## الحل
إعادة تصميم كامل لكل الأزرار في الموقع بأسلوب premium/luxury مع تأثيرات glass morphism، gradient borders متحركة، وتحولات hover سلسة ومتقدمة.

## الأزرار اللي هتتغير

### 1. Hero Section - "Explore Work" Button
- **الحالي**: Border رفيع coral مع shimmer بسيط
- **الجديد**: Gradient border متحرك (coral → lavender → coral) + glass background + glow effect عند hover + scale subtle

### 2. Hero Section - "Showreel" Button
- **الحالي**: دائرة border رفيعة مع play icon
- **الجديد**: دائرة glass مع pulse ring animation + gradient fill عند hover

### 3. Works Section - Filter Buttons
- **الحالي**: مجرد text بدون شكل واضح
- **الجديد**: Pill-shaped glass buttons مع active state متحرك (sliding indicator) + subtle glow

### 4. Works Section - "View all projects" Button
- **الحالي**: نص مع خطين على الجانبين
- **الجديد**: Pill button مع animated border gradient + arrow icon متحرك

### 5. FinalCTA Section - "Send Brief" Submit Button
- **الحالي**: Border عادي مع hover بسيط
- **الجديد**: Full-width gradient button (coral) مع shimmer sweep + magnetic hover + scale effect

### 6. Navbar - "Get in touch" Link
- **الحالي**: نص صغير مع نقطة pulse
- **الجديد**: Micro pill button مع glass effect + gradient border subtle

## التأثيرات الجديدة

### Animated Gradient Border
حدود متحركة بتدور حوالين الزر (conic-gradient spinning)

### Glass Morphism
```text
background: hsl(var(--coral) / 0.05)
backdrop-filter: blur(12px)
border: 1px solid hsl(var(--coral) / 0.15)
```

### Hover State المتقدم
- Scale 1.02 مع spring animation
- Border glow يزيد
- Background opacity يزيد
- Arrow icons تتحرك
- Shimmer sweep يسرّع

### Active/Click State
- Scale 0.98 سريع
- Flash glow لحظي

## التفاصيل التقنية

### الملفات اللي هتتعدل

1. **`src/components/ui/NeonBorder.tsx`** - إعادة بناء كامل مع animated conic-gradient border + glass background
2. **`src/components/ui/MagneticButton.tsx`** - إضافة whileTap scale effect
3. **`src/components/sections/Hero/index.tsx`** - تحديث Showreel button styling
4. **`src/components/sections/Works/index.tsx`** - تحديث filter buttons + "View all" button
5. **`src/components/sections/FinalCTA/index.tsx`** - تحديث Submit button بالكامل
6. **`src/components/layout/Navbar.tsx`** - تحديث "Get in touch" link
7. **`src/index.css`** - إضافة keyframes جديدة (spinning gradient, button glow pulse)

### CSS Keyframes الجديدة
- `@keyframes border-spin` - لدوران الـ gradient border
- `@keyframes btn-glow-pulse` - لنبض الـ glow عند hover
- `.glass-btn` - utility class للأزرار الـ glass
- `.gradient-border-spin` - utility class للـ animated border

