import { NextFunction, Request, Response } from "express"
import { Therapist, TherapistDbType } from "../models/therapist.model"

type TherapistGETResponseType = {
  userId: string
}

export class TherapistController {
  private filterResponseData(data: TherapistDbType): { id: string } {
    return { id: data.id }
  }

  private filterGETResponseData(
    data: TherapistDbType
  ): TherapistGETResponseType {
    return { userId: data.userId }
  }

  public getTherapists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const findAllTherapistsData: TherapistDbType[] = await Therapist.getAll()
    const filteredData = findAllTherapistsData.map(this.filterGETResponseData)
    res
      .status(200)
      .json({ data: filteredData, message: "Found all therapists" })
  }

  public getTherapistById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const therapistId: string = req.params.id
    const findOneTherapistData: TherapistDbType = await Therapist.getByUUID(
      therapistId
    )
    const filteredData = this.filterGETResponseData(findOneTherapistData)
    res.status(200).json({ data: filteredData, message: "Therapist found" })
  }

  public createTherapist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const therapistData: TherapistDbType = req.body
    const createTherapistData: TherapistDbType = await Therapist.create(
      therapistData
    )
    const filteredData = this.filterResponseData(createTherapistData)
    res.status(200).json({ data: filteredData, message: "Therapist created" })
  }

  public updateTherapist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const therapistId: string = req.params.id
    const therapistData: TherapistDbType = req.body
    const updateTherapistData: TherapistDbType = await Therapist.updateByUUID(
      therapistId,
      therapistData
    )
    const filteredData = this.filterResponseData(updateTherapistData)
    res.status(200).json({ data: filteredData, message: "Therapist updated" })
  }
}
