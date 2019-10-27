const dns = require('dns');


function bla(data) {
    dns.resolve4(data, function (e, v) {
        console.log(e);
        debugger;
    });
    
}

bla('webbrothers.net');