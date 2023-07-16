<script>
  import { format, parseISO } from 'date-fns';
  export let description;
  export let date;
  export let tags;
  export let title;
  export let slug;

  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, 'PPP');

</script>

<article class="flex max-w-xl flex-col items-start justify-between">
  <div class="flex items-center gap-x-4 text-xs">
    <time datetime={formattedDate} class="text-gray-500">{formattedDate}</time>
    {#each tags as tag}
      <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium
        text-gray-600 hover:bg-gray-100">{tag}</a>
    {/each}
  </div>
  <div class="group relative">
    <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
      <a href={`/post/${slug}`}>
        <span class="absolute inset-0"></span>
        {title}
      </a>
    </h3>
    <p class="mt-5 line-clamp-3 text-sm leading-6
      text-gray-600">{description}</p>
  </div>
  <div class="relative mt-8 flex items-center gap-x-4">
    <img src="/profile.webp" alt="" class="h-10 w-10 rounded-full bg-gray-50">
    <div class="text-sm leading-6">
      <p class="font-semibold text-gray-900">
        <a href="#">
          <span class="absolute inset-0"></span>
          Nusendra Hanggarawan
        </a>
      </p>
      <p class="text-gray-600">Author</p>
    </div>
  </div>
</article>
