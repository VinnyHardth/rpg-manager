import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import campaignController from "../../resources/campaign/campaign.controller";
import CampaignServices from "../../resources/campaign/campaign.services";

jest.mock("../../resources/campaign/campaign.services");

describe("campaignController.get", () => {
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

  it("should return a campaign by ID", async () => {
    const mockCampaign = {
      id: 1,
      title: "New Campaign",
      description: "A new campaign description",
      startDate: "2024-09-01",
      endDate: "2024-12-31",
    };
    (CampaignServices.get as jest.Mock).mockResolvedValue(mockCampaign);

    await campaignController.get(req as Request, res as Response);

    expect(CampaignServices.get).toHaveBeenCalledWith(
      (req.params as { id: string }).id
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockCampaign);
  });

  it("should return 404 if campaign not found", async () => {
    (CampaignServices.get as jest.Mock).mockResolvedValue(null);

    await campaignController.get(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (CampaignServices.get as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await campaignController.get(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
