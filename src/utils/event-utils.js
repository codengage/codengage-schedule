
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Sala 1',
    start: todayStr,
    resourceId: 'a',
    backgroundColor: '#335536',
    borderColor: '#335536',
  },
  {
    id: createEventId(),
    title: 'Sala 2',
    start: todayStr + 'T12:00:00',
    resourceId: 'b',
    backgroundColor: '#553352',
    borderColor: '##553352',
  }
]

export function createEventId() {
  return String(eventGuid++)
}