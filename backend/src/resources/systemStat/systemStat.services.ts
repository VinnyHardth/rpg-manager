import { PrismaClient } from "@prisma/client";

import {
  CreateSystemStatDTO,
  UpdateSystemStatDTO,
  SystemStatDTO,
} from "./systemStat.types";

const prisma = new PrismaClient();

// read methods ---------------------------------------------------------------
const get = async (id: string): Promise<SystemStatDTO | null> => {
  return await prisma.systemStat.findUnique({ where: { id } });
};

const getBySystemId = async (systemId: string): Promise<SystemStatDTO[]> => {
  return await prisma.systemStat.findMany({ where: { systemId } });
};

// write methods --------------------------------------------------------------
const create = async (data: CreateSystemStatDTO): Promise<SystemStatDTO> => {
  return await prisma.systemStat.create({ data });
};

const update = async (
  id: string,
  data: UpdateSystemStatDTO
): Promise<SystemStatDTO | null> => {
  return await prisma.systemStat.update({ where: { id }, data });
};

// delete methods -------------------------------------------------------------
const remove = async (id: string): Promise<SystemStatDTO | null> => {
  return await prisma.systemStat.delete({ where: { id } });
};

// auxiliary methods ----------------------------------------------------------
const hasSystemStat = async (
  systemId: string,
  statId: string
): Promise<boolean> => {
  const systemStat = await prisma.systemStat.findFirst({
    where: { systemId, statId },
  });

  return !!systemStat;
};

export default { get, getBySystemId, create, update, remove, hasSystemStat };
