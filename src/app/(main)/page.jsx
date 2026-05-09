
import { redirect } from 'next/navigation';

const id = '01';
const Home = () => {
  redirect(`/category/${id}`)
}
export default Home;
