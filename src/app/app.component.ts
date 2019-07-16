import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from './modules/webcam/domain/webcam-image';
import {WebcamUtil} from './modules/webcam/util/webcam.util';
import {WebcamInitError} from './modules/webcam/domain/webcam-init-error';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from './firebase.config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'appRoot',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  // public clickCreate: boolean;

  // public get triggerObservable(): Observable<void> {
  //   return this.trigger.asObservable();
  // }

  // public get nextWebcamObservable(): Observable<boolean|string> {
  //   return this.nextWebcam.asObservable();
  // }
  // // toggle webcam on/off
  // public showWebcam = true;
  // public allowCameraSwitch = true;
  // public multipleWebcamsAvailable = false;
  // public deviceId: string;
  // public videoOptions: MediaTrackConstraints = {
  //    width: {ideal: 1024},
  //    height: {ideal: 576}
  // };
  // public errors: WebcamInitError[] = [];

  // // latest snapshot
  // public webcamImage: WebcamImage = null;

  // public capture: any;

  // // webcam snapshot trigger
  // private trigger: Subject<void> = new Subject<void>();
  // // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  // private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // public ngOnInit(): void {
  //   WebcamUtil.getAvailableVideoInputs()
  //     .then((mediaDevices: MediaDeviceInfo[]) => {
  //       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  //     });
  // }

  // public triggerSnapshot(): void {
  //   this.clickCreate = true;
  //   this.trigger.next();
  // }

  // public triggerSnapshot2(): void {
  //   this.clickCreate = false;
  //   this.trigger.next();
  // }

  // public toggleWebcam(): void {
  //   this.showWebcam = !this.showWebcam;
  // }

  // public handleInitError(error: WebcamInitError): void {
  //   this.errors.push(error);
  // }

  // async handleImage(webcamImage: WebcamImage) {
  //   this.webcamImage = webcamImage;
  //   this.capture = webcamImage.imageAsDataUrl;
  //   console.log("capture : " + this.capture);

  //   // save the picture in the DB
  //   if (this.clickCreate === true) {
  //     try {
  //       const pictures = storage().ref(`${new Date().getTime()}`);
  //       const {value: formValues} = await Swal.fire({
  //         title: 'Multiple inputs',
  //         html:
  //           '<input id="swal-input1" class="swal2-input">' +
  //           '<input id="swal-input2" class="swal2-input">',
  //         focusConfirm: false,
  //         preConfirm: () => {
  //           // save img in DB if input is submit
  //           if ( (<HTMLInputElement>document.getElementById('swal-input1')).value !== '' &&
  //           (<HTMLInputElement>document.getElementById('swal-input2')).value !== '' ) {
  //             return [
  //               (<HTMLInputElement>document.getElementById('swal-input1')).value,
  //               (<HTMLInputElement>document.getElementById('swal-input2')).value
  //             ];
  //           } else {
  //             return null;
  //           }
  //         }
  //       });
  //       if (formValues !== null) {
  //           pictures.putString(this.capture, 'data_url');
  //           Swal.fire(JSON.stringify(formValues));
  //           Swal.fire({
  //             type: 'success',
  //             title: 'succès',
  //             text: 'Vous êtes enregistré !'
  //           });
  //       } else {
  //           Swal.fire({
  //             type: 'error',
  //             title: 'Erreur',
  //             text: 'Veuillez remplir les champs!'
  //           });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     const obj = {'imgContent': this.capture.split(',')[1]};
  //     console.log(this.capture.split(',')[1]);
  //     console.log("object => " + obj.imgContent);
  //     this.http.post('http://localhost:8080/upload', obj).toPromise()
  //     .then((res) => {

  //       console.log(res);

  //       if ( res < 85 ) {
  //         Swal.fire({
  //           type: 'error',
  //           title: 'Erreur',
  //           text: "Vous n'êtes pas autorisé!"
  //         });
  //       } else {
  //         console.log('ok');
  //         this.router.navigate(['/ressources']);
  //       }
  //     });
  //   }
  // }

}
