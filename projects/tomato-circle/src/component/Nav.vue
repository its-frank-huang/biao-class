<template>
	<div class="nav">
		<div class="row container">
			<div class="col-16 left">
				<div class="logo col-2 font-size-0">
					<img src="http://dummyimage.com/300x300">
				</div>
				<div class="search col-22">
					<input type="search">
				</div>
			</div>
			<div class="col-8 right text-right">
				<span v-if="session.loggedin()">
					<a class="nav-item">{{session.user().username}}</a>
					<a class="nav-item" @click="session.logout()">登出</a>
				</span>
				<span v-else>
					<router-link to="/login" class="nav-item">登录</router-link>
					<router-link to="/signup" class="nav-item">注册</router-link>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import session from "../lib/session";
export default {
	data() {
		return {
			session
		};
	}
};
</script>

<style>
.nav {
	background: #fff;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
	margin-bottom: 0.5rem;
}

.nav .search {
	padding-top: 0.45rem;
	padding-left: 0.2rem;
}

.nav .search input {
	border-radius: 5rem;
	padding: 0.4rem 1rem;
	margin-left: 0.5rem;
}

.nav .left > * {
	display: inline-block;
}

.nav .right {
	padding-top: 0.6rem;
}

.nav-item {
	margin-left: 0.5rem;
	cursor: pointer;
}

@media screen and (max-width: 800px) {
	.nav .search input {
		padding: 0.4rem;
	}

	.nav .search {
		padding-top: 0.2rem;
	}

	.nav .right {
		padding-top: 0.4rem;
	}
}
</style>
