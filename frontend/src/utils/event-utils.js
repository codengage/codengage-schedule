import PocketBase from 'pocketbase';


const pb = new PocketBase('http://127.0.0.1:8090');
 
export const records = await pb.collection('ReserveCalendar').getFullList({
  sort: 'created',
});