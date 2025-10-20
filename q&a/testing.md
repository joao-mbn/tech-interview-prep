# 🧪 Full-Stack Testing Interview Q&A

## Question 1 — Types of Tests in a Web Application

**Q:**
What are the main types of tests in a web application, and what’s the goal of each?

**Your Answer:**
- **Unit:** Test a single function in isolation. Good for business logic or pure functions.
  If impure, use mocks and dependency injection for isolation.
- **Integration:** Test the connection of different functions or services — e.g. database queries or SDK integrations.
  Should form the bulk of tests, since they balance realism and simplicity.
- **E2E:** Test an entire user flow, simulating real user behavior.
- **Performance:** Measure system resistance under heavy load.
- **Canary/Smoke:** Quick sanity checks to fail fast.
- **UAT:** Validates business rules and user experience.
- **A/B:** Compares variations of a feature to assess user behavior.

**Feedback / Correction:**
Excellent and comprehensive. Clear hierarchy and real-world insight.
For shorter answers, focus on Unit, Integration, and E2E — mention the others as “complementary testing strategies.”

**Polished Summary:**
> Unit tests verify isolated logic.
> Integration tests ensure systems work together.
> E2E tests validate full user flows.
> Complementary tests include performance, smoke, UAT, and A/B.

---

## Question 2 — Testing Tools and Frameworks in Next.js

**Q:**
In a Next.js application, what are the common testing tools and frameworks used for each testing level (unit, integration, and end-to-end), and what do you typically test with each?

**Your Answer:**
- **E2E:** Playwright, Selenium, or Cypress — I’ve used Playwright.
- **Integration/Unit:** Jest, Vitest, or Mocha for core logic.
- **React Components:** React Testing Library for component rendering and hooks lifecycle.

**Feedback / Correction:**
Great answer — shows familiarity with major tools.
You can enhance it by mapping tools to testing levels and mentioning MSW or Supertest for API testing.

**Polished Summary:**
> - **E2E:** Playwright or Cypress simulate real browsers and user flows.
> - **Integration/Unit:** Jest or Vitest as runners, sometimes paired with React Testing Library.
> - **API Routes:** Supertest for HTTP endpoints.
> - **Mocks:** MSW for network request mocking.

---

## Follow-Up — Are There Tools Specific to Next.js or Server Components?

**Q:**
The tools mentioned are used for React SPAs. Are there tools specific to Next.js or Server Components?

**Your Answer:**
Asked about framework-specific tools and practices.

**Feedback / Explanation:**
There’s no Next.js-exclusive testing framework, but Next provides configuration helpers and conventions.

**Summary:**
| Layer | Tools | Notes |
|--------|--------|-------|
| **Server Components** | Jest/Vitest + React Testing Library (`async` rendering) | Can test async components directly. |
| **API Routes** | Jest/Vitest + Supertest | Call route handlers directly. |
| **Client Components** | React Testing Library + Jest/Vitest | Same as SPA testing. |
| **E2E** | Playwright (recommended) | Official examples in Next.js repo. |

Next.js provides `next/jest` for preconfigured Jest setup.
Server Components testing mainly needs async rendering support — not a separate framework.

**Interview phrasing tip:**
> “There’s no testing framework unique to Next.js, but it offers helpers like `next/jest` and official Playwright setups. For Server Components, testing is similar — you just ensure your test runner supports async rendering.”

---

## Follow-Up — Python / Django Testing Ecosystem

**Q:**
Tell me about the Python testing ecosystem, specifically with Django.

**Feedback / Explanation:**

### Core Tools
| Layer | Tool | Notes |
|--------|------|-------|
| **Unit / Integration** | `unittest` + Django `TestCase` | Built-in DB management and fixtures. |
| **HTTP/API** | `django.test.Client`, `pytest-django`, `rest_framework.test.APIClient` | For request simulation. |
| **E2E** | `Selenium`, `Playwright`, `pytest-playwright` | Browser-based testing. |
| **Data Factories** | `factory_boy`, `model_bakery` | Easy test data generation. |
| **Mocking** | `unittest.mock`, `pytest-mock` | Mock external systems. |
| **Coverage** | `coverage.py` | Code coverage metrics. |

### Key Concepts
- Tests run in a **temporary transactional database**.
- Use `Client` or `APIClient` to simulate HTTP requests.
- Use `pytest-django` for a cleaner syntax and fixtures.
- Use `@override_settings` to temporarily modify configs.

### Example
```python
from rest_framework.test import APIClient, APITestCase
from django.urls import reverse

class OrderTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("order-list")

    def test_create_order(self):
        response = self.client.post(self.url, {"product": "Widget", "quantity": 3})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["quantity"], 3)
```