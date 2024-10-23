<script>
  let {
    imageSource,
    imageAlt,
    titleTag,
    title,
    totalVideos,
    url
  } = $props();
</script>

<div class="xl:w-1/4 md:w-1/2 p-4">
  <div class="bg-gray-200 p-6 rounded-lg">
    <a href={url} target="_blank">
      <img
        class="h-38 rounded w-full object-center mb-6"
        src={imageSource}
        alt={imageAlt}
      />
    </a>
    <div class="flex justify-between mb-2">
      <h3
        class="tracking-widest text-indigo-500 text-xs font-medium title-font"
      >
        {titleTag}
      </h3>
      <span class="text-xs text-gray-900 font-medium title-font">
        {totalVideos} videos
      </span>
    </div>
    <h2 class="text-lg text-gray-900 font-medium title-font">
      <strong>{title}</strong>
    </h2>
  </div>
</div>
