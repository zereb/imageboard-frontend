<template>
    <div>
    <div class="post" :id="'id'+index">
        <b>{{index}}.</b> {{data.email}}: {{data.humanEpoch}}  <a href="#" v-on:click="$emit('answer',data)">№{{data.id}}</a>
        <a v-if="index == 0" href="#" v-on:click="$emit('answer',data)">[open]</a>
        <br/>
        <div v-for="image in data.images" :key="image" v-on:click="$emit('click-on-image',image)" class="images">
            <img class="image" :src="image" alt="">
        </div>
            <pre>{{data.text}}</pre>
   </div>
   </div>
</template>


<script>
export default {
    name: "Post",
    props: ["data", "index"],
};
</script>

<style scoped>
    a{
        text-decoration: none;
        margin-left: 5px;
    }
    .red {
        color: red;
    }left
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
        max-width: max-content;
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
        display: inline-block;
        margin: 2px;
    }
    .image{
        width: 100px;
        height: 100px;
    }
</style>