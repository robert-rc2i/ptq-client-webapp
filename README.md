# Pianoteq client

This project allows you to control your Pianoteq instance from any browser (Safari, Chrome and Firefox).

This is the first version, which is limited to the following:

*  midi controls
*  Volume and dynamics controls
*  Voicing controls
*  Effects controls
*  Instrument loading
*  Saving a modified preset
*  Reloading an instrument (Useful, when you make changes to Pianoteq directly)
*  A/B Switching

### Some screenshots

> ![Midi controls](https://i.imgur.com/WnOljWL.jpg?1) ![Voicing controls](https://i.imgur.com/veORPFI.jpg?1)  ![Output controls](https://i.imgur.com/sWXriNI.jpg?1)


## Requirements

* Git - Usually git is install by default on most operating systems
* Node - Node has to be installed on your computer for this to work, as I make use of it to serve the single page application.  Also note that node will proxy the JsonRPC to Pianoteq, otherwise CORS issue will arise without it.
* Pianoteq running on a reachable device

### Running Pianoteq from the command line

* On Mac - `/Applications/Pianoteq\ 7/Pianoteq\ 7.app/Contents/MacOS/Pianoteq\ 7 --serve ip.address.of.device:8081`
* On PC - `C:\Program Files\Modartt\Pianoteq 7>"Pianoteq 7.exe" --serve ip.address.of.device:8081`

> *Note:* You need to replace the **ip.address.of.device** with the ip address of your device.  We need to specify the ip address, otherwise it will cause CORS issues with the application.

If you want a different port, simply change it on the command line to launch Pianoteq and change the proxy param accordingly in the package.json file.  This is only necessary if you start it in development mode

### How to install node on Mac / Windows
Visit the node webpage [here](https://nodejs.dev) 

### How to install node on Raspberry PI
Visit the [git repo](https://github.com/nodesource/distributions) of nodesource for the latest release, but as of this writing, you may use the following command for version 16.x

    # From the terminal
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs

## How to install this project

### First install
In the folder of your choice, launch the following command from a terminal window.

    git clone https://robert-rc2i@bitbucket.org/robert-rc2i/ptq-client-webapp.git
    cd ptq-client-webapp
    npm install

This will create a new folder named `ptq-client-webapp` and will install all required dependencies of this projects.  

### Upgrade to latest version
This is only necessary, when there is a new version of the app.  For this, you simply launch the following commands in the project root folder

     git pull origin master
     npm install

This will replace your current project with the latest changes from the git repo and install any new dependencies that the project may have added

## How to start
You can run this software in two mode.  A self contained mode, which does not require any other software to run or deploy to a webserver of your choice

### Self contain mode

Again, before running the command below, make sure that you are at the root folder of this project.

    npm start

This will try to open your default browser to localhost:3000.  To access it remotely, you'll need to find the ip address of your device.  I suggest that you make that adresss permanent in your router so it does not change every day!  Then point your mobile phone to your device like so.

    http://your.ip.address:3000

That being said, you need to have Pianoteq launched with the ip address of the device that it is on and proper flag and port as describe in the requirements section.

### Deploy to a web server

Before you can deploy the app, you need to build a deplyable package.  For this, you simply run the following command from the root folder of this project

    npm run build

Once done, you will have a folder call build.  You simply need to copy the content of this folder to your web server of choice.  See your webserve's documentation to kno w how.

## Final note
I am not affiliated with Modartt.  All references to Modartt are governed by their trademark and licences

Hope it helps in your Pianoteq setup and happy playing!