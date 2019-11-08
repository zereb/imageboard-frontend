<template>
    <div class="inputForm">
        <h3>Current thread: {{tid}} </h3>
        <a class="x" href="#" onclick="this.parentElement.parentElement.style.display='none'">x</a>
        <input v-model="form.email" placeholder="email"  type="text">
        <br/>
        <textarea id="message" v-model="text" placeholder="Text..." />
        <br/>
        <input ref="images"  accept=".jpg, .jpeg, .png, .gif" type="file" v-on:change="processFiles">
        <button v-on:click="submit">Send</button>
    </div>
</template>

<script>
import nanoajax from 'nanoajax'
    var localServer = "http://localhost:8080";
    var server =  localServer;


export default {
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
            image: ""
        }
    },
    methods: {
        processFiles: function(){
            this.image = this.$refs.images.files[0];
            let formData = new FormData();
            formData.append('files', this.image);
            nanoajax.ajax({url: server + '/api/images', method : 'POST', body: formData}, (code, responseText) => {
                
            });
        },
        submit: function(){
            this.form.images.push(this.image);
            this.form.text = this.text;
            this.tid = "/" + this.tid;
            var data = 'data='+JSON.stringify(this.form);
            nanoajax.ajax({url: server + '/api/threads' + this.tid + '?' + data, method: 'POST'}, (code, responseText) => {
                this.responseText = responseText;
                alert(responseText);
            });
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .x{
        position: relative;
        float: right;
    }
    .inputForm{
        padding: 0px 4px 4px 0px;
        max-width: 500px;
    }
    .inputForm input[type=text] {
        width: 500px;
        padding: 7px 5px;
        margin: 2px 2px;
        box-sizing: border-box;
        border: 1px solid gray;
    }
    #message{
        height: 200px;
        width:  500px;
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
