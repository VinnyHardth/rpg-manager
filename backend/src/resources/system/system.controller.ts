import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import SystemServices from "./system.services";

// read methods ---------------------------------------------------------------
const getAll = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get all systems'
    #swagger.description = 'Fetch all systems from the database.'

    #swagger.responses[200] = {description: 'List of all systems in the database.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  try {
    const systems = await SystemServices.getAll();
    res.status(StatusCodes.OK).json(systems);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get a system by ID'
    #swagger.description = 'Fetch a system from the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'System ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'System found.'}
    #swagger.responses[404] = {description: 'System not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const system = await SystemServices.get(id);
    res.status(StatusCodes.OK).json(system);

    if (!system) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

// write methods --------------------------------------------------------------
const create = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Create a system'
    #swagger.description = 'Create a system in the database.'
    
    #swagger.parameters['system'] = {
      in: 'body',
      required: true,
      description: 'System data.',
      schema: { $ref: "#/definitions/SystemCreate" }
    }
    
    #swagger.responses[201] = {description: 'System created.'}
    #swagger.responses[400] = {description: 'Invalid data.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const data = req.body;

  try {
    const system = await SystemServices.create(data);
    res.status(StatusCodes.CREATED).json(system);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // Unique constraint failed
        res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
        return;
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
        return;
      }
    }
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Update a system'
    #swagger.description = 'Update a system in the database.'
    
    #swagger.parameters['id'] = {
      description: 'System ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.parameters['system'] = {
      in: 'body',
      required: true,
      description: 'System data.',
      schema: { $ref: "#/definitions/SystemUpdate" }
    }
    
    #swagger.responses[200] = {description: 'System updated.'}
    #swagger.responses[400] = {description: 'Invalid data.'}
    #swagger.responses[404] = {description: 'System not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;
  const data = req.body;

  try {
    const system = await SystemServices.update(id, data);
    res.status(StatusCodes.OK).json(system);

    if (!system) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

// delete methods -------------------------------------------------------------
const remove = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Delete a system by ID'
    #swagger.description = 'Delete a system from the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'System ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'System deleted.'}
    #swagger.responses[404] = {description: 'System not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const system = await SystemServices.remove(id);
    res.status(StatusCodes.OK).json(system);

    if (!system) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { getAll, get, create, update, remove };
