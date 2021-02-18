export {commonJs};

const commonJs = (function() {

    const errorLog = function(response) {
        console.log(`status:${response.status}\nmessage:${response.message}\nerrors:${response.errors}\ncode:${response.code}`);
    }

    return {errorLog};

})();