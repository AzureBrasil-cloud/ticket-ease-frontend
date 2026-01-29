<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  title: z.string().min(2, 'Too short'),
  descripton: z.string().min(2, 'Too short'),
  content: z.string().min(2, 'Too short'),
  priority: z.string().min(2, 'Too short')
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  descripton: undefined,
  content: undefined,
  priority: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: `New customer ${event.data.title} added`, color: 'success' })
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="Novo ticket" description="Crie um novo ticket de suporte">
    <UButton label="Novo ticket" icon="i-lucide-plus" />

    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Título" name="title">
          <UInput v-model="state.title" class="w-full" />
        </UFormField>
        <UFormField label="Descrição" name="description">
          <UInput v-model="state.descripton" class="w-full" />
        </UFormField>
        <UFormField label="Conteúdo" name="content">
          <UInput v-model="state.content" class="w-full" />
        </UFormField>
        <UFormField label="Prioridade" name="priority">
          <UInput v-model="state.priority" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton label="Cancel" color="neutral" variant="subtle" @click="open = false" />
          <UButton label="Create" color="primary" variant="solid" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
