import {Component, NgIterable, OnInit} from '@angular/core';
import {FileUploadHouses} from "../../models/houses/file-upload-houses.model";
import {map} from "rxjs";
import {UploadReservasService} from "../../services/reservas/upload-reservas.service";
import {FileUploadReservas} from "../../models/reservas/file-upload-reservas";

@Component({
  selector: 'app-reserva-casa',
  templateUrl: './reserva-casa.component.html',
  styleUrls: ['./reserva-casa.component.css']
})
export class ReservaCasaComponent implements OnInit {
  userLogged: any;
  selectedFiles?: FileList;
  currentFileUploadReservas?: FileUploadReservas;
  percentage = 0;
  houses?: NgIterable<any>;
  selectedCountry: any;
  selectedContinent: any;
  selectedHouse: any;
  photo: any;

  constructor(private uploadService: UploadReservasService) { }

  ngOnInit(): void {
    this.selectedContinent = window.sessionStorage.getItem("selectedContinent");
    this.selectedCountry = window.sessionStorage.getItem("selectedCountry");
    this.photo = window.sessionStorage.getItem("photo");
    this.selectedHouse = window.sessionStorage.getItem("selectedHouse");

    this.uploadService.getFiles("/continentes/"+this.selectedContinent+"/listaPaises/" +this.selectedCountry+"/listaCasas/",10).snapshotChanges().pipe(
      map(changes => // store key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.houses = fileUploads;
    });
    this.userLogged = JSON.parse(localStorage.getItem('user')!);
  }

  onClick(name: string, url: string, key: string, urlPhoto: string){
    this.currentFileUploadReservas = new FileUploadReservas(name, url, this.userLogged.email, key, urlPhoto, this.selectedContinent, this.selectedCountry);
    this.uploadService.saveFileData("/reservas/", this.currentFileUploadReservas);
  }
}
