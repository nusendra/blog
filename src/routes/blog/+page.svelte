<script>
  import { format, parseISO } from 'date-fns';
	export let data;
</script>

<div class="relative overflow-hidden bg-white py-16">
  <div class="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
    <div class="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true">
      <svg class="absolute top-12 left-full translate-x-32 transform" width="404" height="384" fill="none" viewBox="0 0 404 384">
        <defs>
          <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
      </svg>
      <svg class="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform" width="404" height="384" fill="none" viewBox="0 0 404 384">
        <defs>
          <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
      </svg>
      <svg class="absolute bottom-12 left-full translate-x-32 transform" width="404" height="384" fill="none" viewBox="0 0 404 384">
        <defs>
          <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
      </svg>
    </div>
  </div>
  <div class="relative px-6 lg:px-8 z-10">
    <div class="mx-auto max-w-prose text-lg">
			{#each data.posts as item, i}
      <article class="flex max-w-xl flex-col items-start mt-14">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime={format(parseISO(item.date), 'PPP')}
            class="text-gray-500">{format(parseISO(item.date), 'PPP')}</time>
          {#each item.tags as tag}
            <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium
              text-gray-600 hover:bg-gray-100">{tag}</a>
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
</div>
