import type { Context, Config } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  return Response.json({
    apiUrl: "https://ahtefe-backend.leskoding.com",
    chatUrl: "https://ahtefe-chat.leskoding.com",
    url: "http://35.240.245.246",
    apiPort: "3333",
    chatPort: "4444",
    informations: [
      "Kini kami melayani transaksi 24 jam.",
      "Hubungi 0896-1299-1475 untuk informasi lebih lanjut.",
    ]
  });
};

export const config: Config = {
  path: "/ahtefe-api-url",
};
