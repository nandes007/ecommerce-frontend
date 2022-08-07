<script setup>

</script>

<template>
  <section class="flex justify-center h-full">
    <div class="container max-w-screen-xl relative">
      <div class="w-full lg:w-2/3">
        <div class="absolute right-0 top-8 w-1/4 px-2 hidden lg:block">
          <div class="bg-white shadow-3xl px-4 rounded-lg py-2">
            <h5 class="my-4 py-1 border-b font-bold">
              Ringkasan Belanja
            </h5>
            <div class="flex justify-between text-secondary font-thin">
              <h4>Total Harga</h4>
              <p>Rp11.000.000</p>
            </div>
            <div class="flex justify-between text-secondary font-thin">
              <h4>Total Diskon</h4>
              <p>Rp11.000.000</p>
            </div>
            <div class="flex justify-between py-4 font-bold my-2 border-t">
              <h4>Total Harga</h4>
              <p>Rp11.000.000</p>
            </div>
            <button class="w-full bg-primary py-3 font-bold text-2xl rounded-lg text-white">
              Beli
            </button>
          </div>
        </div>
        <div class="flex absolute lg:static w-full top-0 justify-between py-4 px-2 bg-primary lg:bg-white lg:border-b lg:border-secondary">
          <div class="flex space-x-2 items-center font-bold lg:text-2xl">
            <span class="flex lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <h5>Keranjang</h5>
          </div>
          <div class="flex lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="px-2 py-2 mt-14 lg:mt-0 border-b border-cloudy w-full">
          <div class="flex space-x-4">
            <img
              src="../../assets/img/product/product1.jpg"
              alt="Product Image"
              class="w-[25%] h-28 lg:h-44 inline"
            >
            <div>
              <h5 class="line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nihil consequatur, maxime est aspernatur cumque sed voluptatum doloremque quis! Ipsum?
              </h5>
              <h4 class="font-bold text-warning">
                Rp 11.000.000
              </h4>
              <p class="text-sm text-secondary line-through">
                Rp 100.000
              </p>
            </div>
          </div>
          <div class="flex justify-end">
            <form class="flex items-center space-x-1">
              <button class="text-danger py-1 px-2 mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <button class="px-3 py-1 rounded-lg bg-primary text-white text-xl font-bold flex items-center justify-center w-10">
                -
              </button>
              <input
                type="text"
                class="px-2 py-1 font-bold border-b border-secondary text-center w-20 focus:outline-none focus:border-primary"
              >
              <button class="px-3 py-1 rounded-lg bg-primary text-white text-xl font-bold flex items-center justify-center w-10">
                +
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 bg-white py-2 w-full flex lg:hidden container border-t border-cloudy justify-between max-w-screen-xl shadow-sm">
      <div class="flex py-2 justify-between w-full px-2 items-center">
        <div>
          <p class="font-thin text-secondary">
            Total Harga :
          </p>
          <h5 class="font-bold text-md">
            Rp11.000.000
          </h5>
        </div>
        <div class="flex space-x-4">
          <button class="px-16 py-2 bg-primary rounded-lg font-bold text-lg text-white">
            Beli
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
