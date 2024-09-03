import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import UserInCampaignServices from "../../resources/userInCampaign/userInCampaign.services";
import userInCampaignController from "../../resources/userInCampaign/userInCampaign.controller";

jest.mock("../../resources/userInCampaign/userInCampaign.services");

describe("userInCampaignController.remove", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: { id: "1" },
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

  it("should delete the user in campaign and return 200 status code", async () => {
    const mockDeletedUserInCampaign = {
      id: 1,
      userId: 1,
      campaignId: 1,
    };
    (UserInCampaignServices.remove as jest.Mock).mockResolvedValue(
      mockDeletedUserInCampaign
    );

    await userInCampaignController.remove(req as Request, res as Response);

    expect(UserInCampaignServices.remove).toHaveBeenCalledWith(
      (req.params as { id: string }).id
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockDeletedUserInCampaign);
  });

  it("should return 404 if user in campaign not found", async () => {
    (UserInCampaignServices.remove as jest.Mock).mockResolvedValue(null);

    await userInCampaignController.remove(req as Request, res as Response);

    expect(UserInCampaignServices.remove).toHaveBeenCalledWith(
      (req.params as { id: string }).id
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (UserInCampaignServices.remove as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await userInCampaignController.remove(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
