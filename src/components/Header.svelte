<script>
  let showSidebar = $state(false)

  const toggleSidebar = () => {
    showSidebar = !showSidebar;
  }
</script>

<header>
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
    <a href="/" class="-m-1.5 p-1.5 z-10">
      <img class="h-12 w-auto"
        src="/favicon.webp"
        alt="nusendra logo">
    </a>
    {#if !showSidebar}
    <div class="flex lg:hidden">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 z-50" onclick={toggleSidebar}>
        <span class="sr-only">Open main menu</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  {/if}
    <div class="hidden lg:flex lg:gap-x-12">
      <a href="/" class="text-sm font-semibold leading-6 text-white-900 z-50">Home</a>
      <a href="/blog" class="text-sm font-semibold leading-6 text-gray-900 z-50">Blog</a>
      <a href="/work-log" class="text-sm font-semibold leading-6 text-gray-900 z-50">Work
      Log</a>
      <a href="/projects" class="text-sm font-semibold leading-6
        text-gray-900 z-50">Projects</a>
      <a href="/course" class="text-sm font-semibold leading-6
        text-gray-900 z-50">Courses</a>
      <a href="/talks" class="text-sm font-semibold leading-6
        text-gray-900 z-50">Talks</a>
      <a href="/social" class="text-sm font-semibold leading-6
        text-gray-900 z-50">Socials</a>
      <a href="https://resume.nusendra.com" target="_blank" class="text-sm font-semibold leading-6
        text-gray-900 z-50">Resume</a>
    </div>
  </nav>

  {#if showSidebar}
    <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="lg:hidden" role="dialog" aria-modal="true">
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0"></div>
      <div class="fixed inset-y-0 right-0 w-full overflow-y-auto bg-white px-6 py-6
        sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 z-50">
        <div class="flex items-center justify-between">
          <img class="h-12 w-auto " src="https://yt3.ggpht.com/3hrosdAQxWc9UC9tAKPPJXHHHl1BcbCD581ZaYFNgHE6ZDvc7T0b9Fls0JdkuNUY5B5EefuLy10=s600-c-k-c0x00ffffff-no-rj-rp-mo" alt="">
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700"
          onclick={toggleSidebar}>
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a href="/" class="-mx-3 block rounded-lg px-3 py-2 text-base
                font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</a>
              <a href="/blog" class="-mx-3 block rounded-lg px-3 py-2 text-base
                font-semibold leading-7 text-gray-900 hover:bg-gray-50">Blog</a>
              <a href="/work-log" class="-mx-3 block rounded-lg px-3 py-2 text-base
                font-semibold leading-7 text-gray-900 hover:bg-gray-50">Work
                Log</a>
              <a href="/projects" class="-mx-3 block rounded-lg px-3 py-2 text-base
                font-semibold leading-7 text-gray-900
                hover:bg-gray-50">Projects</a>
              <a href="/course" class="-mx-3 block rounded-lg px-3 py-2 text-base
                  font-semibold leading-7 text-gray-900
                  hover:bg-gray-50">Courses</a>
              <a href="/talks" class="-mx-3 block rounded-lg px-3 py-2 text-base
                font-semibold leading-7 text-gray-900
                hover:bg-gray-50">Talks</a>
              <a href="/social" class="-mx-3 block rounded-lg px-3 py-2 text-base
                font-semibold leading-7 text-gray-900
                hover:bg-gray-50">Social</a>
              <a href="https://resume.nusendra.com" target="_blank" class="-mx-3 block rounded-lg px-3 py-2 text-base
                font-semibold leading-7 text-gray-900
                hover:bg-gray-50">Resume</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</header>

