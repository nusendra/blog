<script>
  import { format, parseISO } from 'date-fns';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  let { data } = $props();

  const PER_PAGE = 15;

  let activeTag = $derived(browser ? $page.url.searchParams.get('tag') : null);
  let filteredPosts = $derived(
    activeTag
      ? data.posts.filter((p) => Array.isArray(p.tags) && p.tags.includes(activeTag))
      : data.posts
  );
  let totalPages = $derived(Math.max(1, Math.ceil(filteredPosts.length / PER_PAGE)));
  let currentPage = $derived(
    browser
      ? Math.min(
          Math.max(1, parseInt($page.url.searchParams.get('page') ?? '1', 10) || 1),
          totalPages
        )
      : 1
  );
  let paginatedPosts = $derived(
    filteredPosts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
  );

  function pageHref(n) {
    const params = new URLSearchParams();
    if (activeTag) params.set('tag', activeTag);
    if (n > 1) params.set('page', String(n));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : '/blog';
  }
</script>

<div class="relative overflow-hidden bg-white pb-16">
  <img
    src="/blog-header.webp"
    alt="Blog header"
    class="mb-12 w-full object-cover"
  />
  <div class="relative px-6 lg:px-8 z-10">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <div class="mx-auto max-w-prose text-lg">
            {#if activeTag}
              <div class="flex items-center gap-x-3 text-sm text-gray-600">
                <span>Filtering by tag:</span>
                <span class="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">{activeTag}</span>
                <a href="/blog" class="text-gray-500 underline hover:text-gray-700">Clear</a>
              </div>
            {/if}
            {#each paginatedPosts as item, i}
            <article class="flex max-w-xl flex-col items-start mt-14 first:mt-0">
              <div class="flex items-center gap-x-4 text-xs">
                <time datetime={format(parseISO(item.date), 'PPP')}
                  class="text-gray-500">{format(parseISO(item.date), 'PPP')}</time>
                {#each item.tags as tag}
                  <a
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    class="relative z-20 rounded-full bg-gray-50 px-3 py-1.5 font-medium
                      text-gray-600 hover:bg-gray-100"
                  >{tag}</a>
                {/each}
              </div>
              <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={`/post/${item.slug}`}>
                    <span class="absolute inset-0"></span>
                    {item.title}
                  </a>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{item.description}</p>
              </div>
            </article>
            {:else}
              <p class="mt-14 text-sm text-gray-500">No posts found for tag "{activeTag}".</p>
            {/each}

            {#if totalPages > 1}
              <nav class="mt-14 flex items-center justify-between border-t border-gray-200 pt-6 text-sm">
                {#if currentPage > 1}
                  <a href={pageHref(currentPage - 1)} class="text-gray-700 hover:text-gray-900">&larr; Previous</a>
                {:else}
                  <span class="text-gray-300">&larr; Previous</span>
                {/if}
                <span class="text-gray-500">Page {currentPage} of {totalPages}</span>
                {#if currentPage < totalPages}
                  <a href={pageHref(currentPage + 1)} class="text-gray-700 hover:text-gray-900">Next &rarr;</a>
                {:else}
                  <span class="text-gray-300">Next &rarr;</span>
                {/if}
              </nav>
            {/if}
          </div>
        </div>
        <aside class="lg:col-span-2">
          {#if data.featuredPosts && data.featuredPosts.length > 0}
            <div class="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-700/40 dark:bg-zinc-800/50 lg:sticky lg:top-8">
              <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <span>Featured Posts</span>
              </h2>
              <ol class="mt-6 space-y-4">
                {#each data.featuredPosts as item}
                  <li class="flex w-full">
                    <dl class="flex w-full items-baseline gap-2">
                      <dt class="sr-only">Title</dt>
                      <dd class="min-w-0 flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
                        <a href={`/post/${item.slug}`}>{item.title}</a>
                      </dd>
                      <dt class="sr-only">Date</dt>
                      <dd class="shrink-0 text-right text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                        {format(parseISO(item.date), 'MMM d, yyyy')}
                      </dd>
                    </dl>
                  </li>
                {/each}
              </ol>
            </div>
          {/if}
        </aside>
      </div>
    </div>
  </div>
</div>
