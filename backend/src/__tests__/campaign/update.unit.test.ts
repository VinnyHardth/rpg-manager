import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import CampaignServices from "../../resources/campaign/campaign.services";
import campaignController from "../../resources/campaign/campaign.controller";

jest.mock("../../resources/campaign/campaign.services");

describe("campaignController.update", () => {
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
      body: {
        title: "Updated Campaign",
        description: "An updated campaign description",
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

  it("should update an existing campaign and return 200 status code", async () => {
    const mockCampaign = {
      id: 1,
      title: "Updated Campaign",
      description: "An updated campaign description",
      startDate: "2024-09-01",
      endDate: "2024-12-31",
    };
    (CampaignServices.update as jest.Mock).mockResolvedValue(mockCampaign);

    await campaignController.update(req as Request, res as Response);

    expect(CampaignServices.update).toHaveBeenCalledWith(
      (req.params as { id: string }).id,
      req.body
    );
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockCampaign);
  });

  it("should return 404 if campaign is not found", async () => {
    (CampaignServices.update as jest.Mock).mockResolvedValue(null);

    await campaignController.update(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if there is a server error", async () => {
    (CampaignServices.update as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await campaignController.update(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
