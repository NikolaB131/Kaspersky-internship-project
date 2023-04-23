import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import Root from './pages/Root';
import Welcome from './pages/Welcome';
import Error from './pages/Error';
import Main from './pages/Main';
import List from './pages/Main/pages/List';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="welcome" />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="main" element={<Main />}>
        <Route index element={<Navigate to="list" />} />
        <Route path="list" element={<List />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Route>,
  ),
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
