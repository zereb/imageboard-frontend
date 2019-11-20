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
            let result = s;
            result = result.replace(/(^|\s)>>(\w+)/g,'<a href="#$2">>>$2</a>')
                           .replace(/(^|\s)>(.*?)(<br( )*(\/)?( )*>|\n|$)/g,'$1<span class="green">>$2</span>$3');
            return anchrome(result);
        }
    }
}

