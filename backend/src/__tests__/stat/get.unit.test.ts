import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import StatController from "../../resources/stat/stat.controller";
import StatServices from "../../resources/stat/stat.services";

jest.mock("../../resources/stat/stat.services");

describe("StatController.get", () => {
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
    (StatServices.get as jest.Mock).mockResolvedValue(mockStat);

    await StatController.get(req as Request, res as Response);

    expect(StatServices.get).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockStat);
  });

  it("should return 404 if the stat is not found", async () => {
    (StatServices.get as jest.Mock).mockResolvedValue(null);

    await StatController.get(req as Request, res as Response);

    expect(StatServices.get).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if an error occurs", async () => {
    (StatServices.get as jest.Mock).mockRejectedValue(new Error("Some error"));

    await StatController.get(req as Request, res as Response);

    expect(StatServices.get).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
