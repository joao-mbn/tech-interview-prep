# Question 1 — Concurrency vs Parallelism

**Q:**
What is the difference between **concurrency** and **parallelism** in software development?

**Your Answer:**
> Parallelism means that different tasks spawn different CPU processes. Depending on availability of CPU resources, they will be processed at the same time on different CPU cores.
>
> Concurrency means that two different tasks are being handled by different threads in a program, or on a single thread but asynchronously, communicating with the program via signals/events that they have updates and should be picked up/resolved/rejected. Concurrency tasks are not done at the same time, but the program can jump between different concurrent tasks as it waits for updates on the others.

**Feedback / Polished Answer:**
> **Parallelism** is about doing **multiple tasks at the same time**, usually on **different CPU cores or processes**.
>
> **Concurrency** is about **managing multiple tasks at once**, not necessarily executing them simultaneously — it’s about switching between them efficiently, often via **threads or async event loops**.
>
> So:
> - **Parallelism →** true simultaneous execution (multi-core).
> - **Concurrency →** interleaved progress (single or multi-threaded).

---

## Follow-Up — Async/Await and Browser Concurrency

**Q:**
Do any of our common async/await/promise interactions get dispatched to Web Workers to achieve concurrency with the browser events, by resolving those processes while not blocking interactions?

**Answer / Explanation:**
> No — **async/await and Promises in JavaScript do not create new threads or Web Workers.**
> They rely on the **event loop** and the **microtask queue** to schedule asynchronous work *within* the single main thread.
>
> So while they enable **concurrency** (non-blocking scheduling), they don’t enable **parallelism**.
>
> **Deeper Details:**
> - JavaScript is single-threaded in the main execution context.
> - Async operations (`fetch`, `setTimeout`, etc.) are handled by browser Web APIs, not JS threads.
> - When these operations complete, callbacks are pushed onto the **task queue** and picked up by the JS **event loop**.
> - Promises schedule **microtasks**, executed right after the current call stack finishes.
> - **Web Workers** (created manually via `new Worker()`) are the only way to run JS truly in parallel threads.
>
> **Analogy:**
> - **Async/Await:** “Don’t block — I’ll come back later when the result is ready.”
> - **Web Workers:** “Run this piece of JS code in a separate thread, truly in parallel.”
>
> **Interview phrasing tip:**
> > “Async/await provides concurrency via the event loop, not true parallelism. The browser executes I/O tasks asynchronously but resumes JavaScript logic on the main thread. For actual parallel execution, we’d need Web Workers or Worker Threads in Node.js.”

# General Software Development - Interview Q&A

## Question 1: Version Control Systems

**Question:** Which of the following best describes the primary purpose of version control systems like Git?

A) To automatically fix bugs in your code
B) To track changes to code over time and enable collaboration
C) To compile code faster
D) To deploy applications to production servers

**Answer:** B ✓

**My Response:** "Git is a versioning system used for continuous integration."

**Feedback:**
- **Correct aspect:** Git is indeed a version control system used in CI workflows
- **Clarification:** Git's *primary* purpose is version control—tracking changes and enabling collaboration. CI is one of many workflows that *uses* Git, but Git existed before CI/CD practices became widespread. Git is the foundation, and CI is built on top of it.

---

## Question 2: SOLID Principles

**Question:** In object-oriented programming, which principle is violated when a subclass is forced to implement methods it doesn't need?

A) Single Responsibility Principle
B) Open/Closed Principle
C) Liskov Substitution Principle
D) Interface Segregation Principle

**Answer:** D ✓

**Follow-up Question:** What does "subclass" mean?
**Clarification:** A subclass is a class that extends (inherits from) another class—also called a derived class or child class.

**Key Concepts:**
- **Interface Segregation Principle (ISP):** "No client should be forced to depend on methods it does not use"
- **Liskov Substitution Principle (LSP):** Objects of a subclass should be able to replace objects of the parent class without breaking the application
- **Distinction:** ISP is about interface bloat (forced to implement unnecessary methods), LSP is about substitutability (can you swap a subclass for its parent?)

**Example:** A `Penguin` class implementing a `Bird` interface with `fly()` and `eat()` methods—penguins can't fly, so they're forced to implement a method they don't need (ISP violation).

---

## Question 3: Data Structures & Algorithms

**Question:** What is the time complexity of searching for an element in a balanced binary search tree?

A) O(1)
B) O(log n)
C) O(n)
D) O(n log n)

**Answer:** B ✓

**Explanation:** In a balanced BST, you eliminate roughly half of the remaining nodes with each comparison as you traverse down the tree. This halving pattern creates logarithmic time complexity—O(log n).

**Note:** An unbalanced BST can degrade to O(n) in the worst case (essentially becoming a linked list).

---

## Question 4: REST API Design

**Question:** In a REST API, which HTTP method should be idempotent, meaning multiple identical requests should have the same effect as a single request?

A) POST
B) GET
C) PATCH
D) All of the above

**Answer:** B ✓

**My Initial Response:** A (incorrect)

**Key Learning - Idempotency Definition:**
Idempotency means making the same request multiple times leaves the server in the same state as making it once. It's NOT about getting the same response data—it's about whether the request changes server state.

**HTTP Method Idempotency:**
- **GET** - Idempotent (doesn't change state, only reads)
- **PUT** - Idempotent (replaces entire resource with same result each time)
- **DELETE** - Idempotent (resource is gone after first call)
- **PATCH** - Can be idempotent depending on implementation
- **POST** - NOT idempotent (creates new resources each time)

**Example:** Sending a POST to create a user twice creates two users (not idempotent). Sending a GET twice doesn't change anything on the server (idempotent).

---

## Question 5: Database Transactions

**Question:** Which database transaction isolation level prevents dirty reads but still allows non-repeatable reads?

A) Read Uncommitted
B) Read Committed
C) Repeatable Read
D) Serializable

**Answer:** B ✓

**Key Definitions:**

**Dirty Read:** Reading uncommitted data from another transaction that might roll back
- Example: Transaction A updates balance to $200 but hasn't committed. Transaction B reads $200. Transaction A rolls back. Transaction B read "dirty" data.

**Non-Repeatable Read:** Reading the same row twice in a transaction and getting different results
- Example: Transaction A reads balance as $100. Transaction B updates to $200 and commits. Transaction A reads again and sees $200—non-repeatable.

**Read Committed:** An isolation level that ensures you only read committed data (prevents dirty reads) but doesn't prevent non-repeatable reads.

**Isolation Level Hierarchy (lowest to highest):**
1. **Read Uncommitted** - Allows dirty reads, non-repeatable reads, phantom reads
2. **Read Committed** - Prevents dirty reads, allows non-repeatable reads and phantom reads
3. **Repeatable Read** - Prevents dirty reads and non-repeatable reads, allows phantom reads
4. **Serializable** - Prevents all anomalies

### Follow-up Discussion: Why Repeatable Reads Matter

**My Question:** "Why are repeatable reads a good thing? What's the point if you're reading old data?"

**Key Insight:** Repeatable Read ensures a *consistent snapshot* within a transaction. Without it, you could be making business decisions based on data from different points in time.

**Example:** Banking transaction that:
1. Reads Account X balance ($1000)
2. Reads Account Y balance ($500)
3. Calculates total = $1500

Without Repeatable Read, if another transaction changes Account X between steps 1 and 2, your $1500 total never actually existed at any single point in time—you're mixing timeframes.

**Concurrency Control:** Repeatable Read prevents multiple withdrawal problems through locking or conflict detection at commit time, making it safer than Read Committed for concurrent operations.

---

## Question 6: Distributed Systems

**Question:** What is the main advantage of using a message queue (like RabbitMQ or Kafka) in a distributed system?

A) It makes the system run faster
B) It decouples services and enables asynchronous processing
C) It eliminates the need for databases
D) It automatically scales your services

**Answer:** B ✓

**Explanation:** Message queues decouple services by allowing asynchronous communication. Producers send messages without waiting for consumers, and consumers process at their own pace. This builds resilient, scalable distributed systems.

---

## Question 7: Software Testing

**Question:** In the context of software testing, what is a "mock" object primarily used for?

A) To simulate the behavior of real objects in a controlled way during testing
B) To make tests run faster by caching results
C) To replace the production database
D) To generate random test data

**Answer:** A ✓

**Explanation:** Mocks simulate real objects (databases, APIs, external services) in a controlled way, allowing you to test code in isolation without depending on external systems. This makes tests faster, more reliable, and repeatable.

---

## Question 8: Design Patterns

**Question:** Which design pattern is most appropriate when you need to ensure that a class has only one instance throughout the application's lifetime?

A) Factory Pattern
B) Singleton Pattern
C) Observer Pattern
D) Decorator Pattern

**Answer:** B ✓

**Explanation:** The Singleton Pattern ensures a class has exactly one instance and provides a global point of access to it. Common use cases: configuration managers, logging services, database connection pools.

---

## Question 9: Database Properties

**Question:** What does the acronym ACID stand for in the context of database transactions?

A) Atomicity, Consistency, Isolation, Durability
B) Authentication, Caching, Indexing, Distribution
C) Access, Control, Integration, Deployment
D) Asynchronous, Concurrent, Independent, Distributed

**Answer:** A ✓

**Explanation:** ACID represents the four key properties that guarantee reliable database transactions: Atomicity, Consistency, Isolation, and Durability.

---

## Question 10: CI/CD

**Question:** In CI/CD pipelines, what is the primary purpose of automated testing in the Continuous Integration phase?

A) To deploy code to production automatically
B) To catch bugs early before code is merged or deployed
C) To write documentation automatically
D) To monitor application performance in production

**Answer:** B ✓

**Explanation:** Automated testing in CI catches bugs early—before code gets merged or deployed. This "shift left" approach finds issues when they're cheapest to fix.

---

## Summary

**Score:** 10/10 ✓

**Topics Covered:**
- Version control (Git)
- SOLID principles (ISP, LSP)
- Data structures & algorithms (BST complexity)
- REST API design (HTTP idempotency)
- Database transactions (isolation levels)
- Distributed systems (message queues)
- Testing (mocks)
- Design patterns (Singleton)
- ACID properties
- CI/CD best practices