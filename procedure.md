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

        // API URL (JSON Server)
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
        msg:string='';

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
            this.msg='File uploaded successfully';
        }
    }

18. Open src/app/model/model-upload and start editing model-upload.component.html file.
    <div class="container col-8 my-5">
        <div class="card bg-secondary p-3">
            <div class="form-group">
                <label for="name">Name</label>
                <input [(ngModel)]="filename" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label for="file">File</label>
                <input id="file" type="file" class="form-control" (change)="onFileChange($event)">
            </div>
            <button class="btn btn-primary my-2" (click)="submit()">Submit</button>
            <p class="text-white text-center">{{ msg }}</p>
        </div>
    </div>
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
    <div class="container col-8">
        <div class="card bg-secondary">
            <table class="table table-hover table-striped text-center text-white">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">FileName</th>
                        <th scope="col">Operation</th>
                    </tr>
                </thead>
                <tbody *ngFor="let model of modelfile; let i = index">
                    <tr>
                        <th scope="row">{{ i+1 }}</th>
                        <td>{{ model.filename }}</td>
                        <td><button class="btn btn-primary" (click)="render(i)">Render</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

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
    <div class="container">
        <div class="card bg-secondary m-5">
            <div class="row text-center">
                <div class="col-6 my-2">
                    <button class="btn btn-primary" (click)="render()">Render</button>
                </div>
                <div class="col-6 my-2">
                    <button class="btn btn-primary" (click)="return()">Return to List</button>
                </div>
            </div>
            <div class="row text-center text-white">
                <p>Once the render button is clicked, scroll up & down with mouse to zoom in & out and move  mouse to rotate the rendered object below</p>
            </div>
        </div>
        
        <canvas #canvas id="canvas" style="height: 100%; width: 100%;"></canvas>
    </div>

24. Add a background image by entering the URL in the styles.css file
    body{
        background-image: url('https://i.pinimg.com/564x/ef/ae/76/efae76f6c3f2b985090afa1f50900af8.jpg');
    }

BACKEND

Objective : MongoDB connection to the current Angular app will be made with Node.js Express.

Steps: 
1. Create a folder called mongodb-nodejs to store the backend files & folders.

2. Initialize the directory by typing the following command
    npm init -y

3. Install the modules express, mongoose (MongoDB schema), nodemon (run uninterrupted) & multer (file upload) by typing the following command
    npm install express mongoose nodemon multer

4. Create a file index.js and edit the file
    const express = require("express");

    const app = express();

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.json({message : "Welcome to the 3D Model Application"});
    })

    app.listen(4000, ()=>{
        console.log("The Server is listening on port 4000");
    })

5. Start the server by typing the following command and open link in browser
    npm start

    Configure MongoDB database & Mongoose
6. In the app folder, create a separate config folder for configuration with db.config.js file and edit the file
    const mongoose = require("mongoose");
    
    //local
    var url = 'mongodb://localhost:27017/threedm_db';

    //shared cluster
    var url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(url, (err) => {
        if(!err){
            console.log("Connection to MongoDB Successful");
        }else{
            console.log(`Connection to MongoDB Failed with error : ${JSON.stringify(err, undefined, 2)}`);
        }
    })

    module.exports = mongoose;

7. Define the Mongoose model in the threedModel.js file in app/models folder
    const mongoose = require("mongoose");

    var schema = mongoose.Schema({
        modelstring: { type: String },
        filename: { type: String }
    }, {
        timestamps : true
    });

    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    var threedm = mongoose.model("model", schema);

    module.exports = { threedm };

8. Mongoose model supports all CRUD functions, hence don't have to be entered separately. Inside app/controllers folder, create threedmController.js with the Read function
    const { threedm } = require("../models/threedmModel");

    //Retrieve all the models from the database
    exports.getAll = (req, res) => {
        threedm.find((err, docs) => {
            if(!err){
                res.send(docs);
            }else{
                console.log(`Error retrieving 3D model list : ${JSON.stringify(err, undefined, 2)}`);
            }
        });
    }

9. Inside app/routes folder, create threedmRoute.js with the Read function
    const threedmController = require("../controllers/threedmController");

    const express = require("express");

    const router = express.Router();

    router.get("/", threedmController.getAll);

    router.post("/", threedmController.create);

    module.exports = router;

10. Add the connect function to the index.js file
    const express = require("express");

    const { mongoose } = require("./app/config/dbconfig");

    var threedmRoutes = require("./app/routes/threedmRoute");

    const app = express();

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.use('/models', threedmRoutes);

    app.get('/', (req, res) => {
        res.json({message : "Welcome to the 3D Model Application"});
    })

    app.listen(4000, ()=>{
        console.log("The Server is listening on port 4000");
    })

11. Create a file multerconfig.js for configuring multer for uploading files
    const multer = require("multer");

    exports.upload = multer({ });

12. Inside app/controllers folder, add the Create function to threedmController.js
    const { threedm } = require("../models/threedmModel");

    // Create a new model (upload as string)
    exports.sendOne = (req, res) => {
        if(!req.body.modelstring){
            var modelString = req.file.buffer.toString('base64');
        }else{
            var modelString = req.body.modelstring;
        }
        var threed =  new threedm({modelstring: modelString, filename: req.body.filename});
        threed.save((err, doc) => {
            if(!err){
                res.send(doc)
            }else{
                console.log(`Error sending 3D model list : ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    }

13. Inside app/routes folder add the Create function to threedmRoute.js
    const threedmController = require("../controllers/threedmController");

    const multerConfig = require("../config/multerconfig");

    const express = require("express");

    const router = express.Router();

    router.post("/", multerConfig.upload.single('modelstring'), threedmController.sendOne);

    module.exports = router;

Currently Angular & NodeJS work independently on ports 4200 & 4000 respectively.
Objective : Integrate Angular & NodeJS

Steps:
1. Set the output directory to static folder
    Open angular.json, add the "outputPath": "./static" option to the build target so that the production will be stored in static folder under project root directory. (Alternatively, the default, dist/<project_name> will also do.)

2. Enter the following command
    ng build

3. Integrate Angular production with Node.js Project. In app folder of Node.js Express Project, create views folder.

4. Copy all files from Angular static folder to app/views folder.

5. Serve the Angular App with Express. Serve static files such as HTML files, CSS files and JavaScript files in app/views folder using the express.static() built-in middleware function. Edit the index.js file.

6. deliver index.html file using res.sendFile().
    const express = require("express");

    const { mongoose } = require("./app/config/dbconfig");

    const threedmRoutes = require("./app/routes/threedmRoute");

    const path = __dirname + '/app/views/';

    const app = express();

    app.use(express.static(path));

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.use('/models', threedmRoutes);

    app.get('/', (req, res) => {
        res.sendFile(path + "imdex.html")
        // res.json({message : "Welcome to the 3D Model Application"});
    })

7. Run Node Express server & Angular on the same Port by entering the following in terminal
    npm start

8. Angular App will run on port 4000 with node.js. When refreshing, 404 error occurs. To handle error, pass optional parameter useHash as true value in app-routing.module.ts.
    @NgModule({
        imports: [RouterModule.forRoot(routes, {useHash: true})],
        exports: [RouterModule]
    })

9. Run the ng build in terminal once again, delete the filoes from app/view and paste the files from static folder. The changes will be updated.

10. In order to consume API requests from Angular App, CORS (Cross Origin Resource Sharing), which allows cross application communication. Install cors using the following command
    npm i cors

11. Add cors to the index.js file. This will allow requests from any port number or domain.
    const express = require("express");

    const { mongoose } = require("./app/config/dbconfig");

    const cors = require("cors");

    const threedmRoutes = require("./app/routes/threedmRoute");

    const path = __dirname + '/app/views/';

    const app = express();

    app.use(express.static(path));

    // parse requests of content-type - application/json
    app.use(express.json());

    app.use(cors({ origin: 'http://localhost:4000' })); //(or 4200, depending on the port number of request maker)
Using HTTPClient, post & get requests can be made directly from the Angular application to MongoDB, using baseApiUrl = "http://localhost:4000/models";


DEPLOYMENT ON FIREBASE
Objective: Host the application on Firebase with connection to Firestore

Steps:
1. Create a new project in console.firebase.google.com

2. Add Firebase to the Angular Webapp, by first registering the app, setting up FIrebase hosting and copying the SDK settings in the environment.prod.ts file. Note: The file must be added to gitignore to ensure safety of deployment keys.

3. Import the packages installed earlier and the environment.ts file into the app.module.ts file. Initialize the AngularFireModule with the firebaseConfig.
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { HttpClientModule } from '@angular/common/http';
    import { AngularFireModule } from '@angular/fire/compat';
    import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { ModelModule } from './model/model.module';
    import { environment } from 'src/environments/environment.prod';

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ModelModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })

    export class AppModule { }

4. Create a database in Cloud Firestore, start in test mode. Create a collection and add a blank document with id.

5. Set up Firestore in the modelcr.service.ts file
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { AngularFirestore } from "@angular/fire/compat/firestore";
    import { Model } from '../classes/model';

    @Injectable({
    providedIn: 'root'
    })

    export class ModelcrService {

    // API URL (JSON Server)
    baseApiUrl = "http://localhost:3000/model";

    // API URL (for MongoDB)
    baseApiUrl = "http://localhost:4000/models";

    //index for render
    index!:number;

    constructor(private http: HttpClient, private fs: AngularFirestore) { }

    // send to database
    uploadModelFile(modelString: string, filename: string){
        // API Server
        this.http.post(this.baseApiUrl, {"modelstring": modelString, "filename": filename}).subscribe(
        // this.http.post<Model>(this.baseApiUrl, [modelString, filename]).subscribe(  
        (response) => console.log(response),
        (error) => console.log(error),
        () => console.log("completed")
        )

        // Firestore
        this.fs.collection('model').add({"modelstring": modelString, "filename": filename})
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        .finally(() => console.log("completed"))
    }

    //retrieve from database
    receiveModelFile(){
        // API Server
        return this.http.get<Model[]>(this.baseApiUrl);

        // Firestore
        return this.fs.collection('model').snapshotChanges();
    }

    //get index from model-list
    getIndex(i: number){
        this.index = i;
    }

    // send index to model-render
    setIndex(){
        return this.index;
    }

    }

6. In the model-list & model-render component.ts file, make a change to the response received to subscribe to adjust the schema of the firestore database.
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
        this.getModelList();
    }

    getModelList(){
        /*
        // API Server
        this.mcrs.receiveModelFile().subscribe(
        (response) => { this.modelfile = response; },
        (error) => console.log(error),
        () => console.log("completed")
        );
        */
    
        // From firestore 
        return this.mcrs.receiveModelFile().subscribe(
        (response) => {this.modelfile = response.map(res=>res.payload.doc.data()) as Model[]},
        (error) => console.log(error),
        () => console.log("completed")
        )
    }

5. Install the Firebase Tools using Firebase CLI
    npm install -g firebase-tools

6. Login and Initialize Firebase project using Firebase CLI
    firebase login

7. Initialize the Firebase project by running below command.
    firebase init

8. Select the following two options
    Firestore: Deploy rules and create indexes for Firestore
    Hosting: Configure and deploy Firebase Hosting sites

8. Fill in the following properties
    Select a default Firebase project for this directory
        select name of the app
    What file should be used for Database Rules?
        (database.rules.json)   default
    What do you want to use as your public directory?
        static                  (or dist/<app name> if default)
    Configure as a single-page app (rewrite all URLs to /index.html)? (y/N)
        N

9. Deploy the Angular App to Firebase Hosting
    firebase deploy --only "hosting,firestore"