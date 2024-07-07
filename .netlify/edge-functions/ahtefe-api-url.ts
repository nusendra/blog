import type { Context, Config } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  return Response.json({
    apiUrl: "http://ahtefe-backend.194.233.94.59.sslip.io",
    chatUrl: "http://ahtefe-chat.194.233.94.59.sslip.io",
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
