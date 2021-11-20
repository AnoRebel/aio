<script>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

import SideBarLink from "@/components/SideBarLink.vue";
import SideBarFooter from "@/components/SideBarFooter.vue";

export default {
  name: "SideBarLayout",
  components: {
    SideBarLink,
    SideBarFooter,
  },
  setup() {
    const { t } = useI18n();
    const sidebar = reactive({
      close: true,
      showMenu: false,
    });
    const user = {
      image: "@/assets/logo.png",
      name: "Ano Rebel",
      work: "Dev",
    };
    const data = [
      {
        name: "Dashboard",
        href: "Home",
      },
      {
        name: "Category",
        href: "Home",
        sub_links: [
          {
            name: "Javascript",
            href: "Home",
          },
          {
            name: "HTML & CSS",
            href: "Home",
          },
          {
            name: "PHP & MySQL",
            href: "Home",
          },
        ],
      },
    ];
    return { t, sidebar, data, user };
  },
};
</script>

<template>
  <aside
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
          cursor-pointer
        "
        @click="sidebar.close = !sidebar.close"
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
      <SideBarLink :link="data[0]" :sidebar="sidebar" />
      <SideBarLink :blank="false" :link="data[1]" :sidebar="sidebar" />

      <SideBarFooter :closed="sidebar.close" :user="user" />
    </ul>
  </aside>
  <section
    :class="[
      'relative bg-[#e4e9f7] h-full transition-all duration-500 ease-out px-4 pb-4',
      sidebar.close ? 'left-[78px] w-[calc(100%-78px)]' : 'left-[260px] w-[calc(100%-260px)]',
    ]"
  >
    <div class="h-[60px] flex items-center">
      <i
        class="bx bx-menu text-[#11101d] text-4xl my-0 mx-[15px] cursor-pointer"
        @click="sidebar.close = !sidebar.close"
      ></i>
      <span class="text-[#11101d] text-2xl font-semibold">Drop Down Sidebar</span>
    </div>
    <div class="flex">
      <slot />
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
