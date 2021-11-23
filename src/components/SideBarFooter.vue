<script>
export default {
  name: "SideBarFooter",
  props: {
    user: {
      type: Object,
      required: true,
    },
    closed: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <li class="relative list-none transition-all duration-[400ms] ease-out hover:bg-[#1d1b31]">
    <div
      :class="[
        'fixed bottom-0 flex items-center justify-between py-3 px-0 transition-all duration-500 ease-out',
        closed ? 'bg-none w-[78px]' : 'bg-[#1d1b31] w-[260px]',
      ]"
    >
      <div class="flex items-center">
        <img
          :src="user.image"
          alt="profileImg"
          :class="[
            'h-[52px] w-[52px] object-cover rounded-lg my-0 mr-3.5 ml-3 bg-[#1d1b31] transition-all duration-500 ease-out',
            closed ? 'p-2.5' : '',
          ]"
        />
      </div>
      <div>
        <div :class="['text-[#fff] text-lg font-medium whitespace-nowrap', closed ? 'hidden' : '']">
          {{ user.name }}
        </div>
        <div :class="['text-[#fff] text-xs font-medium whitespace-nowrap', closed ? 'hidden' : '']">
          {{ user.work }}
        </div>
      </div>
      <i
        :class="[
          'bx bx-log-out h-[50px] min-w-[78px] text-center leading-[50px] text-[#fff] text-xl cursor-pointer transition-all ease-out',
          closed ? 'hidden' : '',
        ]"
      ></i>
    </div>
  </li>
</template>
