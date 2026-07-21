# MDX Content Rendering

This directory contains the MDX rendering system for article-style content, providing enhanced typography, syntax highlighting, and interactive components for Markdown content created with MDX editor.

## Components

### MdxRenderer

The main component that renders MDX content with enhanced styling and features.

**Features:**

- Syntax highlighting with theme-aware colors
- Math rendering with KaTeX
- Enhanced typography
- Image optimization
- Auto-generated heading anchors
- Responsive design

**Usage:**

```tsx
import { MdxRenderer } from "@/components/mdx/MdxRenderer";

<MdxRenderer content={content} />;
```

### MdxComponents

Custom React components that replace default HTML elements in MDX content.

**Enhanced Elements:**

- **Headings**: Improved typography with gradient effects and anchor links
- **Images**: Next.js Image optimization with captions and hover effects
- **Code**: Syntax highlighting with Prism.js and custom themes
- **Blockquotes**: Styled quotes with decorative elements
- **Tables**: Enhanced table styling with alternating rows
- **Links**: Improved link styling with external link indicators
- **Lists**: Custom bullet points and numbering

### MdxProvider

Provider component that supplies custom components to MDX content.

## Styling

### Typography (`mdx-typography.css`)

Comprehensive typography system with:

- Responsive font sizes
- Improved line heights and spacing
- Dark/light theme support
- Print optimizations
- Mobile-first responsive design

### Syntax Highlighting (`syntax-highlighting.css`)

Advanced code block styling with:

- Theme-aware syntax highlighting
- Language badges
- Copy buttons
- Line numbers (optional)
- Scrollbar styling
- Custom inline code styling

## Supported MDX Features

### Basic Markdown

- Headers (h1-h6)
- Paragraphs
- Lists (ordered/unordered)
- Links
- Images
- Emphasis (bold/italic)
- Code blocks and inline code
- Blockquotes
- Tables
- Horizontal rules

### Enhanced Features

- Math equations (KaTeX)
- Syntax highlighting (Prism.js)
- Auto-generated table of contents
- Image optimization
- Responsive images
- Custom components

### Code Highlighting

Supports 100+ programming languages including:

- JavaScript/TypeScript
- Python
- Java
- C/C++
- Rust
- Go
- PHP
- SQL
- HTML/CSS
- And many more...

## Usage Examples

### Basic Usage

```tsx
import { MdxRenderer } from "@/components/mdx";

function ArticleContent({ content }) {
  return (
    <article>
      <MdxRenderer content={content} />
    </article>
  );
}
```

### With Custom Styling

```tsx
<MdxRenderer content={content} className="custom-content" />
```

### Math Equations

The system supports both inline and block math:

**Inline math:** `$E = mc^2$`
**Block math:**

```
$$
\frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$
```

### Code Blocks

```javascript
// Automatically highlighted
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

## Customization

### Adding New Components

To add custom MDX components:

1. Create the component in `MdxComponents.tsx`
2. Add it to the `mdxComponents` object
3. Use it in your MDX content

```tsx
// In MdxComponents.tsx
const CustomAlert = ({ type, children }) => (
  <Alert severity={type}>{children}</Alert>
);

export const mdxComponents = {
  // ... existing components
  Alert: CustomAlert,
};
```

### Styling Customization

- Edit `mdx-typography.css` for typography changes
- Edit `syntax-highlighting.css` for code styling
- Override styles in component-specific CSS files

## Performance Optimizations

- **Image Optimization**: Next.js Image component with responsive sizes
- **Code Splitting**: Components loaded only when needed
- **CSS Optimization**: Minimal CSS with tree-shaking
- **Font Loading**: Optimized font loading for code blocks

## Browser Support

- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Dependencies

- `@mdx-js/react`: MDX React integration
- `@next/mdx`: Next.js MDX support
- `react-markdown`: Markdown parsing
- `react-syntax-highlighter`: Code highlighting
- `rehype-highlight`: Server-side highlighting
- `remark-gfm`: GitHub Flavored Markdown
- `remark-math` & `rehype-katex`: Math rendering

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management

## SEO Benefits

- Semantic HTML markup
- Proper heading hierarchy
- Image alt text support
- Meta description support
- Schema markup ready
