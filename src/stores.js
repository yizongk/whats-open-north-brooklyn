import { writable } from 'svelte/store'

export const data =  writable(null)
export const details = writable(null)
export const mapView = writable(null)
export const filters = writable([]) // array of functions
