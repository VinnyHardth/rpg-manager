import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import systemStatController from "../../resources/systemStat/systemStat.controller";
import systemStatServices from "../../resources/systemStat/systemStat.services";

jest.mock("../../resources/systemStat/systemStat.services");

describe("systemStatController.getBySystemId", () => {
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

  it("should return 200 and the systemStat if found", async () => {
    const mockSystemStat = {
      id: 1,
      systemId: 1,
      statId: 1,
    };
    (systemStatServices.getBySystemId as jest.Mock).mockResolvedValue(
      mockSystemStat
    );

    await systemStatController.getBySystemId(req as Request, res as Response);

    expect(systemStatServices.getBySystemId).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockSystemStat);
  });

  it("should return 404 if the systemStat is not found", async () => {
    (systemStatServices.getBySystemId as jest.Mock).mockResolvedValue(null);

    await systemStatController.getBySystemId(req as Request, res as Response);

    expect(systemStatServices.getBySystemId).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 if an error occurs", async () => {
    (systemStatServices.getBySystemId as jest.Mock).mockRejectedValue(
      new Error("Some error")
    );

    await systemStatController.getBySystemId(req as Request, res as Response);

    expect(systemStatServices.getBySystemId).toHaveBeenCalledWith("1");
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
