import { TourShow } from '../types';

export const tourShows: TourShow[] = [
  // Upcoming shows
  {
    id: 'berlin-2024-12',
    date: '2024-12-15',
    city: 'Berlin',
    venue: 'Berghain',
    country: 'Germany',
    ticketUrl: 'https://ra.co/events/1234567',
    status: 'upcoming'
  },
  {
    id: 'amsterdam-2024-12',
    date: '2024-12-22',
    city: 'Amsterdam',
    venue: 'Warehouse Elementenstraat',
    country: 'Netherlands',
    ticketUrl: 'https://partyflock.nl/party/123456',
    status: 'upcoming'
  },
  {
    id: 'london-2025-01',
    date: '2025-01-05',
    city: 'London',
    venue: 'Fabric',
    country: 'United Kingdom',
    ticketUrl: 'https://fabriclondon.com/events/dj-joel',
    status: 'upcoming'
  },
  {
    id: 'barcelona-2025-01',
    date: '2025-01-12',
    city: 'Barcelona',
    venue: 'Razzmatazz',
    country: 'Spain',
    ticketUrl: 'https://salarazzmatazz.com/events/dj-joel',
    status: 'upcoming'
  },
  {
    id: 'ibiza-2025-02',
    date: '2025-02-14',
    city: 'Ibiza',
    venue: 'Amnesia',
    country: 'Spain',
    ticketUrl: 'https://amnesia.es/events/dj-joel-valentines',
    status: 'upcoming'
  },
  {
    id: 'miami-2025-03',
    date: '2025-03-21',
    city: 'Miami',
    venue: 'E11EVEN',
    country: 'United States',
    ticketUrl: 'https://11miami.com/events/dj-joel',
    status: 'upcoming'
  },
  
  // Past shows
  {
    id: 'detroit-2024-10',
    date: '2024-10-15',
    city: 'Detroit',
    venue: 'Movement Festival',
    country: 'United States',
    status: 'past'
  },
  {
    id: 'tokyo-2024-09',
    date: '2024-09-28',
    city: 'Tokyo',
    venue: 'Womb',
    country: 'Japan',
    status: 'past'
  },
  {
    id: 'montreal-2024-08',
    date: '2024-08-17',
    city: 'Montreal',
    venue: 'Stereo Nightclub',
    country: 'Canada',
    status: 'past'
  },
  {
    id: 'prague-2024-07',
    date: '2024-07-20',
    city: 'Prague',
    venue: 'Karlovy Lazne',
    country: 'Czech Republic',
    status: 'past'
  },
  {
    id: 'tulum-2024-06',
    date: '2024-06-08',
    city: 'Tulum',
    venue: 'Zamna Festival',
    country: 'Mexico',
    status: 'past'
  },
  {
    id: 'sydney-2024-05',
    date: '2024-05-25',
    city: 'Sydney',
    venue: 'Chinese Laundry',
    country: 'Australia',
    status: 'past'
  }
];

export const upcomingShows = tourShows.filter(show => show.status === 'upcoming');
export const pastShows = tourShows.filter(show => show.status === 'past');