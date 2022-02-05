<script>
  export let description;
  export let date;
  export let tags;
</script>

<div class="py-5 flex flex-wrap md:flex-nowrap">
  <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
    <span class="font-semibold title-font text-gray-700">{tags}</span>
    <span class="mt-1 text-gray-500 text-sm">{date}</span>
  </div>
  <div class="md:flex-grow">
    <slot />
    <p class="leading-relaxed">
      {description}
    </p>
  </div>
</div>
