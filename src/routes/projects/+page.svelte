<svelte:head>
	<title>Projects</title>
	<meta property="og:title" content="Social Media" />
</svelte:head>

<script>
	import MultiDots from "../../components/MultiDots.svelte";
	import ProjectCard from "../../components/ProjectCard.svelte";
</script>

<div class="relative overflow-hidden bg-white py-16">
	<MultiDots />
	<div class="relative px-6 lg:px-8">
		<div class="mx-auto max-w-prose text-lg">
			<h1>
				<span class="mt-2 block text-center text-3xl font-bold leading-8
					tracking-tight text-gray-900 sm:text-4xl">Personal Projects</span>
			</h1>
		</div>
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
	</div>
</div>
