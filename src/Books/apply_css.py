import os, glob, re

dst_dir = r'C:\Users\onerock\Downloads\PROJECT\AniketDeshmane.github.io\src\Books'
html_files = glob.glob(os.path.join(dst_dir, 'Book_*.html'))

css_style = '''
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
    body {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background-color: #0f172a;
        color: #e2e8f0;
        line-height: 1.7;
        margin: 0;
        padding: 2rem 1rem;
        font-size: 1.05rem;
    }
    .reader-container {
        max-width: 850px;
        margin: 0 auto;
        padding: 3rem 4rem;
        background-color: #1e293b;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
    }
    @media (max-width: 768px) {
        .reader-container {
            padding: 1.5rem 1.5rem;
        }
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 2rem auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    }
    h1, h2, h3, h4, h5, h6 {
        color: #38bdf8;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        font-weight: 700;
        line-height: 1.3;
    }
    h1 { font-size: 2.2rem; border-bottom: 2px solid #334155; padding-bottom: 0.5rem; }
    h2 { font-size: 1.8rem; }
    h3 { font-size: 1.5rem; }
    p {
        margin-bottom: 1.2rem;
        color: #cbd5e1;
    }
    a {
        color: #38bdf8;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    ul, ol {
        margin-bottom: 1.2rem;
        padding-left: 2rem;
    }
    li {
        margin-bottom: 0.5rem;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1.5rem;
    }
    th, td {
        border: 1px solid #334155;
        padding: 0.75rem;
        text-align: left;
    }
    th {
        background-color: #0f172a;
        color: #38bdf8;
    }
    code {
        background-color: #0f172a;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9em;
        color: #fca5a5;
    }
    pre {
        background-color: #0f172a;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        border: 1px solid #334155;
    }
    pre code {
        background-color: transparent;
        padding: 0;
        color: #e2e8f0;
    }
</style>
'''

for html_path in html_files:
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it already has reader-container, skip to avoid double wrapping
    if '<div class="reader-container">' in content:
        continue

    # Inject CSS before </head>
    if '</head>' in content:
        content = content.replace('</head>', css_style + '\n</head>')
    else:
        # Fallback if no <head>
        content = '<head>' + css_style + '</head>' + content

    # Wrap body contents
    # We will find <body> and </body>
    body_start_match = re.search(r'<body[^>]*>', content)
    if body_start_match:
        body_start = body_start_match.end()
        body_end_match = re.search(r'</body>', content)
        if body_end_match:
            body_end = body_end_match.start()
            
            new_content = (
                content[:body_start] +
                '\n<div class="reader-container">\n' +
                content[body_start:body_end] +
                '\n</div>\n' +
                content[body_end:]
            )
            content = new_content

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Successfully injected CSS and wrapper into HTML files.")
