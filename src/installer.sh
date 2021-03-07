#!/bin/bash
npm intall express express-session node-fetch readline-sync
chmod +x start
printf "What system are you on? \n"
echo "
0) CANCEL
1) Linux
2) Android (Termux)
3) Windows
4) macOS
"
os='None'
read -p '>> ' os 

if [ $os == '1' ]; then
echo "Download Ngrok in: Linux"
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
rm -rf ngrok-stable-linux-amd64.zip
echo "OK"
fi

if [ $os == '2' ]; then 
echo "Download Ngrok in: Android"
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.zip 
unzip ngrok-stable-linux-arm.zip 
rm -rf ngrok-stable-linux-arm.zip
echo "OK"
fi

if [ $os == '3' ]; then
echo "Download Ngrok in: Windows"
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip 
unzip ngrok-stable-windows-amd64.zip
rm ngrok-stable-windows-amd64.zip
echo "OK"
fi

if [ $os == '4' ]; then
echo "Download Ngrok in: macOS"
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-darwin-amd64.zip 
unzip ngrok-stable-darwin-amd64.zip
rm -rf ngrok-stable-darwin-amd64.zip 
echo "OK"
fi

if [ $os == '0' ]; then
echo "Aborted."

fi