
<template>
    <div class="Thread">
        <b>Thread {{tid}}:</b>
        <Post v-for="post in posts" :key="post.id" :data="post"
            v-on:click-on-phone="$emit('click-on-phone',loadedAd.phoneNumber)"
            v-on:click-on-image="clickImageEvent"
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


