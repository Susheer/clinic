
export enum Sex {
    male,
    female
  }
export interface Patient{
    p_id:number,
    name:string;
    healthId:string | undefined;
    mobileNumber: string;
    sex:Sex;
    address:string;
    guardianName:string
}
