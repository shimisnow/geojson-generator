#!/bin/bash
for file in "/var/geojson.io/geojson-data/"/*; do
  if [[ $file == *.geojson.json ]]
  then
    files+=("$file")
  fi
done

if [ "${#files[@]}" -eq 0 ]
then
  echo "  Zero GeoJSON files found"
else
  echo -e "\nAccess the files at the address:"
  for file in "${files[@]}"
  do
    echo "--> http://localhost:8099/#data=data:text/x-url,/geojson-data/$(basename ${file})"
  done
  echo -e "\nLive server started"

  live-server --port=8099 --no-browser --cors --quiet
fi
