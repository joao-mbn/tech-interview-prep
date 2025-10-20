### 🧩 CI/CD, AWS & Monitoring Interview Practice

---

#### **Question 4**
You are deploying a Django + Next.js app to AWS. You want zero-downtime deployments and easy rollback. Which approach is best?

**Options:**
A) Update EC2 instances in place and restart services
B) Use Blue/Green deployment with an ELB
C) Stop all instances, deploy new code, then start them
D) Deploy to one instance at a time and wait for manual testing

**Your Answer:** B

**Feedback:**
✅ Correct — Blue/Green deployments ensure zero downtime and easy rollback.
- Other options risk downtime (A, C) or are slow/manual (D).

---

#### **Question 5**
Your Django app on EC2 spikes in CPU usage. Best immediate step?

**Options:**
A) Increase EC2 instance size manually
B) Set up CloudWatch alarms + auto-scale
C) Add logging to track slow requests
D) Restart EC2 instances hourly

**Your Answer:** C

**Feedback:**
✅ Correct — adding logging lets you identify the root cause.
- Auto-scaling (B) or resizing blindly may waste resources.
- Alarms without insight don’t solve the problem.
- Restarting instances (D) is a temporary band-aid.

---

#### **Question 6**
Next.js frontend on S3 + CloudFront. Ensure users get the latest assets after deployment. Best practice?

**Options:**
A) Set CloudFront TTL to 0
B) Invalidate CloudFront cache manually
C) Include content hash in asset filenames (fingerprinting)
D) Rely on users to hard-refresh

**Your Answer:** C

**Feedback:**
✅ Correct — hashing filenames creates unique URLs for new versions.
- TTL 0 defeats caching (A).
- Manual invalidation (B) is slow/error-prone.
- Relying on users (D) is unreliable.

---

#### **Question 7**
Run small, event-driven functions without managing servers. Best AWS service?

**Options:**
A) EC2
B) Lambda
C) RDS
D) S3

**Your Answer:** B

**Feedback:**
✅ Correct — Lambda is serverless, event-driven, and auto-scales.
- EC2 is a VM, RDS is a DB, S3 is storage.

---

#### **Question 8**
Serve static assets globally with low latency. Best AWS service?

**Options:**
A) S3
B) CloudFront
C) Lambda
D) RDS

**Your Answer:** B

**Feedback:**
✅ Correct — CloudFront is a CDN caching content at edge locations.
- S3 stores content but doesn’t automatically serve globally.
- Lambda is compute, RDS is a database.

---

#### **Question 9**
Fully managed NoSQL DB that scales horizontally, supports key-value/document models.

**Options:**
A) RDS
B) DynamoDB
C) S3
D) EC2

**Your Answer:** B

**Feedback:**
✅ Correct — DynamoDB supports key-value and document storage.
- For MongoDB-compatible document DB, AWS offers **DocumentDB**.

---

#### **Question 10**
Run Docker containers without managing EC2 instances, with scaling and orchestration.

**Options:**
A) EC2
B) ECS (Fargate)
C) Lambda
D) S3

**Your Answer:** B

**Feedback:**
✅ Correct — ECS (Fargate) runs containers serverlessly with scaling.
- EKS is also possible for Kubernetes workloads.
- EC2 is VM, Lambda is functions, S3 is storage.

---

#### **Question 11**
Securely manage users, roles, and access keys for AWS resources.

**Options:**
A) KMS
B) IAM
C) CloudTrail
D) S3

**Your Answer:** B

**Feedback:**
✅ Correct — IAM handles users, roles, groups, and policies.
- KMS is encryption, CloudTrail is auditing, S3 is storage.

---

#### **Question 12**
Fully managed block-level storage for EC2, behaves like a disk, persists data.

**Options:**
A) S3
B) EBS
C) Glacier
D) Lambda

**Your Answer:** B

**Feedback:**
✅ Correct — EBS provides low-latency block storage for EC2.

**Follow-up:**
- **Block storage:** raw disk blocks, formatted by OS. Good for DBs, boot volumes, low-latency workloads.
- **File storage (S3/EFS):** objects/files accessed by name. Good for static content or shared access.
- **Database:** software managing and indexing data, sits on top of block or file storage.

