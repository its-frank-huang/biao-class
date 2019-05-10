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
				<span id="tourist">
					<a href="./login.html" class="nav-item">登录</a>
					<a href="./signup.html" class="nav-item">注册</a>
				</span>
				<span id="loggedIn" hidden>
					<a href="#" class="nav-item" id="navItemName"></a>
					<a href="#" id="logOut" onclick="logOut()">登出</a>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    
}
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
</style>
