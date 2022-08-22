<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useProductStore } from '../../stores/product.js'
import { useCartStore } from '../../stores/cart.js'
import { useUiStore } from '../../stores/ui.js'
import FavoriteButton from '../../components/FavoriteButton.vue'
import PrimaryButton from '../../components/PrimaryButton.vue'
import ProductDetailLoading from '../../components/ui/ProductDetailLoading.vue'
import NavbarComponent from '../../components/ui/NavbarComponent.vue'
import ProductDetailDisplay from '../../components/mobile/ProductDetailDisplay.vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const uiStore = useUiStore()

const images = ref([])
const imageDefault = ref('')
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
})

const imageIsExist = computed(() => {
  return !!images.value.length
})

watchEffect(() => {
  if (productStore.products.length) {
    setTimeout(() => {
      productStore.getProduct(props.slug)
      images.value = productStore.singleProduct.product_images
      imageDefault.value = productStore.singleProduct.product_images[0].path
    }, 2000)
  }
})

</script>

<template>
  <div>
    <NavbarComponent />
    <section class="flex justify-center py-10 w-full h-full lg:pt-[120px]">
      <div class="container max-w-screen-xl">
        <ProductDetailLoading
          v-if="!imageIsExist"
          class="pt-7 w-full mx-auto lg:hidden"
        />
        <div class="flex flex-wrap">
          <ProductDetailLoading
            v-if="!imageIsExist"
            class="hidden lg:flex"
          />
          <div
            v-if="imageIsExist"
            class="w-full lg:w-1/2"
          >
            <img
              :src="productStore.imgUrl + imageDefault"
              alt="Product Image"
              class="w-1/2 rounded-lg overflow-hidden mx-auto"
            >
            <div
              class="hidden lg:block"
            >
              <label
                v-for="(image, index) in images"
                :key="image.id"
                :index="index"
                class="cursor-pointer"
              >
                <input
                  v-model="imageDefault"
                  :value="image.path"
                  :for="image.id"
                  type="radio"
                  class="hidden"
                >
                <img
                  :src="productStore.imgUrl + image.path"
                  alt="Product Image"
                  class="w-1/6 rounded-lg overflow-hidden inline"
                >
              </label>
            </div>
          </div>
          <div class="py-2 px-2 lg:px-5 lg:w-1/2">
            <div class="lg:py-4">
              <p class="line-clamp-2 text-base lg:text-xl">
                {{ productStore.singleProduct.product_name }}
              </p>
            </div>
            <div class="py-2 overflow-hidden lg:border-t border-cloudy lg:py-4">
              <h5 class="font-bold text-xl text-warning">
                Rp {{ productStore.singleProduct.price }}
              </h5>
            <!-- <p class="text-secondary line-through">
              Rp. 16.000
            </p> -->
            </div>
            <div class="py-2 overflow-hidden lg:border-t border-cloudy lg:py-4 hidden lg:flex">
              <div class="flex py-2 justify-between w-full px-2 items-center">
                <form class="flex items-center space-x-1">
                  <PrimaryButton
                    :style="'text-xl font-bold flex items-center justify-center w-8 h-8'"
                    @click="productStore.quantityDecrement()"
                  >
                    -
                  </PrimaryButton>
                  <input
                    v-model="productStore.singleProduct.quantity"
                    type="text"
                    class="px-2 py-2 font-bold border-b border-secondary text-center w-12 focus:outline-none focus:border-primary"
                    @keypress="uiStore.isNumber($event)"
                    @input="productStore.inputQty()"
                  >
                  <PrimaryButton
                    :style="'text-xl font-bold flex items-center justify-center w-8 h-8'"
                    @click="productStore.quantityIncrement()"
                  >
                    +
                  </PrimaryButton>
                </form>
                <div class="flex space-x-4">
                  <PrimaryButton @click="cartStore.addItemToCart()">
                    + Keranjang
                  </PrimaryButton>
                  <FavoriteButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-2 pb-16 w-full lg:py-10 px-2">
          <div class="py-2 lg:py-4">
            <h5 class="font-bold">
              Detail Produk
            </h5>
          </div>
          <div>
            <p>{{ productStore.singleProduct.description }}</p>
          </div>
        </div>
      </div>
      <!-- Bottom Nav Mobile Component -->
      <ProductDetailDisplay />
      <!-- Bottom Nav Mobile Component -->
    </section>
  </div>
</template>
