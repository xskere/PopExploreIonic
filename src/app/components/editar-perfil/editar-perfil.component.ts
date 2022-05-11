import { Component, OnInit } from '@angular/core';
import {FileUploadUsers} from "../../models/users/file-upload-users";
import {AuthService} from "../../services/authentication/auth.service";
import {UserUploadService} from "../../services/usuarios/user-upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit{
  ngOnInit(): void {
    this.name = window.sessionStorage.getItem("name");
    this.description = window.sessionStorage.getItem("description");
    this.number = window.sessionStorage.getItem("number");
    this.country1 =  window.sessionStorage.getItem("country1");
    this.country2 = window.sessionStorage.getItem("country2");
    this.country3 = window.sessionStorage.getItem("country3");
    this.photoUrl = window.sessionStorage.getItem("photoUrl");
  }
  name: any;
  country1: any;
  description: any;
  country2: any;
  country3: any;
  number: any;
  email:any;
  photoUrl: any;
  selectedFiles?: FileList;
  currentFileUploadUsers?: FileUploadUsers;
  constructor(public authService: AuthService, public userUploadService: UserUploadService, public router: Router) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(name: string, description: string, number: string, country1: string, country2: string, country3: string, userType: string): void {
    if(name === ""){
      name = this.name;
    }
    if(description === ""){
      description = this.description;
    }
    if(number === ""){
      number = this.number;
    }
    if(country1 === ""){
      country1 = this.country1;
    }
    if(country2 === ""){
      country2 = this.country2;
    }
    if(country3 === ""){
      country3 = this.country3;
    }
    this.email = window.sessionStorage.getItem("email");
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUploadUsers = new FileUploadUsers(this.email, name, description, number, country1, country2, country3, userType);
        this.currentFileUploadUsers.file = file;
        this.userUploadService.pushFileToStorage(this.currentFileUploadUsers);
      }
    }else{
        this.currentFileUploadUsers = new FileUploadUsers(this.email, name, description, number, country1, country2, country3, userType);
        this.currentFileUploadUsers.photoUrl = this.photoUrl;
        this.userUploadService.saveFileData(this.currentFileUploadUsers);
    }
    this.router.navigate(['perfilUsuario']);
  }

}
