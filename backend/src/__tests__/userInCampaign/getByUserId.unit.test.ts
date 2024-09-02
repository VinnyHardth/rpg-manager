import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import UserInCampaignServices from "../../resources/userInCampaign/userInCampaign.services";
import userInCampaignController from "../../resources/userInCampaign/userInCampaign.controller";

jest.mock("../../resources/userInCampaign/userInCampaign.services");

describe("userInCampaignController.getByUserId", () => {
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

  it("should return campaigns and return 200 status code", async () => {
    const mockCampaigns = [
      {
        id: 1,
        name: "Campaign 1",
      },
      {
        id: 2,
        name: "Campaign 2",
      },
    ];
    (UserInCampaignServices.getByUserId as jest.Mock).mockResolvedValue(
      mockCampaigns
    );

    await userInCampaignController.getByUserId(req as Request, res as Response);

    expect(UserInCampaignServices.getByUserId).toHaveBeenCalledWith(
      req.params?.id ?? ""
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockCampaigns);
  });

  it("should return 404 if no campaigns found for user", async () => {
    (UserInCampaignServices.getByUserId as jest.Mock).mockResolvedValue(null);

    await userInCampaignController.getByUserId(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (UserInCampaignServices.getByUserId as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await userInCampaignController.getByUserId(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
