<template>
	<div class="container">
		<h1>Home</h1>
		<form @submit.prevent="createThread" class="card">
			<h1>分享动态</h1>
			<input type="text" placeholder="标题" v-model="threadForm.title">
			<span class="error" v-if="threadError.title">标题不可为空</span>
			<textarea placeholder="内容" v-model="threadForm.content"></textarea>
            <button type="submit">提交</button>
		</form>
		<div class="timeline card"></div>
	</div>
</template>

<script>
import api from "../lib/api";
import store from "../lib/store";
import formatter from "../lib/formatter";

export default {
	data() {
		return {
			threadForm: {},
			threadError: {
				title:false
			}
		};
	},
	methods: {
		createThread() {
			let form = this.threadForm;
			let error = this.threadError;
			
			
			if (!form.title) {
				error.title = true;
				return;
			}

			error.title = false;

			form.cat_id = 1;
			form.cat_id = 1;
			
			form.created_at = formatter.format(new Date());

			api("thread/create", form).then(r => {
				console.log(r.data);
			});
		}
	}
};
</script>

<style>
</style>
