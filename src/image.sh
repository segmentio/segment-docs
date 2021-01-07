#!/bin/bash
rm _data/img.yml
echo "---
image_files:" > _data/img.yml

find . -name '*.md' | sed -E 's|/[^/]+$||' |sort | uniq |
while read -r loc; do
echo "  -"
echo "    folder: $loc";
echo "    images:"
grep '\!\[' ${loc}/*.md | sed -E 's/.*\((.*)\)/      - \1/g'
done >> _data/img.yml



