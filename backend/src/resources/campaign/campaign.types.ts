import { Campaign } from "@prisma/client";

type CreateCampaignDTO = Omit<Campaign, "id">;
type UpdateCampaignDTO = Partial<CreateCampaignDTO>;
type CampaignDTO = Campaign;

export { CreateCampaignDTO, UpdateCampaignDTO, CampaignDTO };
