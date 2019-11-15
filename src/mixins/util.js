export const util = {
    methods: {
        checkResponse: function(responseText){
            const response = JSON.parse(responseText);
            if(response.error !== ""){
                alert(response.error);
                return true;
            }
            else return false;

        }
    }
}