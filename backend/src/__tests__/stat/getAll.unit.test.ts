import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import StatController from "../../resources/stat/stat.controller";
import StatServices from "../../resources/stat/stat.services";

jest.mock("../../resources/stat/stat.services");

describe("StatController.getAll", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis(); // <== Make sure this returns `this`

    res = {
      status: statusMock,
      json: jsonMock,
      send: jest.fn(),
    };
  });

  it("should return 200 and a list of stats", async () => {
    const mockStats = [{ id: 1, name: "stat1", description: "desc1" }];
    (StatServices.getAll as jest.Mock).mockResolvedValue(mockStats);

    await StatController.getAll(req as Request, res as Response);

    expect(StatServices.getAll).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockStats);
  });

  it("should return 500 if an error occurs", async () => {
    (StatServices.getAll as jest.Mock).mockRejectedValue(
      new Error("Some error")
    );

    await StatController.getAll(req as Request, res as Response);

    expect(StatServices.getAll).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
