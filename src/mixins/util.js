
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
        
    }
}

