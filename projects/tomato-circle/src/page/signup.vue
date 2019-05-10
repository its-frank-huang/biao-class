<template>
	<div class="form-container card">
		<h1>注册</h1>
		<form @submit.prevent="signup">
			<div class="input-group">
				<label>
					<div>用户名</div>
					<input v-model="current.username">
					<span class="error" v-if="this.error.username">{{this.error.username}}</span>
				</label>
			</div>
			<div class="input-group">
				<label>
					<div>密码</div>
					<input type="password" v-model="current.password">
					<span class="error" v-if="this.error.password">{{this.error.password}}</span>
				</label>
			</div>
			<div class="input-group">
				<label>
					<button type="submit">提交</button>
				</label>
			</div>
		</form>
	</div>
</template>

<script>
import api from "../lib/api";
export default {
	data() {
		return {
			current: {
			},
			error: {
				username: null,
				password: null
			}
		};
	},
	methods: {
		signup() {
			if (!this.validateSignup()) return;
			
			api('user/create',this.current).then(r=>{
				this.current = '';
				this.$router.push('/login');
			});
		},
		validateSignup() {
			let e = this.error;
			let current = this.current;
			let validUsername = !current.username || !/[a-zA-Z0-9]{4,12}/.test(current.username);
			let validPassword = !current.password || current.password.length < 6;

			validUsername?
			e.username = "用户名长度应在4到12位之间" :
			e.username = null;
			
			validPassword?
			e.password = "密码长度应大于6位":
			e.password = null;

			return !e.username && !e.password;
		}
	}
};
</script>

<style>
</style>
