<template>
	<div class="form-container card">
		<h1>注册</h1>
		<form @submit.prevent="signup">
			<div class="input-group">
				<label>
					<div>用户名</div>
					<input v-model="current.username">
				</label>
			</div>
			<div class="input-group">
				<label>
					<div>密码</div>
					<input v-model="current.passord">
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
export default {
	data() {
		return {
			current: {}
		};
    },
    methods:{
        signup(){
            console.log(this.current.username);
            
        }
    }
};
</script>

<style>
</style>
