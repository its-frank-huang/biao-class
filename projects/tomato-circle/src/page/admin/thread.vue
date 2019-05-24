<template>
	<div>
		<div class="card">
			<h1>Thread</h1>
			<form @submit.prevent="submit">
				<button type="button" @click="ui.showForm = !ui.showForm"><span v-if="ui.showForm">取消</span>编辑</button>
				<div v-if="ui.showForm" style="padding-top:1rem;">
					<h3 style="text-align:center;">添加/更新</h3>
					<div class="input-group input-group-line">
						<div class="title">标题</div>
						<input type="text" @keyup="debounceValidate('title')" v-model="form.title">
						<span
							class="error"
							v-for="(value,key) in error.title"
							v-if="value"
							:key="key"
						>{{rules.title[key].msg}}</span>
					</div>
					<div class="input-group input-group-line">
						<div class="title">内容</div>
						<input type="text" v-model="form.content">
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
					<th>标题</th>
					<th>内容</th>
					<th>操作</th>
				</thead>
				<tbody>
					<tr v-for="it in list" :key="it.id">
						<td>{{it.id}}</td>
						<td>{{it.title}}</td>
						<td>{{introLenth(it.content)}}</td>
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
					lengthBetween: {
						params: [1, 64],
						msg: "用户名长度应为1到64位"
					}
				},
			},
			model:'thread',
		}
	}
};
</script>

<style>
</style>
