<template>
    <div id="app">
        <div class="createThread">
            <a href="#" v-on:click="openInputForm('')">Create new thread</a>
            <hr/>
        </div>
        <div id="hs" class="container">
            <img class="imgBig" :src="bigImg" onclick="this.parentElement.style.display='none'" >
        </div>
        <div id="hide">
            <InputForm :tid="tid" :text="text"/>
        </div>
        <Thread v-for="tid in tids" :tid="tid" :server="server" :key="tid"
                v-on:click-on-image="showBigImage"
                v-on:answer="openInputForm"
         />
  </div>
</template>

<script>
import InputForm from './components/InputForm.vue'
import Thread from './components/Thread.vue'
import nanoajax from 'nanoajax'

var localServer = "http://localhost:8080";
var server =  localServer;

export default {
    name: 'app',
    components: {
        InputForm,
        Thread
    },
    data: function(){
        return {
            tids: [],
            server: server,
            tid: "",
            bigImg: "",
            text: ""
            
        }
    },
    mounted: function(){
        nanoajax.ajax({url: server + '/api/threads', method: 'GET'}, (code, responseText) => {
            this.tids = JSON.parse(responseText).response;
        });
    },
    methods: {
        openInputForm: function(data){
            if(typeof data.tId != 'undefined'){
                this.tid = data.tId;
                this.text = ">>" + data.id + "\n";
            }else{
                this.tid = "";
                this.text = "";
            }
            document.getElementById("hide").style.display='block';
        },
        showBigImage: function(image){
            this.bigImg = image;
            document.getElementById('hs').style.display='block';
        },
    }
}
</script>

<style>
#hide{
    display: none;
}
.inputForm{
    display: block;
    position: fixed;
    margin: 0px;
    right: 11%;
    border: solid 1px;
    background-color: #f1f1f1;

}

.container {
    position: fixed;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width:fit-content;
    height:60%;
    display: none;
  }

.imgBig{
    background-color:#2d2c2c;
    padding:5px;
    width:auto;
    height:100%;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
