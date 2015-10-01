#! /bin/bash

if [ -f "process.pid" ]
then
  kill -KILL $(cat process.pid)
fi
