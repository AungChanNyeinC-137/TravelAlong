import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route('signIn', 'routes/root/signIn.tsx'),

    layout("routes/admin/adminLayout.tsx", [
        route('dashboard', 'routes/admin/dashboard.tsx'),
        route('all-users', 'routes/admin/allUsers.tsx'),
        route('trips', 'routes/admin/trips.tsx'),
        route('trips/create', 'routes/admin/createTrip.tsx'),
    ]),
] satisfies RouteConfig;