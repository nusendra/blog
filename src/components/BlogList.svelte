<script>
  export let description;
  export let title;
  export let date;
  export let tags;
  export let slug;
</script>

<div class="py-8 flex flex-wrap md:flex-nowrap">
  <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
    <span class="font-semibold title-font text-gray-700">{tags}</span>
    <span class="mt-1 text-gray-500 text-sm">{date}</span>
  </div>
  <div class="md:flex-grow">
    <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
      <a href="{slug}">{title}</a>
    </h2>
    <p class="leading-relaxed">
      {description}
    </p>
  </div>
</div>
