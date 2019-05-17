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
			<div class="card activity" v-for="it in threadList">
				<div class="activity-main">
					<router-link :to="'/thread/'+ it.id" class="title">
						<strong>{{it.title}}</strong>
					</router-link>
					<div
						class="content-preview content"
						v-if="it.content"
					>{{it.content.length > 50 ? it.content.substr(50)+'...': it.content}}</div>
				</div>
				<div class="row">
					<span class="others">{{it.created_at}}</span>
					<span class="user" v-if="!it.$user">已注销</span>
					<a class="user" v-if="it.$user">@{{it.$user ? (it.$user.name || it.$user.username): '已注销'}}</a>
					<span class="tool right">
						<span v-if="it.$user && (it.$user.id == user.id)">
							<a @click="threadForm = it">编辑</a>
							<a @click="threadDelete(it.id)">删除</a>
						</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "../lib/api";
import store from "../lib/store";
import formatter from "../lib/formatter";
import session from "../lib/session";

export default {
	mounted() {
		this.threadRead();
	},
	data() {
		return {
			threadForm: {},
			threadList: [],
			threadError: {
				title: false
			},
			pending: false,
			user: session.user()
		};
	},

	methods: {
		threadDelete(id) {
			api("thread/delete", { id }).then(r => {
				if (!r.data) {
					alert("删除失败！");
					return;
				}

				this.threadRead();
			});
		},
		threadRead() {
			api("thread/read", {
				with: ["belongs_to:user"],
				where:{and:{parent_id:null}}
			}).then(r => {
				this.threadList = r.data;
			});
		},
		createThread() {
			this.pending = true;
			let form = this.threadForm;
			let error = this.threadError;

			let url = "thread/create";

			if (!form.title) {
				error.title = true;
				this.pending = false;
				return;
			}

			error.title = false;

			form.cat_id = 1;
			form.cat_id = 1;

			form.user_id = session.user().id;

			form.created_at = formatter.format(new Date());			

			if (form.id) url = "thread/update";

			api(url, form).then(r => {
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
