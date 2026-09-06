import os, glob, shutil, re

src_dir = r'C:\Users\onerock\Downloads\PROJECT\Interviews\Books_HTML'
dst_dir = r'C:\Users\onerock\Downloads\PROJECT\AniketDeshmane.github.io\src\Books'

os.makedirs(dst_dir, exist_ok=True)

html_files = glob.glob(os.path.join(src_dir, '*.html'))

books_info = []

for html_path in html_files:
    filename = os.path.basename(html_path)
    book_id = os.path.splitext(filename)[0]
    
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = re.sub(r'src=\"[^\"]*_images/', f'src=\"{book_id}_images/', content)
    
    dst_html = os.path.join(dst_dir, filename)
    with open(dst_html, 'w', encoding='utf-8') as f:
        f.write(content)
        
    title_match = re.search(r'<h1.*?>(.*?)</h1>', content)
    if not title_match:
        title_match = re.search(r'<h2.*?>(.*?)</h2>', content)
        
    title = title_match.group(1).strip() if title_match else book_id
    books_info.append((filename, title))
    
    src_img_dir = os.path.join(src_dir, f'{book_id}_images')
    dst_img_dir = os.path.join(dst_dir, f'{book_id}_images')
    if os.path.exists(src_img_dir):
        shutil.copytree(src_img_dir, dst_img_dir, dirs_exist_ok=True)

index_html = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ByteByteGo Interview Books</title>
<style>
body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; line-height: 1.6; }
h1 { color: #38bdf8; text-align: center; margin-bottom: 2rem; font-size: 2.5rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 0 auto; }
.card { background: #1e293b; padding: 1.5rem; border-radius: 12px; border: 1px solid #334155; transition: transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; text-decoration: none; color: inherit; }
.card:hover { transform: translateY(-4px); border-color: #38bdf8; }
.card h2 { font-size: 1.2rem; color: #e2e8f0; margin: 0; }
</style>
</head>
<body>
<h1>ByteByteGo Library</h1>
<div class="grid">
'''

books_info.sort()
for filename, title in books_info:
    clean_title = re.sub(r'<.*?>', '', title)
    index_html += f'<a href="{filename}" class="card">\n<h2>{clean_title}</h2>\n</a>\n'

index_html += '''
</div>
</body>
</html>
'''

with open(os.path.join(dst_dir, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(index_html)
