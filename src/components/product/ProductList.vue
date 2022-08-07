<script setup>
// import { ref } from 'vue'
import { useProductStore } from '../../stores/product.js'

const productStore = useProductStore()

// const products = ref([
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product1.jpg', flag: 'Terlaris' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product2.jpg', flag: 'Terbaru' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product3.jpg', flag: '' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product4.jpg', flag: '' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product5.jpg', flag: '' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product6.jpg', flag: 'Terlaris' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product7.jpg', flag: '' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product8.jpg', flag: '' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: './src/assets/img/product/product9.jpg', flag: '' },
//   { id: '001', name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, aliquid', price: '$10.00', image: '', flag: '' }
// ])
</script>

<template>
  <!-- List Product Start -->
  <section class="flex justify-center">
    <div class="container max-w-screen-xl">
      <div class="flex flex-wrap px-2">
        <div
          v-for="(product, index) in productStore.products"
          :key="product.id"
          :index="index"
          class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 px-2 py-2"
        >
          <router-link
            :to="{ path: `products/${product.id}/${product.slug}` }"
            class="block rounded-lg overflow-hidden shadow-3xl px-2 relative h-full w-full"
          >
            <div v-if="product.flag">
              <span class="absolute bg-danger left-0 text-white px-2 text-[13px] rounded-br">Terlaris</span>
            </div>
            <!-- <img
              :src="product.product_images.length ? `${productStore.imgUrl + product.product_images[0].path}` : './src/assets/img/product/product1.jpg' "
              class="mx-auto h-[60%]"
              alt="Product Image"
            > -->
            <img
              :src="productStore.isImageExists(product)"
              class="mx-auto h-[60%]"
              alt="Product Image"
            >
            <div class="py-2 h-full text-sm md:text-base text-slate-800">
              <p class="text-ellipsis overflow-hidden line-clamp-2">
                {{ product.product_name }}
              </p>
              <h5 class="font-bold pt-5">
                {{ product.price }}
              </h5>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <!-- List Product End -->
</template>
