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
					type: 'Public Repository',
					color: 'blue'
				},
			]}
		/>
	</div>
</div>
