#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l framlin.log -a $WDIR/node_modules/http-server/bin/http-server site -p 8082 -c-1
