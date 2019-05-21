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
						<input type="text" @keyup="debounceValidate('username')" v-model="form.username">
						<span
							class="error"
							v-for="(value,key) in error.username"
							v-if="value"
							:key="key"
						>{{rules.username[key].msg}}</span>
					</div>
					<div class="input-group input-group-line">
						<div class="title">密码</div>
						<input type="text" @keyup="debounceValidate('password')" v-model="form.password">
						<span
							class="error"
							v-for="(value,key) in error.password"
							v-if="value"
							:key="key"
						>{{rules.password[key].msg}}</span>
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
					<tr v-for="it in list" :key="it.id">
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
			<pagination :total="total" :limit="readParams.limit" :onChange="pageChange"/>
		</div>
	</div>
</template>

<script>
import pagination from "../../component/pagination";
import api from "../../lib/api";
import store from "../../lib/store";
import valee from "../../lib/valee";

export default {
	components:{
		pagination,
	},
	data() {
		return {
			form: {},
			ui: {
				showForm: true
			},
			readParams:{
				limit:5,
				page:1,
			},
			total:0,
			list: [],
			rules: {
				username: {
					required: {
						params: [],
						msg: "此为必填项"
					},
					unique: {
						params: ["user", "exists", "username"],
						msg: "用户名重复"
					},
					regex: {
						params: [/^[a-zA-Z]+[0-9]*$/],
						msg: "用户名应包含英文字母和数字"
					},
					lengthBetween: {
						params: [4, 12],
						msg: "用户名长度应为4到12位"
					}
				},
				password: {
					required: {
						params: [],
						msg: "此为必填项"
					},
					regex: {
						params: [/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/],
						msg: "密码应包含英文字母和数字"
					},
					lengthBetween: {
						params: [6, 20],
						msg: "密码长度应为6到20位"
					}
				}
			},
			timer: null,
			error: {
				// username:{
				// 	regex:false,
				// 	lengthBetween:false,
				// }
			}
		};
	},
	mounted() {
		this.read();
	},
	methods: {
		pageChange(page){
			this.readParams.page = page; 
			this.read();
		},
		debounceValidate(field) {
			if (this.timer) clearTimeout(this.timer);

			this.timer = setTimeout(e => {
				this.validator(field);
			}, 500);
		},
		validator(field) {
			let fieldRules = this.rules[field];
			let vaildForm = true;

			for (let key in fieldRules) {
				let rule = fieldRules[key];

				let valid = valee[key](this.form[field], ...rule.params);

				if (typeof valid == "boolean") {
					this.afterValidate(field, key, valid);
					if (!valid) vaildForm = false;
				} else {
					valid.then(r => {
						this.afterValidate(field, key, r);
						
						// if (!r) vaildForm = false;
					});
				}
			}
			return vaildForm;
		},
		afterValidate(field, key, valid) {
			let fieldObj = this.error[field];

			if (!fieldObj) fieldObj = this.$set(this.error, field, {});

			this.$set(fieldObj, key, !valid);
		},
		validateForm() {
			let rules = this.rules;

			for (let field in rules) {
				
				if (!this.validator(field)) return false;
			}

			return true;
		},
		read() {
			api("user/read",this.readParams).then(r => {
				if (!r.data) {
					alert("用户列表读取失败");
					return;
				}

				this.list = r.data;
				this.total = r.total;
			});
		},
		submit() {
			if (!this.validateForm()) return;

			let action = "user/create";

			if (this.form.id) action = "user/update";

			api(action, this.form).then(r => {
				this.form = {};
				this.ui.showForm = false;
				this.read();
			});
		},
		introLenth(intro) {
			if (!intro) return "-";
			if (intro.length < 10) return intro;
			return intro.substr(10) + "...";
		},
		remove(id) {
			if (!confirm("确定删除用户？")) return;

			api("user/delete", { id }).then(r => {
				this.read();
			});
		},
		update(it) {
			this.form = it;
			this.ui.showForm = true;
		}
	}
};
</script>

<style>
</style>
