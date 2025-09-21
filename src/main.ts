import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["https://delivery-online.netlify.app", "http://localhost:5173"],
    credentials: true,
  });

  await app.listen(3001);
  console.log("Server running on http://localhost:3001");
}
bootstrap();
