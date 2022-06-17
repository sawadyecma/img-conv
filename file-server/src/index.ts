import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyFileUpload from "fastify-file-upload";
import fastifyCors from "@fastify/cors";
import path from "path";

const server = fastify();

const storageBasepath = "../public";

server.register(fastifyStatic, {
  root: path.join(__dirname, storageBasepath),
});
server.register(fastifyFileUpload);
server.register(fastifyCors, {
  origin: (origin, cb) => {
    cb(null, true);
    return;
  },
});

server.get("/ping", async () => {
  return "pongpongpaaaaaong\n";
});

server.post("/upload", function (req, res) {
  // @ts-ignore
  const file = req.raw.files["image"];

  file.mv(path.join(__dirname, storageBasepath, file.name));

  res.status(204).send();
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
