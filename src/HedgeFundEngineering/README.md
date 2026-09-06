# ByteByteGo-Style Hedge Fund Engineering Course Portal

A modern, high-yield, interactive visual learning portal inspired by [ByteByteGo](https://bytebytego.com), specifically designed for **Senior C#, Python, SQL, and Systems Architecture** interviews (Caxton Associates & Institutional Finance).

---

## 🌟 Visual & Architectural Features

- **ByteByteGo Visual Design**:
  - Clean, spacious typography (`Plus Jakarta Sans` + `JetBrains Mono`).
  - **Dark / Light Mode** toggle with persistence in `localStorage`.
  - Nested, collapsible curriculum sidebar with lesson counts and active indicators.
  - Sticky right-hand **Table of Contents (TOC)** with smooth section scrolling.
  - Real-time search filter (`⌘K` or `Ctrl+K`) across all patterns, algorithms, and concepts.
  - Dynamic progress bar tracking completed lessons.
- **Embedded Architecture Diagrams**:
  - Thread Stack vs Managed Heap memory layout.
  - GC Generation pipeline (Gen 0, 1, 2, LOH, POH).
  - Non-blocking `async`/`await` state machine execution.
  - SQL Server B-Tree Index Seek vs Key Lookup.
  - RabbitMQ 3-Legged Reliability Topology.
- **Interview Callouts**:
  - 💡 **Key Insights**: Senior architectural principles.
  - ⚠️ **Interview Traps**: Subtle gotchas frequently tested by panel interviewers.
  - 🛡️ **Interview Defense**: Exact phrasing and justifications to use in interviews.
- **Interactive Code Blocks**:
  - Syntax highlighted C#, SQL, and Python code cards with one-click **Copy** buttons.

---

## 🚀 How to Launch

### Option 1: Direct File Opening (No Server Required)
Simply double-click [`index.html`](file:///C:/Users/onerock/Downloads/PROJECT/Interviews/ByteByteGo_Course/index.html) or open it directly in Google Chrome, Edge, Brave, or Firefox.

### Option 2: Run via Local HTTP Server
Run from PowerShell / Terminal:
```bash
cd C:\Users\onerock\Downloads\PROJECT\Interviews\ByteByteGo_Course
python -m http.server 8080
```
Then visit: `http://localhost:8080` in your browser.
