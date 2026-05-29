<svelte:head>
	<title>Projects</title>
	<meta property="og:title" content="Social Media" />
</svelte:head>

<script>
	import ProjectCard from "../../components/ProjectCard.svelte";
</script>

<div class="relative overflow-hidden bg-white pb-16">
	<img
		src="/projects-header.webp"
		alt="Projects header"
		class="mb-12 w-full object-cover"
	/>
	<div class="relative px-6 lg:px-8">
		<ProjectCard
			title="Ployer"
			tools="Rust, SvelteKit, Caddy, Docker"
			imageUrl=""
			imageAlt="nusendra ployer"
			description="A lightweight, self-hosted PaaS — deploy apps from Git with automatic SSL, health checks, and webhooks."
			details="Built with Rust and SvelteKit, targeting under 50MB RAM idle. Think Coolify, but leaner. Supports multi-server deploys, encrypted secrets (AES-256-GCM), and real-time build/runtime logs over WebSocket."
			projectUrl="https://github.com/nusendra/ployer"
			types={[
				{ type: 'Web App', color: 'green' },
				{ type: 'Open Source', color: 'yellow' },
				{ type: 'Public', color: 'blue' },
			]}
		/>

		<ProjectCard
			title="Claude Code Telegram"
			tools="Rust, Telegram Bot API, Claude Code CLI"
			imageUrl=""
			imageAlt="nusendra claude code telegram"
			description="Single-user Telegram bot that wraps the Claude Code CLI."
			details="Built in Rust and designed to run on a Raspberry Pi. Lets you talk to Claude Code from your phone via Telegram."
			projectUrl="https://github.com/nusendra/claude-code-telegram"
			types={[
				{ type: 'Bot', color: 'green' },
				{ type: 'Open Source', color: 'yellow' },
				{ type: 'Public', color: 'blue' },
			]}
		/>

		<ProjectCard
			title="CentralEnv"
			tools="Rust, axum, SvelteKit, SQLite"
			imageUrl=""
			imageAlt="nusendra centralenv"
			description="Self-hosted, single-admin manager for .env variables."
			details="Run the server on a home box, expose it over a Cloudflare Tunnel or Tailscale, manage projects and environments through a SvelteKit web UI, and pull values onto any device with a small Rust CLI. AES-GCM encryption with SQLite at rest."
			projectUrl="https://github.com/nusendra/centralenv"
			types={[
				{ type: 'CLI / Web App', color: 'green' },
				{ type: 'Open Source', color: 'yellow' },
				{ type: 'Public', color: 'blue' },
			]}
		/>

		<ProjectCard
			title="cmdman"
			tools="Rust"
			imageUrl=""
			imageAlt="nusendra cmdman"
			description="A CLI tool to save, manage, and execute custom commands with named aliases."
			details="Written in Rust. Stores commands as JSON in ~/.config/cmdman/commands.json, with full terminal control when executing saved commands."
			projectUrl="https://github.com/nusendra/cmdman"
			types={[
				{ type: 'CLI', color: 'green' },
				{ type: 'Open Source', color: 'yellow' },
				{ type: 'Public', color: 'blue' },
			]}
		/>

		<ProjectCard
			title="AHTEFE - Phone Credit and Data Package"
			tools="Expo - React Native, TypeScript, ExpressJS"
			imageUrl="/projects/ahtefe.webp"
			imageAlt="nusendra ahtefe"
			description="Mobile phone credit and internet data package sales app"
			details="Built with Expo React Native, ExpressJS, TypeScript, OneSignal, and XMPP Protocol"
			projectUrl="https://play.google.com/store/apps/details?id=com.nusendra.ahtefereload&hl=id"
			types={[
				{
					type: 'Mobile App',
					color: 'green'
				},
				{
					type: 'Production',
					color: 'yellow'
				},
				{
					type: 'Public',
					color: 'blue'
				},
			]}
			linkLabel="Go to download page"
		/>

		<ProjectCard
			title="Typescript Schema Validator"
			tools="Typescript, Ajv"
			imageUrl="/projects/typescript-schema-validator.webp"
			imageAlt="nusendra typescript schema validator"
			description="A minimal schema generator for validating TypeScript interfaces and types at runtime."
			details="If you have a TypeScript interface and want to create a schema for validation, this tool automates the process, so you don't have to create the schemas manually."
			projectUrl="https://github.com/nusendra/typescript-schema-validator"
			types={[
				{
					type: 'Package / Library',
					color: 'green'
				},
				{
					type: 'Dev Dependency',
					color: 'yellow'
				},
				{
					type: 'Public',
					color: 'blue'
				},
			]}
		/>

		<ProjectCard
			title="Resume Template"
			tools="Astro, Typescript, TailwindCSS"
			imageUrl="/projects/resume.webp"
			imageAlt="nusendra resume"
			description="Create professional, simple and minimalist resume with your own json data"
			details="Empower yourself to craft sleek and polished resumes effortlessly with this app. By simply providing your own JSON data, you can generate professional, simple, and minimalist resumes tailored to your unique profile."
			projectUrl="https://github.com/nusendra/resume-template"
			types={[
				{
					type: 'Template',
					color: 'green'
				},
				{
					type: 'Production',
					color: 'yellow'
				},
				{
					type: 'Public',
					color: 'blue'
				},
			]}
		/>

		<ProjectCard
			title="Express & TypeScript Boilerplate"
			tools="Expressjs, Typescript"
			imageUrl="/projects/express-typescript-boilerplate.webp"
			imageAlt="nusendra express typescript boilerplate"
			description="A robust foundation for building scalable and maintainable backend applications with ease."
			details="Designed for developers who prefer the TypeScript language and the flexibility of the Express framework, this minimal boilerplate accelerates development by providing a comprehensive starting point with best practices baked in."
			projectUrl="https://github.com/nusendra/express-typescript-boilerplate"
			types={[
				{
					type: 'Template',
					color: 'green'
				},
				{
					type: 'Production',
					color: 'yellow'
				},
				{
					type: 'Public',
					color: 'blue'
				},
			]}
		/>

		<ProjectCard
			title="Meraindia - Social Media"
			tools="Expressjs, Typescript, Nextjs, tRPC, PostgreSQL"
			imageUrl="/projects/meraindia-thumbnail.webp"
			thumbnailType="video"
			videoSrc="/projects/meraindia.mov"
			imageAlt="nusendra social media project"
			description="Another Social Media App"
			details="This was a freelance project where I built a social media app for a client based in India"
			projectUrl=""
			types={[
				{
					type: 'Web App',
					color: 'green'
				},
				{
					type: 'Production',
					color: 'yellow'
				},
				{
					type: 'Private',
					color: 'blue'
				},
			]}
		/>

		<ProjectCard
			title="Quizlr"
			tools="React Native, Expo, Typescript"
			imageUrl="/projects/quizlr.webp"
			thumbnailType="video"
			videoSrc="/projects/quizlr.mov"
			imageAlt="nusendra mobile app"
			description="Simple Quiz App"
			details="This was a freelance project where I built a quizionaire app for a client based in Canada, the UX feels like scrolling in TikTok"
			projectUrl="https://github.com/nusendra/quizlr"
			types={[
				{
					type: 'Mobile App',
					color: 'green'
				},
				{
					type: 'Production',
					color: 'yellow'
				},
				{
					type: 'Private',
					color: 'blue'
				},
			]}
		/>

		<ProjectCard
			title="SpeedyCook"
			tools="Expo, Typescript, ExpressJS, ChatGPT API"
			imageUrl="/projects/speedycook.webp"
			thumbnailType="video"
			videoSrc="/projects/speedycook.mp4"
			imageAlt="nusendra mobile app"
			description="An AI Recipe Finder App"
			details="A freelance project that generates a recipe based on your ingredients"
			projectUrl="https://github.com/nusendra/speedycook"
			types={[
				{
					type: 'Mobile App',
					color: 'green'
				},
				{
					type: 'Production',
					color: 'yellow'
				},
				{
					type: 'Public',
					color: 'blue'
				},
			]}
		/>
	</div>
</div>
