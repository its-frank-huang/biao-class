<template>
<div class="main container" style="maxwidth:40em">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Post List</h3>
            <div v-for="it in postlist" :key="it" class="list-group list-group-flush post-list">
                <div class="list-group-item">
                    <router-link :to="`/post/${it.id}`">
                    <span>{{it.title}}</span>
                    </router-link>
                    <div>{{it.content}}</div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import api from '../lib/api'

export default {
    data(){
        return{
            postlist:[]
        }
    },
    mounted(){
        this.readPost();
    },
    methods:{
        readPost(){
            api('post/read').then(r=>{
                this.postlist = r.data;
            });
        }
    }
}
</script>
