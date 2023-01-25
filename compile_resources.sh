#!/usr/bin/env bash

pushd ../../ || exit

resources=$(find ./content/ -type d -name given_resources)

for i in $resources
do
    pushd "$i" || exit

    nb_dirs=$(find ./* -maxdepth 0 -type d | wc -l)
    
    # Check if there is more than one file or dir in the given resources
    # Always zip if there is at least one directory
    if [[ $(find . -maxdepth 1 | wc -l) -gt 1 || $nb_dirs -gt 0 ]]
    then
        tp_name=$(basename "$(dirname "$(dirname "$i")")")
        zip -r "$tp_name".zip ./
    fi
    
    popd || exit
done

popd || exit

