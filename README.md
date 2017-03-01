# BaylorBot

This Reddit bot requests data for Baylor University's sports games, and updates the sidebar of [/r/baylorsports](https://reddit.com/r/baylorsports)

Made for [/u/adeafblindman](https://reddit.com/u/adeafblindman)

## Installation on Debain & Raspberry Pi

*Note*: Make sure that you have Node.js and NPM installed before proceeding

First, clone from GitHub **into /home/pi/BaylorBot**

    git clone https://github.com/MayorMonty/BaylorBot /home/pi/BaylorBot

Then, install and register as a service:

    sudo npm install

Fill in `credentials.json`. It should look like this:

    {
      "reddit": {
        "clientId": "<your client id>",
        "clientSecret": "<your client secret>",
        "username": "<your username>",
        "password": "<your password>",
        "userAgent": "nodejs:com.mayormonty.baylorbot:v0.0.0"
      }
    }

Start the service with

    sudo service baylorbot start

Done. The service will restart on Pi setup 
