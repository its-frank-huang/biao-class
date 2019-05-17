<template>
	<div class="form-container card">
		<h1>登录</h1>
		<form @submit.prevent="login">
			<div class="input-group">
				<label>
					<div>用户名</div>
					<input v-model="current.username">
				</label>
			</div>
			<div class="input-group">
				<label>
					<div>密码</div>
					<input type="password" v-model="current.password">
				</label>
			</div>
			<div class="input-group">
				<label>
					<span class="error" v-if="this.error">用户名或密码有误</span>
					<button type="submit">提交</button>
				</label>
			</div>
		</form>
	</div>
</template>

<script>
import api from "../lib/api";
import session from "../lib/session";
export default {
	data() {
		return {
			current: {
				username: null,
				password: null,
				rePassword: null
			},
			admin: {
				username: "admin",
				password: "123123"
			},
			error: false
		};
	},
	methods: {
		login() {
			let c = this.current;
			if (
				c.username === this.admin.username &&
				c.password === this.admin.password
			) {
				this.admin.IS_ADMIN = true;
				session.login( 0, this.admin);
				location.href = "/#/admin";
				return;
			}

			let username = c.username;
			let password = c.password;
			if (!username || !password) return;

			let param = {
				where: {
					and: {
						username,
						password
					}
				}
			};

			api("user/first", param).then(r => {
				if (!r.data) {
					this.error = true;
					return;
				}

				location.href = "/";

				delete r.data.password;

				session.login(r.data.id, r.data);
			});
		}
	}
};
</script>

<style>
</style>
