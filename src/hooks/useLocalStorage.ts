import {
  LocalStorageKey,
  PickLocalStorageValueByKey,
} from '@/models/LocalStorage'
import { useCallback, useEffect, useState } from 'react'

type ClearFn = () => void

type UseLocalStorageReturnType<T extends LocalStorageKey> = [
  PickLocalStorageValueByKey<T> | null,
  React.Dispatch<React.SetStateAction<PickLocalStorageValueByKey<T> | null>>,
  ClearFn,
]

export const useLocalStorageState = <T extends LocalStorageKey>(
  STORAGE_KEY: T,
): UseLocalStorageReturnType<T> => {
  const [value, setValue] = useState<PickLocalStorageValueByKey<T> | null>(null)

  // Populate state due to NextJS lack of localStorage support
  useEffect(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY)

    setValue(!storedValue ? null : JSON.parse(storedValue))
  }, [STORAGE_KEY])

  // Sync with localStorage
  useEffect(() => {
    if (!value) {
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, [value, STORAGE_KEY])

  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
  }, [STORAGE_KEY])

  return [value, setValue, clearStorage]
}
