<template>
    <div id="app">
        <div class="createThread">
            <a href="#" v-on:click="openInputForm('new')"><h3> Create new thread</h3></a>
        </div>
        <div id="hs" class="container">
            <img class="imgBig" :src="bigImg" onclick="this.parentElement.style.display='none'" >
        </div>
        <div id="hide">
            <InputForm :tid="tid" :text="text" v-on:submit-button="update"/>
        </div>
        
        <p v-if="tid === '' ">
            <Thread v-for="thread in threads" :tid="thread" :server="server" :key="thread" v-bind:id="thread" :show="true"
                    v-on:click-on-image="showBigImage"
                    v-on:answer="openInputForm"
                    v-on:open-thread="openThread"
            />
         </p>
         <p v-else>
            <a href="#" v-on:click="back">Back</a> | Thread: {{tid}} | <a href="#" v-on:click="openInputForm">Answer</a>
            | <a href="#" v-on:click="update">Update</a>

            <Thread :tid="tid" :server="server" :key="updKey" v-bind:id="tid" :show="false"
                    v-on:click-on-image="showBigImage"
                    v-on:answer="openInputForm"
                    v-on:open-thread="openThread"
            />
         </p>
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
            threads: [],
            server: server,
            tid: "",
            bigImg: "",
            text: "",
            updKey: 1
        }
    },
    mounted: function(){
        nanoajax.ajax({url: server + '/api/threads', method: 'GET'}, (code, responseText) => {
            this.threads = JSON.parse(responseText).response;
        });
    },
    methods: {
        openInputForm: function(data){
            if(typeof data.tId != 'undefined'){
                this.tid = data.tId;
                this.text = ">>" + data.id + "\n";
            }else if(data === 'new'){
                this.tid = "";
                this.text = "";
            }else{
                this.text = "";
            }
            document.getElementById("hide").style.display='block';
        },
        showBigImage: function(image){
            this.bigImg = image;
            document.getElementById('hs').style.display='block';
        },
        openThread: function(tid){
            this.tid = tid;
        },
        back: function(){
            location.reload();
        },
        update: function(){
            this.updKey++;

        }

    }
}
</script>

<style>
body{
    background: #dfdfdf;
}
#hide{
    display: none;
}
a{
    text-decoration: none;
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
