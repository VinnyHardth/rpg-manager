import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import systemStatController from "../../resources/systemStat/systemStat.controller";
import systemStatServices from "../../resources/systemStat/systemStat.services";

jest.mock("../../resources/systemStat/systemStat.services");

describe("systemStatController.create", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        systemId: 1,
        statId: 1,
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

  it("should create a new systemStat and return 201 status code", async () => {
    const mockSystemStat = {
      id: 1,
      systemId: 1,
      statId: 1,
    };
    (systemStatServices.create as jest.Mock).mockResolvedValue(mockSystemStat);
    (systemStatServices.hasSystemStat as jest.Mock).mockResolvedValue(false);

    await systemStatController.create(req as Request, res as Response);

    expect(systemStatServices.create).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(jsonMock).toHaveBeenCalledWith(mockSystemStat);
  });

  it("should return 409 if systemStat already exists", async () => {
    (systemStatServices.hasSystemStat as jest.Mock).mockResolvedValue(true);

    await systemStatController.create(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.CONFLICT);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.CONFLICT);
  });

  it("should return 500 if there is a server error", async () => {
    (systemStatServices.hasSystemStat as jest.Mock).mockResolvedValue(false);
    (systemStatServices.create as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    await systemStatController.create(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
