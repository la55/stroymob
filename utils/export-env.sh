#!/bin/sh

IFS='
'
export $(egrep -v '^#' .env | xargs -d '\n')

IFS=
