import { existsSync } from "node:fs";

if (!existsSync(".env")) {
  throw new Error("backend/.env absent : lancez npm run setup à la racine du projet.");
}

process.loadEnvFile(".env");

const jwtSecret = process.env.JWT_SECRET ?? "";
if (jwtSecret.length < 32) {
  throw new Error("JWT_SECRET doit contenir au moins 32 caractères.");
}

console.log("Configuration d'environnement valide.");
