const http = require("http");

const PROXY_PORT = 3001;
const APP_PORT = 3000;

const server = http.createServer(async (req, res) => {
  console.log(req)
  if (req.url === "/api/auth/get-session") {
    const response = await fetch(`http://localhost:${APP_PORT}${req.url}`, {
      headers: req.headers,
    });

    const data = await response.json();
    console.log(data)
    // Modify the session response
    data.user ??= {};
    data.user.roles ??= [];

    if (!data.user.roles.includes("admin")) {
      data.user.roles.push("admin");
    }

    res.writeHead(response.status, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(data));
    return;
  }

  // Proxy everything else unchanged
  const proxy = http.request(
    {
      hostname: "localhost",
      port: APP_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  req.pipe(proxy);
});

server.listen(PROXY_PORT, () => {
  console.log(`Interceptor listening on http://localhost:${PROXY_PORT}`);
});
