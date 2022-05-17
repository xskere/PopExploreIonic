import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {UserUploadService} from "../../services/usuarios/user-upload.service";
import {FileUploadHouses} from "../../models/houses/file-upload-houses.model";
import {FileUploadUsers} from "../../models/users/file-upload-users";

@Component({
  selector: 'app-registrar-cuenta',
  templateUrl: './registrar-cuenta.component.html',
  styleUrls: ['./registrar-cuenta.component.css']
})
export class RegistrarCuentaComponent{
  selectedFiles?: FileList;
  currentFileUploadUsers?: FileUploadUsers;
  constructor(public authService: AuthService, public userUploadService: UserUploadService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(email: string, name: string, description: string, number: string, country1: string, country2: string, country3: string, userType: string): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUploadUsers = new FileUploadUsers(email, name, description, number, country1, country2, country3, userType);
        this.currentFileUploadUsers.file = file;
        this.userUploadService.pushFileToStorage(this.currentFileUploadUsers);
      }
    }else{
      this.currentFileUploadUsers = new FileUploadUsers(email, name, description, number, country1, country2, country3, userType);
      this.currentFileUploadUsers.photoUrl = "https://firebasestorage.googleapis.com/v0/b/popexploreionic.appspot.com/o/images%2FMono.png?alt=media&token=81ffbc00-80b1-468f-9ffd-6d5b3f7d66cc";
      this.userUploadService.saveFileData(this.currentFileUploadUsers);
    }


  }



}

