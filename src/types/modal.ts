import type { Component } from 'vue'

export enum ModalVariant {
  CREATE,
  UPDATE
}

/* ACTIVE MODAL IN STORE */
export interface ActiveModal {
  component: Component | null
  props: Record<string, any>
}
