<script setup>
import listMenu from "@/components/layouts/Sidebar/menu";
import { mdiChevronRight } from "@mdi/js";
//store

//composable

//state

//methods
</script>
<template>
  <div
    class="tw-h-screen tw-max-w-[232px] tw-bg-white tw-rounded-r-2xl tw-shadow-[4px_0px_50px_0px_rgba(0,0,0,0.15)] tw-relative tw-w-full tw-ease-in tw-duration-150"
  >
    <ul
      class="tw-my-5 tw-px-2 menu-nav tw-overflow-y-auto tw-max-h-[calc(100vh-252px)]"
    >
      <li v-for="item in listMenu" class="tw-flex tw-items-center">
        <SMenu
          :triggers="['click', 'hover']"
          class="tw-w-full"
          :distance="18"
          placement="right-center"
          :delay="{ show: 100, hide: 200 }"
        >
          <nuxt-link
            class="tw-flex tw-items-center tw-w-full tw-p-3 tw-rounded-[10px]"
            :class="[$route.path === item.path ? 'tw-bg-[#eeeeee]' : '']"
            :to="item.path"
          >
            <div class="tw-shrink-0">
              <component :is="item.icon" />
            </div>
            <span
              class="tw-ml-2 tw-duration-100 tw-ease-in tw-whitespace-nowrap"
              :class="[toggleMenu ? 'tw-w-0 tw-hidden' : 'tw-w-full tw-inline']"
            >
              {{ item.text }}
              <span v-if="item.subMenu">
                <v-icon
                  color="#828282"
                  size="18"
                  :icon="mdiChevronRight"
                ></v-icon>
              </span>
            </span>
          </nuxt-link>
          <template #popper>
            <ul class="tw-px-4 tw-py-1" v-for="(subMenu, idx) in item.subMenu">
              <li :key="idx">
                <nuxt-link
                  class="tw-flex tw-items-center tw-w-full tw-py-2 tw-rounded-2xl"
                  :class="[
                    $route.path === subMenu.path
                      ? 'tw-text-primary'
                      : 'tw-text-[#828282]',
                  ]"
                  :to="subMenu.path"
                >
                  <span class="tw-px-2">
                    {{ subMenu.text }}
                  </span>
                </nuxt-link>
              </li>
            </ul>
          </template>
        </SMenu>
      </li>
      <hr />
      <li
        class="tw-flex tw-items-center tw-w-full tw-p-3 tw-rounded-[10px] tw-cursor-pointer"
        @click="handleLogout"
      >
        Đăng xuất
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.v-popper--theme-menu .v-popper__inner {
  border: none;
}

.dark .v-popper--theme-menu .v-popper__inner {
  background: transparent;
  border: 1px solid #474747;
}

.v-popper__arrow-container {
  display: none;
}

.menu-profile-wrapper {
  width: 232px;
  height: 232px;
  position: relative;
}

.menu-profile-wrapper-bg {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );

  &:hover {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.45) 77.08%
      ),
      linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
  }
}

.menu-nav li a:hover {
  background: var(
    --global-hover,
    linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.16) 100%),
    rgba(214, 214, 214, 0.25)
  );
  background-blend-mode: overlay, normal;
  border-radius: 10px;
}
</style>
