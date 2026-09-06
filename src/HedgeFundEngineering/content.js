// ==========================================================================
// ByteByteGo Course Curriculum Data
// High-Yield Conceptual Architecture & Visual Patterns
// ==========================================================================

const COURSE_DATA = [
  {
    id: "clr-memory",
    title: "1. CLR Internals & Memory Architecture",
    bookTag: "CLR via C# (Richter)",
    lessons: [
      {
        id: "stack-heap-boxing",
        title: "Stack vs Heap & The Hidden Cost of Boxing",
        readTime: "6 min read",
        subtitle: "Visualizing value types, reference type allocations, and CPU cache performance.",
        content: `
          <h2>Overview: Memory Models in High-Frequency Trading</h2>
          <p>In low-latency and hedge fund engineering, memory access latency dictates throughput. Accessing CPU L1 Cache takes <strong>~1 ns</strong>, main RAM takes <strong>~50-100 ns</strong>, and a Gen 2 Garbage Collection pause can halt threads for <strong>10,000,000 ns (10 ms)</strong>.</p>
          
          <div class="diagram-card">
            <div class="diagram-header">Memory Topology: Thread Stack vs Managed Heap</div>
            <svg class="diagram-svg" viewBox="0 0 700 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Stack Box -->
              <rect x="20" y="20" width="300" height="200" rx="8" fill="#1E293B" stroke="#4F46E5" stroke-width="2"/>
              <text x="35" y="50" fill="#818CF8" font-size="14" font-weight="bold" font-family="sans-serif">THREAD STACK (Fast, Local)</text>
              <rect x="35" y="65" width="270" height="35" rx="4" fill="#334155"/>
              <text x="45" y="88" fill="#F8FAFC" font-size="12" font-family="monospace">int quantity = 1000000; [4B]</text>
              <rect x="35" y="110" width="270" height="35" rx="4" fill="#334155"/>
              <text x="45" y="133" fill="#F8FAFC" font-size="12" font-family="monospace">double price = 1.0850; [8B]</text>
              <rect x="35" y="155" width="270" height="35" rx="4" fill="#4338CA"/>
              <text x="45" y="178" fill="#F8FAFC" font-size="12" font-family="monospace">Order* ptrRef ─────────┐ [8B]</text>

              <!-- Arrow -->
              <path d="M 305 172 L 375 120" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="4 4" marker-end="url(#arrow)"/>

              <!-- Heap Box -->
              <rect x="380" y="20" width="300" height="200" rx="8" fill="#1E293B" stroke="#0EA5E9" stroke-width="2"/>
              <text x="395" y="50" fill="#38BDF8" font-size="14" font-weight="bold" font-family="sans-serif">MANAGED HEAP (GC Monitored)</text>
              <rect x="395" y="65" width="270" height="135" rx="4" fill="#0F172A" stroke="#334155"/>
              <text x="405" y="90" fill="#A855F7" font-size="11" font-family="monospace">SyncBlock Index (8 Bytes)</text>
              <text x="405" y="110" fill="#EC4899" font-size="11" font-family="monospace">MethodTable Pointer (8 Bytes)</text>
              <text x="405" y="130" fill="#10B981" font-size="11" font-family="monospace">string Symbol: "EUR/USD" (Ref)</text>
              <text x="405" y="150" fill="#F8FAFC" font-size="11" font-family="monospace">decimal Notional: $1,085,000</text>
              <text x="405" y="180" fill="#64748B" font-size="10" font-family="sans-serif">* Aligned to 8-byte 64-bit boundaries</text>
            </svg>
          </div>

          <h2>The Mechanical Cost of Boxing</h2>
          <p>Boxing occurs whenever a value type (like an <code>int</code>, <code>struct</code>, or <code>enum</code>) is cast to <code>object</code> or an interface. The CLR must allocate a brand-new object on the heap, copy the stack bits, and write the 16-byte object overhead.</p>

          <div class="code-card">
            <div class="code-header">
              <span class="code-language">C# Benchmark</span>
              <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code>// ❌ ANTI-PATTERN: Boxing in a high-throughput loop
ArrayList blotter = new ArrayList();
for (int i = 0; i < 500_000; i++)
{
    blotter.Add(i); // Triggers 500,000 heap allocations + GC Gen 0 churn!
}

// ✅ PRODUCTION: Strongly-typed generic collection
List&lt;int&gt; fastBlotter = new List&lt;int&gt;(500_000);
for (int i = 0; i < 500_000; i++)
{
    fastBlotter.Add(i); // Pure contiguous stack memory, 0 heap allocations
}</code></pre>
          </div>

          <div class="callout callout-trap">
            <div class="callout-icon">⚠️</div>
            <div class="callout-content">
              <div class="callout-title">Interview Trap: Interface Boxing on Structs</div>
              <p>Passing a <code>struct</code> to a method accepting an interface (e.g. <code>void Process(ITrade trade)</code>) <strong>boxes the struct</strong>! To avoid boxing while writing generic code, use a generic constraint: <code>void Process&lt;T&gt;(T trade) where T : struct, ITrade</code>. The JIT compiler emits dedicated native machine code with zero boxing.</p>
            </div>
          </div>
        `
      },
      {
        id: "gc-generations-loh",
        title: "Garbage Collector Architecture (Gen 0, 1, 2, LOH, POH)",
        readTime: "8 min read",
        subtitle: "Deep dive into Mark-Sweep-Compact, Large Object Heap, and low-latency tuning.",
        content: `
          <h2>The Generational Hypothesis</h2>
          <p>The .NET Garbage Collector operates on the empirical rule: <em>"The newer an object is, the shorter its expected lifespan."</em> Memory is partitioned into logical generations to avoid scanning the entire heap on every collection.</p>

          <div class="diagram-card">
            <div class="diagram-header">GC Generations & Promotion Pipeline</div>
            <svg class="diagram-svg" viewBox="0 0 700 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Gen 0 -->
              <rect x="20" y="30" width="180" height="140" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
              <text x="35" y="60" fill="#34D399" font-size="14" font-weight="bold">GEN 0 (Ephemeral)</text>
              <text x="35" y="85" fill="#94A3B8" font-size="11">Short-lived local variables</text>
              <text x="35" y="105" fill="#94A3B8" font-size="11">Allocated continuously</text>
              <text x="35" y="135" fill="#F8FAFC" font-size="12">Collection: ~10-50 µs</text>

              <!-- Gen 1 -->
              <rect x="260" y="30" width="180" height="140" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
              <text x="275" y="60" fill="#FBBF24" font-size="14" font-weight="bold">GEN 1 (Buffer)</text>
              <text x="275" y="85" fill="#94A3B8" font-size="11">Objects surviving Gen 0</text>
              <text x="275" y="105" fill="#94A3B8" font-size="11">Short-to-medium lifespan</text>
              <text x="275" y="135" fill="#F8FAFC" font-size="12">Collection: ~100-500 µs</text>

              <!-- Gen 2 -->
              <rect x="500" y="30" width="180" height="140" rx="8" fill="#1E293B" stroke="#EF4444" stroke-width="2"/>
              <text x="515" y="60" fill="#F87171" font-size="14" font-weight="bold">GEN 2 (Long-Lived)</text>
              <text x="515" y="85" fill="#94A3B8" font-size="11">Singletons, Caches, Pools</text>
              <text x="515" y="105" fill="#94A3B8" font-size="11">Full GC sweeps everything</text>
              <text x="515" y="135" fill="#F8FAFC" font-size="12">Collection: 5 - 50+ ms ⚠️</text>

              <!-- Promotion Arrows -->
              <path d="M 205 100 L 255 100" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>
              <path d="M 445 100 L 495 100" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>
            </svg>
          </div>

          <h2>The Large Object Heap (LOH) Fragmentation Risk</h2>
          <p>Objects <strong>$\ge 85,000$ bytes</strong> (such as large arrays or large memory buffers) bypass Gen 0 and Gen 1 and are allocated directly on the <strong>Large Object Heap</strong>. The LOH is rarely compacted because copying multi-megabyte objects wastes heavy CPU cycles, causing memory fragmentation over time.</p>

          <div class="callout callout-insight">
            <div class="callout-icon">💡</div>
            <div class="callout-content">
              <div class="callout-title">Production GC Tuning for Market Hours</div>
              <p>In institutional trading services, you can suppress Gen 2 blocking pauses between market open and close (9:30 AM – 4:00 PM EST):</p>
              <code>GCSettings.LatencyMode = GCLatencyMode.SustainedLowLatency;</code>
            </div>
          </div>
        `
      },
      {
        id: "span-zero-alloc",
        title: "Zero-Allocation Engineering with Span<T> & ArrayPool<T>",
        readTime: "7 min read",
        subtitle: "Eliminating string parsing overhead in market data feed handlers.",
        content: `
          <h2>Slicing Memory Without Allocating</h2>
          <p>Traditional string operations like <code>string.Substring()</code> allocate a new string on the heap for every slice. When parsing 500,000 FIX messages or JSON packets per second, this creates millions of ephemeral objects.</p>
          <p><code>Span&lt;T&gt;</code> and <code>ReadOnlySpan&lt;T&gt;</code> represent contiguous regions of arbitrary memory (stack, heap, or native memory) providing type-safe, bounds-checked access with <strong>0 bytes allocated</strong>.</p>

          <div class="code-card">
            <div class="code-header">
              <span class="code-language">C# Zero-Alloc Parser</span>
              <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code>using System.Buffers;

public void ProcessMarketData(ReadOnlySpan&lt;char&gt; rawMessage)
{
    // Message: "FIX|20260906|EURUSD|1000000|1.0850"
    // Slice directly without creating strings on the heap!
    ReadOnlySpan&lt;char&gt; symbol = rawMessage.Slice(13, 6); // "EURUSD"
    ReadOnlySpan&lt;char&gt; priceStr = rawMessage.Slice(28, 6); // "1.0850"

    double price = double.Parse(priceStr); // Direct parse from span!
}

// Renting buffers from memory pool instead of new byte[4096]
public void ReceiveSocketBytes(int packetSize)
{
    byte[] buffer = ArrayPool&lt;byte&gt;.Shared.Rent(4096);
    try
    {
        // Use rented memory buffer...
    }
    finally
    {
        ArrayPool&lt;byte&gt;.Shared.Return(buffer, clearArray: false);
    }
}</code></pre>
          </div>

          <div class="callout callout-defense">
            <div class="callout-icon">🛡️</div>
            <div class="callout-content">
              <div class="callout-title">Interview Defense: What is a &apos;ref struct&apos;?</div>
              <p><code>Span&lt;T&gt;</code> is declared as <code>ref struct</code>. The CLR enforces at compile time that it can <strong>never escape to the managed heap</strong> (it cannot be boxed, cannot be an element of a regular class, and cannot survive across async <code>await</code> boundaries). This guarantees 100% stack allocation.</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "concurrency",
    title: "2. Concurrency, Threading & Lock-Free",
    bookTag: "Concurrency in C# (Cleary)",
    lessons: [
      {
        id: "async-state-machine",
        title: "The Async/Await State Machine Internals",
        readTime: "8 min read",
        subtitle: "How the compiler transforms async methods into IAsyncStateMachine structs.",
        content: `
          <h2>Async is Not Threading: It's Continuation</h2>
          <p>When you declare a method as <code>async Task</code>, the C# compiler generates an internal struct implementing <code>IAsyncStateMachine</code>. Instead of blocking an OS thread during network/disk I/O, the thread is released back to the ThreadPool while the OS I/O Completion Port (IOCP) awaits the signal.</p>

          <div class="diagram-card">
            <div class="diagram-header">Async/Await Non-Blocking Lifecycle</div>
            <svg class="diagram-svg" viewBox="0 0 700 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="30" width="180" height="60" rx="6" fill="#1E293B" stroke="#4F46E5" stroke-width="2"/>
              <text x="45" y="65" fill="#818CF8" font-size="12" font-weight="bold">Worker Thread 1</text>
              <text x="45" y="80" fill="#94A3B8" font-size="10">Runs code until await</text>

              <path d="M 210 60 L 280 60" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>

              <rect x="280" y="20" width="180" height="80" rx="6" fill="#0F172A" stroke="#F59E0B" stroke-width="2"/>
              <text x="295" y="45" fill="#FBBF24" font-size="12" font-weight="bold">Await Point (I/O)</text>
              <text x="295" y="65" fill="#94A3B8" font-size="10">Thread 1 released to Pool!</text>
              <text x="295" y="85" fill="#10B981" font-size="10">IOCP waiting for network</text>

              <path d="M 460 60 L 530 60" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>

              <rect x="530" y="30" width="180" height="60" rx="6" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
              <text x="545" y="65" fill="#34D399" font-size="12" font-weight="bold">Worker Thread 2</text>
              <text x="545" y="80" fill="#94A3B8" font-size="10">Picks up continuation</text>
            </svg>
          </div>

          <h2>The Deadly Sync-over-Async Trap</h2>
          <p>Calling <code>.Result</code> or <code>.Wait()</code> on an asynchronous task blocks the calling ThreadPool thread. In high-traffic services, all ThreadPool threads quickly become blocked waiting for completions, causing <strong>ThreadPool Starvation</strong> and complete service unresponsiveness.</p>

          <div class="code-card">
            <div class="code-header">
              <span class="code-language">C# ThreadPool Starvation Anti-Pattern</span>
              <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code>// ❌ DEADLOCK / STARVATION HAZARD:
public IActionResult GetPrices()
{
    // Blocks ThreadPool worker while task continuation tries to schedule on the same pool
    var prices = _service.GetPricesAsync().Result; 
    return Ok(prices);
}

// ✅ ASYNC ALL THE WAY DOWN:
public async Task&lt;IActionResult&gt; GetPricesAsync()
{
    var prices = await _service.GetPricesAsync().ConfigureAwait(false);
    return Ok(prices);
}</code></pre>
          </div>
        `
      },
      {
        id: "lock-free-cas",
        title: "Lock-Free Programming with CAS (Interlocked) & Channels",
        readTime: "9 min read",
        subtitle: "High-throughput producer-consumer order books without locking contention.",
        content: `
          <h2>Compare-And-Swap (CAS) Hardware Loops</h2>
          <p>In high-frequency trading order books, acquiring OS mutexes or monitor locks introduces CPU context-switching overhead. A lock-free CAS loop uses the CPU's native atomic instructions (<code>LOCK CMPXCHG</code> on x86/x64) via <code>Interlocked.CompareExchange</code>.</p>

          <div class="code-card">
            <div class="code-header">
              <span class="code-language">C# Lock-Free Accumulator</span>
              <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code>public class LockFreeOrderCounter
{
    private long _totalVolume = 0;

    public void AddVolume(long fillQuantity)
    {
        long initial;
        long updated;
        do
        {
            initial = Interlocked.Read(ref _totalVolume);
            updated = initial + fillQuantity;
            // Atomic CAS: If _totalVolume == initial, swap with updated.
            // If another thread modified it in between, loop and retry!
        }
        while (Interlocked.CompareExchange(ref _totalVolume, updated, initial) != initial);
    }
}</code></pre>
          </div>

          <h2>Modern Producer-Consumer with System.Threading.Channels</h2>
          <p><code>System.Threading.Channels</code> is the modern, zero-allocation replacement for <code>BlockingCollection&lt;T&gt;</code>. Configuring a bounded channel with <code>SingleReader = true</code> allows the consumer worker thread to run completely lock-free!</p>
        `
      }
    ]
  },
  {
    id: "sql-performance",
    title: "3. SQL Server Execution Plans & Index Tuning",
    bookTag: "SQL Execution Plans (Fritchey)",
    lessons: [
      {
        id: "key-lookup-elimination",
        title: "Execution Plans: Eliminating Costly Key Lookups",
        readTime: "8 min read",
        subtitle: "How covering indexes with INCLUDE convert random I/O into lightning seeks.",
        content: `
          <h2>What is a Key Lookup?</h2>
          <p>When an SQL query executes, the engine searches a non-clustered index for matching rows. If the query requests columns that are <strong>not stored in that index</strong>, SQL Server must jump back into the Clustered Index (the base data table) for every single matching row. This random I/O operation is known as a <strong>Key Lookup (Bookmark Lookup)</strong>.</p>

          <div class="diagram-card">
            <div class="diagram-header">Anatomy of a Key Lookup vs Covering Seek</div>
            <svg class="diagram-svg" viewBox="0 0 700 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Non Clustered Index -->
              <rect x="30" y="30" width="280" height="150" rx="8" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
              <text x="45" y="60" fill="#FBBF24" font-size="13" font-weight="bold">Non-Clustered Index: IX_Account</text>
              <text x="45" y="85" fill="#94A3B8" font-size="11">Key: (AccountId, OrderStatus)</text>
              <text x="45" y="115" fill="#34D399" font-size="12">1. Index Seek finds 50,000 rows</text>
              <text x="45" y="145" fill="#EF4444" font-size="11">Missing: Symbol, Price, Qty!</text>

              <!-- Arrow -->
              <path d="M 310 115 L 390 115" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="4 4" marker-end="url(#arrow)"/>
              <text x="320" y="105" fill="#EF4444" font-size="10" font-weight="bold">50,000 Random I/O Lookups!</text>

              <!-- Clustered Index -->
              <rect x="400" y="30" width="270" height="150" rx="8" fill="#1E293B" stroke="#EF4444" stroke-width="2"/>
              <text x="415" y="60" fill="#F87171" font-size="13" font-weight="bold">Base Table (Clustered Index)</text>
              <text x="415" y="85" fill="#94A3B8" font-size="11">PK_Orders (OrderId)</text>
              <text x="415" y="115" fill="#CBD5E1" font-size="11">Fetches Symbol, Price, Qty</text>
              <text x="415" y="145" fill="#FBBF24" font-size="11">Result: High Disk Latency!</text>
            </svg>
          </div>

          <h2>The Fix: Creating a Covering Index with INCLUDE</h2>
          <div class="code-card">
            <div class="code-header">
              <span class="code-language">SQL Optimization</span>
              <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code>-- ❌ Causes Key Lookups for non-indexed columns
CREATE NONCLUSTERED INDEX IX_Orders_Account 
ON Orders (AccountId, OrderStatus);

-- ✅ OPTIMIZED: The Covering Index
-- Stores requested query columns directly at the leaf level
CREATE NONCLUSTERED INDEX IX_Orders_Account_Covering
ON Orders (AccountId, OrderStatus)
INCLUDE (Symbol, Price, Quantity); -- Zero Key Lookups! Pure Index Seek.</code></pre>
          </div>
        `
      },
      {
        id: "parameter-sniffing",
        title: "Parameter Sniffing: Diagnosis and Production Solutions",
        readTime: "7 min read",
        subtitle: "Why a stored procedure runs in 2ms for test accounts and times out for institutional funds.",
        content: `
          <h2>The Parameter Sniffing Dilemma</h2>
          <p>When a stored procedure compiles for the first time, SQL Server inspects the exact parameters passed to estimate the result cardinality and generates a cached execution plan. If it compiles with a small account (2 rows), it builds an <code>Index Seek + Nested Loops</code> plan. If executed next with an institutional account (2,000,000 rows), the nested loops plan causes a <strong>100% CPU freeze</strong>.</p>

          <div class="callout callout-insight">
            <div class="callout-icon">💡</div>
            <div class="callout-content">
              <div class="callout-title">The Three Standard Architectural Fixes</div>
              <p><strong>1. OPTION (OPTIMIZE FOR UNKNOWN):</strong> Forces the optimizer to use statistical density vector averages instead of sniffing the parameter.</p>
              <p><strong>2. Local Variable Decoupling:</strong> Assigning parameter to a local variable (<code>DECLARE @Local = @Param</code>) hides the value from parameter sniffers.</p>
              <p><strong>3. OPTION (RECOMPILE):</strong> Forces plan compilation on every execution (ideal for volatile reporting queries).</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "rabbitmq-ddia",
    title: "4. Distributed Systems & RabbitMQ",
    bookTag: "RabbitMQ in Depth & DDIA",
    lessons: [
      {
        id: "amqp-zero-loss",
        title: "The 3-Legged Zero-Loss Guarantee in AMQP",
        readTime: "8 min read",
        subtitle: "Publisher confirms, queue durability, and manual consumer acknowledgments.",
        content: `
          <h2>Never Losing a Trade Execution</h2>
          <p>Financial message buses must guarantee zero message loss across server restarts and network dropouts. RabbitMQ achieves this through three coordinated mechanisms:</p>

          <div class="diagram-card">
            <div class="diagram-header">The 3-Legged Reliability Topology</div>
            <svg class="diagram-svg" viewBox="0 0 700 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="40" width="160" height="100" rx="8" fill="#1E293B" stroke="#4F46E5" stroke-width="2"/>
              <text x="35" y="70" fill="#818CF8" font-size="13" font-weight="bold">1. Publisher</text>
              <text x="35" y="95" fill="#94A3B8" font-size="11">ConfirmSelect()</text>
              <text x="35" y="115" fill="#34D399" font-size="11">Waits for Broker ACK</text>

              <path d="M 180 90 L 260 90" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>

              <rect x="260" y="40" width="180" height="100" rx="8" fill="#1E293B" stroke="#0EA5E9" stroke-width="2"/>
              <text x="275" y="70" fill="#38BDF8" font-size="13" font-weight="bold">2. Broker Disk</text>
              <text x="275" y="95" fill="#94A3B8" font-size="11">Queue: durable=true</text>
              <text x="275" y="115" fill="#FBBF24" font-size="11">Msg: DeliveryMode=2</text>

              <path d="M 440 90 L 520 90" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)"/>

              <rect x="520" y="40" width="160" height="100" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
              <text x="535" y="70" fill="#34D399" font-size="13" font-weight="bold">3. Consumer</text>
              <text x="535" y="95" fill="#94A3B8" font-size="11">autoAck: false</text>
              <text x="535" y="115" fill="#F8FAFC" font-size="11">ACK after DB Commit</text>
            </svg>
          </div>
        `
      },
      {
        id: "transactional-outbox",
        title: "The Transactional Outbox Pattern",
        readTime: "7 min read",
        subtitle: "Solving the dual-write problem between SQL Server and message brokers.",
        content: `
          <h2>The Dual-Write Hazard</h2>
          <p>If a service commits a trade to SQL Server and then attempts to publish an event to RabbitMQ, a crash between the two creates an irrecoverable state inconsistency. Distributed 2-Phase Commit (2PC) is notoriously slow.</p>
          <p>The <strong>Transactional Outbox Pattern</strong> solves this by writing the trade and the message payload into the <strong>same local SQL transaction</strong>. A background relay worker reliably publishes committed events to RabbitMQ.</p>
        `
      }
    ]
  },
  {
    id: "python-quant",
    title: "5. Python Quant Analytics & C# Bridge",
    bookTag: "Caxton Quant Stack",
    lessons: [
      {
        id: "vectorized-var",
        title: "Vectorized Value at Risk (VaR) & Portfolio Analytics",
        readTime: "8 min read",
        subtitle: "Calculating historical 95% and 99% VaR 100x faster using NumPy vectorization.",
        content: `
          <h2>The Vectorization Advantage</h2>
          <p>Python <code>for</code> loops incur interpreter overhead on every iteration. NumPy executes contiguous C-level SIMD/AVX array operations, delivering 50x-100x speedups for financial risk calculations.</p>

          <div class="code-card">
            <div class="code-header">
              <span class="code-language">Python Vectorized VaR</span>
              <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            </div>
            <pre><code>import numpy as np

def calculate_portfolio_var(portfolio_value: float, returns: np.ndarray, confidence: float = 0.95) -> float:
    """
    Computes Historical Value at Risk (VaR).
    Answers: What is the maximum expected dollar loss at 95% confidence?
    """
    cutoff = np.percentile(returns, (1.0 - confidence) * 100)
    dollar_loss = -cutoff * portfolio_value
    return max(0.0, dollar_loss)

# Simulating a $50M Global Macro portfolio
portfolio_val = 50_000_000.0
daily_returns = np.random.normal(loc=0.0005, scale=0.012, size=1000)

var_95 = calculate_portfolio_var(portfolio_val, daily_returns, 0.95)
print(f"95% 1-Day Portfolio VaR: USD {var_95:,.2f}")</code></pre>
          </div>
        `
      }
    ]
  }
];
