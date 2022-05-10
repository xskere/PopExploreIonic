import {Component, NgIterable, OnInit} from '@angular/core';
import {map} from "rxjs";
import {UploadReservasService} from "../../services/reservas/upload-reservas.service";
import {FileUploadReservas} from "../../models/reservas/file-upload-reservas";

@Component({
  selector: 'app-ver-reservas',
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.css']
})
export class VerReservasComponent implements OnInit {
  reservas?: NgIterable<any>;
  userLogged: any;
  currentFileUploadReservas?: FileUploadReservas;
  constructor(private uploadService: UploadReservasService) { }

  ngOnInit(): void {

    this.uploadService.getFiles("/reservas/",10).snapshotChanges().pipe(
      map(changes => // store key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.reservas = fileUploads;
    });
    this.userLogged = JSON.parse(localStorage.getItem('user')!);
  }

  onClick(name: string, url: string, key: string, urlPhoto: string, continent: string, pais: string){
    window.sessionStorage.setItem("selectedCountry", pais);
    window.sessionStorage.setItem("selectedHouse", key);
    window.sessionStorage.setItem("photo", urlPhoto);
    window.sessionStorage.setItem("selectedContinent", continent);

  }

}
