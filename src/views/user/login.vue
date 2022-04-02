<template>
  <div class="login flex items-center justify-center">
    <div
      class="login__content px-14 pt-24 py-10 bg-white box-border rounded-xl">
      <a-form
        ref="formRef"
        name="custom-validation"
        layout="vertical"
        :model="formState"
        @submit="handleFinish">
        <a-form-item
          field="username"
          hide-label
          :rules="rules.username"
          :validate-trigger="['change', 'input']">
          <a-input v-model="formState.username" placeholder="用户名">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          hide-label
          :rules="rules.password"
          :validate-trigger="['change', 'input']">
          <a-input
            v-model="formState.password"
            type="password"
            autocomplete="off"
            placeholder="密码">
            <template #prefix>
              <icon-lock />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item class="mt-12">
          <a-button
            class="w-full rounded flex items-center justify-center"
            type="primary"
            :loading="isLoggingIn"
            html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import request from '@/plugins/api'
import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import Cookies from 'js-cookie'
import { useRouter, useRoute } from 'vue-router'

interface FormState {
  username: string
  password: string
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const formRef = ref()
const formState = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名' },
    { minLength: 2, maxLength: 20, message: '用户名长度为2-20位' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { maxLength: 20, minLength: 1, message: '请输入1-20位密码' },
  ],
})

// 表单校验通过执行函数
const handleFinish = ({
  values,
  errors,
}: {
  values: FormState
  errors: undefined | Record<string, ValidatedError>
}) => {
  if (!errors) signIn()
  //
}

// 校验不通过时执行的函数
const handleFinishFailed = (errors: ValidatedError) => {
  console.log(errors)
}

const isLoggingIn = ref(false)
// 登录方法
const signIn = async () => {
  try {
    isLoggingIn.value = true
    const data = await request({ api: 'user/login', param: formState })
    userStore.updateUserInfo(data)

    localStorage.setItem('BASE_USER_INFO', JSON.stringify(data))
    Cookies.set('geekadmin-token', data.token, { expires: 5 })
    const { redirect } = route.query
    router.push({
      path: redirect ? decodeURIComponent(redirect as string) : '/home',
    })
  } catch (error) {}
  isLoggingIn.value = false
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url('//static.weixiaotong.com.cn/static/icon/pcmain/login-background-blue.png')
    center center / cover no-repeat;

  &__content {
    width: 400px;
    max-width: 90%;
    box-shadow: 4px 12px 12px rgb(0 125 255 / 60%);
  }
}
</style>
