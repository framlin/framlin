/**
 * User: w.egger@framlin.com
 * Date: 13.04.18
 * Time: 10:05
 */
function FRUTILS(productive) {
    this.FR_IN_PRODUCTION = productive;
    this.allow_sync = true;
}

FRUTILS.prototype.page_onload = function page_onload(base, msg) {
    if (typeof msg !== "undefined") {
        this.dump(["FRUTILS.prototype.page_onload", msg, base])
    }

    this.merge_overlays(base.document);
};

FRUTILS.prototype.get_backtrace = function get_backtrace() {

    var get_stack_trace = function() {
        var obj = {};
        Error.captureStackTrace(obj, get_stack_trace);


        return obj.stack.split(" at ");
    };

    return get_stack_trace();

};


FRUTILS.prototype.get_class = function get_class(docroot, class_name) {
    return docroot.getElementsByClassName(class_name);
};

FRUTILS.prototype.has_class = function has_class(element, class_name) {
    return element && element.classList.contains(class_name);
};



FRUTILS.prototype.get_element = function get_element(docroot, id, may_fail) {
    var obj;

    if (typeof id === "string") {
        obj = docroot.getElementById(id);
    } else {
        obj = id;
    }

    if (!obj && typeof may_fail === "undefined") {
        this.dump(this.get_backtrace());
        throw("Element with id " + id + " does not exist in given docroot " + docroot);
    }

    return obj;
};

//*****************
FRUTILS.prototype.remote_method = function remote_method(url, request_body, func, treat, ct, errfunc, cache) {
    if (!this.allow_sync && (typeof func == "undefined" || !func)) {
        this.dump(this.get_backtrace());
        throw("sync function");
    }

    if (typeof treat == "undefined" || treat == null) {
        treat = true;
    }

    if (request_body == null) {
        request_body = "";
    }

    if (typeof ct == "undefined" || ct == null) {
        ct = "application/x-www-form-urlencoded";
    }

    var method = 'POST';

    if (typeof cache == "undefined" || cache == null) {
        cache = false;
    } else {
        method = 'GET';
    }

    if (url != null) {
        if(url.match('xml$')) {
            method = 'GET';
        } if(url.match('html$')) {
            method = 'GET';
        }
    }

    // set expiry time to 3 hours in the future
    this.close_yourself = (+new Date) + 3 * 60 * 60 * 1000;

    var request;// = this.request_cache.pop();

    if (!request) {
        request = new XMLHttpRequest;
    }

    var async = !!func;
    var sCb, fCb;

    if (async) {
        sCb  = this.__req_onload(func, treat, cache);
    } else {
        /*
         Since  the request  is cached  back to  the  request_cache by
         __req_onload, it can be used  somewhere else, and we  need to
         store the response somewhere to return it later.
         */
        var response = {};
        sCb = this.__req_onload(func, treat, cache, response);
    }

    fCb = this.__req_onerror(url, request_body, errfunc, cache);

    // FF does not fire readystatechange in sync mode
    if ( this.onreadystatechange_works && async ) {
        // onreadystatechange is not always replaced
        // preserving callbacks for safety
        request.sCb = sCb;
        request.fCb = fCb;
        request.onreadystatechange = function() {
            if ( this.readyState == 4 ) {
                if ( this.status == 200 ) {
                    if ( this.sCb != null ) {
                        this.sCb();
                    }
                } else {
                    if ( this.fCb != null ) {
                        this.fCb( this.status, this.statusText );
                    }
                }
            }
        }
    } else {
        request.onload = sCb;
        request.onerror = fCb;
    }

    var me = this;
    request.open(method, url, async, "", "");
    request.setRequestHeader("Content-Type", ct);

    if (me.global_xdebug) {
        if (request_body) {
            request_body += '&XDEBUG_SESSION_START=xul';
        } else {
            request_body = 'XDEBUG_SESSION_START=xul';
        }
    }

    try {
        request.send(request_body);
    } catch(ex) {
        request = null;
        me.comm_error(ex);
    }
    //});

    if (async) {
        request = null;
        return true;
    }

    return response.result;
};


//******************************
FRUTILS.prototype.cleanup_request = function cleanup_request(req) {

    if ( this.onreadystatechange_works ) {
        req.onreadystatechange = null;
    }

    req.onload = null;
    req.onerror = null;
    req.sCb = null;
    req.fCb = null;

};

FRUTILS.prototype.run_cb = function run_cb(cb) {
    var args = Array.prototype.slice.call(arguments, 1);
    var ret;

    if (typeof cb == 'function') {
        ret = cb.apply(null, args);
    } else if (this.is_cb(cb)) {
        ret = cb[1].apply(cb[0], args.concat(cb.slice(2)));
    }

    return ret;
};

FRUTILS.prototype.is_cb = function(cb) {
    return (typeof cb == 'function' ||            // is it a function
        this.is_array(cb)                         // is it Array?
        && typeof cb[1] == 'function');           // has it a function?
};

FRUTILS.prototype.is_array = function(thing) {
    return this.is_a(thing, 'Array');
};

FRUTILS.prototype.is_a = function is_a(obj, class_name) {
    return this.get_class_name(obj) == class_name;
};

FRUTILS.prototype.get_class_name = function get_class_name(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
};



//******************************
FRUTILS.prototype.__req_onload = function __req_onload(func, treat, cache, response) {
    var me = this;
    return function _cb__req_onload() {

        me.cleanup_request(this, cache);

        var result;
        if(this.responseURL !== null && this.responseURL.match("xml$")) {
            result = this.responseXML;
        } else {
            result = treat ? me.remote_method_treat_data( this ) : this.responseText;
        }

        if ( typeof( response ) != "undefined" ) {
            response.result = result;
        }

        if (func) {
            me.run_cb( func, result );
        }
    }
};

//*****************
FRUTILS.prototype.__req_onerror = function __req_onerror(url, request_body, errfunc, cache) {
    var me = this;
    return function(err, text) {
        me.cleanup_request(me, cache);
        me.dump("load error " + text + ", argument count: " + arguments.length+" "+url);
        try {
            me.dump(this.status, 3, true);
            me.dump(this.responseStatus, 3, true);
            me.dump(this.readyState, 3, true);
            me.dump(this.responseText, 3, true);
            me.dump(err.toString(), 3, true);
            me.dump([err, text], 10, true);
        } catch (ex) {
            me.dump('Could not dump err in FRUTILS.prototype.__req_onerror');
        }
        if (request_body != "") {
            me.dump(request_body, 10, true);
        }
        if (typeof errfunc != "undefined" && errfunc != null) {
            errfunc();
        } else {
            me.comm_error();
        }
    }
};

//*****************
FRUTILS.prototype.comm_error = function comm_error(ex) {
    if (this.silent_comm_err) {
        return;
    }

    this.dump(this.get_backtrace());

};


//*****************
FRUTILS.prototype.dump = function dump(obj) {
    // don't dump in production if global_debug = 0
    if (this.FR_IN_PRODUCTION) {
        return;
    }
    console.log(obj);
};

//*****************
FRUTILS.prototype.introspect_deep = function(x, deep, deep_tab) {
    if (typeof deep == "undefined") {
        deep = 3;
    }

    if (typeof deep_tab == "undefined") {
        deep_tab = "";
    }

    if (deep == 0) return "";

    var buf = deep_tab;

    var prefix = "";

    if (typeof x == "object") {
        buf += "{";

        for (var i in x) {
            var next_prefix = " | ";

            buf += prefix + "[" + i + "] = ";

            switch (typeof x[i]) {
                case 'object':
                    if (i == "internal_resource") {
                        buf += "[MASKED]";
                    } else {
                        buf += "\n" + this.introspect_deep(x[i],
                            deep != -1 ? deep - 1 : -1, deep_tab + "> ")
                            + "\n" + deep_tab;
                        next_prefix = "";
                    }
                    break;
                case 'string':
                    buf += '"' + x[i] + '"';
                    break;
                case 'function':
                    buf += '__function__';
                    break;
                default:
                    buf += "" + x[i] + " (" + typeof x[i] + ")";
                    break;
            }

            prefix = next_prefix;
        }

        buf += "}";
    } else {
        buf += x + " (" + typeof x + ")";
    }

    // explicitly check for null object
    if (x === null) {
        buf = "__null value__";
    }

    if (arguments.length < 3) {
        alert(buf);
    }

    return buf;
};


//*****************
FRUTILS.prototype.merge_overlays = function merge_overlays(docroot) {
    var xulOverlays = this.get_class(docroot, 'overlay'),
        me = this;

    var insert_overlay = function(id, data) {
        // find our overlay placeholder
        var elem = me.get_element(docroot, id),
            attributes = elem.attributes,
            new_elem,
            new_elem_attributes = [],
            i,
            size = attributes.length;

        // remove it's ID so we don't duplicate
        elem.id = "";

        //clone attributes, id and classes must not be copied
        for (i = 0; i < size; i += 1) {
            if ((attributes[i].name !== "id") && (attributes[i].name !== "class")) {
                new_elem_attributes.push({
                    name: attributes[i].name,
                    value: attributes[i].value
                });
            }
        }

        // insert the overlay
        elem.innerHTML = data;
        // get the matching-id element inside overlay
        new_elem = me.get_element(docroot, id);
        // copy over classes TODO best would be to not use classes and properties from overlay placeholder!
        if (typeof elem.className !== "undefined" && elem.className != "") {
            new_elem.className = elem.className + " " + new_elem.className;
        }

        //copy over all attributes
        size = new_elem_attributes.length;
        for (i = 0; i < size; i += 1) {
            new_elem.setAttribute(new_elem_attributes[i].name, new_elem_attributes[i].value);
        }


        // replace the overlay placeholder with the overlay's child that has matching overlay id
        elem.parentNode.replaceChild(new_elem, elem);
    }

    // do not use methods of Array.prototype for iterating because they skip some elements (observed on Chromium)
    for (var i = 0; i < xulOverlays.length; i++) {
        var overlay = xulOverlays[i];
        var href = overlay.getAttribute('href');
        var id = overlay.getAttribute('id');

        if (this.has_class(overlay, 'load-sync')) {
            //if overlay container div has class load-sync than load it synchronous, to avoid event timing issues
            var data = this.remote_method(href, "", null, false);
            insert_overlay(id, data);
        } else {
            function cb(data) {
                insert_overlay(id, data);
            }
            this.remote_method(href, "", cb, false)
        }
    }

};