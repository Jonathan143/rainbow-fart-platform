<template>
  <div class="login flex items-center justify-center">
    <div class="login__content px-14 pt-24 py-10 bg-white box-border rounded-xl">
      <a-form name="custom-validation"
        ref="formRef"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed">
        <a-form-item name="username">
          <a-input v-model:value="formState.username"
            placeholder="用户名">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="formState.password"
            type="password"
            autocomplete="off"
            placeholder="密码">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item class="mt-12">
          <a-button class="w-full rounded"
            type="primary"
            html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  watchEffect,
  readonly,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  UnwrapRef,
} from 'vue'
import axios from '@/plugins/api'
import {
  RuleObject,
  ValidateErrorEntity,
} from 'ant-design-vue/es/form/interface'
import Cookies from 'js-cookie'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'

interface FormState {
  username: string
  password: string
}

export default defineComponent({
  name: 'UserLogin',
  components: { LockOutlined, UserOutlined },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const formRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
      username: '',
      password: '',
    })

    const validatePass = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject('请输入用户名')
      }
      return Promise.resolve()
    }
    const validatePass2 = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject('请输入密码')
      }
      return Promise.resolve()
    }

    const rules = {
      username: [
        { required: true, validator: validatePass, trigger: 'change' },
      ],
      password: [
        { required: true, validator: validatePass2, trigger: 'change' },
      ],
    }
    const handleFinish = (values: FormState) => {
      console.log(values, formState.username)
      signIn()
    }
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors)
    }

    const signIn = async () => {
      try {
        const { data } = await axios.post('user/login', formState)
        console.log('登录成功')
        Cookies.set('access_token', data.token, { expires: 7 })
        const { redirect } = route.query
        router.push({ path: (redirect as string) || '/home' })
      } catch (error) {}
    }

    return {
      formState,
      formRef,
      rules,
      handleFinishFailed,
      handleFinish,
    }
  },
})
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
