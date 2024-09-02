import { System } from "@prisma/client";

type CreateSystemDTO = Omit<System, "id">;
type UpdateSystemDTO = Partial<CreateSystemDTO>;
type SystemDTO = System;

export { CreateSystemDTO, UpdateSystemDTO, SystemDTO };
