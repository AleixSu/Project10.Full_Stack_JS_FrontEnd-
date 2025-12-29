import { API } from '../api/api'
import { loadingEvents } from './loadingCards'
import { renderEvents } from './renderEvents'

export const filtersChecked = []

export const searchEngine = (searchBox, container, events) => {
  const input = searchBox.querySelector('input')

  input.addEventListener('input', () => {
    const term = input.value.toLowerCase()

    const filtered = events.filter((ev) =>
      ev.eventName.toLowerCase().includes(term)
    )

    container.innerHTML = ''
    renderEvents(container, filtered)
  })
}

export const filterEngine = async (e, container) => {
  container.innerHTML = ''

  filtersChecked.forEach((filterToCheck) => {
    if (filterToCheck.country === e.currentTarget.textContent) {
      filterToCheck.activated = !filterToCheck.activated
      e.currentTarget.classList.toggle('active')
    }
  })

  const eventsToRend = filtersChecked
    .filter((f) => f.activated) 
    .map((f) => f.country)

  loadingEvents(container)

  const eventsRes = await API({ endpoint: `/events` })
  const events = eventsRes.data

  const locationsId = []

  if (eventsToRend.length === 0) {
    renderEvents(container, events)
    return
  }

  for (const country of eventsToRend) {
    events.forEach((ev) => {
      if (ev.locationCountry.country === country) {
        locationsId.push(ev.locationCountry._id)
      }
    })
  }

  const filteredRes = await API({
    endpoint: `/events/location/${locationsId}`
  })

  const filtered = filteredRes.data

  container.innerHTML = ''
  renderEvents(container, filtered)
}
