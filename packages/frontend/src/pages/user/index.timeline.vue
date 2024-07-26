<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkStickyContainer>
	<template #header>
		<MkTab v-model="tab" :class="$style.tab">
			<option value="featured">{{ i18n.ts.featured }}</option>
			<option :value="null">{{ i18n.ts.notes }}</option>
			<option value="all">{{ i18n.ts.all }}</option>
			<option value="files">{{ i18n.ts.withFiles }}</option>
			<option value="mutualLinks">{{ i18n.ts.mutualLink }}</option>
		</MkTab>
	</template>
	<MkNotes v-if="tab !== 'mutualLinks'" :noGap="true" :pagination="pagination" :class="$style.tl"/>
	<div v-else-if="tab === 'mutualLinks' ">
		<div :class="$style.mutualLinks">
			<div v-for="(mutualLink, i) in user.mutualLinks" :key="i" class="_margin">
				<MkLink :hideIcon="true" :url="mutualLink.url">
					<img :class="$style.banner" :src="mutualLink.imgUrl"/>
				</MkLink>
				<p>{{ (mutualLink.description === '' || mutualLink.description === null) ? i18n.ts.noDescription : mutualLink.description }}</p>
			</div>
		</div>
	</div>
	<div v-else>
		<p>{{ i18n.ts.nothing }}</p>
	</div>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import * as Misskey from 'misskey-js';
import MkNotes from '@/components/MkNotes.vue';
import MkTab from '@/components/MkTab.vue';
import { i18n } from '@/i18n.js';
import MkLink from '@/components/MkLink.vue';

const props = defineProps<{
	user: Misskey.entities.UserDetailed;
}>();

const tab = ref<string | null>('all');

const pagination = computed(() => tab.value === 'featured' ? {
	endpoint: 'users/featured-notes' as const,
	limit: 10,
	params: {
		userId: props.user.id,
	},
} : {
	endpoint: 'users/notes' as const,
	limit: 10,
	params: {
		userId: props.user.id,
		withRenotes: tab.value === 'all',
		withReplies: tab.value === 'all',
		withFiles: tab.value === 'files',
		withChannelNotes: true,
	},
});
</script>

<style lang="scss" module>
.tab {
	padding: calc(var(--margin) / 2) 0;
	background: var(--bg);
}

.tl {
	background: var(--bg);
	border-radius: var(--radius);
	overflow: clip;
}
.banner {
	max-width: 300px;
	min-width: 200px;
	max-height: 60px;
	min-height: 40px;
	object-fit: contain;
}
.mutualLinks{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	background: var(--panel);
	border-radius: var(--radius);
}
</style>
