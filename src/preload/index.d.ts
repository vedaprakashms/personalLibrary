import { ElectronAPI } from '@electron-toolkit/preload'
import { books } from './api/addbook'
import { api } from './index'
declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
    books: typeof books
  }
}
