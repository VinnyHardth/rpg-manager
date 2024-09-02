import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import StatController from "../../resources/stat/stat.controller";
import StatServices from "../../resources/stat/stat.services";

jest.mock("../../resources/stat/stat.services");

describe("StatController.update", () => {
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
    (StatServices.update as jest.Mock).mockResolvedValue(mockUpdatedStat);

    await StatController.update(req as Request, res as Response);

    expect(StatServices.update).toHaveBeenCalledWith("1", req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.OK);
    expect(jsonMock).toHaveBeenCalledWith(mockUpdatedStat);
  });

  it("should return 404 if stat is not found", async () => {
    (StatServices.update as jest.Mock).mockResolvedValue(null);

    await StatController.update(req as Request, res as Response);

    expect(StatServices.update).toHaveBeenCalledWith("1", req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.NOT_FOUND);
  });

  it("should return 500 for server errors", async () => {
    const error = new Error("Server error");
    (StatServices.update as jest.Mock).mockRejectedValue(error);

    await StatController.update(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
