<template>
    <div class="Thread">
        <hr/>
        <div v-for="(post, index) in posts" :key="post.id">
            <div v-if="!show"><Post :data="post" v-bind:id="post.id" :index="index"
                v-on:click-on-image="clickImageEvent"
                v-on:answer="answerEvent"
            /> 
            </div>
            <div v-else-if="index == 0 || index > posts.length-3" >
                <Post :data="post" v-bind:id="post.id" :index="index"
                v-on:click-on-image="clickImageEvent"
                v-on:answer="answerEvent"
            /> 
            </div>
        </div>
    </div>
</template>

<script>
import Post from './Post.vue'
import nanoajax from 'nanoajax'

var server = window.location.host;

export default {
    name: "Thread",
    components: {Post},
    props: ["tid", "show"],
    data: function(){
        return {
            posts: ""
        }
    },
    methods: {
        clickImageEvent: function(image){
            this.$emit('click-on-image', image);
        },
        openThreadEvent: function(tid){
            this.$emit('open-thread', tid);
        },
        answerEvent: function(data){
            this.$emit('answer', data);
        }
    },
    mounted: function(){
        nanoajax.ajax({url: server + '/api/threads/' + this.tid, method: 'GET'}, (code, responseText) => {
            this.posts = JSON.parse(responseText).response;

        });
    }
    
};
</script>

<style scoped>
    .ads{
        font-size: 14px;
    }
    hr{
        border: none;
        height: 1px;
        color: #666; /* old IE */
        background-color: #666; /* Modern Browsers */
    }
</style>


