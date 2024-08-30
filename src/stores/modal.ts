import { markRaw, ref, type Component } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

interface ActiveModal {
  component: Component | null
  props: Record<string, any>
}

export const useModalStore = defineStore('modal', () => {
  const activeModal = ref<ActiveModal>({
    component: null,
    props: {}
  })

  function open(modalData: ActiveModal) {
    activeModal.value = {
      component: modalData.component ? markRaw(modalData.component) : null,
      props: modalData.props
    }
  }

  function close() {
    activeModal.value = {
      component: null,
      props: {}
    }
  }

  return {
    activeModal,
    open,
    close
  }
})
