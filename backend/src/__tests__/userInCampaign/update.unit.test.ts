import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import UserInCampaignServices from "../../resources/userInCampaign/userInCampaign.services";
import userInCampaignController from "../../resources/userInCampaign/userInCampaign.controller";

jest.mock("../../resources/userInCampaign/userInCampaign.services");

describe("userInCampaignController.update", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: { id: "1" },
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

  it("should update the user in campaign and return 200 status code", async () => {
    const mockUpdatedUserInCampaign = {
      id: 1,
      userId: 1,
      campaignId: 2,
    };
    (UserInCampaignServices.update as jest.Mock).mockResolvedValue(
      mockUpdatedUserInCampaign
    );

    await userInCampaignController.update(req as Request, res as Response);

    expect(UserInCampaignServices.update).toHaveBeenCalledWith(
      (req.params as { id: string }).id,
      req.body
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockUpdatedUserInCampaign);
  });

  it("should return 404 if user in campaign not found", async () => {
    (UserInCampaignServices.update as jest.Mock).mockResolvedValue(null);

    await userInCampaignController.update(req as Request, res as Response);

    expect(UserInCampaignServices.update).toHaveBeenCalledWith(
      req.params?.id ?? "",
      req.body
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (UserInCampaignServices.update as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await userInCampaignController.update(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
