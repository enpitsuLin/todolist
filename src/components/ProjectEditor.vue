<template>
	<v-dialog max-width="580px" v-model="dialog">
		<template v-slot:activator="{ on }">
			<v-btn color="blue darken-2" v-on="on" @click="setAdd" dark bottom right fixed fab ripple>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<h2>{{ editing ? "修改" : "添加项目" }}</h2>
			</v-card-title>

			<v-card-text>
				<v-form class="px-3" ref="form">
					<v-text-field
						label="事项标题"
						v-model="item.title"
						prepend-icon="mdi-folder"
						:rules="inputRules"
					></v-text-field>

					<v-menu
						max-width="290"
						ref="menu"
						v-model="menu"
						:close-on-content-click="false"
						:return-value.sync="item.due"
						transition="scale-transition"
						offset-y
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-bind="attrs"
								v-on="on"
								label="截止日期"
								v-model="item.due"
								prepend-icon="mdi-calendar-range"
							></v-text-field>
						</template>
						<v-date-picker v-model="item.due" no-title scrollable>
							<v-spacer></v-spacer>
							<v-btn text color="primary" @click="menu = false">取消</v-btn>
							<v-btn text color="primary" @click="$refs.menu.save(item.due)">确定</v-btn>
						</v-date-picker>
					</v-menu>

					<v-col>
						<v-btn color="primary" class="mt-3" @click="submit" :loading="loading">{{
							editing ? "修改" : "添加事项"
						}}</v-btn>
					</v-col>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			item: { title: "", due: "", status: "", items: [] },
			dialog: false,
			inputRules: [value => !!value || "必填", value => (value && value.length >= 2) || "至少两个字符"],
			menu: false,
			loading: false,
			editing: false
		};
	},
	methods: {
		setAdd() {
			(this.item = { title: "", due: "", status: "", items: [] }), (this.editing = false);
		},
		submit() {
			if (this.$refs.form.validate()) {
				this.loading = true;
				if (this.editing) {
					this.modifyItem();
				} else {
					this.addItem();
				}
			} else {
				alert("请检查输入");
			}
		},
		modifyItem() {
			const item = {
				id: this.item.id,
				title: this.item.title,
				due: this.item.due,
				items: this.item.items
			};
			this.$store.dispatch("modifyProject", item).then(res => {
				this.dialog = false;
				this.loading = false;
				this.editing = false;
				this.$emit("itemModifyed");
				this.$refs.form.reset();
			});
		},
		addItem() {
			const item = {
				title: this.item.title,
				due: this.item.due,
				items: this.item.items
			};
			this.$store.dispatch("addProject", item).then(res => {
				this.dialog = false;
				this.loading = false;
				this.$emit("itemAdded");
				this.$refs.form.reset();
			});
		},
		remove(tag) {
			this.item.tags.splice(this.item.tags.indexOf(tag), 1);
			this.item.tags = [...this.item.tags];
		},
		setEdit(item) {
			this.item = item;
			this.editing = true;
			this.dialog = true;
		}
	},

	watch: {
		"item.tags"(val) {
			if (val && val.length > 3) {
				this.$nextTick(() => this.item.tags.pop());
			}
		}
	}
};
</script>

<style></style>
