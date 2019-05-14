<template>
	<form @submit.prevent="update" class="card settings-card">
		<h2 class="text-center">基础信息</h2>
		<button type="button" @click="editable = !editable">
			<span v-if="editable">取消</span>编辑
		</button>
		<fieldset :disabled="pending">
			<div class="input-group">
				<span>昵称</span>
				<div class="input-wrap">
					<input type="text" v-model="me.name" :readonly="!editable">
					<span class="settings-span" v-if="!editable && !me.name">---</span>
				</div>
			</div>
			<div class="input-group">
				<div>用户名</div>
				<div class="input-wrap">
					<input type="text" v-model="me.username" :readonly="!editable">
					<span class="settings-span" v-if="!editable && !me.username">---</span>
					<span v-if="error.username" class="error">用户名重复</span>
				</div>
			</div>
			<div class="input-group">
				<div>自我介绍</div>
				<div class="input-wrap">
					<input type="text" v-model="me.intro" :readonly="!editable">
					<span class="settings-span" v-if="!editable && !me.intro">---</span>
				</div>
			</div>
			<div class="input-group" v-if="editable">
				<button type="submit">提交</button>
			</div>
		</fieldset>
	</form>
</template>

<script>
import store from "../lib/store";
import api from "../lib/api";

export default {
	mounted() {
		api("user/find", { id: store.get("sessionId") }).then(r => {
			this.me = r.data;

			this.meSaved = { ...r.data };
		});
	},
	data() {
		return {
			me: {},
			meSaved: {},
			editable: false,
			pending: false,
			error: {
				username: false
			}
		};
	},
	methods: {
		update() {
			this.pending = true;
			api("user/exists", {
				where: { and: { username: this.me.username } }
			}).then(r => {
				if (r.data && this.me.username !== this.meSaved.username) {
                    this.error.username = true;
                    this.pending = false;
					return;
                }
                
				api("user/update", this.me).then(r => {
					store.set("user", this.me);
					this.me = r.data;
					this.editable = false;
					this.pending = false;
				});
			});
		}
	}
};
</script>

<style>
</style>
