import { UserInCampaign } from "@prisma/client";

type CreateUserInCampaignDTO = Omit<UserInCampaign, "id">;
type UpdateUserInCampaignDTO = Partial<CreateUserInCampaignDTO>;
type UserInCampaignDTO = UserInCampaign;

export { CreateUserInCampaignDTO, UpdateUserInCampaignDTO, UserInCampaignDTO };
