#!/bin/bash
cat folders.txt |
while read -r loc; do
echo "  -"
echo "    folder: $loc";
echo "    images:"
grep '\!\[' ${loc}/*.md | sed -E 's/.*(\(.*\))/      - \1/' 
#ls ${loc}
done >> img.txt