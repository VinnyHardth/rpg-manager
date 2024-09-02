import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import UserInCampaignServices from "../../resources/userInCampaign/userInCampaign.services";
import userInCampaignController from "../../resources/userInCampaign/userInCampaign.controller";

jest.mock("../../resources/userInCampaign/userInCampaign.services");

describe("userInCampaignController.getByCampaignId", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: {
        id: "1",
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

  it("should return users in campaign and return 200 status code", async () => {
    const mockUsersInCampaign = [
      {
        userId: 1,
        campaignId: 1,
        role: "participant",
      },
    ];
    (UserInCampaignServices.getByCampaignId as jest.Mock).mockResolvedValue(
      mockUsersInCampaign
    );

    await userInCampaignController.getByCampaignId(
      req as Request,
      res as Response
    );

    expect(UserInCampaignServices.getByCampaignId).toHaveBeenCalledWith(
      (req.params as { id: string }).id
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockUsersInCampaign);
  });

  it("should return 404 if no users found in campaign", async () => {
    (UserInCampaignServices.getByCampaignId as jest.Mock).mockResolvedValue(
      null
    );

    await userInCampaignController.getByCampaignId(
      req as Request,
      res as Response
    );

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (UserInCampaignServices.getByCampaignId as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await userInCampaignController.getByCampaignId(
      req as Request,
      res as Response
    );

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
