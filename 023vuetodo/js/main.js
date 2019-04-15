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
				Event.$emit(name, params);
			}
		}
	});

	new Vue({
		el      : '#main',
		data    : {
			list    : [],
			current : {}
		},
		mounted() {
			this.list = ms.get('list') || [];
			let me = this;

			setInterval(e=>{
				me.check_alert();
			},1000);

			Event.$on('remove', (params) => {
				me.remove(params);
			});

			Event.$on('set_current', (params) => {
				me.set_current(params);
			});

			Event.$on('toggle_complete', (params) => {
				me.toggle_complete(params);
			});
		},
		methods : {
			check_alert(){
				let me = this;
				this.list.forEach((it,index)=>{
					if(!it.alert_at || it.confirmed) return;

					let alert_time = (new Date(it.alert_at)).getTime;
					let now = (new Date()).getTime;

					if(now >= alert_time){

						this.list[index].confirmed = confirm(this.list[index].title);
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
					todo.id = this.next_id();
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
			next_id() {
				return this.list.length + 1;
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
