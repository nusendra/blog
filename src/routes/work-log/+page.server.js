export const load = async ({ fetch, url }) => {
  const response = await fetch(`${url.origin}/api/work-log`);
  const posts = await response.json();

  return {
    posts,
  };
};
