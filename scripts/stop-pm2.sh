#!/bin/bash
pid=$(pm2 list | grep 'homeschool-render-server' | awk '{print $4}')
[[ -n "$pid" && $pid -ge 0 ]] && pm2 delete $pid

if [[ -n "$1" && $1 -gt 0 ]] ; then
  pid=$(lsof -i:$1 | grep -v COMMAND | awk '{print $2}')
  [ -n "$pid" ] && kill -9 $pid
fi

# clear all logs
for log in $(ls server/logs/*.log 2>/dev/null)
  do
    > $log
  done


