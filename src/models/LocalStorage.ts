import { Cart } from './Cart'

export enum LocalStorageKey {
  Cart = '@ignite-shop/cart',
}

export interface LocalStorageMapKeyValue
  extends Record<LocalStorageKey, unknown> {
  [LocalStorageKey.Cart]: Cart
}

export type PickLocalStorageValueByKey<T extends LocalStorageKey> =
  LocalStorageMapKeyValue[T]
