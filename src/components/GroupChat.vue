<script>
import { GroupChatHeader } from "@/components";

export default {
  components: { GroupChatHeader },
  setup() {
    return {};
  },
};
</script>

<template>
  <!-- component -->
  <div class="font-sans antialiased w-full h-[90%] flex-1 flex flex-col">
    <!-- Top bar -->
    <!-- <GroupChatHeader /> -->
    <!-- Chat messages -->
    <div class="w-full px-6 py-4 flex-1 overflow-y-scroll">
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Steve Schoger</span>
            <span class="text-grey text-xs">11:46</span>
          </div>
          <p class="text-black leading-normal">The slack from the other side.</p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Adam Wathan</span>
            <span class="text-grey text-xs">12:45</span>
          </div>
          <p class="text-black leading-normal">
            How are we supposed to control the marquee space without an utility for it? I propose
            this:
          </p>
          <div
            class="
              bg-grey-lighter
              border border-grey-light
              text-grey-darkest text-sm
              font-mono
              rounded
              p-3
              mt-2
              whitespace-pre
              overflow-scroll
            "
          >
            .marquee-lightspeed { -webkit-marquee-speed: fast; } .marquee-lightspeeder {
            -webkit-marquee-speed: faster; }
          </div>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">David Hemphill</span>
            <span class="text-grey text-xs">12:46</span>
          </div>
          <p class="text-black leading-normal">
            <a href="#" class="inline-block bg-blue-300 text-blue-600 no-underline">@Adam Wathan</a>
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it's too late!
          </p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Steve Schoger</span>
            <span class="text-grey text-xs">11:46</span>
          </div>
          <p class="text-black leading-normal">The slack from the other side.</p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Adam Wathan</span>
            <span class="text-grey text-xs">12:45</span>
          </div>
          <p class="text-black leading-normal">
            How are we supposed to control the marquee space without an utility for it? I propose
            this:
          </p>
          <div
            class="
              bg-grey-lighter
              border border-grey-light
              text-grey-darkest text-sm
              font-mono
              rounded
              p-3
              mt-2
              whitespace-pre
              overflow-scroll
            "
          >
            .marquee-lightspeed { -webkit-marquee-speed: fast; } .marquee-lightspeeder {
            -webkit-marquee-speed: faster; }
          </div>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">David Hemphill</span>
            <span class="text-grey text-xs">12:46</span>
          </div>
          <p class="text-black leading-normal">
            <a href="#" class="inline-block bg-blue-300 text-blue-600 no-underline">@Adam Wathan</a>
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it's too late!
          </p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Steve Schoger</span>
            <span class="text-grey text-xs">11:46</span>
          </div>
          <p class="text-black leading-normal">The slack from the other side.</p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Adam Wathan</span>
            <span class="text-grey text-xs">12:45</span>
          </div>
          <p class="text-black leading-normal">
            How are we supposed to control the marquee space without an utility for it? I propose
            this:
          </p>
          <div
            class="
              bg-grey-lighter
              border border-grey-light
              text-grey-darkest text-sm
              font-mono
              rounded
              p-3
              mt-2
              whitespace-pre
              overflow-scroll
            "
          >
            .marquee-lightspeed { -webkit-marquee-speed: fast; } .marquee-lightspeeder {
            -webkit-marquee-speed: faster; }
          </div>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">David Hemphill</span>
            <span class="text-grey text-xs">12:46</span>
          </div>
          <p class="text-black leading-normal">
            <a href="#" class="inline-block bg-blue-300 text-blue-600 no-underline">@Adam Wathan</a>
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it's too late!
          </p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Steve Schoger</span>
            <span class="text-grey text-xs">11:46</span>
          </div>
          <p class="text-black leading-normal">The slack from the other side.</p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Adam Wathan</span>
            <span class="text-grey text-xs">12:45</span>
          </div>
          <p class="text-black leading-normal">
            How are we supposed to control the marquee space without an utility for it? I propose
            this:
          </p>
          <div
            class="
              bg-grey-lighter
              border border-grey-light
              text-grey-darkest text-sm
              font-mono
              rounded
              p-3
              mt-2
              whitespace-pre
              overflow-scroll
            "
          >
            .marquee-lightspeed { -webkit-marquee-speed: fast; } .marquee-lightspeeder {
            -webkit-marquee-speed: faster; }
          </div>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">David Hemphill</span>
            <span class="text-grey text-xs">12:46</span>
          </div>
          <p class="text-black leading-normal">
            <a href="#" class="inline-block bg-blue-300 text-blue-600 no-underline">@Adam Wathan</a>
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it's too late!
          </p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Steve Schoger</span>
            <span class="text-grey text-xs">11:46</span>
          </div>
          <p class="text-black leading-normal">The slack from the other side.</p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Adam Wathan</span>
            <span class="text-grey text-xs">12:45</span>
          </div>
          <p class="text-black leading-normal">
            How are we supposed to control the marquee space without an utility for it? I propose
            this:
          </p>
          <div
            class="
              bg-grey-lighter
              border border-grey-light
              text-grey-darkest text-sm
              font-mono
              rounded
              p-3
              mt-2
              whitespace-pre
              overflow-scroll
            "
          >
            .marquee-lightspeed { -webkit-marquee-speed: fast; } .marquee-lightspeeder {
            -webkit-marquee-speed: faster; }
          </div>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">David Hemphill</span>
            <span class="text-grey text-xs">12:46</span>
          </div>
          <p class="text-black leading-normal">
            <a href="#" class="inline-block bg-blue-300 text-blue-600 no-underline">@Adam Wathan</a>
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it's too late!
          </p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Steve Schoger</span>
            <span class="text-grey text-xs">11:46</span>
          </div>
          <p class="text-black leading-normal">The slack from the other side.</p>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">Adam Wathan</span>
            <span class="text-grey text-xs">12:45</span>
          </div>
          <p class="text-black leading-normal">
            How are we supposed to control the marquee space without an utility for it? I propose
            this:
          </p>
          <div
            class="
              bg-grey-lighter
              border border-grey-light
              text-grey-darkest text-sm
              font-mono
              rounded
              p-3
              mt-2
              whitespace-pre
              overflow-scroll
            "
          >
            .marquee-lightspeed { -webkit-marquee-speed: fast; } .marquee-lightspeeder {
            -webkit-marquee-speed: faster; }
          </div>
        </div>
      </div>
      <!-- A message -->
      <div class="flex items-start mb-4 text-sm">
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          class="w-10 h-10 rounded mr-3"
        />
        <div class="flex-1 overflow-hidden">
          <div>
            <span class="font-bold">David Hemphill</span>
            <span class="text-grey text-xs">12:46</span>
          </div>
          <p class="text-black leading-normal">
            <a href="#" class="inline-block bg-blue-300 text-blue-600 no-underline">@Adam Wathan</a>
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it's too late!
          </p>
        </div>
      </div>
    </div>
    <footer class="px-4 pt-3 pb-2">
      <div class="relative flex">
        <span class="absolute inset-y-0 flex items-center">
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-12
              w-12
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
        </span>
        <input
          type="text"
          placeholder="Write Something"
          class="
            w-full
            focus:(outline-none
            ring-0
            border-0
            placeholder-gray-400)
            text-gray-600
            placeholder-gray-600
            pl-12
            bg-gray-200
            rounded-full
            py-2
          "
        />
        <div class="absolute right-[1px] items-center inset-y-0 hidden sm:flex">
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="
              relative
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-gray-500
              hover:bg-gray-300
              focus:outline-none
            "
            @click="openEmoji"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <EmojiPicker @emoji-selected="setEmoji" />
          </button>
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-10
              w-10
              transition
              duration-500
              ease-in-out
              text-white
              bg-blue-500
              hover:bg-blue-400
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-6 w-6 transform rotate-90"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </footer>
    <!-- <div class="pb-4 px-4 flex-none">
      <div class="flex rounded-lg border-2 border-grey overflow-hidden">
        <span class="text-3xl text-grey border-r-2 border-grey p-2">
          <svg
            class="fill-current h-6 w-6 block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
            />
          </svg>
        </span>
        <input type="text" class="w-full px-4" placeholder="Message #general" />
      </div>
    </div> -->
  </div>
</template>
