import { PrismaClient, Stat } from "@prisma/client";

import { CreateStatDTO, UpdateStatDTO, StatDTO } from "./stat.types";

const prisma = new PrismaClient();

// read methods ---------------------------------------------------------------
const getAll = async (): Promise<StatDTO[]> => {
  return await prisma.stat.findMany();
};

const get = async (id: string): Promise<StatDTO | null> => {
  return await prisma.stat.findUnique({ where: { id } });
};

// write methods --------------------------------------------------------------
const create = async (data: CreateStatDTO): Promise<StatDTO> => {
  return await prisma.stat.create({ data });
};

const update = async (
  id: string,
  data: UpdateStatDTO
): Promise<StatDTO | null> => {
  return await prisma.stat.update({ where: { id }, data });
};

// delete methods -------------------------------------------------------------
const remove = async (id: string): Promise<StatDTO | null> => {
  return await prisma.stat.delete({ where: { id } });
};

export default { getAll, get, create, update, remove };
