(function() {
	'use strict';

	function copy(obj) {
		return Object.assign({}, obj);
	}

	new Vue({
		el      : '#main',
		data    : {
			list    : [],
			current : {}
        },
        mounted(){
            this.list = ms.get('list') || [];
        },
		methods : {
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
            toggle_complete(id){
                let index = this.find_index(id);
                Vue.set(this.list[index],'complete',!this.list[index].complete);
            }
		},

		watch   : {
			list : {
				deep    : true,
				handler(n,o) {
                    if(n){
                        ms.set('list',n);
                    }else{
                        ms.set('list',[]);
                    }
                }
			}
		}
	});
})();
