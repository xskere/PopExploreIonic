import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {FileUploadUsers} from "../../models/users/file-upload-users";
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUploadHouses} from "../../models/houses/file-upload-houses.model";

@Injectable({
  providedIn: 'root'
})
export class UserUploadService {
  private key: any;
  private basePath = '/users';
  private db: AngularFireDatabase;
  private storage: AngularFireStorage;
  constructor(db: AngularFireDatabase, storage: AngularFireStorage) {
    this.storage = storage;
    this.db = db;
  }

  pushFileToStorage(fileUploadUsers: FileUploadUsers): boolean {
    const filePath = `${this.basePath}/${fileUploadUsers.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUploadUsers.file);
    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
        fileUploadUsers.photoUrl = downloadURL;
        this.saveFileData(fileUploadUsers);
      });
    })).subscribe();
    return true;
  }

  getFiles(numFiles: number): AngularFireList<FileUploadUsers> {
    // @ts-ignore
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numFiles)
    );
  }

  deleteFile(fileUploadUsers: FileUploadUsers): void {
    this.deleteFileDatabase(fileUploadUsers.key)
      .then(() => {
        this.deleteFileStorage(fileUploadUsers.name);
      })
      .catch(error => console.log(error));
  }

  public deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  public saveFileData(fileUploadUsers: FileUploadUsers): void {
    if(window.sessionStorage.getItem("userToDelete") !== null){
      console.log(window.sessionStorage.getItem("userToDelete"));
      this.key = window.sessionStorage.getItem("userToDelete");
      this.deleteFileDatabase(this.key);
      window.sessionStorage.removeItem("userToDelete");
    }
    this.db.list(this.basePath).push(fileUploadUsers);
  }
}
