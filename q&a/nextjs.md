
# Question 1 – SSR vs SSG vs CSR

## Q:

In Next.js, what are the differences between server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR)? Can you explain when you would use each?

## Your answer:

SSR refers to dynamic pages generated on the server, SSG static pages generated on the server.

The difference between SSR and SSG is that the SSR pages are built in the runtime, when processing a request, considering the user, session, etc, i.e. it's stateful and usually requires a call to an external system, like a database, to build this page with the dynamic data.

SSG pages are defined at compile time and they'll be the same regardless of state. It's stateless.

CSR means that the page is built on the client, by the downloaded javascript code requested from the webserver. The javascript will build the HTML on the page.

## Feedback / Ideal Answer Summary:

✅ Correct conceptual distinction between SSR, SSG, and CSR.
✅ Clear explanation of when rendering happens.
⚠️ Could expand on when to use each and mention ISR (Incremental Static Regeneration).

Refined Answer:

SSR: Renders at request time via getServerSideProps; good for personalized or frequently updated content.
SSG: Pre-renders at build time via getStaticProps; best for static or rarely-changing content.
CSR: Renders in the browser after fetching data; used for interactive, non-SEO-critical areas.
ISR: Allows static pages to revalidate periodically using revalidate.

Extra insight:

The lifecycle methods mentioned apply to the Pages Router.
In App Router (v13+), data fetching and rendering behavior are controlled through Server Components, fetch() caching, and revalidation options instead.

# Question 2 – Server vs Client Components

## Q:

In Next.js, what are Server Components and Client Components in the App Router? Can you explain the differences, and give examples of when you’d use one versus the other?

## Your answer:

Server Components are components generated on the server and shipped as HTML, be it with SSG or SSR. When they rely on calling an external system, like a database, asynchronously, the component itself can be made asynchronous and awaiting the system call. Server components cannot use hooks and are stateless.

Client-side components are generated on the client by shipped javascript. The HTML is built by the javascript downloaded, and any state requested by the javascript code. Client components cannot be asynchronous, and data fetching occurs by using hooks integrating with a data fetching API or library, like fetch, axios + hooks, SWR, and react query. The latter two are an abstraction on top of react hooks and fetch.

The reasons for using server side components vs client side components are the same for SSR/SSG vs CSR: if you need better SEO/expose less stuff/cache pages on CDN go for servers; if you need tons of interactivity or doesn't care about SEO/caching pages, go for CSR.

## Feedback / Ideal Answer Summary:

✅ Very good conceptual understanding.
⚠️ Small correction: Server Components don’t ship full HTML — they ship a serialized data stream (React Flight).
⚠️ Client Components can be async but can’t perform server-only operations.
✅ Excellent rationale for trade-offs.

## Refined Answer:

Server Components:

Default in App Router.
Run on the server; can access DB, env vars, filesystem.
Can be async.
Cannot use browser APIs or React client hooks.
Great for data-heavy or SEO-sensitive sections.

Client Components:

Marked with "use client".
Run in the browser; use hooks (useState, useEffect).
Fetch data via SWR/React Query.
Used for interactive UI like modals, dropdowns, forms.
“Use Server Components by default and opt into Client Components only when necessary.”

# Question 3 – Routing, Layouts, and Error Boundaries

## Q:

In the App Router, how does routing work in Next.js? Can you explain how nested routes, layouts, and loading/error components fit together?

## Your answer:

In Next.js routes are leveraged by using folder naming conventions and on each directory path you specify file names on a reserved namespace to get composability on each route.

This naming pattern supports dynamic routes, nested routes, and leaving the system when the folder was meant for organization purposes only by making the path hidden or merging paths inside a nested route.

For any given route, files like page, error, loading and layout have special meanings that you tell how that route is rendered, following a nesting order.

Furthermore, nesting routes have some default components like error and layout working composedly, whereas all layouts of a given nested route will be rendered, and error of a parent route is used as fallback.

## Feedback / Ideal Answer Summary:

✅ Excellent conceptual coverage.

⚠️ Could be clearer about specific file behaviors and grouping syntax ((group), @slot).

✅ Great understanding of hierarchical error/loading behavior.

## Refined Answer:

Routing is filesystem-based under app/.

Each folder = route segment.

Special files:

page.tsx → route UI
layout.tsx → persistent wrapper for children
loading.tsx → Suspense fallback
error.tsx → error boundary
not-found.tsx → 404 for that segment

Layouts nest and persist; errors bubble up.

Use (folder) to group routes without affecting URL.
Use @slot for parallel routes and (..) for intercepting routes.
Follow-up Discussion – Parent/Child Pages and Leaving Layouts

## Your questions:

Is page routes different than this? Is it true that a child page is rendered inside a parent page? Is it possible to leave this system, when, say, you have a list of orders and by clicking in one of them you go to the nested orderid page, that is not meant to be inside the order list page?

## Clarification:

In the App Router, a child page is not rendered inside a parent page — it’s rendered inside the parent layout.

Pages Router (old system) had no nesting — every page was independent.
Layouts persist, but pages swap out.
To “leave” a parent layout, you can:
Use route groups (group) to isolate route trees.
Use intercepting routes ((..)) for special navigation flows (e.g., modals).

# Question 4 – Data Fetching and Caching

## Q:

In the App Router, how does data fetching work with the built-in fetch API? Can you explain how caching and revalidation work — and what the different options like cache, next.revalidate, and force-cache mean?

## Your answer:

The builtin fetch API in app router is meant for csr. On the server, you can use fetch API to connect to an external system, like a 3rd party API via http, but if it's a service to which the app is already connected, you can take a direct route with async components, for instance calling the database directly. This is safe from exposition to the client as only the component result in the form of html will be sent to the client.

When using fetch with the use hook in the server, it expects a cached promise to return as result. Revalidate and force-cache serves to implement TTL on this cache.

On the client, this is not enabled by default, as fetch API has no caching mechanism by default, but you can implement one yourself, or use popular libraries like swr and react query.

## Feedback / Ideal Answer Summary:

✅ Great distinction between client and server fetching.
✅ Excellent mention of safe DB access in Server Components.
⚠️ fetch in App Router is server-first, not CSR-specific.
⚠️ Clarify caching flags precisely.

## Refined Answer:

In Server Components, fetch is extended by Next.js to support automatic caching and revalidation.

Syntax:
```typescript
await fetch(url, {
  cache: 'force-cache' | 'no-store',
  next: { revalidate: number | false },
});
```

force-cache: Default; behaves like SSG (static, cached).
next.revalidate: Enables ISR, revalidating cache after N seconds.
no-store: Always fetch fresh data (like SSR).
Client Components: must fetch via useEffect, SWR, or React Query.
Direct DB calls are often preferable in Server Components for secure, low-latency access.
Follow-up Discussion – force-cache and SSG

## Your question:

Can I say that force cache pattern turns it into a SSG?

## Clarification:

✅ Yes — using cache: 'force-cache' makes a fetch behave like SSG, but with a nuance:

The page is cached and reused indefinitely.
SSG is now just a caching mode, not a separate build step.

Summary table:

Fetch Option	Behavior	Analogy
cache: 'force-cache'	Cached indefinitely	SSG
next: { revalidate: n }	Cached + refreshed after n sec	ISR
cache: 'no-store'	No cache, fetch each request	SSR

“SSG in App Router isn’t a distinct process anymore — it’s a caching mode controlled by fetch options.”

# End of Session Summary

You’ve covered:

Rendering modes (SSR/SSG/CSR/ISR)
Server vs Client Components
App Router routing model (layouts, errors, loading)
Data fetching and caching patterns