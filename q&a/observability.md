### 🧩 Monitoring & Observability Interview Practice

---

#### **Question 13**
Measure end-to-end latency for each user request in a distributed system.

**Options:**
A) Log CPU/memory usage on server only
B) Add distributed tracing to track requests across services
C) Monitor network traffic on corporate router
D) Count active users

**Your Answer:** B

**Feedback:**
✅ Correct — distributed tracing tracks the request through all services, capturing latency per stage.
- Server-side timestamps give partial insight.
- Client-side logging can complement for network/download performance, CDNs, or geolocation optimizations.

**Follow-up:**
- Logs = events, good for debugging.
- Tracing = request journey across services, good for latency analysis.

---

#### **Question 14**
Detect unexpected behavior in real time when CPU/memory look normal.

**Options:**
A) Static thresholds on CPU/memory
B) Anomaly detection on key metrics (error rate, latency)
C) Check server logs manually once/day
D) Count requests per hour

**Your Answer:** B

**Feedback:**
✅ Correct — anomaly detection identifies deviations even if standard metrics appear normal.
- Static thresholds (A) may miss subtle issues.
- Manual logs (C) are too slow.
- Counting requests (D) doesn’t reveal errors.

---

#### **Question 15**
Correlate errors, logs, and latency in a microservices system.

**Options:**
A) Centralized logging with simple aggregator
B) Distributed tracing + centralized logging & metrics
C) Monitor individual service dashboards
D) Set static alerts on a few servers

**Your Answer:** B

**Feedback:**
✅ Correct — combining traces, centralized logs, and metrics provides full observability.
- Monitoring services separately or static alerts misses correlations.

---

#### **Question 16**
Track production health and receive alerts for issues like high error rates or slow responses.

**Options:**
A) Only ping servers
B) Collect application metrics and set alerts
C) Inspect logs weekly
D) Monitor only CPU/memory

**Your Answer:** B

**Feedback:**
✅ Correct — alerts based on latency, error rates, etc., detect real issues proactively.
- Ping, CPU/memory, or weekly logs are insufficient.

---

#### **Question 17**
Investigate why a request failed using logs, metrics, and traces.

**Options:**
A) Examine only logs for failing service
B) Examine metrics for failing service
C) Examine traces to see request path
D) Combine logs, metrics, and traces

**Your Answer:** D

**Feedback:**
✅ Correct — combining all gives the complete picture.
- Start with logs to find errors.
- Use traces to understand request flow across services.
- Metrics provide context for patterns/trends.

---

#### **Question 18**
Avoid alert fatigue while detecting real issues.

**Options:**
A) Alert on every metric
B) Aggregated metrics, thresholds, anomaly detection
C) Alert only when CPU/memory 100%
D) Rely on users to report issues

**Your Answer:** B

**Feedback:**
✅ Correct — meaningful alerts reduce noise and ensure timely action.
- User reports (D) work early-stage but are reactive.
- A & C generate noisy or narrow alerts.

---

#### **Question 19**
Identify which microservice caused a problem in a distributed system.

**Options:**
A) Collect metrics per service independently
B) Centralized logging only
C) Distributed tracing across services
D) Check only the database

**Your Answer:** C

**Feedback:**
✅ Correct — tracing follows requests across services, pinpointing the source of failure.
- Metrics/logs alone may indicate a problem but not the causal path.

---

#### **Question 20**
Monitor server-side and client-side performance for slow page loads.

**Options:**
A) Only server CPU/memory
B) Only server logs
C) Combine server metrics/logs with client-side telemetry (browser RUM)
D) Ask users to report slow pages

**Your Answer:** C

**Feedback:**
✅ Correct — RUM captures real user experience including network, browser, and rendering delays.
- Server metrics/logs alone miss client-side performance issues.

**Follow-up:** What is RUM?
- Real User Monitoring = JavaScript snippet in the browser that tracks page load times, rendering metrics, AJAX/fetch latency, errors.
- Sends data to backend for analysis.

---

#### **Question 21**
Measure real user page load performance.

**Options:**
A) Run synthetic tests from a single server periodically
B) Inject JavaScript in browser to capture metrics from actual users
C) Only log server response times
D) Ask users to report slow pages

**Your Answer:** B

**Feedback:**
✅ Correct — browser-side instrumentation captures real user performance (RUM).
- Synthetic tests are useful but don’t reflect real user conditions.
- Server logs alone miss network/client issues.

**Follow-up:** How is RUM implemented?
- Inject JavaScript snippet on pages.
- Collect performance events (navigation timing, paint metrics, errors, AJAX/fetch durations).
- Send data to monitoring backend for aggregation, dashboards, and alerts.
