import { PrismaClient } from "@prisma/client";

import {
  CreateCampaignDTO,
  UpdateCampaignDTO,
  CampaignDTO,
} from "./campaign.types";

const prisma = new PrismaClient();

// read methods ---------------------------------------------------------------
const getAll = async (): Promise<CampaignDTO[]> => {
  return await prisma.campaign.findMany();
};

const get = async (id: string): Promise<CampaignDTO | null> => {
  return await prisma.campaign.findUnique({ where: { id } });
};

const getByUserId = async (userId: string): Promise<CampaignDTO[]> => {
  return await prisma.campaign.findMany({ where: { userId } });
};

const getBySystemId = async (systemId: string): Promise<CampaignDTO[]> => {
  return await prisma.campaign.findMany({ where: { systemId } });
};

// write methods --------------------------------------------------------------
const create = async (data: CreateCampaignDTO): Promise<CampaignDTO> => {
  return await prisma.campaign.create({ data });
};

const update = async (
  id: string,
  data: UpdateCampaignDTO
): Promise<CampaignDTO | null> => {
  return await prisma.campaign.update({ where: { id }, data });
};

// delete methods -------------------------------------------------------------
const remove = async (id: string): Promise<CampaignDTO | null> => {
  return await prisma.campaign.delete({ where: { id } });
};

export default {
  getAll,
  get,
  getByUserId,
  getBySystemId,
  create,
  update,
  remove,
};
