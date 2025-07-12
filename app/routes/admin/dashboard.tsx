import React from 'react'
import { Header, StatsCard, TripCard } from '~/components'

const Dashboard = () => {
  const user = { name: 'AungChan' };
  const dashboardStats = {
    totalUsers: 12450,
    usersJoined: {
      currentMonth: 218,
      lastMonth: 176
    },
    totalTrips: 3103,
    tripsCreated: {
      currentMonth: 150,
      lastMonth: 432
    },
    userRole: {
      total: 59,
      currentMonth: 29,
      lastMonth: 30
    }

  }

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;
  return (
    <main className='dashboard wrapper'>
      <Header
        title={`Welcome ${user?.name ?? 'Guest'} 👋`}
        description="Track activity, trends and popular trips in real time"
      />
      <section className='flex flex-col gap-6'>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-3">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>

      <TripCard />
    </main>
  )
}

export default Dashboard