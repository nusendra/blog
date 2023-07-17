<script>
  import { format, parseISO } from 'date-fns';
	export let data;
</script>

<div class="bg-white py-2 sm:py-2">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col">
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
