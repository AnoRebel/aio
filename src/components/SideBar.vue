<script>
import { onMounted, ref, reactive } from "vue";

export default {
  name: "SideBar",
  setup() {
    const sidebar = reactive({
      close: true,
      blank: true,
      showMenu: false,
    });
    onMounted(() => {
      // let arrow = document.querySelectorAll(".arrow");
      // for (let i = 0; i < arrow.length; i++) {
      //   arrow[i].addEventListener("click", e => {
      //     let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
      //     console.log(arrowParent);
      //   });
      // }
    });
    return { sidebar };
  },
};
</script>

<template>
  <div
    :class="[
      'bg-[#11101d] fixed top-0 left-0 h-full z-[100] transition-all duration-500 ease-out',
      sidebar.close ? 'w-[78px]' : 'w-[260px]',
    ]"
  >
    <div class="h-[60px] w-full flex items-center">
      <i
        class="
          bx
          bxl-c-plus-plus
          text-[#fff] text-3xl
          h-[50px]
          min-w-[78px]
          text-center
          leading-[50px]
        "
      ></i>
      <span
        :class="[
          'text-[#fff] text-xl font-semibold transition-all ease-out',
          sidebar.close ? 'delay-[0s] opacity-0 pointer-events-none' : 'delay-100',
        ]"
        >CodingLab</span
      >
    </div>
    <ul
      :class="[
        'nav-links h-full pt-[30px] pb-[150px]',
        sidebar.close ? 'overflow-visible' : 'overflow-auto',
      ]"
    >
      <li class="group relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
        <router-link to="#" class="flex items-center no-underline">
          <i
            class="
              bx bx-grid-alt
              h-[50px]
              min-w-[78px]
              text-center
              leading-[50px]
              text-[#fff] text-xl
              cursor-pointer
              transition-all
              ease-out
            "
          ></i>
          <span
            :class="[
              'text-lg font-normal text-[#fff] transition-all ease-out',
              sidebar.close ? 'opacity-0 pointer-events-none' : '',
            ]"
            >Dashboard</span
          >
        </router-link>
        <ul
          :class="[
            'bg-[#1d1b31] pt-[3px] pr-5 pb-1.5 pl-4 opacity-0 pointer-events-none',
            sidebar.close
              ? 'absolute left-full -top-[10px] mt-0 py-2.5 px-5 rounded-r-lg !block duration-[0s] delay-[0s] group-hover:(top-1.5 -translate-y-2/4 opacity-100 pointer-events-auto transition-all duration-[400ms] ease-out) sxm:hidden'
              : '-mt-2.5 hidden',
            sidebar.showMenu ? 'block' : 'hidden',
          ]"
        >
          <li
            class="relative list-none transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]"
          >
            <router-link
              :class="[
                'link_name text-base py-[5px] px-0 whitespace-nowrap opacity-60 hover:opacity-100 transition-all duration-300 ease-out',
                sidebar.close ? 'text-lg opacity-100 block' : 'hidden',
              ]"
              to="#"
              >Dashboard</router-link
            >
          </li>
        </ul>
      </li>
      <li class="group relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
        <div :class="['items-center content-between', sidebar.close ? 'block' : 'flex']">
          <router-link to="#" class="flex items-center no-underline">
            <i
              class="
                bx bx-collection
                h-[50px]
                min-w-[78px]
                text-[#fff] text-center
                leading-[50px]
                text-xl
                cursor-pointer
                transition-all
                ease-out
              "
            ></i>
            <span
              :class="[
                'text-lg font-normal text-[#fff] transition-all ease-out',
                sidebar.close ? 'opacity-0 pointer-events-none' : '',
              ]"
              >Category</span
            >
          </router-link>
          <i
            :class="[
              'bx bxs-chevron-down arrow h-[50px] min-w-[78px] text-center leading-[50px] text-[#fff] text-xl cursor-pointer transition-all ease-out transform',
              sidebar.close ? 'hidden' : '',
              sidebar.showMenu ? '-rotate-180' : '',
            ]"
            @click="sidebar.showMenu = !sidebar.showMenu"
          ></i>
        </div>
        <ul
          :class="[
            'bg-[#1d1b31] pt-[3px] pr-5 pb-1.5 pl-4',
            sidebar.close
              ? 'absolute left-full -top-[10px] mt-0 py-2.5 px-5 rounded-r-lg opacity-0 !block pointer-events-none duration-[0s] delay-[0s] group-hover:(top-0 opacity-100 pointer-events-auto transition-all duration-[400ms] ease-out) sxm:hidden'
              : 'pt-3.5 pr-1.5 pb-1.5 pl-20 -m-2.5 -mt-2.5',
            sidebar.showMenu ? 'block' : 'hidden',
          ]"
        >
          <li class="relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
            <router-link
              :class="[
                'text-[#fff] text-base py-[5px] px-0 whitespace-nowrap opacity-60 hover:opacity-100 transition-all duration-300 ease-out',
                sidebar.close ? 'text-lg opacity-100 block' : 'hidden',
              ]"
              to="#"
              >Category</router-link
            >
          </li>
          <li class="relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
            <router-link
              class="
                text-[#fff] text-base
                py-[5px]
                px-0
                whitespace-nowrap
                opacity-60
                hover:opacity-100
                transition-all
                duration-300
                ease-out
              "
              :class="{ 'text-lg opacity-100': sidebar.close }"
              to="#"
              >HTML & CSS</router-link
            >
          </li>
          <li class="relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
            <router-link
              class="
                text-[#fff] text-base
                py-[5px]
                px-0
                whitespace-nowrap
                opacity-60
                hover:opacity-100
                transition-all
                duration-300
                ease-out
              "
              :class="{ 'text-lg opacity-100': sidebar.close }"
              to="#"
              >JavaScript</router-link
            >
          </li>
          <li class="relative transition-all duration-[400ms] ease-out hover">
            <router-link
              class="
                text-[#fff] text-base
                py-[5px]
                px-0
                whitespace-nowrap
                opacity-60
                hover:opacity-100
                transition-all
                duration-300
                ease-out
              "
              :class="{ 'text-lg opacity-100': sidebar.close }"
              to="#"
              >PHP & MySQL</router-link
            >
          </li>
        </ul>
      </li>

      <li class="relative list-none transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
        <div
          :class="[
            'fixed bottom-0 flex items-center justify-between py-3 px-0 transition-all duration-500 ease-out',
            sidebar.close ? 'bg-none hidden w-[78px]' : 'bg-[#1d1b31] w-[260px]',
          ]"
        >
          <div class="flex items-center">
            <img
              src="@/assets/logo.png"
              alt="profileImg"
              :class="[
                'h-[52px] w-[52px] object-cover rounded-lg my-0 mr-3.5 ml-3 bg-[#1d1b31] transition-all duration-500 ease-out',
                sidebar.close ? 'p-2.5' : '',
              ]"
            />
          </div>
          <div>
            <div
              :class="[
                'text-[#fff] text-lg font-medium whitespace-nowrap',
                sidebar.close ? 'hidden' : '',
              ]"
            >
              Prem Shahi
            </div>
            <div
              :class="[
                'text-[#fff] text-xs font-medium whitespace-nowrap',
                sidebar.close ? 'hidden' : '',
              ]"
            >
              Web Desginer
            </div>
          </div>
          <i
            :class="[
              'bx bx-log-out h-[50px] min-w-[78px] text-center leading-[50px] text-[#fff] text-xl cursor-pointer transition-all ease-out',
              sidebar.close ? 'hidden' : '',
            ]"
          ></i>
        </div>
      </li>
    </ul>
  </div>
  <section
    :class="[
      'relative bg-[#e4e9f7] h-screen transition-all duration-500 ease-out',
      sidebar.close ? 'left-[78px] w-[calc(100% - 78px)]' : 'left-[260px] w-[calc(100% - 260px)]',
    ]"
  >
    <div class="h-[60px] flex items-center">
      <i
        class="bx bx-menu text-[#11101d] text-4xl my-0 mx-[15px] cursor-pointer"
        @click="sidebar.close = !sidebar.close"
      ></i>
      <span class="text-[#11101d] text-2xl font-semibold">Drop Down Sidebar</span>
    </div>
  </section>
</template>

<style lang="scss">
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

.nav-links::-webkit-scrollbar {
  display: none;
}
</style>
