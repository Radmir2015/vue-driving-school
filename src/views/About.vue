<template>
    <v-container fluid>
      <v-card>
        <!-- <h2 class="text-center title">Обучение вождению в г. Каменка</h2> -->
        <p class="text-center text-h6 font-weight-regular pa-3 hidden-xs-only ma-0">Профессиональное образовательное учреждение <span class="font-weight-bold">Каменская автомобильная школа</span> Общероссийской общественно-государственной организации <span class="font-weight-bold">Добровольное общество содействие армии, авиации и флоту России</span></p>
        <p class="text-center text-h6 font-weight-bold pa-2 hidden-sm-and-up ma-0">ПОУ Каменская АШ ДОСААФ</p>
        <v-row class="px-6">
          <v-col sm="8" offset-sm="2" style="text-indent: 2em" class="text-justify">
            <p>
              <strong>Учредителем ПОУ Каменской АШ</strong> является Общероссийская общественно-государственная организация "Добровольное Общество содействия армии, авиации и флоту России" (ДОСААФ РОССИИ).
            </p>

            <p>
              <strong>Права юридического лица</strong> от имени ДОСААФ РОССИИ осуществляет Центральный совет ДОСААФ РОССИИ - постоянно действующий руководящий орган ДОСААФ РОССИИ.
            </p>

            <p class="mb-0">
              <strong>Место нахождения Учредителя</strong>:
              Москва, Волоколамское шоссе, д. 88, стр. 3
            </p>
          </v-col>
        </v-row>
        <v-parallax height="300" :src="require('@/assets/car-B-3.jpg')"></v-parallax>
      </v-card>
      <v-card class="my-2">
        <!-- <h3 class="text-center title">Пару слов об автошколе + карта</h3> -->
        <v-row>
          <v-col sm="10" offset-sm="1" class="history" style="text-indent: 2em">
            <v-container class="px-6 pa-sm-0">
              <p class="text-justify text--secondary">
                <strong>Каменский автомотоклуб</strong> был основан <strong>8 сентября 1955 года</strong> боевым летчиком подполковником Сахаровым Василием Ивановичем.
                Помимо дополнительных секций: мотоспорта, собаководства и радиоспорта основным направлением было <strong>подготовка водителей</strong> для Советской армии и народного хозяйства.
                За {{new Date().getFullYear() - 1955}} лет своего существования было подготовлено около <strong>100 тысяч</strong> водителей.</p>

              <p class="text-justify text--secondary mb-0 mb-sm-4">В <strong>1974 году</strong> на базе автомотоклуба была создана автошкола ДОСААФ.</p>
            </v-container>
            <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="px-sm-0" style="font-size: 16px">
                <p class="text-justify text--secondary ma-0">
                  История автошколы
                </p>
                <template v-slot:actions>
                <a class="text-justify my-auto">
                  Читать полностью
                </a>
                  <v-icon color="primary">$expand</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="text-justify text--secondary">
                  Автомотоклуб разместился на территории Каменского райвоенкомата, в одноэтажном пристрое. Не было ни гаражей, ни автодрома.
                  Было 2 автомашины и 2 классные комнаты. Постепенно укреплялась материальная база автомотоклуба: строились гаражи - первые в области с центральным отоплением.
                  Возводились: учебный корпус, общежитие, пристрой к административному зданию, построен был автодром и многое другое.</p>
                
                <p class="text-justify text--secondary">
                  Большой вклад в развитие автомотоклуба внесли его начальники: Сахаров В. И., проработавший до 1 января 1959 года.
                  Солуянов А. Г., проработавший в автомотоклубе до 1974 года и много для нее сделавший: гаражи, пристрой, учебный корпус и др.
                  В 1974 году на базе автомотоклуба была создана автошкола ДОСААФ. Ее возглавил Яшин Н. А.,
                  проработавший в должности начальника 3 года, его приемником был назначен Курышев Б. Я.,
                  проработавший в должности начальника 2 года. Его сменил Голиков М.Н. Михаил Николаевич проработал в автошколе 14 лет.</p>
                  
                <p class="text-justify text--secondary">
                  При нем было построено общежитие и ему удалось сохранить высококвалифицированный кадровый состав преподавателей и мастеров производственного обучения водителей.
                  Это Чинаев Б. И., Афонькин Л. Д., Горин С. Ф., Чернышов Н. И., Гредаев Н. М., Серебряков М. Д., Нагаев И. И., Запольский Г. Б., Митин Д. И.,
                  Минаев Ю. В., Царев Ю. С., Марейчев А. Е., Лопатин В. И., Моисеев В. А., Кулагин Г. А., Карамышев И. И., Азнобин В. В., Исайчев В. Н.</p>

                <p class="text-justify text--secondary">
                  Заместителями начальника автошколы работали Павельев, Зитев А. Т., Потапова А. И., Корноухова Е. А., Скорик Н. Я. и др.
                  В бухгалтерии трудились: Лебедева В. С., Шмелькова В., Халилова А. А., Фомина Г. И., Гурьева Н. С., Минаева Н., Корытцева Л.,
                  Гришина В. А. и др. До сегодняшнего дня в автошколе работают ветераны труда: Гусева С. С., Панькин В. А., Шиманский А. Б.
                  Затем коллектив автошколы возглавил Лукьянов С. К., проработавший в должности начальника 12 лет.
                  После его трагической гибели исполняющим обязанности начальника стал Коренченко С. Е.</p>

                <p class="text-justify text--secondary">
                  В 2006 году начальником был утвержден Афонькин Ю. Л. При Юрии Леонидовиче автошкола стала носить имя
                  Героя Советского Союза Паршина Виктора Степановича – командира танкового взвода нашего земляка.
                  Заметно улучшилось учебно-материальная база кабинетов и мастерских, появилось современное оснащение учебного процесса,
                  обновился автомобильный парк, проведен водопровод и канализация и многое другое.</p>
              </v-expansion-panel-content>

            </v-expansion-panel>
            </v-expansion-panels>


          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
      <v-card class="my-2">
        <h2 class="text-center title">Доступные категории</h2>
        <v-row>
          <v-col md="8" offset-md="2">
            <v-card outlined>
              <v-data-table
                :headers="categoriesHeaders"
                :items="categories"
                hide-default-footer
                disable-sort
              >
                <template #item.cars="{ item }">
                    <v-btn fab text @click="$vuetify.goTo('.v-tabs'); tab = item.cars">
                      <v-icon>mdi-eye-outline</v-icon>
                    </v-btn>
                    <!-- <router-link to="/fuck">Посмотреть</router-link> -->
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <h2 class="text-center title">Автопарк</h2>
        <v-tabs centered show-arrows center-active icons-and-text v-model="tab" color="green darken-3">
          <v-tab>Категория А<v-icon>mdi-bike</v-icon></v-tab>
          <v-tab>Категория В<v-icon>mdi-car</v-icon></v-tab>
          <v-tab>Категория С<v-icon>mdi-truck</v-icon></v-tab>
          <v-tab>Категория D<v-icon>mdi-bus-side</v-icon></v-tab>
          <v-tab>Категория E<v-icon>mdi-truck-trailer</v-icon></v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(tabContent, index) in tabsContent" :key="index">
            <v-card flat>
              <v-row class="text-center" no-gutters>
                <v-col cols="12" sm="6" class="pa-2">
                  <!-- <v-card class="ma-3"> -->
                    <v-container class="py-0">
                      <h3>Машина</h3>
                      <!-- <v-img src="https://picsum.photos/400/200?random"></v-img> -->
                      <!-- <Carousel :items="masters" :sliderItemsBreakpoints="{cols: 12}" aspectRatio="2.5"></Carousel> -->
                      <!-- <CarouselOrItem v-if="1" :items="[]" :sliderItemsBreakpoints="{cols: 12}" aspectRatio="2"></CarouselOrItem> -->
                      <!-- <CarouselOrItem v-if="1" :items="masters.slice(0, 1)" :sliderItemsBreakpoints="{cols: 12}" aspectRatio="2"></CarouselOrItem> -->
                      <CarouselOrItem :items="tabContent.cars" :sliderItemsBreakpoints="{cols: 12}" aspectRatio="2"></CarouselOrItem>
                    </v-container>
                  <!-- </v-card> -->
                </v-col>
                <v-col cols="12" sm="6" class="pa-2">
                  <v-container class="py-0">
                    <h3>Площадка</h3>
                    <!-- <v-img src="https://picsum.photos/400/200?random"></v-img> -->
                    <CarouselOrItem :items="tabContent.platform" :sliderItemsBreakpoints="{cols: 12}" aspectRatio="2"></CarouselOrItem>
                  </v-container>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <v-divider></v-divider>
        <!-- <v-divider></v-divider> -->
        <!-- <h2 class="text-center title">Необходимые документы</h2> -->
        <!-- <v-divider></v-divider> -->
        <h2 class="text-center title">Наши мастера</h2>
        <v-container>
          <!-- <v-carousel cycle height="100%" hide-delimiter-background hide-delimiters>
            <v-carousel-item v-for="index in arr(amountSliderPages)" :key="index">
              <v-sheet id="masters" light height="100%">
                <v-row justify="center" align="center" class="fill-height">
                  <v-col v-bind="sliderItemsBreakpoints" v-for="ind in arr(Math.min(itemsPerSlide, masters.length - index * itemsPerSlide))" :key="ind">
                    <v-card class="text-center">
                      <v-img :src="masters[index * itemsPerSlide + ind].photo" aspect-ratio="1"></v-img>
                      <v-card-title class="text-subtitle-1 font-weight-bold justify-center">{{ masters[index * itemsPerSlide + ind].name }}</v-card-title>
                      <v-card-subtitle>{{ masters[index * itemsPerSlide + ind].exp }}</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel> -->
          <CarouselOrItem :items="masters" :sliderItemsBreakpoints="sliderItemsBreakpoints" :aspectRatio="1" imageStyle="max-height: 250px" :avatar="true"></CarouselOrItem>
        </v-container>
        <v-divider></v-divider>
        <h2 class="text-center title">Контакты</h2>
        <v-row class="text-center" no-gutters>
          <v-col cols="12" md="6" order="1" order-md="1">
            <!-- <v-card> -->
              <h3 class="font-weight-light">Контактные данные</h3>
          </v-col>
          <v-col cols="12" md="6" order="3" order-md="2">
            <h3 class="font-weight-light">Карта</h3>
          </v-col>
          <v-col cols="12" md="6" order="2" order-md="3">
              <v-container fill-height>
                <v-sheet align="center" class="mx-auto">
                  <p>
                    <v-icon>mdi-map-marker</v-icon>Адрес ПОУ Каменская АШ ДОСААФ России:
                  </p>

                  <p class="font-weight-bold">
                    Пензенская область, г. Каменка, переулок Калинина, д. 4а
                  </p>

                  <p>
                    <v-icon>mdi-clock-outline</v-icon> <span class="font-weight-bold">График работы:</span> понедельник - пятница, с 8:00 до 17:00
                  </p>

                  <p>
                    <v-icon>mdi-phone</v-icon> <strong>Телефон:</strong> <a href="tel:+7(84156)5-19-61">+7(84156)5-19-61</a>; 5-17-04 
                  </p>

                  <p>
                    <v-icon>mdi-email</v-icon> <strong>Email:</strong> <a href="mailto:kamdosaaf58@mail.ru">kamdosaaf58@mail.ru</a>
                  </p>
                </v-sheet>
              </v-container>
            <!-- </v-card> -->
          </v-col>
          <v-col cols="12" md="6" order="4" order-md="4">
            <!-- <v-card outlined> -->
              
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A07d926d381a640cd4f2827381fbc7669f618208d5f8a112ac4932ee24d5ed022&amp;source=constructor" width="100%" height="100%" frameborder="0" style="min-height: 350px"></iframe>
              <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1195.7093209662328!2d44.03863435814718!3d53.17446970265001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4140c086bf590021%3A0xc6db75d60e56375d!2z0L_QtdGALiDQmtCw0LvQuNC90LjQvdCwLCA00LAsINCa0LDQvNC10L3QutCwLCDQn9C10L3Qt9C10L3RgdC60LDRjyDQvtCx0LsuLCA0NDIyNDE!5e0!3m2!1sru!2sru!4v1597523320245!5m2!1sru!2sru" width="100%" height="100%" frameborder="0" style="border:0; min-height: 350px" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> -->
            <!-- </v-card> -->
          </v-col>
        </v-row>
      </v-card>
    </v-container>
</template>

<script>
// import Carousel from '../components/Carousel';
import CarouselOrItem from '../components/CarouselOrItem';

export default {
    name: 'About',
    components: {
      CarouselOrItem
    },
    beforeRouteEnter(to, from, next) {
      if (to.hash) {
        next(vm => {
          if (to.hash.slice(1).split('-').shift() == 'category') {
            vm.tab = ['A', 'B', 'C', 'D', 'E'].indexOf(to.hash.slice(1).split('-').pop())
            vm.$vuetify.goTo('.v-tabs')
          }
          // vm.expandedPanels[vm.ACTIVE_DOC_INDEX] = 0
        })
      } else next()
    },
    computed: {
      itemsPerSlide() {
        console.log(this.arr(5))
        return Math.floor(12 / this.sliderItemsBreakpoints[{"xs": "cols"}[this.$vuetify.breakpoint.name]||this.$vuetify.breakpoint.name])
      },
      amountSliderPages() {
        return Math.ceil(this.masters.length / this.itemsPerSlide)
      }
    },
    methods: {
      arr: function(len) {
        return [...Array(len).keys()]
      }
    },
    data: () => ({
      tab: 1,
      masters: [
        {
          name: "Шиманский Александр Богданович",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 1998} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Волков Виктор Иванович",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 2006} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Афонькин Юрий Леонидович",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 2006} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Панькин Владимир Александрович",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 1983} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Серов Николай Николаевич",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 2008} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Корытцев Александр Васильевич",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 2010} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Кондрахин Олег Владимирович",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 2013} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Мезенцев Михаил Юрьевич",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 2013} лет`,
          photo: require('@/assets/userImage.png')
        },
        {
          name: "Сенаторов Александр Михайлович",
          exp: `Cтаж работы в автошколе ${new Date().getFullYear() - 2006} лет`,
          photo: require('@/assets/userImage.png')
        },
      ],
      tabsContent: [
        { category: 'A', cars: [
            { photo: require('@/assets/car-A.jpg') },
            { photo: require('@/assets/car-A-1.jpg') },
          ], platform: [
            { photo: require('@/assets/platform-A.jpg') },
          ] },
        { category: 'B', cars: [
            { photo: require('@/assets/car-B.jpg') },
            { photo: require('@/assets/car-B-1.jpg') },
            { photo: require('@/assets/car-B-2.jpg') },
            { photo: require('@/assets/car-B-3.jpg') },
          ], platform: [
            { photo: require('@/assets/platform-B.jpg') },
            { photo: require('@/assets/platform-B-1.jpg') },
            { photo: require('@/assets/platform-B-2.jpg') },
            { photo: require('@/assets/platform-B-3.jpg') },
          ] },
        { category: 'C', cars: [
            { photo: require('@/assets/car-C.jpg') },
            { photo: require('@/assets/car-C-1.jpg') },
            { photo: require('@/assets/car-C-2.jpg') },
          ], platform: [
            { photo: require('@/assets/platform-C.jpg') },
          ] },
        { category: 'C', cars: [
            { photo: require('@/assets/car-C.jpg') },
            { photo: require('@/assets/car-C-1.jpg') },
            { photo: require('@/assets/car-C-2.jpg') },
          ], platform: [
            { photo: require('@/assets/platform-C.jpg') },
          ] },
        { category: 'C', cars: [
            { photo: require('@/assets/car-C.jpg') },
            { photo: require('@/assets/car-C-1.jpg') },
            { photo: require('@/assets/car-C-2.jpg') },
          ], platform: [
            { photo: require('@/assets/platform-C.jpg') },
          ] },
      ],
      sliderItemsBreakpoints: {
        xl: 2, lg: 3, md: 4, sm: 6, cols: 12
      },
      categoriesHeaders: [
        { text: "Категория", value: 'category', align: 'center' },
        { text: "Стоимость", value: 'price', align: 'center' },
        { text: "Автопарк", value: 'cars', align: 'center' },
        // { text: "Площадки", value: 'cars', align: 'center' },
        { text: "Документы (условия)", value: 'docs', align: 'center' },
      ],
      categories: [
        { category: "A", price: "7000", cars: 0, docs: 'Паспорт, медицинская справка, фото (3.5 x 4.5), аттестат или диплом об образовании'},
        { category: "B", price: "13000", cars: 1, docs: 'Паспорт, медицинская справка, фото (3.5 x 4.5), аттестат или диплом об образовании'},
        { category: "C", price: "15000", cars: 2, docs: 'Паспорт, медицинская справка, фото (3.5 x 4.5), аттестат или диплом об образовании'},
        { category: "BC", price: "25000", cars: 2, docs: 'Паспорт, медицинская справка, фото (3.5 x 4.5), аттестат или диплом об образовании'},
        { category: "CE", price: "15000", cars: 4, docs: 'Паспорт, медицинская справка, фото (3.5 x 4.5), водительское удостоверение, аттестат или диплом об образовании, стаж вождение не менее 1 года'},
        { category: "C → D", price: "20000", cars: 3, docs: 'Паспорт, медицинская справка, фото (3.5 x 4.5), водительское удостоверение, аттестат или диплом об образовании, возраст 21 год'},
      ]
    })
}
</script>