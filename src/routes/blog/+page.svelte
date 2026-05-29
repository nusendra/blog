<script>
  import { format, parseISO } from 'date-fns';
  let { data } = $props();
</script>

<div class="relative overflow-hidden bg-white py-16">
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
            {#each data.posts as item, i}
            <article class="flex max-w-xl flex-col items-start mt-14 first:mt-0">
              <div class="flex items-center gap-x-4 text-xs">
                <time datetime={format(parseISO(item.date), 'PPP')}
                  class="text-gray-500">{format(parseISO(item.date), 'PPP')}</time>
                {#each item.tags as tag}
                  <div class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium
                    text-gray-600 hover:bg-gray-100">{tag}</div>
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
            {/each}
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
                    <dl class="flex w-full items-baseline">
                      <dt class="sr-only">Title</dt>
                      <dd class="w-4/5 min-w-0 pr-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">
                        <a href={`/post/${item.slug}`}>{item.title}</a>
                      </dd>
                      <dt class="sr-only">Date</dt>
                      <dd class="w-1/5 text-right text-xs text-zinc-400 dark:text-zinc-500">
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
