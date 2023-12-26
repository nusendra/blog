import type { Context, Config } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  return Response.json({
    url: "http://35.240.245.246",
    apiPort: "3333",
    chatPort: "4444",
  });
};

export const config: Config = {
  path: "/ahtefe-api-url",
};
