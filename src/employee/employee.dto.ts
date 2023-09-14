class EmployeeDTO {
  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  gender: string;

  startDate: Date;

  cafeId: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    gender: string,
    startDate: Date,
    cafeId: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.startDate = startDate;
    this.cafeId = cafeId;
  }
}

export default EmployeeDTO;
