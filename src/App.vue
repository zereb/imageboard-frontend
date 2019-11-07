<template>
    <div id="app">
        <div class="createThread">
            <a href="#" v-on:click="openInputForm('')">Create new thread</a>
            <hr/>
        </div>
        <div id="hide">
            <InputForm :tid="tid"/>
        </div>
        <Thread v-for="tid in tids" :tid="tid" :server="server" :key="tid" />
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
            tid: ""
        }
    },
    mounted: function(){
        nanoajax.ajax({url: server + '/api/threads', method: 'GET'}, (code, responseText) => {
            this.tids = JSON.parse(responseText).response;
        });
    },
    methods: {
        openInputForm: function(tid){
            this.tid = tid;
            document.getElementById("hide").style.display='block';
        }
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
