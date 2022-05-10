export class FileUploadReservas {
  key!: string;
  name: string;
  url: string;
  urlPais: string;
  continente: string;
  pais: string;
  email: string;
  constructor(name: string, url: string, email:string, key: string, urlPais: string, continente: string, pais: string) {
    this.name = name;
    this.url = url;
    this.email = email;
    this.key = key;
    this.urlPais = urlPais;
    this.continente = continente;
    this.pais = pais;
  }
}
