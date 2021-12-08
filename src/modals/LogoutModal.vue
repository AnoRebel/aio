<template>
  <!-- Modal User -->
  <BaseCenterModal @close="$emit('close')">
    <div class="row">
      <form @submit.prevent="logout">
        <div class="form-horizontal bg-light border rounded">
          <div class="form-group">
            <label for="checkme" class="col-lg-2 control-label"></label>
            <div class="">
              <div class="row">
                <h1 class="text-center mb-2 text-danger" style="font-size: 63px !important">
                  <i class="bx bx-log-in"></i>
                </h1>
                <br />
                <div class="row d-flex align-items-center ms-3 me-2">
                  <div class="mb-4 mt-3 text-center">Do you really want to logout?</div>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-center mb-5">
                    <button class="btn btn-dark px-4" type="button" @click="$emit('close')">
                      Back
                    </button>
                    <button class="btn btn-danger px-4" type="submit">Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </BaseCenterModal>
</template>

<script>
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
// import { useAuthStore } from "@/store";

import BaseCenterModal from "@/components/BaseCenterModal.vue";

export default {
  name: "LogoutModal",
  components: {
    BaseCenterModal,
  },
  emits: ["beforemount", "close", "beforeunmount"],
  setup(_, { emit }) {
    onBeforeMount(() => {
      emit("beforemount");
    });

    // const authStore = useAuthStore();
    // const router = useRouter();
    // const logout = () => {
    //   store.dispatch("logout").then(() => {
    //     emit("close");
    //     router.push({ name: "Home", replace: true });
    //   });
    // };

    onBeforeUnmount(() => {
      emit("beforeunmount");
    });

    return { logout };
  },
};
</script>
