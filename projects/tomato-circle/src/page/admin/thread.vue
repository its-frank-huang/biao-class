<template>
	<div>
		<h1>Thread</h1>
		<pagination :total="100" :limit="10"/>
	</div>
</template>

<script>
import pagination from '../../component/pagination.vue'
export default {
    components:{pagination},
    methods:{
    }
};
</script>

<style>
</style>
