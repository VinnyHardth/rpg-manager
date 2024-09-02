import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import SystemController from "../../resources/system/system.controller";
import SystemServices from "../../resources/system/system.services";

jest.mock("../../resources/system/system.services");

describe("SystemController.update", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: {
        name: "stat2",
        description: "desc2",
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

  it("should update a stat and return 200 status code", async () => {
    const mockUpdatedStat = { id: "1", name: "stat2", description: "desc2" };
    (SystemServices.update as jest.Mock).mockResolvedValue(mockUpdatedStat);

    await SystemController.update(req as Request, res as Response);

    expect(SystemServices.update).toHaveBeenCalledWith("1", req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockUpdatedStat);
  });

  it("should return 404 if stat is not found", async () => {
    (SystemServices.update as jest.Mock).mockResolvedValue(null);

    await SystemController.update(req as Request, res as Response);

    expect(SystemServices.update).toHaveBeenCalledWith("1", req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 for server errors", async () => {
    const error = new Error("Server error");
    (SystemServices.update as jest.Mock).mockRejectedValue(error);

    await SystemController.update(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
