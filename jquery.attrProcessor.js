(function( $ ) {
    /**
     * Process data attributes into functions automatically
     * so that JS code is reduced and instead simple directives
     * are given in the HTML
     * @param {string} func     The function to run the processor against
     * @param {string} attr     The attribute name you would like to match against (Matching 'data-slider' would require 'slider')
     * @param {string} attrArg  The default argument for the primary data attribute (EG: setting this to 'mode' would mean a value in 'data-slider' would apply as 'mode' in the arguments)
     * @param {object} defaults If you wish, you can set your own defaults here instead of falling back on the functions
     */
    $.fn.processAttrFunction = function( func, attr, attrArg, defaults ) {

        // Create a variable to contain our processed elements
        var elements = [];

        // The attribute to loop over - in camelCase!
        var camelAttr = $.camelCase(attr);

        // Make sure the function exists
        if ( !$.isFunction($()[func]) )
        {
            console.log('Function \''+func+'\' supplied to attribute processor is undefined.');
            return false;
        }

        // Loop over all the found elements
        $('[data-'+attr+']').each( function( i, el ) {

            // Setup args object
            elements[i] = {};
            elements[i].args = {};

            // If the value of the main attr is a JSON object use that for the args
            var json = jQuery.parseJSON($(this).attr(attr));
            if( typeof json == 'object' )
            {
                // We shall use the JSON object for the args
                elements[i].args = json;
            }
            else if( typeof attrArg !== 'undefined' )
            {
                // Else loop over all the element data attributes
                $.each( $(el).data(), function( key, val ) {
                    // If this is the default key we need to know what to do with it
                    if( attrArg && key === $.camelCase(attr) )
                    {
                        // Set the key to the default argument
                        key = attrArg;

                        // If there's no value don't add it to the args
                        if( !val ) return true;

                        return elements[i].args[attrArg] = val;
                    }
                    // If it doesn't belong to this script (unprefixed) then skip it
                    else if( key.substring(0, camelAttr.length) != camelAttr ) return true;

                    // Remove the prefix and ensure camelcase is correct
                    var unprefixed = key.replace(new RegExp("^" + camelAttr), '');
                    var cleanKey = $.camelCase( unprefixed );

                    // Add it to our list of arguments
                    return elements[i].args[cleanKey] = val;
                });
            }

            // If we have default args, let's merge them
            if( !$.isEmptyObject(defaults) )
            {
                $.extend(elements[i].args, defaults);
            }

            // Now we need to pass this slider into the function, if there are args
            if( !$.isEmptyObject(elements[i].args) )
            {
                // Pass the args back in the response
                elements[i].response = $(el)[func](elements[i].args);
            }
            else
            {
                // No args
                elements[i].response = $(el)[func]();
            }

            // Add the element to the return object
            elements[i].el = el;
        });

        return elements;
    };

}( jQuery, window ));
