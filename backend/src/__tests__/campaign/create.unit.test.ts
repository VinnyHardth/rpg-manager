import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import CampaignServices from "../../resources/campaign/campaign.services";
import campaignController from "../../resources/campaign/campaign.controller";

jest.mock("../../resources/campaign/campaign.services");

describe("campaignController.create", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        title: "New Campaign",
        description: "A new campaign description",
        startDate: "2024-09-01",
        endDate: "2024-12-31",
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

  it("should create a new campaign and return 201 status code", async () => {
    const mockCampaign = {
      id: 1,
      title: "New Campaign",
      description: "A new campaign description",
      startDate: "2024-09-01",
      endDate: "2024-12-31",
    };
    (CampaignServices.create as jest.Mock).mockResolvedValue(mockCampaign);

    await campaignController.create(req as Request, res as Response);

    expect(CampaignServices.create).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(jsonMock).toHaveBeenCalledWith(mockCampaign);
  });

  it("should return 500 if there is a server error", async () => {
    (CampaignServices.create as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await campaignController.create(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
