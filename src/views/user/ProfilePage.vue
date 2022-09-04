<script setup>
import BiodataComponent from '../../components/user/profile/BiodataComponent.vue'
import AddressComponent from '../../components/user/profile/AddressComponent.vue'
import { ref } from 'vue'
import ProfileComponent from '../../components/user/mobile/ProfileComponent.vue'
import UpdateProfileComponent from '../../components/user/mobile/UpdateProfileComponent.vue'

const currentTab = ref('BiodataComponent')

const tabs = {
  BiodataComponent,
  AddressComponent
}
</script>

<template>
  <div class="profile">
    <!-- Mobile display -->
    <ProfileComponent />
    <!-- End mobile display -->
    <!-- Update Profile Modal  -->
    <Transition
      duration="550"
      name="profile"
    >
      <UpdateProfileComponent />
    </Transition>
    <!-- Update Profile Modal End  -->
    <div class="hidden">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        :class="['tab-button', {active: currentTab === tab}]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
      <component
        :is="tabs[currentTab]"
        class="tab"
      />
    </div>
  </div>
</template>

<style>
.profile-enter-active, .profile-leave-active {
  transition: all 0.3s ease-in-out;
}

.profile-enter-from,
.profile-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
