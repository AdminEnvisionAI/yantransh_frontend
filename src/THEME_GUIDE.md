# Theme & Styling Guide

All CSS and styling constants have been centralized in `theme.js` for better organization and maintainability.

## File Structure

```
src/
├── theme.js          ← All styling constants, colors, and utilities
├── App.jsx           ← React components (imports from theme.js)
└── ...
```

## What's in `theme.js`

### 1. **Color Palette (T)**
The main color token object with all colors used throughout the app:
```javascript
import { T } from "./theme";

T.navy      // Primary dark color: #0B1D3A
T.blue      // Primary action color: #0D47A1
T.white     // Background: #fff
T.txt       // Main text: #1E293B
T.txtS      // Secondary text: #64748B
T.bdr       // Border color: #E2E8F0
// ... and more
```

### 2. **Typography**
Font families and layout constants:
```javascript
T.fn        // Font family (main): 'Manrope', sans-serif
T.fd        // Font family (display): 'Playfair Display', serif
T.mw        // Max width: 1200
T.r         // Border radius: 8
```

### 3. **Contact Information**
```javascript
import { EMAILS } from "./theme";

EMAILS.careers  // HR@yantranshVT.com
EMAILS.contact  // Info@yantranshVT.com
```

### 4. **Form UI Styles**
Pre-built form component styles:
```javascript
import { formUi } from "./theme";

formUi.card     // Card container styles
formUi.label    // Form label styles
formUi.input    // Input field styles
formUi.textarea // Textarea styles
```

### 5. **Utility Functions**
```javascript
import { buildMailto, footerHref } from "./theme";

// Build mailto links
buildMailto(email, subject, fields)

// Get footer link hrefs
footerHref(label)
```

### 6. **Helper Style Functions**
Pre-built style generators for consistency:

```javascript
import { getButtonStyles, getCircularImageStyles } from "./theme";

// Navigation button styles
const btnStyle = getButtonStyles(isActive);

// Leadership circular image styles
const imgStyle = getCircularImageStyles(isSelected);
```

## How to Use in Components

### Example 1: Using Theme Colors
```javascript
import { T } from "./theme";

<div style={{ color: T.navy, fontFamily: T.fn }}>
  Hello World
</div>
```

### Example 2: Using Form Styles
```javascript
import { formUi } from "./theme";

<input style={formUi.input} placeholder="Enter name" />
<label style={formUi.label}>Your Name</label>
```

### Example 3: Using Helper Functions
```javascript
import { getCircularImageStyles } from "./theme";

<div style={getCircularImageStyles(isSelected)}>
  <img src={imageSrc} alt="Leader" />
</div>
```

## Adding New Styles

### To add a new color:
Edit `theme.js` and add to the `T` object:
```javascript
export const T = {
  // ... existing colors
  myNewColor: "#ABC123",
};
```

### To add a new style helper:
Add a new export function to `theme.js`:
```javascript
export const getMyCustomStyles = (param) => ({
  fontSize: 16,
  color: T.navy,
  // ... your styles
});
```

### To add new form styles:
Update the `formUi` object in `theme.js`:
```javascript
export const formUi = {
  // ... existing styles
  myNewComponent: {
    // ... your styles
  },
};
```

## Best Practices

1. **Always use `T` for colors** - Never hardcode color values
2. **Use `T.fn` and `T.fd`** for font families - Maintains consistency
3. **Import what you need** - Only import the constants you use
4. **Keep theme.js focused** - Only styling and design constants
5. **Add helper functions** - For repeated style patterns (see `getCircularImageStyles`)

## Current Exported Items

```javascript
export { T, EMAILS, formUi, buildMailto, footerHref, svgProps, 
         getButtonStyles, getCircularImageStyles }
```

Import only what you need:
```javascript
import { T, formUi, getCircularImageStyles } from "./theme";
```

## Example: Complete Component with Theme

```javascript
import { T, formUi, getCircularImageStyles } from "./theme";

const MyComponent = () => {
  const [isSelected, setIsSelected] = useState(false);
  
  return (
    <div style={{ padding: "20px", background: T.bgAlt }}>
      <h2 style={{ fontFamily: T.fd, fontSize: 28, color: T.navy }}>
        Title
      </h2>
      
      <div style={getCircularImageStyles(isSelected)}>
        <img src="image.jpg" alt="Preview" />
      </div>
      
      <input style={formUi.input} placeholder="Name" />
    </div>
  );
};
```

## Maintenance

When updating styles:
1. Modify the relevant constant/function in `theme.js`
2. Changes automatically apply to all components using that export
3. No need to update individual component files

This centralized approach makes it easy to:
- ✅ Maintain design consistency
- ✅ Update colors/fonts globally
- ✅ Onboard new developers
- ✅ Refactor styles efficiently
