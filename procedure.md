3D Model App

FRONTEND

Objective : Upload model file to dummy API (JSON) server, retrieve filenames to list & render selected file (model).

Steps:
1. Create a new angular app using following command
    ng new modelapp

2. Install boostrap for Responsive Wed Design (RWD) by using the following command
    npm i bootstrap

3. Add the following import to the styles.css file
    @import '~bootstrap/dist/css/bootstrap.min.css';

4. Add the following import to the main.ts file
    import 'bootstrap/dist/js/bootstrap.bundle.min.js';

5. Generate new module in app folder using following command
    ng g m model -m=app

6. Generate new components in model module using the following command
    ng g c model/modelList
    ng g c model/modelUpload
    ng g c model/modelRender

7. Generate new service in app folder for model upload & retrieve
    ng g s services/modelcr

8. Open src/app folder and start editing app.component.html file
    <router-outlet></router-outlet>

9. Start the app on local server on default port 4200 and open in browser by using the following command
    ng serve --open

10. Start a json server on localhost which will store the model using the following command
    json-server --watch .\src\app\files\model.json

11. Start editing the model.json file
    {
        "model": []
    }

12. Generate a class using the following command
    ng g cl classes/model

13. Start editing the model.class.ts file
    export class Model {
        modelstring:string;
        filename:string;

        constructor(modelstring:string, filename:string){
            this.modelstring = modelstring;
            this.filename = filename;
        }
    }

14. Start editing the app-routing.module.ts file to add a route 'render' matched to component ModelRenderComponent
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { ModelRenderComponent } from './model/model-render/model-render.component';

    const routes: Routes = [
    {path:'', component:ModelUploadComponent},        
    {path:'render', component:ModelRenderComponent}
    ];

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })

    export class AppRoutingModule { }

15. import { HttpClientModule } from '@angular/common/http' in the app.module.ts file

16. Open src/app/services and start editing modelcr.service.ts file
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Model } from '../classes/model';

    @Injectable({
    providedIn: 'root'
    })

    export class ModelcrService {

        // API url
        baseApiUrl = "http://localhost:3000/model";

        //index for render
        index!:number;

        constructor(private http: HttpClient) { }

        // send to database
        uploadModelFile(modelString: string, filename: string){  
            this.http.post(this.baseApiUrl, {"modelstring": modelString, "filename": filename}).subscribe(
            // this.http.post<Model>(this.baseApiUrl, [modelString, filename]).subscribe(  
            (response) => console.log(response),
            (error) => console.log(error),
            () => console.log("completed")
            )
        }

        //retrieve from database
        receiveModelFile(){
            return this.http.get<Model[]>(this.baseApiUrl);
        }

        //get index from model-list
        getIndex(i: number){
            this.index = i;
        }

        // send index to model-render
        setIndex(){
            console.log(this.index)
            return this.index;
        }
    }


17. Open src/app/model/model-upload folder and start editing model-upload.component.ts file
    import { Component, OnInit } from '@angular/core';
    import { ModelcrService } from 'src/app/services/modelcr.service';


    @Component({
    selector: 'app-model-upload',
    templateUrl: './model-upload.component.html',
    styleUrls: ['./model-upload.component.css']
    })

    export class ModelUploadComponent implements OnInit {

        filename:string='';
        modelString:string='';
        file!: File;

        // Inject service 
        constructor(private mcrs: ModelcrService) { }

        ngOnInit(): void {
        }

        // receive model file and convert to base64 string to send to database 
        onFileChange(event:any){
            if(event.target.files.length > 0){
                this.file = event.target.files[0];
                let reader = new FileReader();
                reader.readAsBinaryString(this.file);
                reader.onload = () => {
                    this.modelString = btoa(reader.result as string);
                }
            }
        }

        //send to modelcr.service.ts
        submit(){
            this.mcrs.uploadModelFile(this.modelString, this.filename);
        }
    }

18. Open src/app/model/model-upload and start editing model-upload.component.html file.
    <div class="form-group">
    <label for="name">Name</label>
    <input [(ngModel)]="filename" type="text" class="form-control">
    </div>
    <div class="form-group">
        <label for="file">File</label>
        <input id="file" type="file" class="form-control" (change)="onFileChange($event)">
    </div>
    <button class="btn btn-primary" (click)="submit()">Submit</button>
    <app-model-list></app-model-list>

19. Open src/app/model/model-list folder and start editing model-list.component.ts file.
    import { Component, OnInit } from '@angular/core';
    import { Router } from '@angular/router';
    import { Model } from 'src/app/classes/model';
    import { ModelcrService } from 'src/app/services/modelcr.service';

    @Component({
    selector: 'app-model-list',
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.css']
    })

    export class ModelListComponent implements OnInit {

        modelfile = new Array<Model>();

        constructor(private mcrs: ModelcrService, private router: Router) { }

        ngOnInit(): void {
            this.mcrs.receiveModelFile().subscribe(
            (response) => {this.modelfile = response},
            (error) => console.log(error),
            () => console.log("completed")
            ) 
        }

        render(i: number){
            this.mcrs.getIndex(i);
            this.router.navigate(['/render']);
        }
    }

20. Open src/app/model/model-list and start editing model-list.component.html file.
    <table class="table table-hover">
        <thead>
            <tr>
                <th>S.No.</th>
                <th>FileName</th>
                <th>Operation</th>
            </tr>
        </thead>
        <tbody *ngFor="let model of modelfile; let i = index">
            <tr>
                <td>{{ i+1 }}</td>
                <td>{{ model.filename }}</td>
                <td><button class="btn btn-primary" (click)="render(i)">Render</button></td>
            </tr>
        </tbody>
    </table>

21. Install the Three.js library for rendering 3D models and add the type to package.json by typing the following commands
    npm install three
    npm i --save-dev @types/three

22. Open src/app/model/model-render folder and start editing model-render.component.ts file.
    import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
    import { Model } from 'src/app/classes/model';
    import { ModelcrService } from 'src/app/services/modelcr.service';
    import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { Router } from '@angular/router';

    @Component({
    selector: 'app-model-render',
    templateUrl: './model-render.component.html',
    styleUrls: ['./model-render.component.css']
    })

    export class ModelRenderComponent implements OnInit/*, AfterViewInit*/ {

        @ViewChild('canvas')
        private canvasref!: ElementRef;

        //stage properties
        @Input() public cameraZ: number = 400;
        @Input() public fieldOfView: number = 1;
        @Input('nearClipping') public nearClippingPlane: number = 1;
        @Input('farClipping') public farClippingPlane: number = 1000;

        //helper properties
        private camera!: PerspectiveCamera;
        private get canvas(): HTMLCanvasElement{
            return this.canvasref.nativeElement;
        }
        private renderer!: WebGLRenderer;
        private scene: Scene = new Scene();
        private loader = new GLTFLoader();
        private light = new AmbientLight(0xffffff, 1);

        index!:number;
        modelfile = new Array<Model>();
        modelString = '';

        constructor(private mcrs: ModelcrService, private router: Router) { }

        ngOnInit(): void {
            this.index = this.mcrs.setIndex();
            
            this.mcrs.receiveModelFile().subscribe(
            (response) => {this.modelfile = response},
            (error) => console.log(error),
            () => console.log("completed")
            )
        }
        
        //create the scene
        private createScene(){
            // scene
            this.modelString = this.modelfile[this.index].modelstring;
            this.loader.load("data:application/octet-stream;base64,"+this.modelString, (gltf)=>{
            this.scene.background = new Color(0x000000);
            this.scene.add(gltf.scene);
            this.light.position.set(5,5,5);
            this.scene.add(this.light);
            console.log(`gltf : ${gltf}`);
            },(xhr)=>{
            console.log(`${(xhr.loaded/xhr.total*100)}% loaded`);
            }, (error)=>{
            console.log(`gltf loading error : ${error}`);
            });
            //camera
            let aspectRatio = this.getAspectRatio();
            this.camera = new PerspectiveCamera(
            this.fieldOfView,
            aspectRatio,
            this.nearClippingPlane,
            this.farClippingPlane
            )
            this.camera.position.z = this.cameraZ;
        }

        private getAspectRatio(){
            return this.canvas.clientWidth/this.canvas.clientHeight;
        }

        //start the rendering loop
        private startRenderingLoop(){
            //renderer
            this.renderer = new WebGLRenderer({canvas: this.canvas});
            this.renderer.setPixelRatio(devicePixelRatio);
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
            let controls = new OrbitControls(this.camera, this.renderer.domElement);
            let component: ModelRenderComponent = this;
            (function render(){
            requestAnimationFrame(render);
            controls.update();
            component.renderer.render(component.scene, component.camera);
            }());
        }

        render(){
            this.createScene();
            this.startRenderingLoop();
        }

        return(){
            this.router.navigate(['/']);
        }
    }

23. Open src/app/model/model-render and start editing model-render.component.html file.
    <button class="btn btn-primary" (click)="render()">Render</button>
    <button class="btn btn-primary" (click)="return()">Return to List</button>
    <h3>Once the render button is clicked, scroll up & down with mouse to zoom in & out and move  mouse to rotate the rendered object below</h3>
    <canvas #canvas id="canvas" style="height: 100%; width: 100%;"></canvas>