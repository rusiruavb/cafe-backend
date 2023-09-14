class CafeDTO {
  name: string;

  description: string;

  logo: any;

  location: string;

  constructor(name: string, description: string, logo:any, location: string) {
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.location = location;
  }
}

export default CafeDTO;
