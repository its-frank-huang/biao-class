<template>
    <div class="row clearfix">
        <nav class="col float-left navbar bg-light align-content-start" style="max-width:10em">
            <router-link class="nav-link" to="/admin/post">文章管理</router-link>
            <router-link class="nav-link" to="/admin/cat">分类管理</router-link>
        </nav>
        <router-view class="col float-left"></router-view>
    </div>
</template>
<script>
export default {
    
}
</script>