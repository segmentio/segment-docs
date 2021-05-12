#!/usr/bin/env bash

# grab the latest entry from git log
log=$(env -i git log -1 --pretty=%B)

# run a series of checks for common reasons that we shouldn't preview build.
# if no checks match, exit with code 1 to run the build
if echo "$log" | grep -q 'typo'; then
exit
elif echo "$log" | grep -q 'link'; then
exit
elif echo "$log" | grep -q '\\[netlify\\-ignore\\]'; then
exit 
elif echo "$log" | grep -q 'dependabot'; then
exit
elif echo "$log" | grep -q 'Merge branch \\SMaster\\S'; then
exit
else
exit 1
fi
echo $log
