import PocketBase from 'pocketbase';

const pb = new PocketBase('http://192.168.1.184:8090');
 
export const records = await pb.collection('ReserveCalendar').getFullList({
  sort: 'start',
});
