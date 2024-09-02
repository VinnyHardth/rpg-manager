import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import UserInCampaignServices from "../../resources/userInCampaign/userInCampaign.services";
import userInCampaignController from "../../resources/userInCampaign/userInCampaign.controller";

jest.mock("../../resources/userInCampaign/userInCampaign.services");

describe("userInCampaignController.create", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        userId: 1,
        campaignId: 1,
      },
    };

    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: sendMock });

    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };
  });

  it("should create a new user in campaign and return 201 status code", async () => {
    const mockUserInCampaign = {
      id: 1,
      userId: 1,
      campaignId: 1,
    };

    (UserInCampaignServices.hasUserInCampaign as jest.Mock).mockResolvedValue(
      false
    );
    (UserInCampaignServices.create as jest.Mock).mockResolvedValue(
      mockUserInCampaign
    );

    await userInCampaignController.create(req as Request, res as Response);

    expect(UserInCampaignServices.hasUserInCampaign).toHaveBeenCalledWith(
      req.body.userId,
      req.body.campaignId
    );
    expect(UserInCampaignServices.create).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(jsonMock).toHaveBeenCalledWith(mockUserInCampaign);
  });

  it("should return 409 if user is already in the campaign", async () => {
    (UserInCampaignServices.hasUserInCampaign as jest.Mock).mockResolvedValue(
      true
    );

    await userInCampaignController.create(req as Request, res as Response);

    expect(UserInCampaignServices.hasUserInCampaign).toHaveBeenCalledWith(
      req.body.userId,
      req.body.campaignId
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.CONFLICT);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.CONFLICT);
    expect(UserInCampaignServices.create).not.toHaveBeenCalled();
  });

  it("should return 500 if there is a server error", async () => {
    (UserInCampaignServices.hasUserInCampaign as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await userInCampaignController.create(req as Request, res as Response);

    expect(UserInCampaignServices.hasUserInCampaign).toHaveBeenCalledWith(
      req.body.userId,
      req.body.campaignId
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
