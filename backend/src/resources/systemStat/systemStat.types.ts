import { SystemStat } from "@prisma/client";

type CreateSystemStatDTO = Omit<SystemStat, "id">;
type UpdateSystemStatDTO = Partial<CreateSystemStatDTO>;
type SystemStatDTO = SystemStat;

export { CreateSystemStatDTO, UpdateSystemStatDTO, SystemStatDTO };
