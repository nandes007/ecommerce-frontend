<script setup>
import SliderComponent from '../components/ui/SliderComponent.vue'
import ProductList from '../components/product/ProductList.vue'
import NavbarComponent from '../components/ui/NavbarComponent.vue'
import SpecialProduct from '../components/product/SpecialProduct.vue'
import ProductSlider from '../components/product/ProductSlider.vue'
import FooterComponent from '../components/ui/FooterComponent.vue'
import MoboleNavComponent from '../components/mobile/MoboleNavComponent.vue'
import AddressComponent from '../components/mobile/AddressComponent.vue'
</script>

<template>
  <div>
    <NavbarComponent />
    <AddressComponent />
    <SliderComponent />
    <SpecialProduct />
    <ProductSlider />
    <ProductList />
    <FooterComponent />
    <MoboleNavComponent />
  </div>
</template>
