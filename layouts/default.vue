<template>
	<div>
		<Navbar />
		<b-container>
			<nuxt />
		</b-container>
	</div>
</template>

<script>
	import Navbar from '../components/Navbar';
	import PageHeader from '../components/PageHeader';
	export default {
		components: {
			Navbar,
			PageHeader
		}
	}
</script>

<style>
	html {
		font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
	}
	body {
		background-color: #f9f9f9;
	}

	*,
	*:before,
	*:after {
		box-sizing: border-box;
		margin: 0;
	}

	.page-content {
		margin: 50px 0px;
	}
	img {
		max-width: 100%;
	}
</style>
