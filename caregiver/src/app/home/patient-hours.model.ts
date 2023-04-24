export class PatientHours {
  constructor(
    public id: string,
    public date: Date,
    public hours: number,
    public patientId: string
  ) {}
}
