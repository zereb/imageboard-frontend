<template>
    <div id="inputForm" class="inputForm">
        <h3>Current thread: {{tid}} </h3>
        <a class="x" v-on:click="resetInputForm">x</a>
        <input v-model="form.email" placeholder="email"  type="text">
        <br/>
        <textarea id="message" v-model="text" placeholder="Text..." />
        <br/>
        <input ref="images" accept="image/*" type="file" v-on:change="processFiles" class="input-file">
        <button v-on:click="submit">Send</button>
    </div>
</template>

<script>
    import nanoajax from 'nanoajax'
    import { util } from '../mixins/util.js'

    var localServer = "http://localhost:8080";
    var server =  localServer;


export default {
    mixins: [util],
    name: 'InputForm',
    props: ["tid", "text"],
       data: function(){
        return{
            form: {
                id: "1",
                tid: "1",
                epoch: "1",
                email: "",
                images: [],
                text: ""
            },
            image: "",
        }
    },
    methods: {
        processFiles: function(){
            this.image = this.$refs.images.files[0];
        },

        submit: function(){
            this.form.text = this.text;
            if(this.image !== ''){
                let formData = new FormData();
                formData.append('files', this.image);
                nanoajax.ajax({url: server + '/api/images', method : 'POST', body: formData}, (code, responseText) => {
                    if ( this.checkResponse(responseText) )
                        return;
                    var response = JSON.parse(responseText).response[0].name;
                    this.image = server + '/' +response;
                    this.form.images.push(this.image);
                    var data = 'data='+JSON.stringify(this.form);
                    this.sendThreadData(data);
                });
            }else{
                var data = 'data='+JSON.stringify(this.form);
                this.sendThreadData(data);
            }
        },
        sendThreadData: function(data){
            nanoajax.ajax({url: server + '/api/threads/' + this.tid + '?' + data, method: 'POST'}, (code, responseText) => {
                if ( this.checkResponse(responseText) )
                    return;
                let response = JSON.parse(responseText).response;
                this.resetInputForm();
                this.$emit('submit-button', response);
            });
        },
        resetInputForm: function(){
            document.getElementById("inputForm").parentElement.style.display='none';
            this.image = "";
            this.form.images = [];
            //stupid js hacks
            const input = this.$refs.images;
            input.type = 'text';
            input.type = 'file';
    }
    
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .x{
        position: relative;
        float: right;
        cursor: pointer;
        font-size: 16px;
    }
    .inputForm{
        padding: 0px 4px 4px 0px;
        max-width: 600px;
        min-width: 600px;
    }
    .inputForm input[type=text] {
        width: 100%;
        padding: 7px 5px;
        margin: 2px 2px;
        box-sizing: border-box;
        border: 1px solid gray;
    }
    #message{
        max-height: 300px;
        min-height: 300px;
        max-width:  100%;
        min-width:  100%;
        padding: 7px 5px;
        margin: 2px 2px;
        box-sizing: border-box;
        border: 1px solid gray;

    }
   .inputForm button {
        background-color: #6475c1;
        border: none;
        color: white;
        padding: 8px 10px;
        margin: 0px;
        text-decoration: none;
        cursor: pointer;
        float: right;
        
    }
    .inputForm h3 {
        float: left;
        margin: 8px 2px;
    }

</style>
