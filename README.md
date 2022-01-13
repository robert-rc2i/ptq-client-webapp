# Pianoteq client

This project allows you to control your Pianoteq instance from any browser (Safari, Chrome and Firefox).

This is the first version, which is limited to the following:

* Load any presets
* Switch A/B presets
* Control MIDI
    * Record, stop, play and rewind.

## Requirements

Node has to be installed on your computer for this to work, as I make use of it to serve the single page application.  Also note that node will proxy the JsonRPC to Pianoteq, otherwise CORS issue will arise without it.

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

This will create a new folder named `ptq-client-webapp`.  Before going any further, make sure to change to that newly created folder.

    cd ptq-client-webapp

### Upgrade to latest version
Launch the following commands in the project folder

     git pull origin master
     npm install

This will replace your current project with the latest changes from the git repo and install any new dependencies that the project may have added

## How to start
First, you need to make sure that the project's dependencies are installed.  You onnly need to do this once.  Before running the command, make sure that you are at the root folder of this project as described above

    npm install

Once done and from now on, you simply start it using the standard npm start comand.  Again, before running the command, make sure that you are at the root folder of this project.

    npm start

This will try to open your default browser to localhost:3000.  To access it remotely, you'll need to find the ip address of your device.  I suggest that you make that adresss permanent in your router so it does not change every day!  Then point your mobile phone to your device like so.

    http://your.ip.address:3000

That being said, you need to have Pianoteq launched with the proper flag and port like so.

* On Mac - `/Applications/Pianoteq\ 7/Pianoteq\ 7.app/Contents/MacOS/Pianoteq\ 7 --serve 8081`
* On PC - `C:\Program Files\Modartt\Pianoteq 7>"Pianoteq 7.exe" --serve 8081`

If you want a different port, simply change it on the command line to launch Pianoteq and the package.json file in the proxy param.

## Final note
I am not affiliated with Modartt.  All references to Modartt are governed by their trademark and licences

Hope it helps in your Pianoteq setup and happy playing!