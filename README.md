### Creating Repository/Concrete

## Repositories should bubble up error or data

- React Query convention: errors are supposed to bubble via rejected promises so React Query can put them into its error state.
- Cleaner hooks: your component code can rely on isError / error from React Query, instead of always checking data?.error.
- Consistency with Next.js APIs: Next.js fetch functions (fetch, getServerSideProps, getStaticProps) naturally throw on HTTP errors if you wrap them, so the pattern matches.
- SWR too: same thing — it expects a rejected promise to set error.

### Using Hooks with Repository Methods

| Action                            | Hook Type                           |
| --------------------------------- | ----------------------------------- |
| Fetch current user                | `useQuery` (React Query) / `useSWR` |
| Login / register / logout / OAuth | `useMutation`                       |
| Update profile or settings        | `useMutation`                       |
| Fetch lists, posts, or data       | `useQuery` / `useSWR`               |

#### Note: Using `useMutation` required implementation of `QueryClientProvider` wrapping the root layout

`https://stackoverflow.com/questions/74992326/does-use-client-in-next-js-13-root-layout-make-whole-routes-client-component`

### Gne7WYPKexucdM5b

## Shadcn

`npx shadcn@latest add --all`

### Dealing with Root Layout and Root Layout Overrides

- Auth pages has it's common root layout.
- Dashboard pages has it's own common root layout.

`https://nextjs.org/docs/app/building-your-application/routing/route-groups`

### Layouts, CLient side or server side

Yes, layouts can be client components, but it’s discouraged unless you really don’t need server-side features.

# SUPABASE 101

### Supabase provides two client creation APIs

1. createBrowserClient → client-side only
2. createServerClient → server-side only

####

https://www.reddit.com/r/nextjs/comments/1guuoky/middleware_or_not_middleware/

## Faster Middleware

https://supabase.com/blog/jwt-signing-keys
https://github.com/orgs/supabase/discussions/20905?source=post_page-----33a045d15c78---------------------------------------

### Why Server Side is good

https://www.reddit.com/r/nextjs/comments/1esoz63/whats_the_motivation_behind_serverside_rendering/

### Explained Server Side/Components

https://www.joshwcomeau.com/react/server-components/
