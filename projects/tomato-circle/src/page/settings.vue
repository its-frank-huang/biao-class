<template>
	<div class="main">
		<div class="vertical-nav sidebar col-6">
			<h1>Settings</h1>
            <router-link to="/me">基础信息</router-link>
            <router-link to="/security">安全信息</router-link>
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
