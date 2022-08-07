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
      perPage: 4,
      width: '100%',
      pagination: false,
      mediaQuery: 'min',
      gap: '12px',
      breakpoints: {
        768: {
          perPage: 6,
          padding: { left: 14, right: 14 }
        },
        1024: {
          perPage: 10,
          padding: { left: 1, right: 1 }
        }
      }
    }

    return { options }
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
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark line-clamp-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia beatae, reprehenderit nesciunt veniam, ipsa consectetur ipsum delectus dignissimos rem inventore necessitatibus, labore sequi error dolores maxime asperiores numquam iste eius.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/2.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/3.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/4.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/5.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/6.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/7.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/8.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
          </SplideSlide>
          <SplideSlide>
            <a href="#">
              <img
                src="../../assets/img/category/1.png"
                alt="Sample 1"
                class="w-1/2 rounded-lg overflow-hidden mx-auto"
              >
              <p class="text-center text-[13px] font-thin text-dark">Lorem ipsum dolor sit amet.</p>
            </a>
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
