<template>
<div class="main container" style="maxwidth:40em">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">{{row.title}}</h3>
            <div class="content">{{row.content}}</div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body ">
            <h2 class="card-title">评论</h2>
            <div class="comment-wrap">
                <div class="comment-list list-group mb-2">
                    <div class="comment-item list-group-item clearfix" v-for="it in commentList" :key='it'>
                        <div class="email text-muted">{{it.email}}
                            <span v-if="it.reply_to">回复 <span>{{it.$reply_to.email}}</span></span>
                        </div>
                        <div class="content float-left">{{it.content}}</div>
                        <button class="btn btn-light float-right" @click="reply(it.id)">回复</button>
                    </div>
                </div>
                <button class="btn btn-secondary" @click="commentFormVisible=!commentFormVisible">评论</button>
                <form @submit.prevent="onSubmit" v-if="commentFormVisible">
                    <div class="input-group mt-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Email</span>
                        </div>
                        <input class="form-control" id="email" type="email" v-model="current.email">
                    </div>
                    <div class="input-group mt-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">内容</div>
                        </div>
                        <textarea class="form-control" v-model="current.content"></textarea>
                    </div>
                    <div class="input-group mt-2">
                        <button class="form-control">提交</button>
                    </div>
                </form>
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
            commentFormVisible:false,
            row:{},
            commentList:[],
            current:{

            },
            id:null
        }
    },
    mounted(){
        this.id = this.$route.params.id
        this.read();
        this.findPost(this.id);
        this.current.post_id=this.id;
    },
    methods:{
        onSubmit(){
            this.createComment();
        },
        findPost(id){
            api('post/find',{id}).then(r=>{
                this.row = r.data;
            });
        },
        read(){
            let param ={
                with:[
                    {
                        model:'comment',
                        relation:'belongs_to',
                        foreign_key:'reply_to',
                        as:'reply_to'
                    }
                ],
                where:{
                    and:{
                        post_id:this.id
                    }
                }
            };
            api('comment/read',param).then(r=>{
                if(r.success){
                    this.commentList = r.data;
                }
            });
        },
        reply(id){
            this.current.reply_to = id;
            this.commentFormVisible = true;
        },
        createComment(){
            api('comment/create',this.current).then(r=>{
                this.current = {};
                this.read();
            });
        }
    }
}
</script>

<style>
    
</style>

