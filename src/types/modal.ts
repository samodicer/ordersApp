import type { Component } from 'vue'

export enum OrderModalVariant {
  CREATE,
  UPDATE
}

/* ACTIVE MODAL IN STORE */
export interface ActiveModal {
  component: Component | null
  props: Record<string, any>
}
