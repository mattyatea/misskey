<template>
<MkContainer>
	<template #icon><i class="ti ti-article"></i></template>
	<template #header>{{ sections.name }}</template>

	<div style="padding: 8px;">
		<div :class="$style.mutualLinks">
			<div v-for="(mutualLink, i) in sections.mutualLinks.slice(0, 9)" :key="i" :class="$style.mutualLink">
				<MkLink :hideIcon="true" :url="mutualLink.url">
					<img :class="$style.mutualLinkImg" :src="mutualLink.imgSrc"/>
				</MkLink>
				<span>{{ mutualLink.description }}</span>
			</div>
		</div>
	</div>
</MkContainer>
</template>

<script lang="ts" setup>
import MkContainer from '@/components/MkContainer.vue';
import MkLink from '@/components/MkLink.vue';

defineProps<{
	sections: {
		name: string;
		pinned: boolean;
		mutualLinks: {
			url: string;
			fileId: string;
			description: string | null;
			imgSrc: string;
		}[];
	};
}>();

</script>

<style lang="scss" module>

.mutualLinkSections {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	flex-direction: column;
	background: var(--panel);
	border-radius: var(--radius);
	padding: var(--margin);
	gap: 8px;
}

.mutualLinks {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	gap: 12px;
	padding-top: 8px;
}

.mutualLink {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.mutualLinkImg {
	max-width: 150px;
	max-height: 30px;
}

</style>
