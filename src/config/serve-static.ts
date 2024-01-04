import { join } from "path";

//
import { ServeStaticModuleOptions } from "@nestjs/serve-static";

//
const serveStaticOptions: ServeStaticModuleOptions = {
  rootPath: join(__dirname, "..", "..", "/uploads/"),
  serveRoot: "/uploads",
};

export default serveStaticOptions;
