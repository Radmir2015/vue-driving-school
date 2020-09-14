<template>
  <v-dialog max-width="400px" v-model="dialog" :disabled="LOGIN_STATE">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text :class="{ 'hidden-xs-only': hiddenOnMobile }" v-bind="attrs" v-on="on" @click="checkedSignOut" :loading="loading.signOutButton">
        {{ buttonName }}
        <v-icon right>mdi-login-variant</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1 class="title">Вход для администраторов</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="login.value" :error-messages="login.error" @input="login.error = ''" :rules="inputRules" type="email" label="Логин" prepend-icon="mdi-account-circle" />
          <v-text-field
            v-model="password.value"
            :error-messages="password.error"
            @input="password.error = ''"
            :rules="inputRules"
            :type="showPassword ? 'text' : 'password'"
            label="Пароль"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text block color="success" @click="submit" :loading="loading.submitButton">Вход</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { auth } from '@/fb'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['hiddenOnMobile'],
  data: () => ({
    dialog: false,
    // signedIn: false,
    buttonName: "Вход",
    loading: {
        submitButton: false,
        signOutButton: false,
    },
    login: {
        value: "",
        error: "",
    },
    password: {
        value: "",
        error: "",
    },
    showPassword: false,
    inputRules: [
      v => v.length >= 3 || "Минимальная длина данного поля - 3 символа"
    ]
  }),
  computed: {
    ...mapGetters(['LOGIN_STATE'])
  },
  methods: {
    ...mapActions(['TOGGLE_LOGIN']),
    submit() {
        this.loading.submitButton = true
        this.toggleSignIn(this.login.value, this.password.value)
    },
    toggleSignIn(email, password) {
        if (auth.currentUser && !auth.currentUser.isAnonymous) {
            auth.signOut().then(() => {
                this.loading.signOutButton = false
            })
        } else {
            if (this.$refs.form.validate()) {
                auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    this.dialog = false
                    this.loading.submitButton = false
                })
                .catch((error) => {
                    this.loading.submitButton = false

                    var errorCode = error.code;
                    var errorMessage = error.message;

                    if (errorCode === 'auth/wrong-password') {
                        // alert('Неправильный пароль.');
                        this.password.error = 'Неправильный пароль'
                    } else {
                        // alert(errorMessage);
                        this.login.error = errorMessage
                    }
                    console.log(error);
                })
            }
        }
    },
    checkedSignOut() {
        if (this.LOGIN_STATE) {
            this.loading.signOutButton = true
            this.toggleSignIn()
        }
    }
  },
  mounted() {
      auth.onAuthStateChanged(user => {
          this.TOGGLE_LOGIN(!!user && !user.isAnonymous)
          if (this.LOGIN_STATE) {
              this.buttonName = 'Выход'
              // this.$root.$emit('sign-in')
              this.TOGGLE_LOGIN(true)
          } else {
            // this.$root.$emit('sign-out')
              this.buttonName = 'Вход'
              this.TOGGLE_LOGIN(false)
          }
      })
      
      // this.$root.$on('request-sign-status', () => {
      //     this.$root.$emit(this.signedIn ? 'sign-in' : 'sign-out')
      // })
  },
//   created() {
//     //   window.addEventListener('unload', alert('unload'))
//       auth.signInAnonymously().catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code
//         var errorMessage = error.message
        
//         console.log(errorCode, errorMessage)
//       })
//   }
};
</script>