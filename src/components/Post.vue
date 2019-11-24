<template>
    <div>
    <div v-for="post in posts" :key="post.id" class="popUp" v-on:mouseleave="clear">
        <Post :data="post" v-bind:id="post.id" :index="-1"
                v-on:click-on-image="clickImageEvent"
                v-on:answer="answerEvent"
            /> 
    </div>
    <div class="post" :id="'id'+index">
        <b>{{index}}.</b> {{data.email}}: {{data.humanEpoch}}  <a href="#" v-on:click="$emit('answer',data)">№{{data.id}}</a>
        <a v-if="index == 0" href="#" v-on:click="$emit('answer',data)">[open]</a>
        <br/>
        <div v-for="image in data.images" :key="image" v-on:click="$emit('click-on-image',img_prefix + image)" class="images">
            <img class="image" :src="thumb_prefix +image" alt="">
        </div>
        <p style="white-space: pre-line;" v-html="data.text"></p>
        <span v-for="response in data.responses" :key="response">
            <a :href="'#'+response" v-on:mouseover="hoverOnResponse(response)" >>>{{response}}</a>
        </span>
        <div style="clear:both"></div>
    </div>
    </div>
</template>


<script>
import { util } from '../mixins/util.js'
import anchrome from 'anchorme'
import nanoajax from 'nanoajax'
import Post from './Post.vue'

export default {
    mixins: [util],
    components: Post,
    name: "Post",
    props: ["data", "index"],
    data: function(){
        return {
            answers: [],
            posts: [],
            hrefId: Math.random()
        }
    },
    computed: {
        thumb_prefix: function(){
            return this.server() + '/thumb_';
        },
        img_prefix: function(){
            return this.server() + '/';
        }
    },
    methods: {
        postLookUp: function(id){
            id = id.replace('>>','');
            id = id.replace('\n', '');
            // let element = this.$refs.popUp;
            this.answers.push(id);
            return '<a id="' + this.hrefId + id + '" href="#' + id + '">>>' + id + '</a>';
        },
        clear: function(){
            this.posts = [];
        },
        clickImageEvent: function(image){
            this.$emit('click-on-image', image);
        },
        openThreadEvent: function(tid){
            this.$emit('open-thread', tid);
        },
        answerEvent: function(data){
            this.$emit('answer', data);
        },
        hoverOnResponse: function(id){
            nanoajax.ajax({url: this.server() + '/api/posts/' + id, method: 'GET'}, (code, responseText) => {
                this.posts = JSON.parse(responseText).response;
            });
        }
    },
    created: function(){
            let result = this.data.text.replace(/(^|\s)>>(\w+)/g, match => this.postLookUp(match))//'<a href="#$2">>>$2</a>')
                .replace(/(^|\s)>(.*?)(<br( )*(\/)?( )*>|\n|$)/g,'$1<span class="green">>$2</span>$3');
            this.data.text =  anchrome(result);
            if(this.answers.length < 1)
                return;
    },
    mounted: function(){
        let vue = this;
        this.answers.forEach(answer => {
            let elementID = vue.hrefId + answer;
            let element = document.getElementById(elementID);
            element.addEventListener('mouseover', function(){
                nanoajax.ajax({url: vue.server() + '/api/posts/' + answer, method: 'GET'}, (code, responseText) => {
                    vue.posts = JSON.parse(responseText).response;
                    // eslint-disable-next-line no-console
                    console.log(vue.posts);
                });
            });
        });
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
    .popUp{
        margin: 30px;
        display: block;
        position: absolute;

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