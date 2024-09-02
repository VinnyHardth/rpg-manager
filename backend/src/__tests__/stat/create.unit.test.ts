import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import StatController from "../../resources/stat/stat.controller";
import StatServices from "../../resources/stat/stat.services";

jest.mock("../../resources/stat/stat.services");

describe("StatController.create", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        name: "stat1",
        description: "desc1",
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

  it("should create a new stat and return 201 status code", async () => {
    const mockStat = { id: 1, name: "stat1", description: "desc1" };
    (StatServices.create as jest.Mock).mockResolvedValue(mockStat);

    await StatController.create(req as Request, res as Response);

    expect(StatServices.create).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(jsonMock).toHaveBeenCalledWith(mockStat);
  });

  it("should return 409 if stat already exists", async () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed",
      {
        code: "P2002",
        clientVersion: "2.19.0",
      }
    );
    (StatServices.create as jest.Mock).mockRejectedValue(error);

    await StatController.create(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.CONFLICT);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.CONFLICT);
  });

  it("should return 500 for other errors", async () => {
    const error = new Error("Some other error");
    (StatServices.create as jest.Mock).mockRejectedValue(error);

    await StatController.create(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(sendMock).toHaveBeenCalledWith(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });
});
