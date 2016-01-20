# angular2-ear
Ear application with Agnular2.

Building EAR
------------
Node.js will be automaticly downloaded to internal gradle folder. Node dependencies (```node_modules``` folder) will be appeared in ```web-gui```.

To build the EAR, enter to ```ear``` directory and type:

    gradle clean build
    
EAR will be probably located in ```ear/build/libs/```.

Start GUI with mock server
--------------------------
Go to ```web-gui``` and just type:

    gradle gulp_live

Or direcly call Gulp task:

    gulp live
  
Then open browser at http://localhost:8888/
