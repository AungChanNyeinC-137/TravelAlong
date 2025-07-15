import React from 'react'
import { Outlet, redirect } from 'react-router'
import { Navitems, MobileSidebar } from '../../components'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'
import { account } from '~/appwrite/client';
import { getExistingUser, storeUserData } from '~/appwrite/auth';
export async function clientLoader() {
  try {
    const user = await account.get();
    console.log('User Authentication Check: ',user)

    if (!user.$id) return redirect('/signIn');
    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status === 'user') {
      return redirect('/')
    }
    return existingUser?.$id ? existingUser : await storeUserData();

  } catch (error) {
    console.log('Error in clientLoader', error);
    return redirect('/signIn');
  }
}
const adminLayout = () => {
  return (
    <div className='admin-layout'><MobileSidebar />
      <aside className='w-full max-w-[270px] hidden lg:block'>
        <SidebarComponent width={270} enableGestures={false}>
          <Navitems />
        </SidebarComponent>
      </aside>
      <aside className='children'>
        <Outlet />
      </aside>
    </div>
  )
}

export default adminLayout