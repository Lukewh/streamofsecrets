#! /bin/bash

./stop.sh

node index.js > log &
echo $! > process.pid
