import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import SystemStatServices from "./systemStat.services";

// read methods ---------------------------------------------------------------
const get = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get a system stat by ID'
    #swagger.description = 'Fetch a system stat from the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'System stat ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'System stat found.'}
    #swagger.responses[404] = {description: 'System stat not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const systemStat = await SystemStatServices.get(id);
    res.status(StatusCodes.OK).json(systemStat);

    if (!systemStat) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const getBySystemId = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get system stats by system ID'
    #swagger.description = 'Fetch system stats from the database by system ID.'
    
    #swagger.parameters['id'] = {
      description: 'System ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'System stats found.'}
    #swagger.responses[404] = {description: 'System stats not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const systemStats = await SystemStatServices.getBySystemId(id);
    res.status(StatusCodes.OK).json(systemStats);

    if (!systemStats) {
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
    #swagger.summary = 'Create a system stat'
    #swagger.description = 'Create a system stat in the database.'
    
    #swagger.parameters['systemStat'] = {
      in: 'body',
      description: 'System stat data.',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/SystemStatCreate' }
    }
    
    #swagger.responses[201] = {description: 'System stat created.'}
    #swagger.responses[400] = {description: 'Invalid data.'}
    #swagger.responses[409] = {description: 'System stat already exists.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  try {
    const newSystemStat = req.body;

    const hasSystemStats = await SystemStatServices.hasSystemStat(
      newSystemStat.systemId,
      newSystemStat.statId
    );

    if (hasSystemStats) {
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
      return;
    }

    const systemStat = await SystemStatServices.create(req.body);
    res.status(StatusCodes.CREATED).json(systemStat);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Update a system stat'
    #swagger.description = 'Update a system stat in the database.'
    
    #swagger.parameters['id'] = {
      description: 'System stat ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.parameters['systemStat'] = {
      in: 'body',
      description: 'System stat data.',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/SystemStatUpdate' }
    }
    
    #swagger.responses[200] = {description: 'System stat updated.'}
    #swagger.responses[400] = {description: 'Invalid data.'}
    #swagger.responses[404] = {description: 'System stat not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const systemStat = await SystemStatServices.update(id, req.body);
    res.status(StatusCodes.OK).json(systemStat);

    if (!systemStat) {
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
    #swagger.summary = 'Delete a system stat by ID'
    #swagger.description = 'Delete a system stat from the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'System stat ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'System stat deleted.'}
    #swagger.responses[404] = {description: 'System stat not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const systemStat = await SystemStatServices.remove(id);
    res.status(StatusCodes.OK).json(systemStat);

    if (!systemStat) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { get, getBySystemId, create, update, remove };
