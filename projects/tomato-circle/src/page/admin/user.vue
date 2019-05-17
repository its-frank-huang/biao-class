<template>
	<div>
		<div class="card">
			<h1>User</h1>
			<form @submit.prevent="submit">
				<button type="button" @click="ui.showForm = !ui.showForm">编辑</button>
				<div v-if="ui.showForm" style="padding-top:1rem;">
					<h3 style="text-align:center;">添加/更新</h3>
					<div class="input-group input-group-line">
						<div class="title">昵称</div>
						<input type="text" v-model="form.name">
					</div>
					<div class="input-group input-group-line">
						<div class="title">用户名</div>
						<input type="text" v-model="form.username">
					</div>
					<div class="input-group input-group-line">
						<div class="title">密码</div>
						<input type="password" v-model="form.password">
					</div>
					<div class="input-group input-group-line">
						<div class="title">介绍</div>
						<input type="text" v-model="form.intro">
					</div>
					<div class="input-group input-group-line">
						<button type="submit">提交</button>
					</div>
				</div>
			</form>
		</div>
		<div class="card">
			<table>
				<thead>
					<th>ID</th>
					<th>昵称</th>
					<th>用户名</th>
					<th>介绍</th>
					<th>操作</th>
				</thead>
				<tbody>
					<tr v-for="it in list">
						<td>{{it.id}}</td>
						<td>{{it.name || '-'}}</td>
						<td>{{it.username}}</td>
						<td>{{introLenth(it.intro)}}</td>
						<td>
							<div class="tool">
								<a @click="update(it)">编辑</a>
								<a @click="remove(it.id)">删除</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import api from "../../lib/api";
import store from "../../lib/store";

export default {
	data() {
		return {
			form: {},
			ui: {
				showForm: false
			},
			list: []
		};
	},
	mounted() {
		this.read();
	},
	methods: {
		read() {
			api("user/read").then(r => {
				if (!r.data) {
					alert("用户列表读取失败");
					return;
				}

				this.list = r.data;
			});
		},
		submit() {
            let action = 'user/create';

            if(this.form.id) 
                action = 'user/update';

			api(action, this.form).then(r => {
				this.form = {};
				this.ui.showForm = false;
				this.read();
			});
        },
        introLenth(intro){
            if(!intro)return '-';
            if(intro.length < 10) return intro;
            return intro.substr(10)+'...';
        },
        remove(id){
            if(!confirm('确定删除用户？')) return;

            api('user/delete',{id}).then(r=>{
                this.read();
            });
        },
        update(it){
            this.form = it;
            this.ui.showForm = true;
        }
	}
};
</script>

<style>
</style>
