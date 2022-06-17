import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyFileUpload from "fastify-file-upload";
import path from "path";

const server = fastify();

const storageBasepath = "../public";

server.register(fastifyStatic, {
  root: path.join(__dirname, storageBasepath),
});
server.register(fastifyFileUpload);

server.get("/ping", async () => {
  return "pongpongpaaaaaong\n";
});

server.post("/upload", function (req, res) {
  // @ts-ignore
  const file = req.raw.files["image"];

  file.mv(path.join(__dirname, storageBasepath, file.name));

  res.send(file);
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
