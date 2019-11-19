import anchrome from 'anchorme';

// eslint-disable-next-line no-console
export const util = {
    methods: {
        checkResponse: function(responseText){
            const response = JSON.parse(responseText);
            if(response.error !== ""){
                alert(response.error);
                return true;
            }
            else return false;
        },
        server: function(){
            var localServer = "http://localhost:8080";
            return localServer;
        },
        format_text: function(s){
            let result = BBCode.format(s);
            result = result.replace(/(^|\s)>>(\w+)/g,'<a href="#$2">>>$2</a>')
                           .replace(/(^|\s)>(.*?)(<br( )*(\/)?( )*>|\n|$)/g,'$1<span class="green">>$2</span>$3');			

            return anchrome(result);
        }

    }
},

BBCode = {
    format: function(text) {
        text = text.replace(/(\[i\]\[b\]|\[b\]\[i\])/g, "[bi]"); //Hack to deal with nested tags easily; converts [b][i] or [i][b] to [bi]
        text = text.replace(/(\[\/i\]\[\/b\]|\[\/b\]\[\/i\])/g, "[/bi]"); //converts [/i][/b] or [/b][/i] to [/bi]
        var result = text;
        var tags = ["b", "i", "bi", "code"]; //all BBcode tags
        for (var i=0; i<tags.length; i++)
            result = BBCode.bbcode_replace(result, tags[i]);
        return result;
    },

    ucs2_encode: function(array) { //translates Unicode codepoint integers directly into text. Javascript does this in an ugly fashion by default.
        return array.map(function(value) {
            var output = "";
            if (value > 0xFFFF) {
                value -= 0x10000;
                output += String.fromCharCode(value >>> 10 & 0x3FF | 0xD800);
                value = 0xDC00 | value & 0x3FF; //Javascript uses UTF-16 natively. this makes it easier to work with. somehow.
            }
            output += String.fromCharCode(value);
            return output;
        }).join("");
    },

    s_to_ints: function(string) { //simply converts a string to Unicode integers
        var array = [];
        for (var i=0; i<string.length; i++) {
            array[i] = string.charCodeAt(i);
        }
        return array; 
    },

    unicode_convert: function(str, inner) {
        var tag = str.match(/\[(\w+)\]/)[1];
        var codepoints = { //contains array of the Unicode codepoint characters for '0', 'A', and 'a' of each font
            code: [0x1D7F6, 0x1D670, 0x1D68A], //font MATHEMATICAL MONOSPACE
            b: [0x1D7CE, 0x1D400, 0x1D41A], //font MATHEMATICAL BOLD
            i: [0x1D7F6, 0x1D434, 0x1D44E], //font MATHEMATICAL ITALIC
            bi: [0x1D7CE, 0x1D468, 0x1D482] //font MATHEMATICAL BOLD ITALIC
        };
        var charcodes = BBCode.s_to_ints(inner);
        var codes = [];
        for (var i=0; i<charcodes.length; i++) {
            if (charcodes[i] >= 48 && charcodes[i] <= 57) //0-9
                codes[i] = charcodes[i] - 48 + codepoints[tag][0];
            else if (charcodes[i] >= 65 && charcodes[i] <= 90) //A-Z
                codes[i] = charcodes[i] - 65 + codepoints[tag][1];
            else if (charcodes[i] >= 97 && charcodes[i] <= 122) //a-z
                codes[i] = charcodes[i] - 97 + codepoints[tag][2];
            else
                codes[i] = charcodes[i];
            if (charcodes[i] == 104 && tag === "i") //for some reason, MATHEMATICAL ITALIC SMALL H doesn't exist...so here's a hack
                codes[i] = 0x1D629; //MATHEMATICAL SANS-SERIF ITALIC SMALL H
        }
        var unicode_text = BBCode.ucs2_encode(codes);
        if (tag === "code")
            unicode_text = unicode_text.replace(/ /g, "\xA0"); //replace spaces with a non-breaking space in code blocks
        return unicode_text;
    },

    bbcode_replace: function(string, tag) {
        var re = new RegExp("\\[" + tag + "\\]((?:.|[\r\n\t])+?)\\[/" + tag + "\\]", "g"); //BBCode matching
        var s = string.replace(re, BBCode.unicode_convert);
        return s;
    }
}