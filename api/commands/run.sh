#!/bin/sh

json-server ../DB/db.json --read-only --routes routes.json --middlewares log_request.js --port $1

