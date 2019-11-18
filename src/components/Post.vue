<template>
    <div>
    <div class="post" :id="'id'+index">
        <b>{{index}}.</b> {{data.email}}: {{data.humanEpoch}}  <a href="#" v-on:click="$emit('answer',data)">№{{data.id}}</a>
        <a v-if="index == 0" href="#" v-on:click="$emit('answer',data)">[open]</a>
        <br/>
        <div v-for="image in data.images" :key="image" v-on:click="$emit('click-on-image',img_prefix + image)" class="images">
            <img class="image" :src="img_prefix +image" alt="">
        </div>
        <p style="white-space: pre-line;">{{data.text}}</p>
        <div style="clear:both"></div>
   </div>
   </div>
</template>


<script>
import { util } from '../mixins/util.js'

export default {
    mixins: [util],
    name: "Post",
    props: ["data", "index"],
    computed: {
        thumb_prefix: function(){
            return this.server() + '/thumb_';
        },
        img_prefix: function(){
            return this.server() + '/';
        } 
    }
};
</script>

<style scoped>
    a{
        text-decoration: none;
        margin-left: 5px;
    }
    pre{
        max-width: 100%;
    }
    .red {
        color: red;
    }
    .green {
        color: green;
    }
    #id0{
        max-width: max-content;
        text-align: left;
        border: none;
        margin: 3px;
        padding: 2px 10px;
        background: none;

    }
    .post{
        flex: 1;
        max-width: max-content;
        min-width: 300px;
        text-align: left;
        border: solid 1px;
        margin: 3px;
        padding: 2px 10px;
        background: #f1f1f1;
    }
    .images:hover{
        opacity: 0.7;
        cursor: pointer;
    }
    .images{
        display: block;
        margin: 5px;
        clear: left;
        float: left;
    }
    .image{
        width: 200px;
        height: 200px;
    }
</style>