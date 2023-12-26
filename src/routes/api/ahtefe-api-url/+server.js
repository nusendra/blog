export const GET = async () => {
	const apis = {
		// url: "http://194.233.94.59/",
		url: "http://35.240.245.246",
		apiPort: "3333",
		chatPort: "4444",
	};
	return new Response(JSON.stringify(apis));
};
