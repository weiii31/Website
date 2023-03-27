#! /bin/bash

sudo apt-get -y update 
sudo apt-get -y upgrade 

# get latest nodejs
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# update npm
sudo apt-get install -y npm
sudo npm install -g npm

npm install

# Install MySQL
