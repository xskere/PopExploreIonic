import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {finalize, Observable} from "rxjs";
import {FileUploadReservas} from "../../models/reservas/file-upload-reservas";

@Injectable({
  providedIn: 'root'
})
export class UploadReservasService {
  private db: AngularFireDatabase;
  constructor(db: AngularFireDatabase) {
    this.db = db;
  }

  getFiles(basePath: string, numFiles: number): AngularFireList<FileUploadReservas> {
    // @ts-ignore
    return this.db.list(basePath, ref =>
      ref.limitToLast(numFiles)
    );
  }

  public deleteFileDatabase(basePath: string, key: string): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  public saveFileData(basePath: string, fileUploadHouses: FileUploadReservas): void {
    this.db.list(basePath).push(fileUploadHouses);
  }
}
