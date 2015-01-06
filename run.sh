#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l framlin.log -a $WDIR/server/run.js
