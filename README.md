# Pianoteq client

This project allows you to control your Pianoteq instance from any browser (Safari, Chrome and Firefox).

This is the first version, which is limited to the following:

* Load any presets
* Switch A/B presets
* Control MIDI
    * Record, stop, play and rewind.

## Requirements

Node has to be installed on your computer for this to work, as I make use of it to serve the single page application.  Also note that node will proxy the JsonRPC to Pianoteq, otherwise CORS issue will arise without it.

### How to start
Well, I do not need to deploy this app anywhere, so you simply start it using the standard npm comand for that.

    `npm start`

This will try to open your default browser to localhost:3000.  To access it remotely, you'll need to find the ip address of your device.  I suggest that you make that adresss permanent in your router so it does not change every day!  Then point your mobile phone to your device like so.

    `http://your.ip.address:3000`

## Final note
I am not affiliated with Modartt.  All references to Modartt are governed by their trademark and licences

Hope it helps in your Pianoteq setup and happy playing!