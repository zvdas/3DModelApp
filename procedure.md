3D Model App

1. Create a new angular app using following command
    ng new modelapp
2. Generate new module in app folder using following command
    ng g m model -m=app
3. Generate new components in model module using the following command
    ng g c model/modelList
    ng g c model/modelUpload
3. Generate new service in app folder for model upload & retrieve
    ng g s services/modelcr
4. Add ModelListComponent & ModelUploadComponent to exports array of @NgModule of model.module.ts file
5. Open src/app folder and start editing app.component.html file
    <router-outlet></router-outlet>
    <app-model-upload></app-model-upload>
6. Start the app on local server on default port 4200 by using the following command
    ng serve --open
7. Open src/app/model/model-upload folder and start editing model-upload.component.ts file
    import { Component, OnInit } from '@angular/core';
    import { ModelcrService } from 'src/app/services/modelcr.service';


    @Component({
    selector: 'app-model-upload',
    templateUrl: './model-upload.component.html',
    styleUrls: ['./model-upload.component.css']
    })

    export class ModelUploadComponent implements OnInit {

    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File = null; // Variable to store file

    // Inject service 
    constructor(private mcrs: ModelcrService) { }

    ngOnInit(): void {
    }

    // On file Select
    onChange(event) {
        this.file = event.target.files[0];
    }

    // OnClick of button Upload
        onUpload() {
            this.loading = !this.loading;
            console.log(this.file);
            this.mcrs.upload(this.file).subscribe(
                (event: any) => {
                    if (typeof (event) === 'object') {
                        // Short link via api response
                        this.shortLink = event.link;
                        this.loading = false; // Flag variable 
                    }
                }
            );
        }
    }

8. import { HttpClientModule } from '@angular/common/http' in the app.module.ts file
9. Open src/app/services and start editing modelcr.service.ts file
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs';

    @Injectable({
    providedIn: 'root'
    })

    export class ModelcrService {
        // API url
        baseApiUrl = "https://file.io"

        constructor(private http: HttpClient) { }
        // Returns an observable
        upload(file):Observable<any> {
        
            // Create form data
            const formData = new FormData(); 
            
            // Store form name as "file" with file data
            formData.append("file", file, file.name);
            
            // Make http post request over api
            // with formData as req
            return this.http.post(this.baseApiUrl, formData)
        }
    }

10. Open src/app/model/model-upload and start editing model-upload.component.html file.

11. Install boostrap for Responsive Wed Design (RWD) by using the following command
    npm i bootstrap
12. Add the following import to the styles.css file
    @import '~bootstrap/dist/css/bootstrap.min.css';
13. Add the following import to the main.ts file
    import 'bootstrap/dist/js/bootstrap.bundle.min.js';