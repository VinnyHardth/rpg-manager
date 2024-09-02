import { PrismaClient } from "@prisma/client";

import { CreateSystemDTO, UpdateSystemDTO, SystemDTO } from "./system.types";

const prisma = new PrismaClient();

// read methods ---------------------------------------------------------------
const getAll = async (): Promise<SystemDTO[]> => {
  return await prisma.system.findMany();
};

const get = async (id: string): Promise<SystemDTO | null> => {
  return await prisma.system.findUnique({ where: { id } });
};

// write methods --------------------------------------------------------------
const create = async (data: CreateSystemDTO): Promise<SystemDTO> => {
  return await prisma.system.create({ data });
};

const update = async (
  id: string,
  data: UpdateSystemDTO
): Promise<SystemDTO | null> => {
  return await prisma.system.update({ where: { id }, data });
};

// delete methods -------------------------------------------------------------
const remove = async (id: string): Promise<SystemDTO | null> => {
  return await prisma.system.delete({ where: { id } });
};

export default { getAll, get, create, update, remove };
