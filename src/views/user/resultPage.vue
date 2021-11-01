<template>
  <a-result :status="resultStatus"
    :title="resultStatus"
    sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary"
        @click="onBackHomeClick">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

enum SUBTITLES {
  'Sorry, you are not authorized to access this page.' = 403,
  'Sorry, the page you visited does not exist.' = 404,
  'Sorry, the server is wrong.' = 500,
}

const router = useRouter()
const route = useRoute()

const resultStatus = ref('404')
const subTitle = ref(SUBTITLES[404])
onMounted(() => {
  const { status = '404' } = route.query
  if (['404', '403', '500'].includes(status as string)) {
    resultStatus.value = status as string
    status && (subTitle.value = SUBTITLES[+status as 403 | 404 | 500])

    console.log(subTitle.value)
  }
})

const onBackHomeClick = () => {
  router.replace({ name: 'home' })
}
</script>

<style lang="scss" scoped>
</style>
