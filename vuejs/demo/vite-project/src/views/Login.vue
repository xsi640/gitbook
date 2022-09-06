<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">xxxx</div>
        </div>
      </div>
      <a-form :model="formState" ref="formRef" :rules="rules">
        <a-form-item label="登录名称：" name="username">
          <a-input v-model:value="formState.username" autocomplete="off" />
        </a-form-item>
        <a-form-item label="登录密码：" name="password">
          <a-input v-model:value="formState.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { RuleObject } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, ref, UnwrapRef } from 'vue'

interface FormState {
  username: string
  password: string
}

export default defineComponent({
  setup() {
    const formRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
      username: '',
      password: '',
    })
    const resetForm = () => {
      formRef.value.resetFields()
    }
    let validateUsername = async (rule: RuleObject, value: string) => {
      if (value == '') {
        return Promise.reject('请输入用户名')
      } else {
        Promise.resolve()
      }
    }
    let validatePassword = async (rule: RuleObject, value: string) => {
      if (value == '') {
        return Promise.reject('请输入密码')
      } else {
        Promise.resolve()
      }
    }
    const rules = {
      username: [{ validator: validateUsername, triger: 'change' }],
      password: [{ validator: validatePassword, triger: 'change' }],
    }
    return {
      formState,
      formRef,
      resetForm,
      rules,
    }
  },
})
</script>
