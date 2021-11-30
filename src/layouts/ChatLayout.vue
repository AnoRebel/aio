<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  MenuAlt2Icon,
  PlusSmIcon as PlusSmIconOutline,
} from "@heroicons/vue/outline";
import { SearchIcon } from "@heroicons/vue/solid";

import { SideUser } from "@/components";
import { emitter } from "@/utils";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];
const navigation = [
  { name: "Dashboard", icon: HomeIcon, current: true, href: "#" },
  {
    name: "Team",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Projects",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Documents",
    icon: InboxIcon,
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Reports",
    icon: ChartBarIcon,
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
];

export default {
  components: {
    SideUser,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    MenuAlt2Icon,
    PlusSmIconOutline,
    SearchIcon,
  },
  setup() {
    const toggleProfile = () => emitter.emit("toggle-profile-dialog", { show: true });
    return {
      toggleProfile,
      navigation,
      userNavigation,
    };
  },
};
</script>

<template>
  <div class="flex flex-row">
    <div
      class="
        flex flex-col
        w-74
        h-screen
        border-r border-gray-200
        pt-5
        pb-4
        bg-white
        overflow-y-auto
      "
    >
      <div class="flex items-center flex-shrink-0 px-4">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
          alt="Workflow"
        />
      </div>
      <div class="mt-5 flex-grow flex flex-col">
        <nav class="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
          <template v-for="item in navigation" :key="item.name">
            <div v-if="!item.children">
              <a
                href="#"
                :class="[
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </div>
            <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
              <DisclosureButton
                :class="[
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                ]"
              >
                <component
                  :is="item.icon"
                  class="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span class="flex-1">
                  {{ item.name }}
                </span>
                <svg
                  :class="[
                    open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                    'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                  ]"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                </svg>
              </DisclosureButton>
              <DisclosurePanel class="space-y-1">
                <DisclosureButton
                  v-for="subItem in item.children"
                  :key="subItem.name"
                  as="a"
                  :href="subItem.href"
                  class="
                    group
                    w-full
                    flex
                    items-center
                    pl-11
                    pr-2
                    py-2
                    text-sm
                    font-medium
                    text-gray-600
                    rounded-md
                    hover:text-gray-900 hover:bg-gray-50
                  "
                >
                  {{ subItem.name }}
                </DisclosureButton>
              </DisclosurePanel>
            </Disclosure>
          </template>
        </nav>
      </div>
    </div>
    <div class="h-screen flex flex-col flex-grow">
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
              <Menu as="div" class="relative flex-shrink-0">
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
              >
                <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
                <span class="sr-only">Add file</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <slot />
      <SideUser />
    </div>
  </div>
</template>
