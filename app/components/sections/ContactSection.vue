<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  subject: 'Sponsoring',
  message: '',
})

const pending = ref(false)
const sent = ref(false)
const errorMessage = ref('')

const submit = async () => {
  pending.value = true
  sent.value = false
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form,
    })
    sent.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Impossible d envoyer le message.'
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="section-padding">
    <div class="section-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p class="eyebrow">Contact</p>
        <h1 class="section-title mt-3">Sponsors, supporters, presse: parlons rally.</h1>
        <p class="section-subtitle">
          Formulaire MVP pret pour collecter les demandes. L'envoi email peut etre connecte sans changer l'interface.
        </p>
        <div class="panel mt-8 p-5">
          <p class="font-bold">Quarroz Rally Team</p>
          <p class="mt-2 text-sm text-rally-graphite/70 dark:text-rally-ice/70">Valais, Suisse</p>
          <a href="mailto:contact@quarrozrallyteam.ch" class="mt-4 inline-flex text-sm font-bold text-rally-red">
            contact@quarrozrallyteam.ch
          </a>
        </div>
      </div>

      <form class="panel grid gap-4 p-5 md:p-7" @submit.prevent="submit">
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label class="text-sm font-bold" for="name">Nom</label>
            <input id="name" v-model="form.name" class="input-field mt-2" required type="text" autocomplete="name">
          </div>
          <div>
            <label class="text-sm font-bold" for="email">Email</label>
            <input id="email" v-model="form.email" class="input-field mt-2" required type="email" autocomplete="email">
          </div>
        </div>
        <div>
          <label class="text-sm font-bold" for="subject">Sujet</label>
          <select id="subject" v-model="form.subject" class="input-field mt-2">
            <option>Sponsoring</option>
            <option>Boutique</option>
            <option>Calendrier</option>
            <option>Presse</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-bold" for="message">Message</label>
          <textarea id="message" v-model="form.message" class="input-field mt-2 min-h-36" required />
        </div>
        <button class="btn-primary" type="submit" :disabled="pending">
          {{ pending ? 'Envoi...' : 'Envoyer' }}
        </button>
        <p v-if="sent" class="text-sm font-semibold text-green-600 dark:text-green-400">
          Message enregistre. Le branchement email est pret pour la suite.
        </p>
        <p v-if="errorMessage" class="text-sm font-semibold text-rally-red">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </section>
</template>
