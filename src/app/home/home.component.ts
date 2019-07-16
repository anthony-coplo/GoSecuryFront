import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from '../modules/webcam/domain/webcam-image';
import {WebcamUtil} from '../modules/webcam/util/webcam.util';
import {WebcamInitError} from '../modules/webcam/domain/webcam-init-error';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from '../firebase.config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,
     private activatedRoute: ActivatedRoute,
      private router: Router) {
    initializeApp(FIREBASE_CONFIG);
  }

  public clickCreate: boolean;

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
     width: {ideal: 1024},
     height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  public capture: any;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.clickCreate = true;
    this.trigger.next();
  }

  public triggerSnapshot2(): void {
    this.clickCreate = false;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  async handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    this.capture = webcamImage.imageAsDataUrl;
    console.log('capture => ' + this.capture);
    const obj = {'imgContent': this.capture.split(',')[1]};

    console.log("object we send => " + obj.imgContent);

    await this.http.post('http://localhost:8080/upload', obj).toPromise()
      .then((res) => {

        if (res) {
          console.log(res);
          console.log('ok');
          this.router.navigate(['/ressources']);

        } else {
          console.log(res);
          Swal.fire({
            type: 'error',
            title: 'Erreur',
            text: "Vous n'êtes pas autorisé!"
          });
        }
      });
    }
}

