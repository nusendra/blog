export const GET = () => {
	const data = {
		name: "Nusendra Hanggarawan",
		title: "Senior Fullstack Developer",
		headline: "Senior Fullstack Developer · 10+ years · JavaScript & PHP · SE Asia ↔ US · LLM-focused",
		avatarUrl: "https://raw.githubusercontent.com/nusendra/blog/master/static/profile.webp",
		address: "Gresik, East Java, Indonesia",
		addressUrl: "https://nusendra.com/maps",
		about: "Senior fullstack developer with 10+ years building production web applications for clients across Indonesia, Malaysia, Singapore, and the United States. Specialize in JavaScript (Vue/Nuxt, React/Next) and PHP (Laravel) ecosystems, with recent focus on real-estate / proptech and LLM integration in production web applications. Tech lead background, active JavaScript community organizer in Surabaya, and programming content creator on multiple Indonesian developer platforms.",
		objectives: [
			'10+ years of professional fullstack experience shipping production apps for fintech, e-commerce, ERP, and SaaS clients across SE Asia and the United States.',
			'Recent work focused on LLM integration, shipped AI-powered features in production for US clients using Claude.',
			'Tech lead at Zetpy / Neowave Solutions, drove technical direction, code review culture, and best-practice rollout across the engineering team.',
			'Programming educator: content creator at BuildWithAngga, CodePolitan, and Les Koding; web development mentor at Hacktiv8.',
			'Lead organizer of SurabayaJS, the JavaScript community in Surabaya, Indonesia. Organizer at JavaScript Indonesia, Svelte Indonesia, and Vue.js Indonesia.',
			'Public speaker, delivered talks at developer conferences, university events, and online webinars (archive: nusendra.com/talks).'
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
		],
		workExperiences: [
			{
				id: 1,
				companyName: 'DDTronik',
				location: 'Surabaya, Indonesia',
				years: '2014 - 2016',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Built C#.NET and Node.js extensions and plugins to extend the functionality of existing transaction systems.",
					"Developed a customer-facing transaction mobile app with React Native, WebSocket, and Firebase for real-time order handling.",
					"Built a Nuxt.js web monitoring dashboard for the operations team to manage customers, transactions, and customer support tickets.",
					"Designed and deployed internal and cloud application servers supporting end-to-end transaction flow."
				],
				type: 'Onsite',
				employmentType: 'Full-time'
			},
			{
				id: 2,
				companyName: 'PT. Benteng Api Technic',
				location: 'Surabaya, Indonesia',
				years: '2017 - 2020',
				roles: 'Fullstack Developer',
				jobDesc: [
					"Designed and shipped a Lumen + Vue.js ERP system replacing the legacy in-house application, covered procurement, inventory, and production workflows.",
					"Built an integrated payroll system serving the parent company and affiliated subsidiaries, automating monthly salary calculation and reporting."
				],
				type: 'Onsite',
				employmentType: 'Full-time'
			},
			{
				id: 3,
				companyName: 'Zetpy / Neowave Solutions Sdn. Bhd.',
				location: 'Kuala Lumpur, Malaysia',
				years: '2019 - 2021',
				roles: 'Senior Fullstack Developer / Tech Lead',
				jobDesc: [
					"Led technical direction and best-practice adoption across the engineering team, drove code review culture, branching strategy, and architectural decisions.",
					"Designed and shipped a multi-channel marketplace sync engine integrating Shopee, Lazada, and other e-commerce platforms, handled orders, product catalog, documents, and reporting for SME merchants.",
					"Built backend and frontend in Laravel (PHP) + Vue.js with focus on reliability and incremental migration off the legacy stack."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
			{
				id: 4,
				companyName: 'NowCircular',
				location: 'Singapore',
				years: '2021 - 2022',
				roles: 'Senior Fullstack Developer',
				jobDesc: [
					"Designed and built the entire platform from zero, TypeScript monorepo (Nuxt.js frontend, Express.js + GraphQL backend) deployed to Google Cloud via Terraform under a microservice architecture.",
					"Integrated multiple SaaS / PaaS providers (auth, payments, communication) into the platform and owned developer-experience tooling for the monorepo."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
			{
				id: 5,
				companyName: 'NanoPay',
				location: 'Malaysia',
				years: '2023 - 2025',
				roles: 'Senior Fullstack Developer',
				jobDesc: [
					"Maintained and extended the core Laravel + Livewire + MySQL fintech platform serving 6 active merchants, shipped features, resolved production incidents, and owned reporting workflows used by the operations team.",
					"Rebuilt the reporting pipeline, cut report build time from ~30 minutes (with frequent timeouts) to under 1 minute, eliminating production timeout errors and unblocking daily operational review."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
			{
				id: 6,
				companyName: 'Neutrino Inc.',
				location: 'United States',
				years: '2024 - Present',
				roles: 'Senior Fullstack Developer (Fulltime)',
				jobDesc: [
					"Primary day-to-day fullstack engineer on the project, ship features end-to-end on a Next.js + Laravel API + headless WordPress stack for a US-based product team.",
					"Set up the local-to-staging deployment workflow, Git branching strategy, environment configuration, and staging deployment pipeline."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
			{
				id: 7,
				companyName: 'Streamline Technology',
				location: 'United States',
				years: '2024 - Present',
				roles: 'Senior Fullstack Developer (Fulltime)',
				jobDesc: [
					"Build AI-powered product features for a US-based client on a Next.js + Laravel + WordPress stack, integrated Claude API for AI-assisted content workflows, OpenAI API for automated website content generation, and built a RAG-based chatbot.",
					"Set up production and staging environments from scratch, infrastructure provisioning, deployment pipelines, and the full local-to-live workflow.",
					"Own ongoing DevOps, deployment automation, environment maintenance, and platform reliability.",
					"Drove site-wide performance optimization, added database indexing on hot query paths, modernized legacy stack components, and refactored bottleneck code paths."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
			{
				id: 8,
				companyName: 'Independent / Freelance Clients',
				location: 'Various',
				years: '2014 - 2022',
				roles: 'Fullstack Developer (Freelance)',
				jobDesc: [
					"Bukulaba, finance app for PT. Buku Laba Indonesia. Built mobile (React Native) and web (Express.js + Next.js) clients.",
					"E-Monev, data integration & reporting system for the Government of Mojokerto, Indonesia (Nuxt.js + Lumen).",
					"PT. Platinum Ceramics Industry, frontend (Vue.js) for internal ERP system.",
					"PT. Antamas Indonesia, Laravel reporting application.",
					"PT. Benteng Api Refractorindo, marketing site (Nuxt.js + Lumen).",
					"Various web and React Native projects delivered via Upwork."
				],
				type: 'Remote',
				employmentType: 'Freelance'
			},
		],
		notableProjects: [
			{
				id: 1,
				name: "claude-code-telegram",
				role: "Creator & Maintainer",
				description: "Open-source Telegram bot bridging Claude Code CLI, enables agentic coding workflows from a Telegram chat with session persistence, working-directory control, and live typing indicators. Optimized for minimal hardware (~3 MB RAM on Raspberry Pi). An alternative to desktop Claude Code clients like openclaw and Hermes.",
				stack: ["Rust", "Tokio", "Teloxide (Telegram Bot API)", "Claude Code CLI"],
				url: "https://github.com/nusendra/claude-code-telegram",
				year: "2026 - Present",
				category: "Personal Tooling / AI / Open Source"
			},
			{
				id: 2,
				name: "CIRE Caribbean (Christie's International Real Estate)",
				role: "Lead Fullstack Engineer (built from scratch)",
				description: "Luxury real estate platform for Christie's International Real Estate Caribbean, discovery and listing of high-end residential properties across 19+ Caribbean islands. Built from scratch with property search, island-specific browsing, agent directory, and map-based discovery for a global luxury audience.",
				stack: ["WordPress", "Laravel"],
				url: "https://cirecaribbean.com/",
				year: "2025 - Present",
				category: "Real Estate / B2C Marketplace"
			},
			{
				id: 3,
				name: "REConnect",
				role: "Contributing Engineer (maintenance & features)",
				description: "Data management platform that enhances real estate marketing, REConnect subscribers get Listing Websites automatically populated and designed to showcase property listings. Contribute to ongoing maintenance and new feature development.",
				stack: ["Laravel"],
				url: "https://reconnectapp.com/",
				year: "2025 - Present",
				category: "Real Estate / SaaS"
			},
			{
				id: 4,
				name: "Seaglass",
				role: "Contributing Engineer (maintenance & features)",
				description: "Real estate marketplace where users can rent or buy homes, condos, and other properties. Contribute to ongoing maintenance and new feature development.",
				stack: ["Laravel", "Wordpress"],
				url: "https://www.seaglass.com/",
				year: "2025 - Present",
				category: "Real Estate / Marketplace"
			},
			{
				id: 5,
				name: "AHTEFE",
				role: "Creator & Builder",
				description: "Mobile phone credit and internet-data package sales app for the Indonesian market, handles top-ups across carriers. Published on Google Play.",
				stack: ["Expo (React Native)", "TypeScript", "Express.js", "OneSignal", "XMPP Protocol"],
				url: "https://play.google.com/store/apps/details?id=com.nusendra.ahtefereload&hl=id",
				year: "2018 - Present",
				category: "Mobile / Telecom / Fintech"
			},
			{
				id: 6,
				name: "NowCircular Platform",
				role: "Lead Fullstack Engineer (zero-to-one build)",
				description: "Designed and built the entire platform from zero, TypeScript monorepo with Nuxt.js frontend and Express.js + GraphQL backend, deployed to Google Cloud via Terraform under a microservice architecture. Integrated multiple SaaS / PaaS providers (auth, payments, communication).",
				stack: ["TypeScript", "Nuxt.js", "Express.js", "GraphQL", "Google Cloud", "Terraform", "Monorepo"],
				url: "https://nowcircular.com/",
				year: "2021 - 2022",
				category: "B2B SaaS / Architecture"
			}
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
				type: "Personal Projects & Tooling",
				activities: [
					"Built and maintain claude-code-telegram, an open-source Telegram bot for Claude Code CLI (alternative to openclaw / Hermes), written in Rust. Used in daily engineering work."
				]
			},
			{
				type: "Programming Content Creator & Mentoring",
				activities: [
					"Full-time content creator at Les Koding, topics: Vue.js, Express.js, TypeScript.",
					"Part-time content creator at BuildWithAngga, topic: TypeScript.",
					"Part-time content creator at CodePolitan, topics: Git, React.js fundamentals.",
					"Web development mentor at Hacktiv8, topic: web development fundamentals."
				]
			},
			{
				type: "Conferences and Speaking",
				activities: [
					"Personal Branding for Software Engineer, SESINDO 2020 (national informatics symposium).",
					"Build a Static Web / Landing Page using Vue.js, Jatim Dev Day 2019.",
					"Be a Software Developer with JavaScript, University of 17 Agustus 1945.",
					"Svelte, the JavaScript Compiler, SurabayaJS Community.",
					"Deploy Static Site Using GitHub Actions, JagoanHosting Webinar.",
					"And more, full talk archive at https://nusendra.com/talks"
				]
			},
			{
				type: "Community",
				activities: [
					"Lead organizer, SurabayaJS, JavaScript community in Surabaya, East Java, Indonesia.",
					"Organizer at JavaScript Indonesia, Svelte Indonesia, and Vue.js Indonesia."
				]
			}
		],
		skills: [
			{
				type: "Frontend",
				tools: ["React", "Next.js", "React Native", "Vue.js", "Nuxt.js", "Svelte", "SvelteKit"]
			},
			{
				type: "Backend",
				tools: ["JavaScript", "Node.js", "Bun", "PHP", "Express.js", "Hono", "Laravel", "tRPC", "GraphQL / Apollo", "Rust"]
			},
			{
				type: "Database",
				tools: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "Firestore"]
			},
			{
				type: "Architecture & Infra",
				tools: ["TypeScript", "Monorepo", "Microservices", "Google Cloud", "Firebase", "Socket.io", "JWT", "TailwindCSS"]
			},
			{
				type: "AI & LLM",
				tools: ["Anthropic Claude API", "OpenAI API", "Prompt Engineering", "RAG", "LangChain", "Mastra", "n8n", "openclaw", "Self-built Claude Code wrapper"]
			}
		],
		languages: [
			{ name: "Bahasa Indonesia", level: "Native" },
			{ name: "English", level: "Professional working proficiency" }
		],
		meta: {
			updatedAt: "2026-05-13"
		}
	}

	return new Response(JSON.stringify(data))
}

export const prerender = true;
