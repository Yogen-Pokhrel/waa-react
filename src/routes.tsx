import { lazy } from "react";

const Dashboard = lazy(() => import("./components/organisms/dashboard/Dashboard"));
const AddPostContainer = lazy(() => import("./components/organisms/post/AddPostContainer"));
const EditPostContainer = lazy(() => import("./components/organisms/post/EditPostContainer"));

export const routes = [
	{ path: "/", element: <Dashboard /> },
    { path: "/post/add", element: <AddPostContainer /> },
	{ path: "/post/edit/:id", element: <EditPostContainer /> },
	{
		path: "/403",
		element: <div>Forbidden Resource</div>
	},
	{
		path: "*",
		element: <div>Not Authorized</div>
	},
]