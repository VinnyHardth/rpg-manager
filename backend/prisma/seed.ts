import { PrismaClient } from "@prisma/client";

import { candidatoSeeder } from "./seeders/usuarios/candidato";
import { recrutadorSeeder } from "./seeders/usuarios/recrutadores";

import { provaQuestaoSeeder } from "./seeders/provaQuestao/provaQuestao";
import { questaoCandidatoSeeder } from "./seeders/questaoCandidato/questaoCandidato";
import { codeSeeder } from "./seeders/questoes/code";
import { dissertativaSeeder } from "./seeders/questoes/dissertativa";
import { objetivaSeeder } from "./seeders/questoes/objetiva";
import { vagaCandidatoSeeder } from "./seeders/vagaCandidato/vagaCandidato";

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  // seeders de usuários
  await candidatoSeeder();
  await recrutadorSeeder();

  // seeders de questões
  await objetivaSeeder();
  await dissertativaSeeder();
  await codeSeeder();

  // provaQuestao seeder
  await provaQuestaoSeeder();

  // seeder de questaoCandidato
  await questaoCandidatoSeeder();

  // seeder de vagaCandidato
  await vagaCandidatoSeeder();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
