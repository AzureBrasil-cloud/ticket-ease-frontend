<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { priorityOptions } from '~/shared/getPriorityName'
import { TicketPriority } from '~/types'

const schema = z.object({
  title: z.string().min(2, 'Too short'),
  description: z.string().min(2, 'Too short'),
  content: z.string().min(2, 'Too short'),
  priority: z.nativeEnum(TicketPriority)
})

const open = ref(false)

type Schema = z.output<typeof schema>

const initialState: Partial<Schema> = {
  title: undefined,
  description: undefined,
  content: undefined,
  priority: undefined
}

const state = reactive({ ...initialState })

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/tickets', {
      method: 'POST',
      body: event.data
    })

    toast.add({ title: 'Success', description: `Ticket "${event.data.title}" created.`, color: 'success' })
    open.value = false
    // Reset form state
    Object.assign(state, initialState)
  } catch (error) {
    toast.add({ title: 'Error', description: 'Could not create ticket.', color: 'error' })
  }
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
          <UInput v-model="state.description" class="w-full" />
        </UFormField>
        <UFormField label="Conteúdo" name="content">
          <UTextarea v-model="state.content" class="w-full" rows="5" />
        </UFormField>
        <UFormField label="Prioridade" name="priority">
          <USelect v-model.number="state.priority" :items="priorityOptions" class="w-full" placeholder="Selecione a prioridade" popper="{ strategy: 'fixed' }" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton label="Cancelar" color="neutral" variant="subtle" @click="open = false" />
          <UButton label="Criar" color="primary" variant="solid" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
