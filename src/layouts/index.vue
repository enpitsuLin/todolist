<template>
	<v-main class="grey lighten-4">
		<navbar />
		<router-view class="mx-4 mb-4"></router-view>
	</v-main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
	name: "Layout",
	components: { Navbar }
};
</script>

<style></style>
