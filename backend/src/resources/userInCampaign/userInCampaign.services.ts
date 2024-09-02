import { PrismaClient } from "@prisma/client";

import {
  CreateUserInCampaignDTO,
  UpdateUserInCampaignDTO,
  UserInCampaignDTO,
} from "./userInCampaign.types";

const prisma = new PrismaClient();

// read methods ---------------------------------------------------------------
const get = async (id: string): Promise<UserInCampaignDTO | null> => {
  return await prisma.userInCampaign.findUnique({ where: { id } });
};

const getByCampaignId = async (
  campaignId: string
): Promise<UserInCampaignDTO[]> => {
  return await prisma.userInCampaign.findMany({ where: { campaignId } });
};

const getByUserId = async (userId: string): Promise<UserInCampaignDTO[]> => {
  return await prisma.userInCampaign.findMany({ where: { userId } });
};

// write methods --------------------------------------------------------------
const create = async (
  data: CreateUserInCampaignDTO
): Promise<UserInCampaignDTO> => {
  return await prisma.userInCampaign.create({ data });
};

const update = async (
  id: string,
  data: UpdateUserInCampaignDTO
): Promise<UserInCampaignDTO | null> => {
  return await prisma.userInCampaign.update({ where: { id }, data });
};

// delete methods -------------------------------------------------------------
const remove = async (id: string): Promise<UserInCampaignDTO | null> => {
  return await prisma.userInCampaign.delete({ where: { id } });
};

// auxiliary methods ----------------------------------------------------------
const hasUserInCampaign = async (
  userId: string,
  campaignId: string
): Promise<boolean> => {
  const userInCampaign = await prisma.userInCampaign.findFirst({
    where: { userId, campaignId },
  });

  return !!userInCampaign;
};

export default {
  get,
  getByCampaignId,
  getByUserId,
  create,
  update,
  remove,
  hasUserInCampaign,
};
