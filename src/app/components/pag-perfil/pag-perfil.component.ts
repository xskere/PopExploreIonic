import {Component, NgIterable} from '@angular/core';
import {UserUploadService} from "../../services/usuarios/user-upload.service";
import {map} from "rxjs";

interface Usuarios {
  id: Number;
  name: String;
  photo: String;
  userType: String;
  firstLikedCountry: String;
  secondLikedCountry: String;
  thirdLikedCountry: String;
  phone: String;
  houseOffered: String;
  description: String;
}

@Component({
  selector: 'app-pag-perfil',
  templateUrl: './pag-perfil.component.html',
  styleUrls: ['./pag-perfil.component.css']
})


export class PagPerfilComponent {
  userLogged: any;
  fileUploads?: NgIterable<any>;
  constructor(public userUploadService: UserUploadService) {
  }

  ngOnInit(): void {
    this.userUploadService.getFiles(10).snapshotChanges().pipe(
      map(changes => // store key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });

    this.userLogged = JSON.parse(localStorage.getItem('user')!);
  }

  onClick(email: string, name: string, description: string, number: string, country1: string, country2: string, country3: string, userType: string, key: string, photoUrl: string){
    window.sessionStorage.setItem("email", email);
    window.sessionStorage.setItem("name", name);
    window.sessionStorage.setItem("description", description);
    window.sessionStorage.setItem("number", number);
    window.sessionStorage.setItem("country1", country1);
    window.sessionStorage.setItem("country2", country2);
    window.sessionStorage.setItem("country3", country3);
    window.sessionStorage.setItem("userType", userType);
    window.sessionStorage.setItem("userToDelete", key);
    window.sessionStorage.setItem("photoUrl", photoUrl);
  }

}
