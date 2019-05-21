<template>
	<div class="pagination">
		<div class="btn-group prev">
			<button @click="first()" :class="active==1? 'active':''">第一页</button>
			<button @click="prev()">上一页</button>
		</div>
		<div class="btn-group main">
			<button
				:class="it == active? 'active' : ''"
				v-for="it in count"
				@click="onClick(it)"
				v-if="Math.abs(it-uiActive())<=Math.floor(radius/2)"
			>{{it}}</button>
		</div>
		<div class="btn-group next">
			<button @click="next()">下一页</button>
			<button @click="last()" :class="active==count? 'active':''">最后页</button>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		total: {},
		limit: {},
		onChange: {},
		radius: {
			default: 7
		}
	},
	mounted() {
		this.finalRadius = 7;
	},
	data() {
		return {
			active: 1
		};
	},
	computed: {
		count() {
			let p = this.$props;
			return Math.ceil(p.total / p.limit);
		}
	},
	methods: {
		uiActive() {
			let radius = Math.floor(this.radius / 2);
			let a = this.active;

            if (a < radius + 1) return radius + 1;
            if(a > this.count - radius) return this.count -radius;

            return a;
		},
		onClick(page) {
			this.change(page);
		},
		change(page) {
			if (page < 1 || page > this.count) return;

			if (page > this.radius) {
				this.finalRadius = Math.floor(this.radius / 2);
			}

			this.active = page;
			let onChange = this.$props.onChange;

			onChange && onChange(page);
		},
		first() {
			this.change(1);
		},
		last() {
			this.change(this.count);
		},
		prev() {
			this.change(this.active - 1);
		},
		next() {
			this.change(this.active + 1);
		}
	}
};
</script>
<style scoped>
button {
	cursor: pointer;
}

.pagination,
.pagination > * {
	display: flex;
}
.pagination {
	justify-content: space-between;
}

.btn-group > *:first-child {
	border-top-left-radius: 0.2rem;
	border-bottom-left-radius: 0.2rem;
}

.btn-group > *:last-child {
	border-top-right-radius: 0.2rem;
	border-bottom-right-radius: 0.2rem;
}

.active {
	background: #000;
	color: #fff;
	border-color: #000;
	border-right-width: 1px;
}

.active + button {
	border-left-width: 0;
}

.btn-group > * {
	border-right-width: 0;
}

.btn-group > *:last-child {
	border-right-width: 1px;
}

.prev {
	margin-right: auto;
	justify-content: flex-start;
}

.next {
	margin-left: auto;
	justify-content: flex-end;
}

.prev,
.next {
	flex-grow: 1;
}

.main {
	justify-content: center;
	flex-grow: 7;
}
</style>
