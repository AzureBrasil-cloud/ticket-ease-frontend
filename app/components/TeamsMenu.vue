<script setup lang="ts">

defineProps<{
  collapsed?: boolean
}>()

</script>

<template>
  <div id="logo" class="flex justify-center items-center w-full">
  <img v-if="collapsed" src="/img/symbol-ticketease.svg" alt="Company Symbol" class="h-8 w-auto" />
    <img v-else src="/img/logo-ticketease.svg" alt="Company Logo" class="h-8 w-auto" id="logo"/>
  </div>
</template>
