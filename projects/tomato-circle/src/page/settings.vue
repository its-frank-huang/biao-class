<template>
	<div class="container row">
		<div class="vertical-nav sidebar col-6">
			<h1>Settings</h1>
            <router-link to="/settings/me">基础设置</router-link>
            <router-link to="/settings/security">安全设置</router-link>
		</div>
        <div class="col-18 content">
            <router-view></router-view>
        </div>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>
