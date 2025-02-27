<script setup>
import bg from '@images/pages/login.jpeg';
import axios from 'axios';
import * as dd from "dingtalk-jsapi";

const isPasswordVisible = ref(false)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4" style="
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: no-repeat center bottom / cover;min-block-size: 100vh; /* 确保容器至少占据整个视口的高度 */"
    :style="{ backgroundImage: `url(${bg})` }">
    <VCard class="auth-card pa-4 pt-7"
      style="inline-size: 300px; margin-inline: auto 2.3%; max-block-size: 600px; max-inline-size: 90vw;">
      <VCardItem class="d-flex flex-column align-start">
        <RouterLink to="/" class="d-flex align-center gap-3">
          <!-- eslint-disable vue/no-v-html -->
          <!-- <div class="d-flex" v-html="logo" /> -->
          <h2 class="font-weight-medium text-2xl text-uppercase" style="text-align: start;">
            欢迎登录
          </h2>
        </RouterLink>
      </VCardItem>

      <!--
        <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">
        Welcome to Materio! 👋🏻
        </h4>
        <p class="mb-0">
        Please sign-in to your account and start the adventure
        </p>
        </VCardText> 
      -->

      <VCardText>
        <VForm @submit.prevent="handleSubmit">
          <VRow>
            <!-- username -->
            <VCol cols="12">
              <VTextField v-model="username" label="用户名" type="username" class="mb-4" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="password" label="密码" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'" class="mb-4"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />
              <!-- remember me checkbox -->
              <!--
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                <VCheckbox v-model="form.remember" label="Remember me" />

                <a class="text-primary" href="javascript:void(0)">
                Forgot Password?
                </a>
                </div> 
              -->

              <!-- login button -->
              <VBtn block type="submit">
                登录
              </VBtn>
            </VCol>

            <!-- create account -->
            <!--
              <VCol cols="12" class="text-center text-base">
              <span>New on our platform?</span>
              <RouterLink class="text-primary ms-2" to="/register">
              Create an account
              </RouterLink>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
              </VCol> 
            -->

            <!-- auth providers -->
            <!--
              <VCol cols="12" class="text-center">
              <AuthProvider />
              </VCol> 
            -->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VDialog v-model="dialog" width="auto">
      <VCard min-width="400" title="登录失败" subtitle="用户名或密码错误">
        <template #actions>
          <VBtn class="ms-auto" text="取消" @click="dialog = false" />
        </template>
      </VCard>
    </VDialog>
  </div>
</template>

<script>
const BASE_URL = import.meta.env.VITE_API_USER_ENDPOINT

export default {
  data() {
    return {
      username: '',
      password: '',
      dialog: false,
    }
  },
  mounted() {
    this.ddLogin()
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch(BASE_URL + '/user/login/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `username=${this.username}&password=${this.password}`,
        })

        const result = await response.json()
        if (result.success) {
          localStorage.setItem('authToken', result.data)
          this.$router.push('/inventory-warning')
        } else {
          this.dialog = true
          console.log('Login failed:', result)
        }
      } catch (error) {
        // 网络错误处理
        console.error('Network error:', error)
      }
    },
    ddLogin() {
      let ddUserEmail = ""
      const that = this

      dd.runtime.permission.requestAuthCode({
        corpId: 'dingfc722e531a4125b735c2f4657eb6378f', // 企业id
        onSuccess: function (info) {
          console.log(info)

          const { code } = info

          // 通过该免登授权码可以获取用户身份
          axios.get(`https://api.peidigroup.cn/oms/ding/userInfo?code=${code}`, {
          })
            .then(res => {
              console.log('res', res)
              if (res.data.success) {
                const { data: ddUserInfo } = res.data

                console.log("ddUserInfo", ddUserInfo)

                const { org_email, name } = ddUserInfo
                if (org_email) {
                  console.log("ddEmail", org_email)
                  ddUserEmail = org_email
                  that.username = org_email
                  that.password = 'Aa123456'

                  // 获取到钉钉用户企业邮箱，调用注册接口
                  return axios.post(`https://user.peidigroup.cn/user/email-register`, {
                    email: org_email,
                    emailCode: "",
                    password: 'Aa123456',
                    username: name,
                  })
                } else {
                  alert("获取钉钉用户企业邮箱失败：" + JSON.stringify(res), {
                    type: "error",
                  })
                }
              } else {
                alert("用户注册失败：" + JSON.stringify(res), { type: "error" })
              }
            })
            .then(res => {
              console.log(1111)
              if (res) {
                console.log('res', res.data)
                if (
                  res.data.success ||
                  (res.data.code === 100100002 &&
                    res.data.msg === "EMAIL_ACCOUNT_ALREADY_EXIST")
                ) {
                  // 注册成功，调用登录接口

                  // return request(process.env.USER_AUTH_BASE_URL + '/user/login/password', {
                  //   method: 'POST',
                  //   data: `username=${ddUserEmail}&password=${process.env.DINGTALK_LOGIN_FREE_DEFAULT_PASSWORD}`,
                  // });
                  that.handleSubmit()
                } else {
                  alert("用户注册失败：" + JSON.stringify(res))
                }
              }
            })
            .then(res => {
              if (res) {
                if (res.success) {
                  localStorage.setItem("token", res.data)


                  // 登录成功，跳转到指定页面
                  const urlParams = new URL(window.location.href).searchParams

                  window.location.href = urlParams.get("redirect") || "/"
                } else {
                  setErrMsg("用户登录失败：" + JSON.stringify(res))
                }
              }
            })
        },
        onFail: function (err) {
          // setErrMsg('获取钉钉免登授权码失败：' + JSON.stringify(err))
          alert(JSON.stringify(err), { type: "error" })
        },
      })
    },

  },
}
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
