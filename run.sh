#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l framlin.log -a $WDIR/node_modules/http-server/bin/http-server -p 8080
