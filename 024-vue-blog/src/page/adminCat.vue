<template>
    <div class="main container" style="max-width:40em">
        <div class="card mt-3">
        <form @submit.prevent="onSubmit" class="card-body">
            <h3 class="card-title">增加/更新分类</h3>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                <span class="input-group-text">分类名称</span>
                </div>
                <input type="text" class="form-control" v-model="current.name">
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
                    <th scope="col">分类名称</th>
                    <th scope="col" class="text-right">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="it in list" :key="it">
                    <td scope="row">{{it.id}}</td>
                    <td>{{it.name}}</td>
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
    methods:{
        onSubmit(){
            this.createOrUpdate();
        },
        read(){
            api('cat/read').then(r=>{
                this.list = r.data;
            });
        },
        remove(id){
            api('cat/delete',{id}).then(r=>{
                this.read();
            });
        },
        createOrUpdate(){
            let action = this.current.id ? 'update':'create';

             api(`cat/${action}`,this.current).then(r=>{
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
