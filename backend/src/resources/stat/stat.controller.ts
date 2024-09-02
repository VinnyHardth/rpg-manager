import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import StatServices from "./stat.services";

// read methods ---------------------------------------------------------------
const getAll = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get all stats'
    #swagger.description = 'Fetch all stats from the database.'

    #swagger.responses[200] = {description: 'List of all stats in the database.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  try {
    const stats = await StatServices.getAll();
    res.status(StatusCodes.OK).json(stats);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get a stat by ID'
    #swagger.description = 'Fetch a stat from the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'Stat ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'Stat found.'}
    #swagger.responses[404] = {description: 'Stat not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const stat = await StatServices.get(id);
    res.status(StatusCodes.OK).json(stat);

    if (!stat) {
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
    #swagger.summary = 'Create a new stat'
    #swagger.description = 'Create a new stat in the database.'
    
    #swagger.parameters['newStat'] = {
      in: 'body',
      description: 'The stat to create.',
      required: true,
      schema: { $ref: '#/definitions/StatCreate' }
    }
    
    #swagger.responses[201] = {description: 'Stat created.'}
    #swagger.responses[409] = {description: 'Stat already exists.'}
    #swagger.responses[422] = {description: 'Unprocessable entity.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  try {
    const stat = await StatServices.create(req.body);
    res.status(StatusCodes.CREATED).json(stat);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // Unique constraint failed
        res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    }
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Update a stat by ID'
    #swagger.description = 'Update a stat in the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'Stat ID.',
      in: 'path',
      required: true,
      type: 'string'
    }
    
    #swagger.parameters['updatedStat'] = {
      in: 'body',
      description: 'The updated stat.',
      required: true,
      schema: { $ref: '#/definitions/StatUpdate' }
    }
    
    #swagger.responses[200] = {description: 'Stat updated.'}
    #swagger.responses[404] = {description: 'Stat not found.'}
    #swagger.responses[422] = {description: 'Unprocessable entity.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */
  const { id } = req.params;
  try {
    const stat = await StatServices.update(id, req.body);

    if (!stat) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json(stat);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

// delete methods -------------------------------------------------------------
const remove = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Delete a stat by ID'
    #swagger.description = 'Delete a stat from the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'Stat ID.',
      in: 'path',
      required: true,
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'Stat deleted.'}
    #swagger.responses[404] = {description: 'Stat not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */
  const { id } = req.params;
  try {
    const stat = await StatServices.remove(id);

    if (!stat) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json(stat);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { getAll, get, create, update, remove };
