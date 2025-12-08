# 5 Marks questions

**Q1. Define web programming. Explain the architecture of a website with a neat diagram.**

Web programming is creating interactive applications that run on web browsers. 

**Website Architecture:**
```
Client Side (Browser)          Server Side
┌─────────────┐              ┌──────────────┐
│   HTML      │              │  Web Server  │
│   CSS       │ ←─────────→  │  (Apache)    │
│ JavaScript  │   HTTP       │              │
└─────────────┘              │  App Server  │
                             │  (Node.js)   │
                             │              │
                             │  Database    │
                             │  (MySQL)     │
                             └──────────────┘
```
Client requests → Server processes → Server responds → Browser renders

---

**Q2. What are the different technologies used in website development? Explain each briefly.**

- **HTML**: Structure and content (skeleton)
- **CSS**: Styling and layout (skin)
- **JavaScript**: Interactivity and behavior (muscles)
- **Backend Languages**: PHP, Python, Node.js (brain)
- **Databases**: MySQL, MongoDB (memory)
- **Frameworks**: React, Angular, Django (tools)

---

**Q3. Write the steps to create your first HTML page. Explain with an example.**

**Steps:**
1. Open text editor (Notepad/VS Code)
2. Write HTML code
3. Save as `.html`
4. Open in browser

**Example:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is my first webpage.</p>
</body>
</html>
```

---

**Q4. What are HTML tags and attributes? Differentiate between HTML Tag and Element with examples.**

**HTML Tag**: Markup keywords in angle brackets
**Attributes**: Extra information in tags

**Difference:**
- **Tag**: `<p>` or `</p>` (opening/closing)
- **Element**: `<p>Hello</p>` (complete structure)

**Example:**
```html
<img src="pic.jpg" alt="Photo">
     ↑         ↑
   Tag      Attributes

<h1>Title</h1>
↑___________↑
   Element
```

---

**Q5. Explain basic HTML formatting tags with examples.**

```html
<b>Bold text</b>
<i>Italic text</i>
<u>Underlined</u>
<strong>Important text</strong>
<em>Emphasized</em>
<mark>Highlighted</mark>
<small>Smaller text</small>
<del>Deleted</del>
<ins>Inserted</ins>
<sub>H₂O</sub>
<sup>X²</sup>
```

---

**Q6. What is color coding in HTML? Explain different ways to apply color in a webpage.**

Color coding specifies colors using different formats:

**1. Color Names:**
```html
<p style="color: red;">Red text</p>
```

**2. Hexadecimal:**
```html
<p style="color: #FF5733;">Hex color</p>
```

**3. RGB:**
```html
<p style="color: rgb(255, 87, 51);">RGB color</p>
```

**4. RGBA (with transparency):**
```html
<p style="color: rgba(255, 87, 51, 0.5);">Semi-transparent</p>
```

---

## **MODULE 2: HTML Advanced Concepts and Form Handling**

**Q7. What is an image tag in HTML? Explain the attributes of the `<img>` tag with examples.**

The `<img>` tag embeds images in webpages.

**Attributes:**
```html
<img src="photo.jpg"        <!-- Image source -->
     alt="Description"      <!-- Alternative text -->
     width="300"            <!-- Width in pixels -->
     height="200"           <!-- Height in pixels -->
     title="Hover text"     <!-- Tooltip -->
     loading="lazy">        <!-- Lazy loading -->
```

---

**Q8. Define image mapping in HTML. How is it implemented?**

Image mapping creates clickable areas on an image.

**Example:**
```html
<img src="map.jpg" usemap="#worldmap">

<map name="worldmap">
    <area shape="rect" coords="0,0,100,100" 
          href="asia.html" alt="Asia">
    <area shape="circle" coords="200,200,50" 
          href="europe.html" alt="Europe">
</map>
```
**Shapes**: rect, circle, poly

---

**Q9. What is a hyperlink? Explain the concept of URL and URL encoding in detail.**

**Hyperlink**: Clickable element linking to another resource.

```html
<a href="https://example.com">Click me</a>
```

**URL Structure:**
```
https://www.example.com:80/path/page.html?id=123#section
  ↑         ↑           ↑       ↑            ↑      ↑
protocol  domain     port     path        query  fragment
```

**URL Encoding**: Converts special characters
- Space → `%20` or `+`
- `@` → `%40`
- Example: `My Page.html` → `My%20Page.html`

---

**Q10. Explain different table tags in HTML with suitable examples.**

```html
<table border="1">
    <caption>Student Marks</caption>
    
    <tr>                      <!-- Table Row -->
        <th>Name</th>         <!-- Table Header -->
        <th>Marks</th>
    </tr>
    
    <tr>
        <td>John</td>         <!-- Table Data -->
        <td>85</td>
    </tr>
    
    <tr>
        <td>Sarah</td>
        <td>92</td>
    </tr>
</table>
```

---

**Q11. What is an iframe? Explain how to use iframe as a target with an example.**

**iframe**: Embeds another HTML page within current page.

**As Target:**
```html
<a href="page1.html" target="myframe">Page 1</a>
<a href="page2.html" target="myframe">Page 2</a>

<iframe name="myframe" width="500" height="300">
</iframe>
```
Clicking links loads content inside the iframe.

---

**Q12. Describe the structure and use of `<thead>`, `<tbody>`, and `<tfoot>` in an HTML table.**

These tags organize table content semantically.

```html
<table>
    <thead>                    <!-- Header section -->
        <tr><th>Product</th><th>Price</th></tr>
    </thead>
    
    <tbody>                    <!-- Body section -->
        <tr><td>Laptop</td><td>$800</td></tr>
        <tr><td>Mouse</td><td>$20</td></tr>
    </tbody>
    
    <tfoot>                    <!-- Footer section -->
        <tr><td>Total</td><td>$820</td></tr>
    </tfoot>
</table>
```
Benefits: Better structure, styling, accessibility

---

## **MODULE 3: HTML Forms and Miscellaneous Topics**

**Q13. What is an HTML form? Explain different input elements.**

HTML form collects user input and sends to server.

```html
<form action="submit.php" method="POST">
    
    <input type="text" placeholder="Name">
    <input type="email" placeholder="Email">
    <input type="password" placeholder="Password">
    
    <textarea rows="4">Comments</textarea>
    
    <button type="submit">Submit</button>
    
    <select>
        <option>Option 1</option>
        <option>Option 2</option>
    </select>
    
    <label><input type="checkbox"> Agree</label>
</form>
```

---

**Q14. Explain the purpose of HTML header tags.**

```html
<head>
    <title>Page Title</title>           <!-- Browser tab -->
    
    <base href="https://example.com/">  <!-- Base URL -->
    
    <link rel="stylesheet" href="style.css">  <!-- External CSS -->
    
    <style>body {color: blue;}</style>  <!-- Internal CSS -->
    
    <script src="app.js"></script>      <!-- JavaScript -->
    
    <meta charset="UTF-8">              <!-- Character encoding -->
</head>
```

---

**Q15. What are meta tags in HTML? Explain their importance in SEO.**

Meta tags provide metadata about the webpage.

```html
<meta name="description" content="Best pizza in town">
<meta name="keywords" content="pizza, food, delivery">
<meta name="author" content="John Doe">
<meta name="viewport" content="width=device-width">
<meta name="robots" content="index, follow">
```

**SEO Importance:**
- Improves search rankings
- Shows in search results
- Controls indexing
- Enhances social sharing

---

**Q16. Define XHTML. How is it different from HTML?**

**XHTML**: Extensible HTML - stricter version of HTML.

**Differences:**

| HTML | XHTML |
|------|-------|
| `<BR>` allowed | Must be `<br />` |
| Case insensitive | Must be lowercase |
| Attributes without quotes OK | Quotes mandatory |
| Unclosed tags OK | All tags must close |
| `<img src=pic.jpg>` | `<img src="pic.jpg" />` |

---

**Q17. Explain deprecated HTML tags and attributes with examples.**

Deprecated = Outdated, avoid using.

**Deprecated Tags:**
```html
<center>Text</center>          → Use CSS text-align
<font color="red">Text</font>  → Use CSS color
<marquee>Scroll</marquee>      → Use CSS animations
<blink>Blink</blink>          → Use CSS
```

**Deprecated Attributes:**
```html
<body bgcolor="yellow">        → Use CSS background
<table border="1">            → Use CSS border
```

---

**Q18. What are grouping tags in HTML? Explain the use of `<div>` and `<span>`.**

Grouping tags organize content.

**`<div>`**: Block-level container (new line)
**`<span>`**: Inline container (same line)

```html
<div style="background: yellow; padding: 10px;">
    This is a <span style="color: red;">red</span> word.
    <div>Nested div</div>
</div>

<!-- div takes full width, span only wraps content -->
```

---

## **MODULE 4: CSS3 Basics and Selectors**

**Q19. Define CSS. Explain the benefits of using CSS in web development.**

**CSS (Cascading Style Sheets)**: Styles HTML elements.

**Benefits:**
- Separates content from design
- Reusable styles
- Faster page loading
- Easy maintenance
- Responsive design
- Better SEO
- Consistent look across pages

---

**Q20. Describe the syntax of CSS with an example.**

```css
selector {
    property: value;
    property: value;
}

/* Example */
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}

/* Breakdown */
h1           ← Selector (what to style)
{            ← Opening brace
color        ← Property
:            ← Colon
blue         ← Value
;            ← Semicolon (separator)
}            ← Closing brace
```

---

**Q21. Explain the difference between inline, internal, and external style sheets with examples.**

**1. Inline** (highest priority):
```html
<p style="color: red; font-size: 20px;">Text</p>
```

**2. Internal**:
```html
<head>
    <style>
        p { color: blue; }
    </style>
</head>
```

**3. External** (best practice):
```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

---

**Q22. What are CSS selectors? Explain ID, class, and group selectors with suitable examples.**

**1. ID Selector** (unique, use #):
```css
#header { background: blue; }
```
```html
<div id="header">Header</div>
```

**2. Class Selector** (reusable, use .):
```css
.button { padding: 10px; }
```
```html
<button class="button">Click</button>
```

**3. Group Selector** (multiple elements):
```css
h1, h2, h3 { color: navy; }
```

---

**Q23. Explain descendant and attribute selectors in CSS with examples.**

**1. Descendant Selector** (space):
```css
div p {           /* All p inside div */
    color: red;
}

article > p {     /* Direct child only */
    font-size: 18px;
}
```

**2. Attribute Selector**:
```css
input[type="text"] {      /* Specific attribute value */
    border: 1px solid blue;
}

a[href^="https"] {        /* Starts with https */
    color: green;
}

img[alt] {                /* Has alt attribute */
    border: 2px solid;
}
```

---

**Q24. What are pseudo-classes in CSS? Write examples for `:hover`, `:link`, and `:visited`.**

Pseudo-classes style elements in specific states.

```css
/* Unvisited link */
a:link {
    color: blue;
    text-decoration: none;
}

/* Visited link */
a:visited {
    color: purple;
}

/* Mouse hover */
a:hover {
    color: red;
    text-decoration: underline;
    font-size: 20px;
}

/* Active (being clicked) */
a:active {
    color: orange;
}

/* Others */
input:focus { border: 2px solid blue; }
p:first-child { font-weight: bold; }
```

---

## **MODULE 5: CSS3 Display, Positioning, and Layout Techniques**

**Q25. Explain the CSS properties related to text formatting.**

```css
p {
    color: #333;                    /* Text color */
    font-size: 18px;                /* Size */
    text-align: center;             /* left/right/center/justify */
    text-decoration: underline;     /* none/underline/line-through */
    text-transform: uppercase;      /* capitalize/lowercase */
    line-height: 1.6;               /* Line spacing */
    letter-spacing: 2px;            /* Space between letters */
    word-spacing: 5px;              /* Space between words */
    text-indent: 50px;              /* First line indent */
    text-shadow: 2px 2px 4px gray;  /* Shadow effect */
}
```

---

**Q26. Describe CSS list properties with examples.**

```css
ul {
    list-style-type: square;        /* disc/circle/square/none */
}

ol {
    list-style-type: upper-roman;   /* I, II, III */
}

.custom-list {
    list-style-image: url('bullet.png');     /* Custom bullet */
    list-style-position: inside;             /* inside/outside */
}

/* Shorthand */
ul {
    list-style: square inside url('icon.png');
}
```

---

**Q27. Explain the concept of CSS box model with a neat diagram.**

Every element is a box with 4 layers:

```
┌─────────────────────────────────┐
│        MARGIN (transparent)     │
│  ┌───────────────────────────┐  │
│  │    BORDER (visible)       │  │
│  │  ┌─────────────────────┐  │  │
│  │  │  PADDING (space)    │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   CONTENT     │  │  │  │
│  │  │  │   (text/img)  │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Example:**
```css
div {
    width: 300px;              /* Content width */
    padding: 20px;             /* Inner spacing */
    border: 5px solid black;   /* Border */
    margin: 15px;              /* Outer spacing */
}
/* Total width = 300 + 20(left) + 20(right) + 5 + 5 + 15 + 15 = 380px */
```

---

**Q28. Explain different types of CSS positioning with examples.**

**1. Static (default)**:
```css
div { position: static; }  /* Normal flow */
```

**2. Relative**:
```css
div { 
    position: relative;
    top: 20px;        /* Moves 20px down from original position */
    left: 10px;
}
```

**3. Absolute**:
```css
div { 
    position: absolute;
    top: 50px;        /* Relative to parent container */
    right: 30px;
}
```

**4. Fixed**:
```css
nav { 
    position: fixed;
    top: 0;           /* Stays fixed while scrolling */
    width: 100%;
}
```

---

**Q29. What is the difference between CSS display and visibility properties? Explain with examples.**

**Display**: Controls layout behavior
```css
div { display: none; }        /* Removes from layout */
div { display: block; }       /* Full width, new line */
div { display: inline; }      /* Same line, no width/height */
div { display: inline-block; }/* Same line, can set dimensions */
div { display: flex; }        /* Flexbox container */
```

**Visibility**: Controls visibility only
```css
div { visibility: hidden; }   /* Invisible but takes space */
div { visibility: visible; }  /* Normal */
```

**Key Difference:**
- `display: none` → Element gone, no space
- `visibility: hidden` → Element invisible, space remains

---

**Q30. Define CSS dimensions. Explain the use of height, width, and scrollbar properties with suitable examples.**

CSS dimensions control element size.

```css
div {
    width: 300px;              /* Fixed width */
    height: 200px;             /* Fixed height */
    max-width: 90%;            /* Responsive limit */
    min-height: 100px;         /* Minimum height */
}

/* Scrollbar properties */
.scroll-box {
    width: 400px;
    height: 200px;
    overflow: auto;            /* Show scrollbar when needed */
    /* overflow: scroll;          Always show */
    /* overflow: hidden;          Hide overflow */
    /* overflow-x: scroll;        Horizontal only */
    /* overflow-y: auto;          Vertical only */
}

/* Responsive units */
.responsive {
    width: 80vw;               /* 80% of viewport width */
    height: 50vh;              /* 50% of viewport height */
    padding: 2em;              /* Relative to font-size */
}
```

---


# Web Technology - 10 Marks Answers


### 1. Discuss the architecture of a website in detail. Explain client-side and server-side 
technologies with examples and a neat diagram.

**Architecture Overview:**

```
[Client Browser] ←→ [Internet] ←→ [Web Server] ←→ [Database]
     ↓                                   ↓
  Client-Side                      Server-Side
  Technologies                    Technologies
```

**Client-Side Technologies:**
- **HTML/CSS**: Structure and styling
- **JavaScript**: Interactivity, DOM manipulation
- **React/Vue**: Modern UI frameworks
- **AJAX**: Asynchronous data loading

**Server-Side Technologies:**
- **PHP/Python/Node.js**: Business logic
- **MySQL/MongoDB**: Data storage
- **Apache/Nginx**: Web servers
- **REST APIs**: Data communication

**How It Works:**
1. User requests page → Server processes → Sends HTML/CSS/JS
2. Browser renders content
3. User interacts → JS handles or sends to server
4. Server processes, queries database, returns response

---

### 2. Explain the evolution of HTML and the basic steps to create a simple web page. Write 
a sample HTML code demonstrating the use of basic and formatting tags.

**HTML Evolution:**
- **HTML 1.0 (1991)**: Basic tags, no styling
- **HTML 2.0 (1995)**: Forms added
- **HTML 4.01 (1999)**: CSS support, deprecated tags
- **XHTML (2000)**: Stricter syntax
- **HTML5 (2014)**: Semantic tags, multimedia, APIs

**Creating a Web Page:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Page</title>
    <style>
        body { font-family: Arial; background: #f0f0f0; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>Welcome to Web Development!</h1>
    <p>This is my <strong>first</strong> HTML page.</p>
    <p>I can use <em>formatting</em> tags easily.</p>
    <ul>
        <li>HTML for structure</li>
        <li>CSS for styling</li>
    </ul>
</body>
</html>
```

**Key Tags Used:**
- `<strong>`: Bold text
- `<em>`: Italic text
- `<ul>/<li>`: Unordered lists

---

### 3. Describe HTML tags and attributes in detail. Differentiate between tags, elements, 
and attributes with examples.

**Definitions:**

| Term | Description | Example |
|------|-------------|---------|
| **Tag** | Markup keyword in angle brackets | `<p>`, `<div>` |
| **Element** | Complete structure (opening + content + closing) | `<p>Hello</p>` |
| **Attribute** | Extra information inside opening tag | `class="header"` |

**Examples:**

```html
<!-- Tag: <img> -->
<!-- Attribute: src="photo.jpg" -->
<!-- Element: Complete img element -->
<img src="photo.jpg" alt="Photo" width="300">

<!-- Tag: <a> -->
<!-- Attributes: href, target -->
<!-- Element: Complete link -->
<a href="https://example.com" target="_blank">Visit Site</a>

<!-- Tag: <div> -->
<!-- Attribute: id -->
<!-- Element: div with content -->
<div id="container" class="main">
    <p>Content inside div element</p>
</div>
```

**Key Differences:**
- Tags are the syntax (`<p>`)
- Elements are the complete unit (start tag + content + end tag)
- Attributes modify behavior (`id="main"`)

---

### 4. Write an HTML program using <div> and <span> tags to group sections of a web 
page. Explain each tag and its purpose in the layout.

**Purpose:**
- **`<div>`**: Block-level container (creates new line)
- **`<span>`**: Inline container (stays in line)

**Example:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .header { background: #4CAF50; color: white; padding: 15px; }
        .nav { background: #333; padding: 10px; }
        .nav a { color: white; margin: 0 10px; }
        .content { padding: 20px; }
        .highlight { color: red; font-weight: bold; }
        .footer { background: #f1f1f1; padding: 10px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>My <span class="highlight">Awesome</span> Website</h1>
    </div>
    
    <div class="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </div>
    
    <div class="content">
        <p>Welcome! This is <span class="highlight">important</span> text.</p>
        <div style="border: 1px solid #ddd; padding: 10px;">
            <h3>Featured Section</h3>
            <p>Content here...</p>
        </div>
    </div>
    
    <div class="footer">
        <p>&copy; 2024 My Website</p>
    </div>
</body>
</html>
```

**Explanation:**
- `<div>` creates distinct sections (header, nav, content, footer)
- `<span>` highlights specific words within text
- Each div can be styled independently for layout

---

## Module 2: HTML Advanced Concepts and Form Handling

### 5. Explain image and image mapping in HTML. Write an example to create an image 
map with clickable regions and describe how it works.

**Image Mapping** lets you create clickable regions on a single image.

**Example:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Image Map Demo</title>
</head>
<body>
    <h2>Click on different parts of the image:</h2>
    
    <img src="office.jpg" alt="Office Layout" usemap="#officemap" width="400">
    
    <map name="officemap">
        <!-- Rectangle: x1,y1,x2,y2 -->
        <area shape="rect" coords="0,0,100,100" 
              href="reception.html" alt="Reception">
        
        <!-- Circle: x,y,radius -->
        <area shape="circle" coords="200,50,40" 
              href="meeting.html" alt="Meeting Room">
        
        <!-- Polygon: x1,y1,x2,y2,x3,y3... -->
        <area shape="poly" coords="300,0,400,50,350,100" 
              href="cafe.html" alt="Cafeteria">
    </map>
</body>
</html>
```

**How It Works:**
1. `usemap` attribute links image to map
2. `<map>` defines clickable areas
3. `<area>` specifies shape, coordinates, and link
4. Click on region → Navigate to specified href

**Shapes Available:**
- **rect**: Rectangle (top-left x,y, bottom-right x,y)
- **circle**: Circle (center x,y, radius)
- **poly**: Polygon (multiple x,y points)

---

### 6. Discuss hyperlinks and URL encoding in HTML. Write an HTML program that 
demonstrates the use of internal, external, and anchor links.

**Types of Links:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Link Types Demo</title>
</head>
<body>
    <h2>Hyperlink Examples</h2>
    
    <!-- External Link -->
    <a href="https://www.google.com" target="_blank">
        Visit Google (Opens in new tab)
    </a>
    
    <!-- Internal Link (same website) -->
    <a href="about.html">About Us Page</a>
    
    <!-- Anchor Link (same page) -->
    <a href="#section2">Jump to Section 2</a>
    
    <!-- Email Link -->
    <a href="mailto:contact@example.com">Send Email</a>
    
    <!-- Phone Link -->
    <a href="tel:+919876543210">Call Us</a>
    
    <hr>
    
    <h3 id="section2">Section 2 - URL Encoding</h3>
    
    <!-- URL with parameters (encoded) -->
    <a href="search.php?query=web%20development&sort=date">
        Search Results
    </a>
    
    <!-- Special characters encoded -->
    <a href="page.html?name=John%20Doe&city=New%20York">
        Profile Link
    </a>
</body>
</html>
```

**URL Encoding Rules:**
- Spaces → `%20` or `+`
- `&` → `%26`
- `=` → `%3D`
- `/` → `%2F`
- Special chars encoded as `%XX` (hex value)

**Why Encode?**
URLs can only contain certain characters. Special characters must be encoded to prevent breaking the URL structure.

---

### 7. Write an HTML program to create a formatted table using <thead>, <tbody>, and 
<tfoot>. Explain the purpose of each tag.

**Purpose:**
- **`<thead>`**: Table header rows
- **`<tbody>`**: Main table content
- **`<tfoot>`**: Footer/summary rows

**Example:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        thead { background: #4CAF50; color: white; }
        tfoot { background: #f2f2f2; font-weight: bold; }
        tbody tr:hover { background: #f5f5f5; }
    </style>
</head>
<body>
    <h2>Student Marks Report</h2>
    
    <table>
        <thead>
            <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Math</th>
                <th>Science</th>
                <th>Total</th>
            </tr>
        </thead>
        
        <tbody>
            <tr>
                <td>101</td>
                <td>Amit</td>
                <td>85</td>
                <td>90</td>
                <td>175</td>
            </tr>
            <tr>
                <td>102</td>
                <td>Priya</td>
                <td>92</td>
                <td>88</td>
                <td>180</td>
            </tr>
            <tr>
                <td>103</td>
                <td>Rahul</td>
                <td>78</td>
                <td>85</td>
                <td>163</td>
            </tr>
        </tbody>
        
        <tfoot>
            <tr>
                <td colspan="2">Class Average</td>
                <td>85</td>
                <td>87.7</td>
                <td>172.7</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
```

**Benefits:**
- Better structure and semantics
- Easier styling (target specific sections)
- Header/footer remain visible when scrolling (in some browsers)
- Improves accessibility

---

### 8. Explain the use of iframe in HTML. Write an example where an iframe is used as a 
target frame and describe its behavior in browsers.

**Purpose:** Embed another webpage inside current page and use as navigation target.

**Example:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Iframe Target Demo</title>
    <style>
        .sidebar { float: left; width: 30%; padding: 10px; }
        .content { float: left; width: 65%; padding: 10px; }
        iframe { width: 100%; height: 500px; border: 2px solid #333; }
        a { display: block; padding: 8px; margin: 5px 0; 
            background: #4CAF50; color: white; text-decoration: none; }
        a:hover { background: #45a049; }
    </style>
</head>
<body>
    <h2>Website Navigation Demo</h2>
    
    <div class="sidebar">
        <h3>Menu</h3>
        <!-- target="displayframe" loads pages in iframe -->
        <a href="home.html" target="displayframe">Home</a>
        <a href="about.html" target="displayframe">About</a>
        <a href="services.html" target="displayframe">Services</a>
        <a href="contact.html" target="displayframe">Contact</a>
        <a href="https://www.google.com" target="displayframe">Google</a>
    </div>
    
    <div class="content">
        <!-- iframe with name="displayframe" -->
        <iframe name="displayframe" src="home.html">
            Your browser doesn't support iframes.
        </iframe>
    </div>
</body>
</html>
```

**How It Works:**
1. Links have `target="displayframe"`
2. Iframe has `name="displayframe"`
3. Clicking link loads page inside iframe
4. Main page doesn't reload

**Browser Behavior:**
- Content loads within the frame boundary
- Independent scrolling
- URL bar shows parent page
- Security restrictions for cross-origin content

---

## Module 3: HTML Forms and Miscellaneous Topics

### 9. Explain the structure of an HTML form in detail. Write an HTML program 
demonstrating text fields, radio buttons, checkboxes, and dropdowns.

**Example:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Registration Form</title>
    <style>
        form { width: 500px; margin: 20px auto; padding: 20px; 
               background: #f9f9f9; border-radius: 8px; }
        label { display: block; margin: 10px 0 5px; font-weight: bold; }
        input, textarea, select { width: 100%; padding: 8px; 
                                  margin-bottom: 10px; box-sizing: border-box; }
        button { background: #4CAF50; color: white; padding: 10px 20px; 
                 border: none; cursor: pointer; font-size: 16px; }
        button:hover { background: #45a049; }
    </style>
</head>
<body>
    <form action="submit.php" method="POST">
        <h2>Student Registration</h2>
        
        <!-- Text Input -->
        <label for="name">Full Name:</label>
        <input type="text" id="name" name="name" required>
        
        <!-- Email Input -->
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <!-- Password Input -->
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        
        <!-- Radio Buttons -->
        <label>Gender:</label>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male" style="display:inline;">Male</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female" style="display:inline;">Female</label>
        
        <!-- Checkboxes -->
        <label>Interests:</label>
        <input type="checkbox" id="sports" name="interests[]" value="sports">
        <label for="sports" style="display:inline;">Sports</label>
        <input type="checkbox" id="music" name="interests[]" value="music">
        <label for="music" style="display:inline;">Music</label>
        <input type="checkbox" id="reading" name="interests[]" value="reading">
        <label for="reading" style="display:inline;">Reading</label>
        
        <!-- Dropdown Select -->
        <label for="course">Select Course:</label>
        <select id="course" name="course">
            <option value="">--Choose--</option>
            <option value="bca">BCA</option>
            <option value="mca">MCA</option>
            <option value="btech">B.Tech</option>
        </select>
        
        <!-- Textarea -->
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4"></textarea>
        
        <!-- Submit Button -->
        <button type="submit">Register</button>
    </form>
</body>
</html>
```

**Element Explanations:**
- **`<input type="text">`**: Single-line text
- **`<input type="email">`**: Email validation
- **`<input type="radio">`**: Single selection from group
- **`<input type="checkbox">`**: Multiple selections
- **`<select>`**: Dropdown menu
- **`<textarea>`**: Multi-line text
- **`<button>`**: Submit/action button

---

### 10. Discuss the importance of meta tags in HTML. Write examples showing the use of 
meta tags for SEO and browser control.


**Purpose:** Provide metadata about the webpage to browsers and search engines.

**Example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character Encoding -->
    <meta charset="UTF-8">
    
    <!-- Responsive Design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO: Page Description (shows in search results) -->
    <meta name="description" content="Learn web development with HTML, CSS, and JavaScript. Complete tutorials and examples for beginners.">
    
    <!-- SEO: Keywords -->
    <meta name="keywords" content="HTML, CSS, JavaScript, web development, tutorial">
    
    <!-- SEO: Author -->
    <meta name="author" content="John Doe">
    
    <!-- SEO: Robots (indexing instructions) -->
    <meta name="robots" content="index, follow">
    
    <!-- Social Media: Open Graph (Facebook) -->
    <meta property="og:title" content="Web Development Tutorial">
    <meta property="og:description" content="Complete guide to web development">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com">
    
    <!-- Social Media: Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Web Development Tutorial">
    
    <!-- Browser Compatibility -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Auto-refresh (redirect after 30 seconds) -->
    <meta http-equiv="refresh" content="30;url=https://example.com">
    
    <title>Web Development Tutorial</title>
</head>
<body>
    <h1>Welcome to Web Development</h1>
</body>
</html>
```

**SEO Benefits:**
- **Description**: Appears in search results, improves click-through
- **Keywords**: Helps search engines understand content (less important now)
- **Robots**: Controls indexing and crawling
- **Open Graph**: Better social media sharing
- **Viewport**: Mobile-friendly (Google ranking factor)

---

### 11. Compare HTML and XHTML. Discuss the advantages and disadvantages of XHTML 
over traditional HTML with examples.

**Key Differences:**

| Feature | HTML | XHTML |
|---------|------|-------|
| **Syntax** | Flexible | Strict (XML-based) |
| **Case Sensitivity** | Not case-sensitive | Lowercase only |
| **Closing Tags** | Optional for some | All tags must close |
| **Attribute Quotes** | Optional | Mandatory |
| **Empty Elements** | `<br>`, `<img>` | `<br />`, `<img />` |
| **Error Handling** | Forgiving | Strict, won't render |

**Examples:**

```html
<!-- HTML (Valid) -->
<P>This is a paragraph
<BR>
<IMG SRC="photo.jpg" width=300>

<!-- XHTML (Required) -->
<p>This is a paragraph</p>
<br />
<img src="photo.jpg" width="300" alt="Photo" />
```

**XHTML Advantages:**
- ✅ Cleaner, more consistent code
- ✅ Works with XML tools
- ✅ Better for mobile/embedded devices
- ✅ Forces good coding habits

**XHTML Disadvantages:**
- ❌ Less forgiving, harder for beginners
- ❌ One error breaks entire page
- ❌ More verbose
- ❌ HTML5 is now preferred

**Verdict:** HTML5 combines flexibility with modern features—XHTML is now rarely used.

---

### 12. Explain the purpose of HTML header tags (<title>, <link>, <script>, <meta>). 
Create an HTML document demonstrating the use of these tags and explain their 
output.

**Header Tags:** Provide metadata and resources for the webpage.

**Example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Title: Shows in browser tab and search results -->
    <title>My Web Development Site - Learn HTML & CSS</title>
    
    <!-- Base: Sets base URL for relative links -->
    <base href="https://www.example.com/" target="_blank">
    
    <!-- Link: External resources -->
    <!-- External CSS -->
    <link rel="stylesheet" href="styles.css">
    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
    
    <!-- Style: Internal CSS -->
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #4CAF50;
        }
    </style>
    
    <!-- Script: JavaScript -->
    <script>
        function greetUser() {
            alert('Welcome to our website!');
        }
    </script>
    <!-- External JS -->
    <script src="app.js" defer></script>
    
    <!-- Meta: Page information -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Learn web development">
</head>
<body onload="greetUser()">
    <h1>Welcome to Web Development</h1>
    <!-- With base tag, this links to https://www.example.com/about.html -->
    <a href="about.html">About Us</a>
</body>
</html>
```

**Output Behavior:**
- **Title**: "My Web Development Site..." appears in browser tab
- **Base**: All relative URLs use `https://www.example.com/` as prefix
- **Link**: CSS loads, font applies, favicon shows in tab
- **Style**: Background color, heading style applied
- **Script**: Alert shows when page loads
- **Meta**: Ensures UTF-8 encoding, mobile responsiveness

---

## Module 4: CSS3 Basics and Selectors

### 13. Explain CSS syntax and types of style sheets — inline, internal, and external. Create a 
web page showing all three methods and explain their differences.

**Example Demonstrating All Three:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Types Demo</title>
    
    <!-- EXTERNAL CSS -->
    <link rel="stylesheet" href="styles.css">
    <!-- styles.css contains:
    .external-style {
        background-color: lightblue;
        padding: 15px;
        border: 2px solid blue;
    }
    -->
    
    <!-- INTERNAL CSS -->
    <style>
        .internal-style {
            background-color: lightgreen;
            padding: 15px;
            border: 2px solid green;
            margin: 10px 0;
        }
        h2 {
            color: #333;
            font-family: Arial;
        }
    </style>
</head>
<body>
    <h1>CSS Types Comparison</h1>
    
    <!-- INLINE CSS -->
    <div style="background-color: lightcoral; padding: 15px; border: 2px solid red; margin: 10px 0;">
        <h2>1. Inline CSS</h2>
        <p>CSS applied directly in style attribute</p>
        <p><strong>Priority:</strong> Highest (overrides others)</p>
        <p><strong>Use:</strong> Quick one-time styling, dynamic styles</p>
    </div>
    
    <!-- INTERNAL CSS -->
    <div class="internal-style">
        <h2>2. Internal CSS</h2>
        <p>CSS defined in &lt;style&gt; tag in &lt;head&gt;</p>
        <p><strong>Priority:</strong> Medium</p>
        <p><strong>Use:</strong> Single-page styles</p>
    </div>
    
    <!-- EXTERNAL CSS -->
    <div class="external-style">
        <h2>3. External CSS</h2>
        <p>CSS defined in separate .css file</p>
        <p><strong>Priority:</strong> Lowest</p>
        <p><strong>Use:</strong> Multiple pages, maintainability</p>
    </div>
    
    <!-- DEMONSTRATION OF PRIORITY -->
    <div class="external-style internal-style" style="border-color: purple;">
        <h2>Priority Demo</h2>
        <p>Background: Internal (green) overrides External (blue)</p>
        <p>Border: Inline (purple) overrides both!</p>
    </div>
</body>
</html>
```

**Differences:**

| Type | Location | Reusability | Maintenance | Priority |
|------|----------|-------------|-------------|----------|
| **Inline** | HTML tag | Single element | Hard | Highest |
| **Internal** | `<head>` section | Same page | Medium | Medium |
| **External** | Separate file | Multiple pages | Easy | Lowest |

**Best Practice:** Use external CSS for consistency across pages!

---

### 14. Write a detailed note on CSS selectors. Explain ID, class, group, and descendant 
selectors with examples and their output.
**Example:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* ELEMENT SELECTOR */
        p {
            color: #333;
            line-height: 1.6;
        }
        
        /* ID SELECTOR (# symbol) */
        #header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        /* CLASS SELECTOR (. symbol) */
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
        
        .box {
            border: 2px solid #ddd;
            padding: 15px;
            margin: 10px 0;
        }
        
        /* GROUP SELECTOR (comma-separated) */
        h1, h2, h3 {
            font-family: Arial, sans-serif;
            color: #2c3e50;
        }
        
        /* DESCENDANT SELECTOR (space) */
        .container p {
            color: blue;
        }
        
        .container .special {
            color: red;
            font-style: italic;
        }
        
        /* MULTIPLE CLASSES */
        .box.featured {
            border-color: gold;
            background-color: #fffacd;
        }
    </style>
</head>
<body>
    <div id="header">
        <h1>CSS Selectors Demo</h1>
    </div>
    
    <div class="container">
        <h2>Understanding Selectors</h2>
        
        <!-- Class selector -->
        <p class="highlight">This paragraph has highlighting class</p>
        
        <!-- Descendant selector applies -->
        <p>This paragraph is blue (inside .container)</p>
        
        <div class="box">
            <h3>Regular Box</h3>
            <p class="special">Special text in red italic</p>
        </div>
        
        <!-- Multiple classes -->
        <div class="box featured">
            <h3>Featured Box</h3>
            <p>Gold border and yellow background!</p>
        </div>
    </div>
</body>
</html>
```

**Selector Types Output:**
- **Element (`p`)**: All paragraphs styled
- **ID (`#header`)**: Single unique element (green header)
- **Class (`.highlight`)**: Reusable yellow highlighting
- **Group (`h1, h2, h3`)**: Same style for multiple elements
- **Descendant (`.container p`)**: Paragraphs inside container are blue

**Specificity (Priority):**
1. Inline styles (highest)
2. ID selectors
3. Class selectors
4. Element selectors (lowest)

---

### 15.  What are pseudo-classes in CSS3? Explain different pseudo-classes like :hover, :focus, :first-child, and :nth-child with examples.

**Purpose:** Style elements based on their state or position.

**Example:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* :hover - When mouse is over element */
        .button:hover {
            background-color: #45a049;
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        /* :focus - When element has focus */
        input:focus {
            border: 2px solid #4CAF50;
            outline: none;
            background-color: #f0fff0;
        }
        
        input {
            padding: 8px;
            border: 2px solid #ddd;
            margin: 5px 0;
            width: 200px;
        }
        
        /* :first-child - First child element */
        li:first-child {
            color: red;
            font-weight: bold;
        }
        
        /* :last-child - Last child element */
        li:last-child {
            color: blue;
            font-style: italic;
        }
        
        /* :nth-child - Specific position */
        li:nth-child(2) {
            background-color: yellow;
        }
        
        /* :nth-child(even/odd) - Zebra striping */
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        
        /* Link pseudo-classes */
        a:link { color: blue; }
        a:visited { color: purple; }
        a:hover { color: red; text-decoration: underline; }
        a:active { color: orange; }
    </style>
</head>
<body>
    <h2>Pseudo-Classes Demo</h2>
    
    <!-- Hover Example -->
    <button class="button">Hover Over Me!</button>
    
    <!-- Focus Example -->
    <div style="margin: 20px 0;">
        <input type="text" placeholder="Click to focus">
    </div>
    
    <!-- First-child and nth-child -->
    <ul>
        <li>First item (red, bold)</li>
        <li>Second item (yellow background)</li>
        <li>Third item (normal)</li>
        <li>Last item (blue, italic)</li>
    </ul>
    
    <!-- Link states -->
    <a href="#">Unvisited Link</a> | 
    <a href="#visited">Visited Link</a>
    
    <!-- Even/odd rows -->
    <table border="1" style="margin-top: 20px; border-collapse: collapse;">
        <tr><td>Row 1 (odd - white)</td></tr>
        <tr><td>Row 2 (even - gray)</td></tr>
        <tr><td>Row 3 (odd - white)</td></tr>
        <tr><td>Row 4 (even - gray)</td></tr>
    </table>
</body>
</html>
```

**Common Pseudo-Classes:**
- **`:hover`**: Mouse over effect
- **`:focus`**: Input field is active
- **`:first-child`**: First element
- **`:nth-child(n)`**: Specific position
- **`:nth-child(even/odd)`**: Alternate styling
- **`:link/:visited`**: Link states

---

Below are **short, exam-ready answers in clean Markdown**, perfect for HTML/CSS subject.

---

### 16. Explain CSS background properties — background-color, background-image, background-repeat, and background-position. Write an example HTML file to 
show their combined effect.

#### **background-color**

Sets background color of an element.

#### **background-image**

Sets an image as background.

#### **background-repeat**

Controls repetition of background image.
Values: `repeat`, `no-repeat`, `repeat-x`, `repeat-y`

#### **background-position**

Sets starting position of background image.
Example: `center`, `top`, `left`, `50px 20px`

---

#### **Example: Combined Effect**

```html
<!DOCTYPE html>
<html>
<head>
<style>
.box {
    width: 400px;
    height: 200px;
    background-color: lightblue;
    background-image: url("bg.png");
    background-repeat: no-repeat;
    background-position: center;
}
</style>
</head>
<body>
<div class="box"></div>
</body>
</html>
```

---

### 17. Explain the CSS box model in detail with a neat diagram. Write a CSS example 
showing how margin, border, padding, and content affect layout.

**Box model = Content → Padding → Border → Margin**

```
+---------------------------+
|        Margin             |
|  +---------------------+  |
|  |       Border        |  |
|  |  +----------------+ |  |
|  |  |    Padding     | |  |
|  |  | +------------+ | |  |
|  |  | |  Content   | | |  |
|  |  | +------------+ | |  |
|  |  +----------------+ |  |
|  +---------------------+  |
+---------------------------+
```

#### **Example**

```html
<style>
.box {
    margin: 20px;
    border: 5px solid black;
    padding: 15px;
    width: 200px;
}
</style>

<div class="box">Content area</div>
```

---

### 18. Discuss various CSS positioning techniques (static, relative, absolute, fixed). Write an 
HTML program to demonstrate the difference between them.

#### **static** — default flow

#### **relative** — moves relative to normal position

#### **absolute** — positioned relative to nearest positioned parent

#### **fixed** — stays fixed on screen while scrolling

#### **Example**

```html
<style>
.box1 { position: static; }
.box2 { position: relative; top: 10px; left: 20px; }
.box3 { position: absolute; top: 20px; left: 50px; }
.box4 { position: fixed; top: 0; right: 0; }
</style>

<div class="box1">Static</div>
<div class="box2">Relative</div>
<div class="box3">Absolute</div>
<div class="box4">Fixed</div>
```

---

### 19. Explain text and font properties in CSS3. Write an example webpage to demonstrate 
font-family, font-size, text-transform, and text-decoration.

#### **font-family** — type of font

#### **font-size** — size of text

#### **text-transform** — uppercase/lowercase/capitalize

#### **text-decoration** — underline/overline/none

#### **Example**

```html
<style>
p {
    font-family: Arial;
    font-size: 20px;
    text-transform: uppercase;
    text-decoration: underline;
}
</style>

<p>Hello World</p>
```

---

### 20. Describe the use of CSS list and table properties. Create a styled list and a formatted 
table using CSS, and explain the role of each property used

#### **List Properties**

* `list-style-type` — circle, square, none
* `list-style-image` — custom image bullet
* `list-style-position` — inside/outside

#### **Table Properties**

* `border`, `border-collapse`, `padding`, `text-align`, `width`

---

#### **Example: Styled List & Table**

```html
<style>
ul {
    list-style-type: square;
    padding-left: 30px;
}

table {
    border-collapse: collapse;
    width: 300px;
}

td, th {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
}
</style>

<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<table>
  <tr><th>Name</th><th>Age</th></tr>
  <tr><td>John</td><td>21</td></tr>
</table>
```

---
