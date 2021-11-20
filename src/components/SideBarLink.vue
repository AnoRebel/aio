<script>
import { AppLink } from "@/components";
// import { emitter } from "@/utils";

export default {
  name: "SideBarLink",
  components: { AppLink },
  props: {
    blank: {
      type: Boolean,
      default: true,
    },
    link: {
      type: Object,
      required: true,
    },
    sidebar: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <li
    v-if="blank"
    class="group relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]"
  >
    <app-link :to="{ name: link.href }" class="flex items-center no-underline">
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
        >{{ link.name }}</span
      >
    </app-link>
    <ul
      :class="[
        'bg-[#1d1b31] pt-[3px] pr-5 pb-1.5 pl-4 opacity-0 pointer-events-none',
        sidebar.close
          ? 'absolute left-full -top-[10px] mt-0 py-2.5 px-5 rounded-r-lg !block duration-[0s] delay-[0s] group-hover:(top-1.5 -translate-y-2/4 opacity-100 pointer-events-auto transition-all duration-[400ms] ease-out) sxm:hidden'
          : '-mt-2.5 hidden',
        sidebar.showMenu ? 'block' : 'hidden',
      ]"
    >
      <li class="relative list-none transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
        <app-link
          :class="[
            'link_name text-base py-[5px] px-0 whitespace-nowrap opacity-60 hover:opacity-100 transition-all duration-300 ease-out',
            sidebar.close ? 'text-lg opacity-100 block' : 'hidden',
          ]"
          :to="{ name: link.href }"
        >
          {{ link.name }}
        </app-link>
      </li>
    </ul>
  </li>
  <li v-else class="group relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
    <div :class="['items-center content-between', sidebar.close ? 'block' : 'flex']">
      <app-link :to="{ name: link.href }" class="flex items-center no-underline">
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
          >{{ link.name }}</span
        >
      </app-link>
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
        <app-link
          :class="[
            'text-[#fff] text-base py-[5px] px-0 whitespace-nowrap opacity-60 hover:opacity-100 transition-all duration-300 ease-out',
            sidebar.close ? 'text-lg opacity-100 block' : 'hidden',
          ]"
          :to="{ name: link.href }"
        >
          {{ link.name }}
        </app-link>
      </li>
      <li
        v-for="(lnk, index) in link.sub_links"
        :key="index"
        class="relative transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]"
      >
        <app-link
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
          :to="{ name: lnk.href }"
        >
          {{ lnk.name }}
        </app-link>
      </li>
    </ul>
  </li>
</template>
