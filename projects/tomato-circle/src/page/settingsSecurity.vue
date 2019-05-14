<template>
	<form @submit.prevent="submit" class="card settings-card">
		<h2 class="text-center">安全设置</h2>
		<button type="button" @click="editMode = ! editMode" class="settings-button">
			<span v-if="editMode">取消</span>修改密码
		</button>
		<div class="input-group" v-if="!editMode">
			<span class="div">密码</span>
			<div>***</div>
		</div>
		<div v-if="editMode">
			<fieldset :disabled="pending">
				<div class="input-group">
					<span class="div">旧密码</span>
					<input type="text" v-model="passwordForm.old">
					<span class="error" v-if="passwordError.old">密码有误</span>
				</div>
				<div class="input-group">
					<span class="div">新密码</span>
					<input type="text" v-model="passwordForm.new">
					<span class="error" v-if="passwordError.new">密码长度应为4到12位</span>
				</div>
				<div class="input-group">
					<span class="div">重复密码</span>
					<input type="text" v-model="passwordForm.repeat">
					<span class="error" v-if="passwordError.repeat">两次输入不一致</span>
				</div>
				<div class="input-group">
					<button type="submit">提交</button>
				</div>
			</fieldset>
		</div>
	</form>
</template>

<script>
import store from "../lib/store";
import api from "../lib/api";

export default {
	data() {
		return {
			editMode: false,
			passwordForm: {},
			passwordError: {
				old: false,
				new: false,
				repeat: false
			},
			pending: false
		};
	},
	methods: {
		submit() {
			this.pending = true;

			let form = this.passwordForm;
			let error = this.passwordError;

			if (form.new.length < 6 || form.new.length > 12) {
				error.new = true;
				return;
			}

			if (form.repeat !== form.new) {
				error.repeat = true;
				return;
			}

			error.new = false;
			error.repeat = false;

			let id = store.get("sessionId");

			api("user/find", { id, only: ["password"] }).then(r => {
				if (r.data.password !== form.old) {
					error.old = true;
					return;
				}

				error.old = false;
				api("user/update", { id, password: form.new }).then(r => {
					if (!r.success) {
						alert("密码更新失败！");
						return;
					}

					alert("密码更新成功！");
					this.passwordForm = {};
					this.editMode = false;
					this.pending = false;
				});
			});
		}
	}
};
</script>

<style>
</style>
