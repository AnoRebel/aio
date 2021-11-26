<script>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/vue/outline";
import { SearchIcon } from "@heroicons/vue/solid";

import { SideBarLink, SideBarFooter, SideUser, SideAddProject } from "@/components";
import { emitter } from "@/utils";

export default {
  name: "SideBarLayout",
  components: {
    PlusSmIconOutline,
    SearchIcon,
    SideBarLink,
    SideBarFooter,
    SideUser,
    SideAddProject,
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
    const toggleProfile = () => emitter.emit("toggle-profile-dialog", { show: true });
    const addProject = () => emitter.emit("side-add-project", { show: true });
    return { t, sidebar, data, user, toggleProfile, addProject };
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
    <!-- <div class="h-[60px] flex items-center">
      <i
        class="bx bx-menu text-[#11101d] text-4xl my-0 mx-[15px] cursor-pointer"
        @click="sidebar.close = !sidebar.close"
      ></i>
      <span class="text-[#11101d] text-2xl font-semibold">Drop Down Sidebar</span>
    </div> -->
    <div class="flex">
      <header class="w-full">
        <div
          class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex"
        >
          <div class="flex-1 flex justify-between px-4 sm:px-6">
            <div class="flex-1 flex">
              <form class="w-full flex md:ml-0" action="#" method="GET">
                <label for="desktop-search-field" class="sr-only">Search all files</label>
                <label for="mobile-search-field" class="sr-only">Search all files</label>
                <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <SearchIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    name="mobile-search-field"
                    id="mobile-search-field"
                    class="
                      h-full
                      w-full
                      border-transparent
                      py-2
                      pl-8
                      pr-3
                      text-base text-gray-900
                      placeholder-gray-500
                      focus:outline-none
                      focus:ring-0
                      focus:border-transparent
                      focus:placeholder-gray-400
                      sm:hidden
                    "
                    placeholder="Search"
                    type="search"
                  />
                  <input
                    name="desktop-search-field"
                    id="desktop-search-field"
                    class="
                      hidden
                      h-full
                      w-full
                      border-transparent
                      py-2
                      pl-8
                      pr-3
                      text-base text-gray-900
                      placeholder-gray-500
                      focus:outline-none
                      focus:ring-0
                      focus:border-transparent
                      focus:placeholder-gray-400
                      sm:block
                    "
                    placeholder="Search all files"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div class="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative flex-shrink-0 cursor-pointer">
                <MenuButton
                  class="
                    bg-white
                    rounded-full
                    flex
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  "
                  @click="toggleProfile"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </Menu>

              <button
                type="button"
                class="
                  flex
                  bg-indigo-600
                  p-1
                  rounded-full
                  items-center
                  justify-center
                  text-white
                  hover:bg-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
                @click="addProject"
              >
                <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
                <span class="sr-only">Add Project</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <slot />
      <SideAddProject />
      <SideUser />
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
