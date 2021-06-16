#!/usr/bin/env bash

# grab the latest entry from git log
log=$(env -i git log -1 --pretty=%B)

# run a series of checks for common reasons that we shouldn't preview build.
# if no checks match, exit with code 1 to run the build

# Force a build
if echo $log | grep -1 'netlify\-build'; then
echo "Force build becuase Netlify is a benevolent overseer"
exit 1
# make sure we don't build for changes that are not in src/
elif git diff --quiet $COMMIT_REF $CACHED_COMMIT_REF -- src/; then
echo "No changes to src/ detected, skipping"
exit
# ignore for simple typo fixes
elif echo "$log" | grep -q 'typo'; then
echo "Build ignored because 'typo' is in the commit message."
exit
# ignore link / url updates
elif echo "$log" | grep -q 'link'; then
echo "Build ignored because 'link' is in the commit message."
exit
# ignore when the ignore tag is explicitly added
elif echo "$log" | grep -q 'netlify\-ignore'; then
echo "Build ignored because it was requested."
exit 
# ignore dependabot updates
elif echo "$log" | grep -q 'dependabot'; then
echo "Ignoring dependabot update"
exit
# ignore when master is merged into a branch
elif echo "$log" | grep -q 'Merge branch \SMaster\S'; then
echo "Build ignored because it's only an update from the main branch."
exit
else
echo "Nothing to ignore here, building!"
exit 1
fi

