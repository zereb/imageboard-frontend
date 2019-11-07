
<template>
    <div class="Thread">
        <b>Thread {{tid}}:</b>
        <Post v-for="post in posts" :key="post.id" :data="post"
            v-on:click-on-image="clickImageEvent"
            v-on:answer="answerEvent"
        />
    </div>
</template>

<script>
import Post from './Post.vue'
import nanoajax from 'nanoajax'

export default {
    name: "Thread",
    components: {Post},
    props: ["tid", "server"],
    data: function(){
        return {
            posts: ""
        }
    },
    methods: {
        clickImageEvent: function(image){
            this.$emit('click-on-image', image);
        },
        answerEvent: function(data){
            this.$emit('answer', data);
        }
    },
    mounted: function(){
        nanoajax.ajax({url: this.server + '/api/threads/' + this.tid, method: 'GET'}, (code, responseText) => {
            this.posts = JSON.parse(responseText).response;

        });
    }
    
};
</script>

<style scoped>
    .ads{
        font-size: 14px;
    }
</style>


