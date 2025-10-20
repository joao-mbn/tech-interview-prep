### 🧩 Architecture & Design Interview Practice

---

#### **Question 1**
You’re designing a Django-based backend that serves a Next.js frontend.
The app must handle both logged-in and public users. Logged-in users need server-rendered pages with personalized data, while public users get cached static pages for speed.

**Your Answer:**
> For caching static content, like SSG HTML pages and other static assets like images and CSS files, I’d use a CDN connected to my CI/CD pipeline to update changed assets based on hash differences.
>
> For dynamic content, I’d manage user auth and sessions in an external KV store (close but outside the webserver) to enable stateless servers and horizontal scaling.
>
> Caching for dynamic pages can be done using another KV store that saves page responses; a miss triggers page generation. Whether to cache pages or API requests depends on data patterns and empirical results.

**Feedback:**
✅ Excellent — you covered CDN usage, stateless scaling, and selective caching.
✅ Good understanding of trade-offs in caching dynamic data.
💡 Tightened version:
> “Serve static content via CDN (CI/CD invalidation by hash). Keep auth in Redis for stateless scaling. Use selective caching—API responses for expensive queries and possibly per-user fragments if patterns justify.”

**Follow-up (handled correctly):**
When identical API queries repeat across users, use a shared cache or reverse proxy cache keyed by full request path and params to reduce backend load.

---

#### **Question 2**
Your Django backend uses PostgreSQL and Redis.
During traffic spikes, database connections max out, causing slowdowns and timeouts.
Without changing business logic or schema, how would you handle these bursts gracefully?

**Your Answer:**
> SQL databases don’t easily allow horizontal partitioning, so I’d use database replication to separate reads and writes.
>
> Keep cache and DB scaling proportional. Use a load balancer to route read vs write queries.
>
> Use hash rings and promotion strategies to prevent a single point of failure.
>
> Decide on a consistency model and implement synchronization for replicas and cache TTL strategies.

**Feedback:**
✅ Strong foundation: replication, read/write split, failover, and consistency awareness.
💡 Additions interviewers expect:
- Use **PgBouncer / RDS Proxy** for connection pooling (direct fix for max connections).
- Add **write buffering** (Kafka, SQS, Celery) to smooth spikes.
- Apply **rate limiting / circuit breakers** at the edge.
- **Autoscale app servers** and tune DB connection limits.
- Use **read replica lag monitoring** and failover orchestration.

**Improved one-liner:**
> “I’d add PgBouncer for pooling, a write queue to absorb bursts, and rate-limiting + circuit-breaking at the API edge, while replicas handle read scaling.”

---

#### **Question 3**
Your Django backend integrates with Salesforce via REST API for bi-directional sync.
Network latency and rate limits are bottlenecks, and data consistency is critical.
How would you architect this integration to be resilient, scalable, and consistent?

**Your Answer:**
> Prefer syncing jobs outside peak hours if consistency allows, or lazy-sync on demand (e.g., when a user logs in).
>
> Use Salesforce’s Batch operations to minimize API calls and handle N+1 carefully.
>
> Implement strong error handling and retries for outages.
>
> Avoid caching stale data if consistency must be strong.

**Feedback:**
✅ Smart thinking: off-peak / lazy sync and batching.
💡 High-value adds:
- Use **Bulk/Composite APIs** and **CDC/Platform Events** for efficiency.
- **Decouple with a queue** (SQS/Kafka/Celery) to control request rate.
- Implement **rate-limit aware client** with exponential backoff + jitter.
- Add **circuit breaker** for degraded Salesforce states.
- Use a **transactional outbox** and **idempotency keys** for reliable pushes.
- Add **DLQ and reconciliation jobs** to repair data drift.
- Ensure **observability** and **explicit consistency model** (eventual or strong).

**Improved one-liner:**
> “I’d decouple integration with queues, use Bulk/CDC APIs, add rate-limit aware retries with circuit breaker + DLQ, ensure idempotent pushes via an outbox, and run reconciliation jobs for consistency.”

---

✅ **Overall Feedback**
You’re thinking like a senior engineer: you cover scaling, reliability, and trade-offs well.
To tighten for interview time, aim for 30–45 second structured answers with clear layers:
> “Here’s the problem → here’s the main constraint → here’s my layered solution (infra, app, data).”
