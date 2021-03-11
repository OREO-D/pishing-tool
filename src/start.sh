#!/bin/bash
./ngrok http 1337 > /dev/null 2>&1 & sleep 10
curl -s -N http://127.0.0.1:4040/api/tunnels | grep -o "https://[0-9a-z]*\.ngrok.io" > link.txt 
node .


pkill -f -2 ngrok > /dev/null 2>&1
killall -2 ngrok > /dev/null 2>&1
printf "break ngrok !!\n"
