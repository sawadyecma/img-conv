import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

const server = fastify();
server.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
