import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import BarberClient from './BarberClient';

export const metadata = {
  title: 'Barber Shop – SonBarber',
  description: 'Dịch vụ cắt tóc nam, combo chăm sóc, sản phẩm tóc chính hãng tại SonBarber.',
};

async function getServiceGroups() {
  const { data } = await supabase
    .from('service_groups')
    .select('*, services(*)')
    .order('display_order');

  if (data) {
    data.forEach(group => {
      group.services?.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order);
    });
  }
  return data || [];
}

async function getProductGroups() {
  const { data } = await supabase
    .from('product_groups')
    .select('*, products(*)')
    .order('display_order');

  if (data) {
    data.forEach(group => {
      group.products?.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order);
    });
  }
  return data || [];
}

async function getBranches() {
  const { data } = await supabase.from('branches').select('*').order('created_at');
  return data || [];
}

async function getServicesForBooking() {
  const { data } = await supabase.from('services').select('id, name, price_min').order('display_order');
  return data || [];
}

export default async function BarberPage() {
  const [serviceGroups, productGroups, branches, services] = await Promise.all([
    getServiceGroups(),
    getProductGroups(),
    getBranches(),
    getServicesForBooking(),
  ]);

  return (
    <>
      <Navbar />
      <BarberClient
        serviceGroups={serviceGroups}
        productGroups={productGroups}
        branches={branches}
        services={services}
      />
      <Footer />
    </>
  );
}
