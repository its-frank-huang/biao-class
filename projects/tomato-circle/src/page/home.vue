<template>
	<div class="container">
		<h1>Home</h1>
		<form @submit.prevent="createThread" class="card">
			<fieldset :disabled="pending">
				<input type="text" placeholder="标题" v-model="threadForm.title">
				<span class="error" v-if="threadError.title">标题不可为空</span>
				<textarea placeholder="内容" v-model="threadForm.content"></textarea>
				<button type="submit">提交</button>
			</fieldset>
		</form>
		<div class="timeline">
			<div class="activity" v-for="it in threadList">
				<a class="user">@{{it.$user ? (it.$user.name || it.$user.username): '已注销'}}</a>
				<div class="title">{{it.title}}</div>
				<div class="content">{{it.content}}</div>
				<div class="others">发布于：{{it.created_at}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "../lib/api";
import store from "../lib/store";
import formatter from "../lib/formatter";
import session from '../lib/session';

export default {
	mounted() {
		this.threadRead();
		console.log(this.threadList);
		
	},
	data() {
		return {
			threadForm: {},
			threadList: [],
			threadError: {
				title: false
			},
			pending: false
		};
	},
	methods: {
		threadRead() {
			api("thread/read",{
				with:[
					'belongs_to:user',
				],
			}).then(r => {
				this.threadList = r.data;
			});
		},
		createThread() {
			this.pending = true;
			let form = this.threadForm;
			let error = this.threadError;

			if (!form.title) {
				error.title = true;
				this.pending = false
				return;
			}

			error.title = false;

			form.cat_id = 1;
			form.cat_id = 1;

			form.user_id = session.user().id;

			form.created_at = formatter.format(new Date());

			api("thread/create", form).then(r => {
				if (!r.success) {
					alert("创建失败");
					return;
				}

				this.threadForm = {};
				this.pending = false;
				this.threadRead();
			});
		}
	}
};
</script>

<style>
</style>
