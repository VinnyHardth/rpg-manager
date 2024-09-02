import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import SystemController from "../../resources/system/system.controller";
import SystemServices from "../../resources/system/system.services";

jest.mock("../../resources/system/system.services");

describe("SystemController.get", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: { id: "1" },
    };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis(); // <== Make sure this returns `this`

    res = {
      status: statusMock,
      json: jsonMock,
      send: jest.fn(),
    };
  });

  it("should return 200 and the stat if found", async () => {
    const mockStat = { id: 1, name: "stat1", description: "desc1" };
    (SystemServices.get as jest.Mock).mockResolvedValue(mockStat);

    await SystemController.get(req as Request, res as Response);

    expect(SystemServices.get).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockStat);
  });

  it("should return 404 if the stat is not found", async () => {
    (SystemServices.get as jest.Mock).mockResolvedValue(null);

    await SystemController.get(req as Request, res as Response);

    expect(SystemServices.get).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if an error occurs", async () => {
    (SystemServices.get as jest.Mock).mockRejectedValue(
      new Error("Some error")
    );

    await SystemController.get(req as Request, res as Response);

    expect(SystemServices.get).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
