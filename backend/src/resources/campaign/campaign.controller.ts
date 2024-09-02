import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import CampaignServices from "./campaign.services";

// read methods ---------------------------------------------------------------
const getAll = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get all campaigns'
    #swagger.description = 'Fetch all campaigns from the database.'

    #swagger.responses[200] = {description: 'List of all campaigns in the database.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  try {
    const campaigns = await CampaignServices.getAll();
    res.status(StatusCodes.OK).json(campaigns);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get a campaign by ID'
    #swagger.description = 'Fetch a campaign from the database by ID.'
    
    #swagger.parameters['id'] = {
      description: 'Campaign ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'Campaign found.'}
    #swagger.responses[404] = {description: 'Campaign not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const campaign = await CampaignServices.get(id);
    res.status(StatusCodes.OK).json(campaign);

    if (!campaign) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const getByUserId = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get all campaigns by user ID'
    #swagger.description = 'Fetch all campaigns from the database by user ID.'
    
    #swagger.parameters['userId'] = {
      description: 'User ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'List of campaigns found.'}
    #swagger.responses[404] = {description: 'Campaigns not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { userId } = req.params;

  try {
    const campaigns = await CampaignServices.getByUserId(userId);
    res.status(StatusCodes.OK).json(campaigns);

    if (!campaigns) {
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
    #swagger.summary = 'Get all campaigns by system ID'
    #swagger.description = 'Fetch all campaigns from the database by system ID.'
    
    #swagger.parameters['systemId'] = {
      description: 'System ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'List of campaigns found.'}
    #swagger.responses[404] = {description: 'Campaigns not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { systemId } = req.params;

  try {
    const campaigns = await CampaignServices.getBySystemId(systemId);
    res.status(StatusCodes.OK).json(campaigns);

    if (!campaigns) {
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
    #swagger.summary = 'Create a campaign'
    #swagger.description = 'Add a new campaign to the database.'
    
    #swagger.parameters['campaign'] = {
      in: 'body',
      description: 'Campaign data.',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/CampaignCreate" }
    }
    
    #swagger.responses[201] = {description: 'Campaign created.'}
    #swagger.responses[422] = {description: 'Unprocessable entity.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const data = req.body;

  try {
    const campaign = await CampaignServices.create(data);
    res.status(StatusCodes.CREATED).json(campaign);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Update a campaign'
    #swagger.description = 'Modify a campaign in the database.'
    
    #swagger.parameters['id'] = {
      description: 'Campaign ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.parameters['campaign'] = {
      in: 'body',
      description: 'New campaign data.',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/CampaignUpdate" }
    }
    
    #swagger.responses[200] = {description: 'Campaign updated.'}
    #swagger.responses[404] = {description: 'Campaign not found.'}
    #swagger.responses[422] = {description: 'Unprocessable entity.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;
  const data = req.body;

  try {
    const campaign = await CampaignServices.update(id, data);
    res.status(StatusCodes.OK).json(campaign);

    if (!campaign) {
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
    #swagger.summary = 'Delete a campaign'
    #swagger.description = 'Remove a campaign from the database.'
    
    #swagger.parameters['id'] = {
      description: 'Campaign ID.',
      in: 'path', 
      required: true, 
      type: 'string'
    }
    
    #swagger.responses[200] = {description: 'Campaign deleted.'}
    #swagger.responses[404] = {description: 'Campaign not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const campaign = await CampaignServices.remove(id);
    res.status(StatusCodes.OK).json(campaign);

    if (!campaign) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
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
