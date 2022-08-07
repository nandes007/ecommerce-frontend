<script>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Splide,
    SplideSlide,
    SplideTrack
  },

  setup () {
    const options = {
      perPage: 2,
      width: '100%',
      pagination: false,
      mediaQuery: 'min',
      gap: '12px',
      padding: { left: 14, right: 14 },
      breakpoints: {
        768: {
          perPage: 4,
          padding: { left: 14, right: 14 }
        },
        1024: {
          perPage: 6,
          padding: { left: 1, right: 1 }
        }
      }
    }

    const products = ref([
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product11.jpg', flag: '' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product12.jpg', flag: 'Terbaru' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product13.jpg', flag: '' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product14.jpg', flag: 'Terlaris' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product15.jpg', flag: '' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product16.jpg', flag: 'Terlaris' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product17.jpg', flag: '' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product18.jpg', flag: '' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product19.jpg', flag: '' },
      { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product20.jpg', flag: '' }
    ])

    return { options, products }
  }
})
</script>

<template>
  <section class="flex justify-center py-10">
    <div class="container max-w-screen-xl flex justify-center group lg:px-4">
      <Splide
        ref="splide"
        :options="options"
        :has-track="false"
        aria-label="My Favorite Images"
      >
        <SplideTrack>
          <SplideSlide
            v-for="product in products"
            :key="product.key"
            class="py-1"
          >
            <router-link
              :to="`/products/${product.id}`"
              class="block rounded-lg overflow-hidden shadow-3xl px-2 relative h-full w-full"
            >
              <div v-if="product.flag">
                <span class="absolute bg-danger left-0 text-white px-2 text-[13px] rounded-br">Terlaris</span>
              </div>
              <img
                :src="product.image"
                alt="Sample 1"
                class="mx-auto h-[60%]"
              >
              <div class="py-4">
                <h5 class="line-clamp-2">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia beatae, reprehenderit nesciunt veniam, ipsa consectetur ipsum delectus dignissimos rem inventore necessitatibus, labore sequi error dolores maxime asperiores numquam iste eius.
                </h5>
                <p class="text-warning pt-2">
                  Rp. 10.000
                </p>
              </div>
            </router-link>
          </SplideSlide>
        </SplideTrack>
        <div class="splide__arrows hidden lg:group-hover:flex">
          <button class="splide__arrow splide__arrow--prev font-bold text-lg bg-white opacity-100 -ml-[3%] shadow shadow-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button class="splide__arrow splide__arrow--next font-bold text-lg bg-white opacity-100 -mr-[3%] shadow shadow-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </Splide>
    </div>
  </section>
</template>
