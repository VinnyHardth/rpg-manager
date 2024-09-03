import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import campaignController from "../../resources/campaign/campaign.controller";
import CampaignServices from "../../resources/campaign/campaign.services";

jest.mock("../../resources/campaign/campaign.services");

describe("campaignController.getByUserId", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: {
        userId: "1",
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

  it("should return all campaigns by userId", async () => {
    const mockCampaigns = [
      {
        id: 1,
        title: "New Campaign",
        description: "A new campaign description",
        startDate: "2024-09-01",
        endDate: "2024-12-31",
      },
    ];
    (CampaignServices.getByUserId as jest.Mock).mockResolvedValue(
      mockCampaigns
    );

    await campaignController.getByUserId(req as Request, res as Response);

    expect(CampaignServices.getByUserId).toHaveBeenCalledWith(
      (req.params as { userId: string }).userId
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockCampaigns);
  });

  it("should return 404 if campaign not found", async () => {
    (CampaignServices.getByUserId as jest.Mock).mockResolvedValue(null);

    await campaignController.getByUserId(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (CampaignServices.getByUserId as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await campaignController.getByUserId(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
