import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import UserInCampaignServices from "./userInCampaign.services";

// read methods ---------------------------------------------------------------
const get = async (req: Request, res: Response): Promise<void> => {
  /*
      #swagger.summary = 'Get a user in campaign by ID'
      #swagger.description = 'Fetch a user in campaign from the database by ID.'
        
      #swagger.parameters['id'] = {
      description: 'User in campaign ID.',
      in: 'path', 
      required: true, 
      type: 'string'
      }
        
      #swagger.responses[200] = {description: 'User in campaign found.'}
      #swagger.responses[404] = {description: 'User in campaign not found.'}
      #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const userInCampaign = await UserInCampaignServices.get(id);
    res.status(StatusCodes.OK).json(userInCampaign);

    if (!userInCampaign) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const getByCampaignId = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Get users in campaign by campaign ID'
    #swagger.description = 'Fetch users in campaign from the database by campaign ID.'
        
    #swagger.parameters['id'] = {
    description: 'Campaign ID.',
    in: 'path', 
    required: true, 
    type: 'string'
    }
        
    #swagger.responses[200] = {description: 'Users in campaign found.'}
    #swagger.responses[404] = {description: 'Users in campaign not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const usersInCampaign = await UserInCampaignServices.getByCampaignId(id);
    res.status(StatusCodes.OK).json(usersInCampaign);

    if (!usersInCampaign) {
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
    #swagger.summary = 'Get campaigns by user ID'
    #swagger.description = 'Fetch campaigns from the database by user ID.'
        
    #swagger.parameters['id'] = {
    description: 'User ID.',
    in: 'path', 
    required: true, 
    type: 'string'
    }
        
    #swagger.responses[200] = {description: 'Campaigns found.'}
    #swagger.responses[404] = {description: 'Campaigns not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const campaigns = await UserInCampaignServices.getByUserId(id);
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
    #swagger.summary = 'Create a user in campaign'
    #swagger.description = 'Create a user in campaign in the database.'
        
    #swagger.parameters['userInCampaign'] = {
    in: 'body',
    description: 'User in campaign data.',
    required: true,
    type: 'object',
    schema: { $ref: '#/definitions/UserInCampaignCreate' }
    }
        
    #swagger.responses[201] = {description: 'User in campaign created.'}
    #swagger.responses[422] = {description: 'Unprocessable entity.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const data = req.body;

  try {
    const userAlreadyInCampaign =
      await UserInCampaignServices.hasUserInCampaign(
        data.userId,
        data.campaignId
      );

    if (userAlreadyInCampaign) {
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
      return;
    }

    const userInCampaign = await UserInCampaignServices.create(data);
    res.status(StatusCodes.CREATED).json(userInCampaign);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  /*
    #swagger.summary = 'Update a user in campaign'
    #swagger.description = 'Update a user in campaign in the database.'
        
    #swagger.parameters['id'] = {
    description: 'User in campaign ID.',
    in: 'path',
    required: true,
    type: 'string'
    }
        
    #swagger.parameters['userInCampaign'] = {
    in: 'body',
    description: 'User in campaign data.',
    required: true,
    type: 'object',
    schema: { $ref: '#/definitions/UpdateUserInCampaignUpdate' }
    }
        
    #swagger.responses[200] = {description: 'User in campaign updated.'}
    #swagger.responses[404] = {description: 'User in campaign not found.'}
    #swagger.responses[422] = {description: 'Unprocessable entity.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;
  const data = req.body;

  try {
    const userInCampaign = await UserInCampaignServices.update(id, data);
    res.status(StatusCodes.OK).json(userInCampaign);

    if (!userInCampaign) {
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
    #swagger.summary = 'Delete a user in campaign'
    #swagger.description = 'Delete a user in campaign from the database.'
        
    #swagger.parameters['id'] = {
    description: 'User in campaign ID.',
    in: 'path',
    required: true,
    type: 'string'
    }
        
    #swagger.responses[200] = {description: 'User in campaign deleted.'}
    #swagger.responses[404] = {description: 'User in campaign not found.'}
    #swagger.responses[500] = {description: 'Server error.'}
  */

  const { id } = req.params;

  try {
    const userInCampaign = await UserInCampaignServices.remove(id);
    res.status(StatusCodes.OK).json(userInCampaign);

    if (!userInCampaign) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { get, getByCampaignId, getByUserId, create, update, remove };
