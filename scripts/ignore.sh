#!/usr/bin/env bash

log=$(env -i git log -1 --pretty=%B)

if echo "$log" | grep -q 'typo'; then
exit
elif echo "$log" | grep -q 'link'; then
exit
#elif echo "$log" | grep -q '\\[netlify\\-ignore\\]'; then
#exit
fi
#echo $log