<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text"
                 v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password"
                 v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LogForm',
    data () {
      return {
        usernameModel: '',
        passwordModel: '',
        errorText: '',
        userFlag: false,
        passwordFlag: false
      }
    },
    computed: {
      userErrors () {
        let errorText, status
        if (!/@/g.test(this.usernameModel)) {
          status = false
          errorText = '用户名需包含@'
        } else {
          status = true
          errorText = ''
        }
        if (!this.userFlag) {
          errorText = ''
          this.userFlag = true
        }
        return {
          status,
          errorText
        }
      },
      passwordErrors () {
        let errorText, status
        if (!/^\w{6,8}$/g.test(this.passwordModel)) {
          status = false
          errorText = '密码6-8位'
        } else {
          status = true
          errorText = ''
        }
        if (!this.passwordFlag) {
          errorText = ''
          this.passwordFlag = true
        }
        return {
          status,
          errorText
        }
      }
    },
    methods: {
      onLogin () {
        if (!this.userErrors.status || !this.passwordErrors.status) {
          this.errorText = '用户名或者密码格式错误'
        } else {
          this.errorText = ''
          // console.log('logging')
          this.$http.post('api/login', {username: this.usernameModel, password: this.passwordModel})
            .then((res) => {
              console.log(res)
              this.$emit('has-login', res.data)
            }, (error) => {
              console.log(error)
            })
        }
        // console.log(this.usernameModel, this.passwordModel)
      }
    }
  }
</script>

<style scoped>

</style>
