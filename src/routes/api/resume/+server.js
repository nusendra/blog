export const GET = () => {
	const data = {
		name: "Nusendra Hanggarawan",
		title: "Senior Fullstack Developer",
		headline: "Senior Fullstack Developer · 10+ years · JavaScript & PHP · SE Asia ↔ US · LLM-focused",
		avatarUrl: "https://raw.githubusercontent.com/nusendra/blog/master/static/profile.webp",
		address: "Gresik, East Java, Indonesia",
		addressUrl: "https://nusendra.com/maps",
		email: "admin@nusendra.com",
		about: "Senior Fullstack Engineer with 10+ years building production web apps for clients across SE Asia and the United States. Currently shipping AI-powered features (Claude API, OpenAI, RAG) on Next.js + Laravel stacks. Former Tech Lead, lead organizer of SurabayaJS, and programming educator across Indonesia's biggest dev platforms.",
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
					"Led the engineering team of 5 as Tech Lead — drove code review culture, branching strategy, architectural decisions, and an onboarding flow that gets new devs productive in 1 week.",
					"Designed and shipped a multi-channel marketplace sync engine integrating ~100 marketplace platforms (Shopee, Lazada, and regional variants) — handled orders, product catalog, documents, and reporting for 6 SME merchants.",
					"Built backend and frontend in Laravel + Vue.js with focus on reliability, leading incremental migration off the legacy stack."
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
					"Designed and built the entire platform from zero with a team of 6 — TypeScript monorepo (Nuxt.js frontend, Express.js + GraphQL backend) deployed to Google Cloud via Terraform. Shipped MVP in 2 months.",
					"Integrated 5+ third-party services (Shopify, Stripe, FrankieOne, Singpass, etc.) covering commerce, payments, KYC, and auth — and owned developer-experience tooling for the monorepo."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
			{
				id: 5,
				companyName: 'NanoPay',
				location: 'Malaysia',
				years: '2023 - 2024',
				roles: 'Senior Fullstack Developer',
				jobDesc: [
					"Maintained the core Laravel + Livewire + MySQL fintech platform serving 6 active merchants alongside a team of 4 engineers — handled production incidents and owned reporting workflows used by the operations team.",
					"Rebuilt the reporting pipeline, cutting report build time from ~1 hour (with frequent timeouts) to ~5 minutes — eliminated production timeout errors and unblocked daily operational review."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
			{
				id: 6,
				companyName: 'Neutrino Inc.',
				location: 'United States',
				years: '2024 - Present',
				roles: 'Senior Fullstack Developer',
				jobDesc: [
					"Contract engagement with a Streamline Technology affiliate — ship features end-to-end on a Next.js + Laravel API + headless WordPress stack for a US product team.",
					"Designed the Git branching strategy, environment configuration, and local-to-staging deployment workflow for the shared engineering team of 5."
				],
				type: 'Remote',
				employmentType: 'Contract'
			},
			{
				id: 7,
				companyName: 'Streamline Technology',
				location: 'United States',
				years: '2024 - Present',
				roles: 'Senior Fullstack Developer',
				jobDesc: [
					"Ship AI-powered product features for a US client on a Next.js + Laravel + WordPress stack — Claude API for AI-assisted content workflows, OpenAI API for automated website content generation, and a production RAG chatbot.",
					"Set up production and staging environments from scratch — infrastructure provisioning, deployment pipelines, and the full local-to-live workflow supporting a team of 5 engineers and ~25 deploys per week.",
					"Own ongoing DevOps, deployment automation, and platform reliability — sustained production stability with only one critical incident to date.",
					"Drove site-wide performance optimization — added database indexing on hot query paths and refactored bottleneck code, cutting search response from ~4s → 1s and the slowest query from ~7s → 1s."
				],
				type: 'Remote',
				employmentType: 'Full-time'
			},
		],
		selectedFreelance: {
			note: "alongside full-time roles",
			items: [
				{ name: "Bukulaba", description: "Finance app for PT. Buku Laba Indonesia. Mobile (React Native) and web (Express.js + Next.js) clients." },
				{ name: "E-Monev", description: "Data integration & reporting system for the Government of Mojokerto, Indonesia (Nuxt.js + Lumen)." },
				{ name: "PT. Platinum Ceramics Industry", description: "Frontend (Vue.js) for internal ERP system." },
				{ name: "PT. Antamas Indonesia", description: "Laravel reporting application." },
				{ name: "PT. Benteng Api Refractorindo", description: "Marketing site (Nuxt.js + Lumen)." },
				{ name: "Upwork", description: "Various web and React Native projects delivered to international clients." }
			]
		},
		notableProjects: [
			{
				id: 1,
				name: "claude-code-telegram",
				role: "Creator & Maintainer",
				description: "Open-source Telegram bot bridging Claude Code CLI, enables agentic coding workflows from a Telegram chat with session persistence, working-directory control, and live typing indicators. Optimized for minimal hardware (~3 MB RAM on Raspberry Pi). An alternative to desktop Claude Code clients like openclaw and Hermes.",
				stack: ["Rust", "Tokio", "Teloxide (Telegram Bot API)", "Claude Code CLI"],
				url: "https://github.com/nusendra/claude-code-telegram",
				year: "Since 2026",
				category: "Personal Tooling / AI / Open Source"
			},
			{
				id: 2,
				name: "CIRE Caribbean (Christie's International Real Estate)",
				role: "Lead Fullstack Engineer (built from scratch)",
				description: "Luxury real estate platform for Christie's International Real Estate Caribbean, discovery and listing of high-end residential properties across 19+ Caribbean islands. Built from scratch with property search, island-specific browsing, agent directory, and map-based discovery for a global luxury audience.",
				stack: ["WordPress", "Laravel"],
				url: "https://cirecaribbean.com/",
				year: "Since 2025",
				category: "Real Estate / B2C Marketplace"
			},
			{
				id: 3,
				name: "REConnect",
				role: "Contributing Engineer (maintenance & features)",
				description: "Data management platform that enhances real estate marketing, REConnect subscribers get Listing Websites automatically populated and designed to showcase property listings. Contribute to ongoing maintenance and new feature development.",
				stack: ["Laravel"],
				url: "https://reconnectapp.com/",
				year: "Since 2025",
				category: "Real Estate / SaaS"
			},
			{
				id: 4,
				name: "Seaglass",
				role: "Contributing Engineer (maintenance & features)",
				description: "Real estate marketplace where users can rent or buy homes, condos, and other properties. Contribute to ongoing maintenance and new feature development.",
				stack: ["Laravel", "Wordpress"],
				url: "https://www.seaglass.com/",
				year: "Since 2025",
				category: "Real Estate / Marketplace"
			},
			{
				id: 5,
				name: "NowCircular Platform",
				role: "Lead Fullstack Engineer (zero-to-one build, team of 6)",
				description: "Designed and built the entire platform from zero with a team of 6 — TypeScript monorepo with Nuxt.js frontend and Express.js + GraphQL backend, deployed to Google Cloud via Terraform. MVP shipped in 2 months. Integrated 5+ third-party services covering commerce (Shopify), payments (Stripe), KYC (FrankieOne), and auth (Singpass).",
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
				type: "Expert",
				tools: ["TypeScript / JavaScript", "React + Next.js", "Vue.js + Nuxt.js", "PHP + Laravel", "MySQL"]
			},
			{
				type: "Strong",
				tools: ["React Native", "Node.js + Express", "Livewire", "PostgreSQL", "Claude API + OpenAI + RAG", "TailwindCSS", "Svelte / SvelteKit"]
			},
			{
				type: "Working knowledge",
				tools: ["Rust", "Google Cloud + Terraform"]
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
