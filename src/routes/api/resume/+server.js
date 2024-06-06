export const GET = () => {
	const data = {
		name: "Nusendra Hanggarawan",
		title: "Fullstack Developer",
		address: "Gresik, East Java, Indonesia, 61177",
		about: "a passionate software developer with a strong focus on fullstack development, specializing in JavaScript technologies. With a robust understanding of both front-end and back-end development, I am adept at creating dynamic, responsive, and user-friendly web applications.",
		objectives: [
			'8+ years of experience working in web development as a full-stack developer.',
			'Proven ability to leverage full-stack knowledge and experience to build interactive and user-centered websites.',
			'Became a lead developer at my previous company, primarily leading tech discussions and best practices.',
			'Passionate about sharing programming knowledge through my YouTube channel, community events, webinars, offline meetups, and blog.',
			'JavaScript community leader in Surabaya, Indonesia.'
		],
		links: [
			{
				id: "maps",
				name: "Maps",
				url: "https://nusendra.com/maps"
			},
			{
				id: "github",
				name: "Github",
				url: "https://nusendra.com/github"
			},
			{
				id: "linkedin",
				name: "LinkedIn",
				url: "https://nusendra.com/linkedin"
			},
			{
				id: "youtube",
				name: "Youtube",
				url: "https://nusendra.com/youtube"
			},
			{
				id: "x",
				name: "X / Twitter",
				url: "https://nusendra.com/x"
			},
			{
				id: "instagram",
				name: "Instagram",
				url: "https://nusendra.com/ig"
			},
		],
		workExperiences: [
			{
				id: 1,
				companyName: 'DDTronik',
				location: 'Surabaya, Indonesia',
				years: '2014 - 2016',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Create extensions and plugins to support existing apps using C#.NET and Node.js.",
					"Develop a mobile app to help customers handle transactions using React Native, WebSocket, and Firebase.",
					"Create a dashboard for web monitoring to manage customers, transactions, and customer services using Nuxt.js.",
					"Build various app servers (internal office and cloud) to support transactions."
				],
				type: 'Onsite'
			},
			{
				id: 2,
				companyName: 'PT. Benteng Api Technic',
				location: 'Surabaya, Indonesia',
				years: '2017 - 2020',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Create an ERP system using Lumen and Vue.js to replace the existing application.",
					"Create a payroll system for an integrated company."
				],
				type: 'Onsite'
			},
			{
				id: 3,
				companyName: 'Zetpy / Neowave Solutions Sdn. Bhd.',
				location: 'Kuala Lumpur, Malaysia',
				years: '2019 - 2021',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Build a backend and frontend application using Laravel PHP and Vue.js.",
					"Integrate multiple e-commerce platforms (Shopee, Lazada, etc.) with functionalities for orders, products, documents, and reporting, and sync them with the Zetpy app.",
					"Lead tech discussions and implement best practices in coding."
				],
				type: 'Remote'
			},
			{
				id: 4,
				companyName: 'NowCircular',
				location: 'Singapore',
				years: '2021 - 2022',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Build a product using Nuxtjs, Expressjs, GraphQL, Typescript, Monorepo and Microservice architecture, Google Cloud and Terraform.",
					"Integrating multiple Saas and Paas to product."
				],
				type: 'Remote'
			},
			{
				id: 5,
				companyName: 'NanoPay',
				location: 'Malaysia',
				years: '2023 - Present',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Build a product using Laravel, MySQL, and Livewire.",
					"Maintains existing app, bug fixing, create new features, and reporting."
				],
				type: 'Remote'
			},
			{
				id: 6,
				companyName: 'Freelancer',
				location: 'Anywhere',
				years: '2014 - Present',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Create a reporting app for PT. Antamas Indonesia using Laravel.",
					"Create a marketing app for PT. Benteng Api Refractorindo using NuxtJS and Lumen.",
					"Create a integration system and data reporting (E-Monev) in government of Mojokerto, Indonesia using NuxtJS and Lumen.",
					"Create a finance app (Bukulaba) for PT. Buku Laba Indonesia using React Native, ExpressJS and NextJS.",
					"Create an ERP system for PT. Platinum Ceramics Industry as a Frontend Dev using VueJS.",
					"Completed various projects (React Native, full-stack web development, and more) on Upwork"
				],
				type: 'Remote'
			},
		],
		educations: [
			{
				id: 1,
				title: "Associate Degree of Informatics",
				schoolName: "Surabaya State University",
				location: "Surabaya, Indonesia",
				years: "2009 - 2011"
			},
			{
				id: 2,
				title: "Bachelor of Informatics",
				schoolName: "Dr. Soetomo University",
				location: "Surabaya, Indonesia",
				years: "2011 - 2014"
			},
		],
		additionalActivities: [
			{
				type: "Programming Content Creator & Mentoring",
				activities: [
					"Part-Time content creator at BuildWithAngga, Topic : TypeScript",
					"Part-Time content creator at CodePolitan, Topic : Git, Reactjs Basic",
					"Part-Time Web Developer Mentor at Hacktiv8, Topic : Web Development Basic",
					"Fulltime content creator at Les Koding, Topic : Vuejs, Expressjs, TypeScript"
				]
			},
			{
				type: "Conferences and Appearances",
				activities: [
					"Speed Up Vuejs Development with Nuxtjs in SurabayaDev Community.",
					"Build a Static Web / Landing page using Vuejs in Jatim Dev Day 2019.",
					"Svelte, the JavaScript Compiler in SurabayaJS Community.",
					"How to use Progressive Web App to Benefit Your Startup in DILoSUB. Automagically.",
					"Deploy Static Site Using Github Actions in JagoanHosting Webinar.",
					"Personal Branding for Software Engineer in SESINDO 2020.",
					"Be a Software Developer with JavaScript in University of 17 Agustus.",
					"And many more. https://nusendra.com/talks"
				]
			},
			{
				type: "Community",
				activities: [
					"Community leader in SurabayaJS (JavaScript community in Surabaya, East Java, Indonesia).",
					"Organizer at JavaScript Indonesia, Svelte Indonesia, and VueJS Indonesia."
				]
			}
		],
		skills: [
			{
				type: "Frontend",
				tools: ["Reactjs", "Nextjs", "React Native", "Vuejs", "Nuxtjs", "Svelte", "Svelte-kit"]
			},
			{
				type: "Backend",
				tools: ["Javascript", "Node.js", "Bun.js", "PHP", "Expressjs", "Hono", "Laravel", "tRPC", "GraphQL / Apollo"]
			},
			{
				type: "Database",
				tools: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "Firestore"]
			},
			{
				type: "Others",
				tools: ["TypeScript", "TailwindCSS", "Monorepo", "Microservices", "Google Cloud", "Firebase", "Socket.io", "JWT"]
			}
		]
	}

	return new Response(JSON.stringify(data))
}

export const prerender = true;
