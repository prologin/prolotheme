#!/usr/bin/env bash

# This script create zip files if 
# there is multiple given resources
# See the README for more details

############################################
# This script is supposed to only be       #
# runned by hugo sites that use this theme #
############################################

# Make sure the script fails if an error occurs
set -xeuo pipefail 

pushd ../../

resources=$(find ./content/ -type d -name given_resources)

for i in $resources
do
    pushd "$i"

    nb_dirs=$(find ./* -maxdepth 0 -type d | wc -l)
    
    # Check if there is more than one file or dir in the given resources
    # Always zip if there is at least one directory
    if [[ $(find . -maxdepth 1 | wc -l) -gt 1 || $nb_dirs -gt 0 ]]
    then
        tp_name=$(basename "$(dirname "$(dirname "$i")")")
        zip -r "$tp_name".zip ./
    fi
    
    popd
done

popd

