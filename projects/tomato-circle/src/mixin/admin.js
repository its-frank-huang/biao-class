import pagination from "../component/pagination";
import api from "../lib/api";
import store from "../lib/store";
import valee from "../lib/valee";

export default {
	components:{
		pagination,
	},
	data() {
		return {
			form: {},
			ui: {
				showForm: false
			},
			readParams:{
				limit:5,
				page:1,
			},
			total:0,
			list: [],
			
			timer: null,
			error: {
				// username:{
				// 	regex:false,
				// 	lengthBetween:false,
				// }
			}
		};
	},
	mounted() {
		this.read();
	},
	methods: {
		pageChange(page){
			this.readParams.page = page; 
			this.read();
		},
		debounceValidate(field) {
			if (this.timer) clearTimeout(this.timer);

			this.timer = setTimeout(e => {
				this.validator(field);
			}, 500);
		},
		validator(field) {
			let fieldRules = this.rules[field];
			let vaildForm = true;

			for (let key in fieldRules) {
				let rule = fieldRules[key];

				let valid = valee[key](this.form[field], ...rule.params);

				if (typeof valid == "boolean") {
					this.afterValidate(field, key, valid);
					if (!valid) vaildForm = false;
				} else {
					valid.then(r => {
						this.afterValidate(field, key, r);
						
						// if (!r) vaildForm = false;
					});
				}
			}
			return vaildForm;
		},
		afterValidate(field, key, valid) {
			let fieldObj = this.error[field];

			if (!fieldObj) fieldObj = this.$set(this.error, field, {});

			this.$set(fieldObj, key, !valid);
		},
		validateForm() {
			let rules = this.rules;

			for (let field in rules) {
				
				if (!this.validator(field)) return false;
			}

			return true;
		},
		read() {
			api(`${this.model}/read`,this.readParams).then(r => {
				if (!r.data) {
					alert("用户列表读取失败");
					return;
				}

				this.list = r.data;
				this.total = r.total;
			});
		},
		submit() {
			if (!this.validateForm()) return;

			let action = "create";

			if (this.form.id) action = "update";

			api(`${this.model}/${action}`, this.form).then(r => {
				this.form = {};
				this.ui.showForm = false;
				this.read();
			});
		},
		introLenth(intro) {
			if (!intro) return "-";
            if (intro.length < 10) return intro;

			return intro.substr(10) + "...";
		},
		remove(id) {
			if (!confirm("确定删除用户？")) return;

			api(`${this.model}/delete`, { id }).then(r => {
				this.read();
			});
		},
		update(it) {
			this.form = it;
			this.ui.showForm = true;
		}
	}
}