<svelte:head>
	<title>Rate Card</title>
	<meta property="og:title" content="Rate Card" />
	<meta
		name="description"
		content="Rate card of Nusendra Hanggarawan: software engineer, tech event speaker, and consultant / code reviewer."
	/>
</svelte:head>

<script>
	const speakingFormats = [
		"Campus & community talks (45 - 60 minutes)",
		"Webinar / online session",
		"Hands-on workshop (duration is flexible)",
		"Panel discussion & sharing session",
	];

	const speakingTopics = [
		"AI Agents & Agentic Engineering",
		"Developer Survival Guide in AI Era",
		"Web Development (Vue.js, Nuxt, SvelteKit, Laravel)",
		"Backend, API & System Design",
		"From Campus to Startup / Remote Work",
	];

	const consultingServices = [
		{
			title: "Code Review & Audit",
			description:
				"Going through the codebase, finding bottlenecks, and handing over recommendations your team can act on right away.",
		},
		{
			title: "Architecture Consulting",
			description:
				"Talking through system design, database, API, and infrastructure before the team starts writing code.",
		},
		{
			title: "1-on-1 Mentoring",
			description:
				"Mentoring sessions for developers or teams levelling up, from fundamentals to day-to-day practice.",
		},
	];

	const includedItems = [
		"An intro call to align on expectations and scope",
		"Slides prepared for your specific audience",
		"Slides shared with attendees after the event",
		"Q&A session until everyone is done asking",
	];

	const terms = [
		"Speaking is free by default. Communities, campuses, and companies all get the same answer.",
		"Rp 500.000 per session is only there for companies whose policy requires a fee to be paid.",
		"Consulting & code review is free when the request comes from an individual, not a company.",
		"Transport & accommodation for events outside Surabaya are not covered, whether the session is free or paid.",
		"Please confirm the schedule at least 2 weeks before the event.",
	];
</script>

<div class="relative overflow-hidden bg-white pb-20">
	<!-- Hero -->
	<div class="relative px-6 pt-12 pb-16 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<img
				class="mx-auto h-24 w-24 rounded-full object-cover"
				src="/profile.webp"
				alt="nusendra profile"
			/>
			<p
				class="mt-6 text-sm font-semibold uppercase tracking-widest text-indigo-600"
			>
				Rate Card
			</p>
			<h1
				class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
			>
				Nusendra Hanggarawan
			</h1>
			<p class="mt-4 text-lg leading-8 text-gray-600">
				Software engineer since 2014, currently working remotely for company in the US. Regularly invited to speak at campus
				and developer community events, and open for consulting or code review
				work.
			</p>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
				<a
					href="#speaking"
					class="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 z-50"
					>See the Rate</a
				>
				<a
					href="https://wa.me/6289612991475"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 z-50"
					>Let's Talk First</a
				>
			</div>
		</div>
	</div>

	<!-- Speaking -->
	<div id="speaking" class="relative px-6 lg:px-8">
		<div class="mx-auto max-w-5xl">
			<div
				class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
			>
				<div
					class="flex flex-col gap-6 border-b border-gray-200 bg-gray-50 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10"
				>
					<div>
						<h2 class="text-2xl font-bold tracking-tight text-gray-900">
							Tech Event Speaker
						</h2>
						<p class="mt-2 max-w-xl text-base leading-7 text-gray-600">
							Speaking invitations for seminars, workshops, or webinars on
							software engineering and AI topics. I would rather do these for
							free, so let's start there.
						</p>
					</div>
					<div class="shrink-0 sm:text-right">
						<p class="text-3xl font-bold tracking-tight text-green-600">Free</p>
						<p class="mt-1 text-sm text-gray-500">
							preferred, whoever is inviting
						</p>
						<p class="mt-3 max-w-xs text-sm leading-6 text-gray-600">
							If your company policy requires a fee, let's make it
							<span class="font-semibold text-gray-900">Rp 500.000</span> per session.
						</p>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-10 px-6 py-8 sm:px-10 md:grid-cols-2">
					<div>
						<h3
							class="text-sm font-semibold uppercase tracking-wide text-gray-900"
						>
							Event Formats
						</h3>
						<ul class="mt-4 space-y-3">
							{#each speakingFormats as item}
								<li class="flex gap-3 text-sm leading-6 text-gray-600">
									<svg
										class="mt-1 h-4 w-4 shrink-0 text-indigo-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<h3
							class="text-sm font-semibold uppercase tracking-wide text-gray-900"
						>
							Topics I Usually Cover
						</h3>
						<ul class="mt-4 space-y-3">
							{#each speakingTopics as item}
								<li class="flex gap-3 text-sm leading-6 text-gray-600">
									<svg
										class="mt-1 h-4 w-4 shrink-0 text-indigo-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
						<a
							href="/talks"
							class="mt-5 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500 z-50"
							>See previous talks &rarr;</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Consulting -->
	<div class="relative mt-16 px-6 lg:px-8">
		<div class="mx-auto max-w-5xl">
			<h2 class="text-2xl font-bold tracking-tight text-gray-900">
				Consulting &amp; Code Review
			</h2>
			<p class="mt-2 max-w-2xl text-base leading-7 text-gray-600">
				If you are asking as an individual, not on behalf of a company, this is
				free. For companies, the price depends on scope and duration, so send
				over the details of what you need and I'll put together a quote.
			</p>

			<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each consultingServices as service}
					<div
						class="flex flex-col rounded-2xl border border-gray-200 p-6 shadow-sm"
					>
						<h3 class="text-base font-semibold text-gray-900">
							{service.title}
						</h3>
						<p class="mt-2 flex-1 text-sm leading-6 text-gray-600">
							{service.description}
						</p>
						<p class="mt-4 text-sm font-semibold text-green-600">
							Free for individuals
						</p>
						<p class="mt-1 text-sm font-semibold text-indigo-600">
							Custom, based on scope, for companies
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Included + Terms -->
	<div class="relative mt-16 px-6 lg:px-8">
		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
			<div class="rounded-2xl bg-gray-50 p-6 sm:p-8">
				<h2 class="text-lg font-semibold text-gray-900">What's Included</h2>
				<ul class="mt-4 space-y-3">
					{#each includedItems as item}
						<li class="flex gap-3 text-sm leading-6 text-gray-600">
							<svg
								class="mt-1 h-4 w-4 shrink-0 text-indigo-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="rounded-2xl border border-gray-200 p-6 sm:p-8">
				<h2 class="text-lg font-semibold text-gray-900">Notes</h2>
				<ul class="mt-4 space-y-3">
					{#each terms as item}
						<li class="flex gap-3 text-sm leading-6 text-gray-600">
							<span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400"
							></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="relative mt-16 px-6 lg:px-8">
		<div
			class="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-gray-900 px-6 py-10 text-center sm:px-12"
		>
			<h2 class="text-2xl font-bold tracking-tight text-white">
				Interested in working together?
			</h2>
			<p class="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-300">
				Tell me about your event or project first, so I can check the schedule
				and the scope.
			</p>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
				<a
					href="https://wa.me/6289612991475"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 z-50"
					>WhatsApp</a
				>
				<a
					href="https://t.me/nusendra"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-md border border-gray-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 z-50"
					>Telegram</a
				>
				<a
					href="mailto:admin@nusendra.com"
					class="rounded-md border border-gray-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 z-50"
					>Email</a
				>
			</div>
		</div>
	</div>
</div>
