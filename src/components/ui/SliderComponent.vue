<script>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Splide,
    SplideSlide,
    SplideTrack
  },

  setup () {
    const options = {
      type: 'loop',
      padding: '10%',
      width: '100%',
      gap: '20px',
      focus: 'center',
      autoplay: true,
      classes: {
        pagination: 'splide__pagination container-pagination',
        page: 'splide__pagination__page btn-pagination'
      },
      mediaQuery: 'min',
      breakpoints: {
        1024: {
          padding: '20%'
        }
      }
    }

    return { options }
  }
})
</script>

<template>
  <section class="flex justify-center pt-6 lg:pt-[120px] slider">
    <div class="container max-w-screen-xl flex justify-center group lg:px-4">
      <Splide
        ref="splide"
        :options="options"
        :has-track="false"
        aria-label="My Favorite Images"
      >
        <SplideTrack>
          <SplideSlide>
            <img
              src="../../assets/img/slider/indomaret1.jpg"
              alt="Sample 1"
              class="w-full rounded-lg overflow-hidden"
            >
          </SplideSlide>
          <SplideSlide>
            <img
              src="../../assets/img/slider/indomaret1.jpg"
              alt="Sample 1"
              class="w-full rounded-lg overflow-hidden"
            >
          </SplideSlide>
          <SplideSlide>
            <img
              src="../../assets/img/slider/indomaret1.jpg"
              alt="Sample 1"
              class="w-full rounded-lg overflow-hidden"
            >
          </SplideSlide>
          <SplideSlide>
            <img
              src="../../assets/img/slider/indomaret2.jpg"
              alt="Sample 2"
              class="w-full rounded-lg overflow-hidden"
            >
          </SplideSlide>
          <SplideSlide>
            <img
              src="../../assets/img/slider/indomaret3.jpg"
              alt="Sample 2"
              class="w-full rounded-lg overflow-hidden"
            >
          </SplideSlide>
          <SplideSlide>
            <img
              src="../../assets/img/slider/indomaret4.jpg"
              alt="Sample 2"
              class="w-full rounded-lg overflow-hidden"
            >
          </SplideSlide>
        </SplideTrack>
        <div class="splide__arrows hidden lg:group-hover:flex">
          <button class="splide__arrow splide__arrow--prev font-bold text-lg bg-white opacity-100 ml-[17%] shadow shadow-secondary">
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
          <button class="splide__arrow splide__arrow--next font-bold text-lg bg-white opacity-100 mr-[17%] shadow shadow-secondary">
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
