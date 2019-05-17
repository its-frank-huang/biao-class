<template>
	<div class="container row">
		<div class="vertical-nav sidebar col-6">
			<h1>Admin</h1>
            <router-link to="/admin/user">用户管理</router-link>
            <router-link to="/admin/cat">分类管理</router-link>
            <router-link to="/admin/thread">帖子管理</router-link>
		</div>
        <div class="col-18 content admin-content">
            <router-view></router-view>
        </div>
	</div>
</template>

<script>
export default {};
</script>

<style>
.admin-content{
    padding-left: .5rem;
}
</style>
