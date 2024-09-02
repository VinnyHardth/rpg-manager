import { Stat } from "@prisma/client";

type CreateStatDTO = Omit<Stat, "id">;
type UpdateStatDTO = Partial<CreateStatDTO>;
type StatDTO = Stat;

export { CreateStatDTO, UpdateStatDTO, StatDTO };
