<script>
	export let company;
	export let role;
	export let date;
</script>

<li class="flex gap-4">
	<dl class="flex flex-auto flex-wrap gap-x-2">
		<dt class="sr-only">Company</dt>
		<dd
			class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
		>
			{company}
		</dd>
		<dt class="sr-only">Role</dt>
		<dd class="text-xs text-zinc-500 dark:text-zinc-400">{role}</dd>
		<dt class="sr-only">Date</dt>
		<dd
			class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
		>
			<time>{date}</time>
		</dd>
	</dl>
</li>
