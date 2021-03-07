#!/bin/bash

printf "Starting ..."
./ngrok http 1337 > /dev/null 2>&1 & sleep 10
node .


pkill -f -2 ngrok > /dev/null 2>&1
killall -2 ngrok > /dev/null 2>&1
printf "Ok."
