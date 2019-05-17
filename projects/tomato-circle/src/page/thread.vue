<template>
	<div class="container">
		<h1>Thread</h1>
		<div class="card activity">
			<div class="activity-main">
				<h2>{{current.title}}</h2>
				<div class="content" v-if="current.content">{{current.content}}</div>
			</div>
			<div class="others">
				<span>{{current.created_at}}</span>
				<span class="user" v-if="!current.$user">已注销</span>
				<a class="user" v-if="current.$user">@{{current.$user.name || current.$user.username}}</a>
			</div>
		</div>
		<form class="card" @submit.prevent="createSub">
			<textarea v-model="form.content" placeholder="内容"/>
			<button type="submit">提交</button>
		</form>
		<div class="timeline">
			<div class="activity" v-for="it in subList">
				<div class="title" v-if="it.title">{{it.title}}</div>
				<div class="content">{{it.content}}</div>
				<div class="others">
					<span>{{it.created_at}}</span>
					<span class="user" v-if="!current.$user">已注销</span>
					<a class="user" v-if="current.$user">@{{current.$user.name || current.$user.username}}</a>
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
		this.id = this.$route.params.id;

		api("thread/find", {
			id: this.id,
			with: ["belongs_to:user"]
		}).then(r => (this.current = r.data));

		this.readSub();
	},
	data() {
		return {
			id: null,
			current: {},
			form: {
				content: ""
			},
			subList: []
		};
	},
	methods: {
		createSub() {
			let form = this.form;
			if (!form.content) {
				alert("内容不合法");
				return;
			}

			form.cat_id = 1;
			form.parent_id = this.id;
            form.created_at = formatter.format(new Date());

			form.user_id = session.user().id;

			api("thread/create", form).then(r => {
                this.form = {};
				this.readSub();
			});
		},
		readSub() {
			api("thread/read", { where: { and: { parent_id: this.id } } }).then(r => {
				this.subList = r.data;
			});
		}
	}
};
</script>

<style>
</style>
