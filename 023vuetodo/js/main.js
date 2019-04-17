(function() {
	'use strict';

	let Event = new Vue();

	function copy(obj) {
		return Object.assign({}, obj);
	}

	Vue.component('task', {
		template : '#task-tpl',
		props    : [ 'todo' ],
		methods  : {
			action(name, params) {
				Event.$emit('task', { name, params });
			}
		}
	});

	new Vue({
		el      : '#main',
		data    : {
			list    : [],
			last_id : 0,
			current : {
				show : false
			}
		},
		mounted() {
			this.list = ms.get('list') || this.list;
			this.last_id = ms.get('last_id') || this.last_id;
			let me = this;

			setInterval((e) => {
				me.check_alert();
			}, 1000);

			Event.$on('task', (data) => {
				me[data.name](data.params);
			});
		},
		methods : {
			show_detail() {
				this.current.show = !this.current.show;
			},
			toggle_detail(id) {
				let index = this.find_index(id);
				Vue.set(this.list[index], 'detail', !this.list[index].detail);
			},

			check_alert() {
				let me = this;
				this.list.forEach((it, index) => {
					if (!it.alert_at || it.confirmed) return;

					let alert_time = new Date(it.alert_at).getTime;
					let now = new Date().getTime;

					if (now >= alert_time) {
						let confirmed = confirm(this.list[index].title);
						Vue.set(this.list[index], 'confirmed', confirmed);
					}
				});
			},

			merge() {
				if (this.current.id) {
					let index = this.find_index(this.current.id);
					Vue.set(this.list, index, copy(this.current));
				} else {
					let title = this.current.title;
					if (!title && title !== 0) {
						return;
					}

					let todo = { ...this.current };
					this.last_id++;
					todo.id = this.last_id;
					ms.set('last_id', this.last_id);
					todo.complete = false;
					this.list.push(todo);
				}
				this.current = {};

				ms.set('list', this.list);
			},
			remove(id) {
				let index = this.find_index(id);
				this.list.splice(index, 1);
			},
			set_current(todo) {
				this.current = copy(todo);
				let input = document.getElementById('task-input');
				input.focus();
			},
			find_index(id) {
				return this.list.findIndex((item) => {
					return item.id == id;
				});
			},
			toggle_complete(id) {
				let index = this.find_index(id);
				Vue.set(this.list[index], 'complete', !this.list[index].complete);
			}
		},

		watch   : {
			list : {
				deep    : true,
				handler(n, o) {
					if (n) {
						ms.set('list', n);
					} else {
						ms.set('list', []);
					}
				}
			}
		}
	});
})();
