export class FileUploadReservas {
  key!: string;
  name: string;
  url: string;
  email: string;
  constructor(name: string, url: string, email:string) {
    this.name = name;
    this.url = url;
    this.email = email;
  }
}
