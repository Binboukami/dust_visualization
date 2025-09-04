#!/bin/bash

# Utility launcher program to pass environment variables into grads scripts
# Author: Luiz A. Butkeivicz

# TODO
# env_args = These must have defaults
# grads -c "$grads_cmd $env_args $script_args"
# ____
# echo "Expected command to run: $cmd ...$env_args ...$script_args"
# Example of working input: mapas.gs --data_dir ... --script_dir ... arg1 arg2 arg3
# ____

project_name=dust_visualization

# Default variables
data_dir="$HOME/data"
script_dir="$HOME/${project_name}/src";

# Command-line parsing
short=h
long=data_dir:,script_dir:,help

# Validate inputs
arg_string=$(getopt -o $short --long $long --name "$script_name" -- "$@")
eval set -- "${arg_string}"

while :; do
  case "${1}" in
    --data_dir          ) data_dir=$2;                            shift 2;;
    --script_dir        ) script_dir=$2;                          shift 2;;
    -h | --help         ) echo "TODO";                               exit;;
    --                  ) shift;                                    break;;
  esac
done

# Positional arguments
script_to_exec=${1}

  # If no cmd is passed to run, exit with failure
if [ -z "$script_to_exec" ]; then
  echo "Error: Missing required script to run; See the 'help' (-h or -help) command for more information. ";
  exit;
fi

echo "Command to execute: $script_to_exec"
echo "Data directory (netCDFs): ${data_dir}"
echo "Scripting directory: ${script_dir}"