import os
import glob
from bs4 import BeautifulSoup

base_dir = r'C:\Users\onerock\Downloads\PROJECT\AniketDeshmane.github.io\src\Books'
books_list = []

for i in range(1, 9):
    folder = f'Book_{i}'
    html_file = os.path.join(base_dir, folder, 'index.html')
    books_list.append((folder, folder))

html = '''<!DOCTYPE html>
<html><head><title>Interview Books</title>
<style>
body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
a { color: #38bdf8; text-decoration: none; font-size: 1.2rem; display: block; margin-bottom: 1rem; padding: 1rem; background: #1e293b; border-radius: 8px; }
a:hover { background: #334155; }
</style>
</head><body>
<h1>Interview Books Reference</h1>
<p>Converted from PDFs</p>
'''

for folder, title in books_list:
    html += f'<a href="{folder}/index.html">View {title}</a>\n'

html += '</body></html>'

with open(os.path.join(base_dir, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(html)
