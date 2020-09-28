<template>
    <v-container fluid>
        <v-row>
            <v-col md="6" offset-md="3" sm="8" offset-sm="2" class="pt-0">
                <v-form>
                    <h3 class="text-center title">
                        Отправить отзыв
                    </h3>
                    <v-text-field
                        v-model="author"
                        dense
                        label="Имя"
                        prepend-icon="mdi-account"
                    />
                    <v-textarea
                        v-model="text"
                        dense
                        counter
                        label="Текст отзыва"
                        prepend-icon="mdi-text"
                        rows="3"
                    />
                    <div class="g-recaptcha" data-sitekey="6LfaXc8ZAAAAAHdMF2Dmjxd9OJU_QN5InSzKo1YE"></div>
                    <!-- <br/> -->
                    <v-btn color="success" class="mt-2" @click="submit">Отправить</v-btn>
                </v-form>
            </v-col>
        </v-row>
        <h3 class="text-center title">
            Отзывы
        </h3>
        <v-row>
            <v-col sm="10" offset-sm="1" class="pa-0">
                <v-card v-for="(review, index) in REVIEWS_STATE" :key="review.id" class="mb-2">
                    <v-card-title>
                        <p class="title pa-0 ma-0 align-self-center">{{ review.author }}</p>
                        <v-container class="d-flex pa-0" fluid>
                            <v-icon left small>mdi-clock</v-icon>
                            <p class="text-body-1 pa-0 ma-0 align-self-center">{{ new Date(review.published).toLocaleString() }}</p>
                            <v-btn v-if="LOGIN_STATE" icon class="align-self-center" @click="deleteReview(review.id, index)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-container>
                    </v-card-title>
                    <v-card-text>
                        <p class="text-body-1 ma-0 text-justify" style="text-indent: 2em">{{ review.text }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/fb'
import { mapGetters, mapMutations } from 'vuex'

export default {
    data: () => ({
        author: '',
        text: ''
    }),
    methods: {
        ...mapMutations(['PUSH_REVIEW', 'REMOVE_REVIEW']),
        async submit() {
            // const captchaResponse = grecaptcha.getResponse()
            console.log(window.grecaptcha.getResponse())

            if (window.grecaptcha.getResponse()) {

                // send review here
                const newReview = { author: this.author, text: this.text.replace(/↵/g, '\n'), published: new Date() }

                console.log(newReview)

                const id = (await db.collection('reviews').add(newReview)).id

                this.PUSH_REVIEW({ value: { id, ...newReview }, method: 'unshift' })

                this.author = this.text = ''

                // parsing function of reviews in original site
                // [...document.querySelectorAll('.commentstd')].slice(1).map((el) => ({
                //     name: (el.querySelector('.com-meta strong') || el.querySelector('.com-meta a')).innerText,
                //     published: el.querySelector('.com-meta em').innerText,
                //     text: el.querySelector('.commententry').innerText
                // }))

                // for (let review of this.reviews) {
                //     review.published = new Date(review.published)
                //     await db.collection('reviews').add(review)
                // }

                window.grecaptcha.reset()
            }
        },
        async deleteReview(id, index) {
            await db.collection('reviews').doc(id).delete()
            this.REMOVE_REVIEW(index)
        }
    },
    computed: {
        ...mapGetters(['LOGIN_STATE', 'REVIEWS_STATE'])
    },
    mounted() {
        const recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
        recaptchaScript.async = recaptchaScript.defer = true
        document.head.appendChild(recaptchaScript)
    }
}
</script>