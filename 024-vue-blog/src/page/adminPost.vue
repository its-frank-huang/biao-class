<template>
    <div class="main container" style="max-width:40em">
        <div class="card">
        <form @submit.prevent="onSubmit" class="card-body">
            <h3 class="card-title">增加/更新文章</h3>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                <span class="input-group-text">标题</span>
                </div>
                <input type="text" class="form-control" v-model="current.title">
            </div>
            <div class="input-group mb-2">
                <div class="input-group-prepend">

                <span class="input-group-text">内容</span>
                </div>
                <textarea class=" form-control" type="textarea" v-model="current.content"></textarea>
            </div>
            <div class="input-group">
                <button class="btn btn-primary btn-block" type="submit">提交</button>
            </div>
        </form>
        </div>
        
        <table class="table mt-3 table-light rounded">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">标题</th>
                    <th scope="col">内容</th>
                    <th scope="col" class="text-right">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="it in list" :key="it">
                    <td scope="row">{{it.id}}</td>
                    <td>{{it.title}}</td>
                    <td :title="it.content">{{it.content|cut}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                        <button class="btn btn-light" @click="remove(it.id)">删除</button>
                        <button class="btn btn-light" @click="current=it">更新</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import '../css/admin.css';
import api from '../lib/api';
export default {
    data(){
        return {
            current:{},
            list:[],
        }
    },
    mounted(){
        this.read();
    },
    filters:{
        cut(value){
            return value.length < 16 ? value: value.substring(0,16)+'...';
        }
    },
    methods:{
        onSubmit(){
            this.createOrUpdate();
        },
        read(){
            api('post/read').then(r=>{
                this.list = r.data;
            });
        },
        remove(id){
            api('post/delete',{id}).then(r=>{
                this.read();
            });
        },
        createOrUpdate(){
            let action = this.current.id ? 'update':'create';

             api(`post/${action}`,this.current).then(r=>{
                this.resetCurrent();
                if(r.success)
                    this.read();
            });
        },
        resetCurrent(){
            this.current ={};
        }
    }
    
}
</script>
