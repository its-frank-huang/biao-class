<template>
	<div>
		<div class="card">
			<h1>User</h1>
			<form @submit.prevent="submit">
				<button type="button" @click="ui.showForm = !ui.showForm"><span v-if="ui.showForm">取消</span>编辑</button>
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
import adminMixin from '../../mixin/admin'
export default {
	mixins:[adminMixin],
	data(){
		return{
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
			model:'user',
		}
	}
};
</script>

<style>
</style>
