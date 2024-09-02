import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import UserInCampaignController from "../../resources/userInCampaign/userInCampaign.controller";
import UserInCampaignServices from "../../resources/userInCampaign/userInCampaign.services";

jest.mock("../../resources/userInCampaign/userInCampaign.services");

describe("userInCampaignController.get", () => {
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

  it("should get a user in campaign by id and return 200 status code", async () => {
    const mockUserInCampaign = {
      id: 1,
      userId: 1,
      campaignId: 1,
    };

    (UserInCampaignServices.get as jest.Mock).mockResolvedValue(
      mockUserInCampaign
    );

    await UserInCampaignController.get(req as Request, res as Response);

    expect(UserInCampaignServices.get).toHaveBeenCalledWith(
      (req.params as { id: string }).id
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockUserInCampaign);
  });

  it("should return 404 if user in campaign is not found", async () => {
    (UserInCampaignServices.get as jest.Mock).mockResolvedValue(null);

    await UserInCampaignController.get(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (UserInCampaignServices.get as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await UserInCampaignController.get(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
