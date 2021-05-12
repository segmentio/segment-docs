#!/usr/bin/env bash

# grab the latest entry from git log
log=$(env -i cd .. && git log -1 --pretty=%B)
echo $log
# run a series of checks for common reasons that we shouldn't preview build.
# if no checks match, exit with code 1 to run the build

# ignore for simple typo fixes
if echo "$log" | grep -q 'typo'; then
exit
# ignore link / url updates
elif echo "$log" | grep -q 'link'; then
exit
# ignore when the ignore tag is explicitly added
elif echo "$log" | grep -q 'netlify\-ignore'; then
exit 
# ignore dependabot updates
elif echo "$log" | grep -q 'dependabot'; then
exit
# ignore when master is merged into a branch
elif echo "$log" | grep -q 'Merge branch \SMaster\S'; then
exit
else
exit 1
fi

