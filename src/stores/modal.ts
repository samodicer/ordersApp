import { markRaw, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ActiveModal } from '@/types/modal'

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
