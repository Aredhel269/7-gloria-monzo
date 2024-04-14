import { App } from "./app";

try {
  void new App().start();
} catch (e) {
  process.exit(1);
}

process.on("uncaughtException", () => {
  process.exit(1);
});
