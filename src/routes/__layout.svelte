<script>
	import "../app.css";
	import "../tailwind.css";
</script>

<div class="container mx-auto px-4">
	<div
		class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box"
	>
		<div class="px-2 mx-2 navbar-start">
			<span class="text-lg font-bold"> DaisyUI </span>
		</div>
		<div class="hidden px-2 mx-2 navbar-center lg:flex">
			<div class="flex items-stretch">
				<a class="btn btn-ghost btn-sm rounded-btn"> Home </a>
				<a class="btn btn-ghost btn-sm rounded-btn"> Portfolio </a>
				<a class="btn btn-ghost btn-sm rounded-btn"> About </a>
				<a class="btn btn-ghost btn-sm rounded-btn"> Contact </a>
			</div>
		</div>
		<div class="navbar-end">
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</button>
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</div>
	</div>
	<div class="hero bg-base-200">
		<div class="text-center hero-content mt-10 mb-10">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl font-bold">Hello there</h1>
				<p class="mb-5">
					Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
					excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
					id nisi.
				</p>
			</div>
		</div>
	</div>
	<div class="flex bg-base-200">
		<div class="md:flex-1 m-5">
			<div class="card shadow-xl image-full">
				<figure>
					<img src="https://picsum.photos/id/1005/400/250" />
				</figure>
				<div class="justify-end card-body">
					<h2 class="card-title">Image overlay</h2>
					<p>
						Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
						sit necessitatibus veritatis sed molestiae voluptates incidunt iure
						sapiente.
					</p>
					<div class="card-actions">
						<button class="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</div>
		<div class="md:flex-1 m-5">
			<div class="card shadow-xl image-full">
				<figure>
					<img src="https://picsum.photos/id/1005/400/250" />
				</figure>
				<div class="justify-end card-body">
					<h2 class="card-title">Image overlay</h2>
					<p>
						Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
						sit necessitatibus veritatis sed molestiae voluptates incidunt iure
						sapiente.
					</p>
					<div class="card-actions">
						<button class="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</div>
		<div class="md:flex-1 m-5">
			<div class="card shadow-xl image-full">
				<figure>
					<img src="https://picsum.photos/id/1005/400/250" />
				</figure>
				<div class="justify-end card-body">
					<h2 class="card-title">Image overlay</h2>
					<p>
						Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
						sit necessitatibus veritatis sed molestiae voluptates incidunt iure
						sapiente.
					</p>
					<div class="card-actions">
						<button class="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<footer class="p-10 footer bg-base-300 text-base-content">
		<div>
			<span class="footer-title">Services</span>
			<a class="link link-hover">Branding</a>
			<a class="link link-hover">Design</a>
			<a class="link link-hover">Marketing</a>
			<a class="link link-hover">Advertisement</a>
		</div>
		<div>
			<span class="footer-title">Company</span>
			<a class="link link-hover">About us</a>
			<a class="link link-hover">Contact</a>
			<a class="link link-hover">Jobs</a>
			<a class="link link-hover">Press kit</a>
		</div>
		<div>
			<span class="footer-title">Social</span>
			<div class="grid grid-flow-col gap-4">
				<a>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
					>
						<path
							d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
						/>
					</svg>
				</a>
				<a>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
					>
						<path
							d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
						/>
					</svg>
				</a>
				<a>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
					>
						<path
							d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</footer>
</div>

<slot />
