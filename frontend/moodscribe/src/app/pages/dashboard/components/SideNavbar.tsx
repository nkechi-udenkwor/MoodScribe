import { FC } from 'react';
import { Route } from '../../../../utils/types';
import { Icon } from '@iconify/react';
import 'flowbite/dist/flowbite.min.css';
import { Tooltip } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../../assets/dashboard/logo-transparent.png';
import { useAppDispatch } from '../../../../redux/store';
import { signout } from '../../../../redux/auth/features';
import clsx from 'clsx';

const routes: Route[] = [
  {
    id: 1,
    name: 'Home',
    icon: 'iconoir:home',
    route: '/dashboard',
  },

  {
    id: 2,
    name: 'Journals',
    icon: 'el:livejournal',
    route: '/dashboard/journals',
  },

  {
    id: 3,
    name: 'Analysis',
    icon: 'carbon:text-link-analysis',
    route: '/dashboard/analysis',
  },

  {
    id: 4,
    name: 'Resources',
    icon: 'grommet-icons:resources',
    route: '/dashboard/resources',
  },
];
interface Props {
  toggleNav: () => void;
}

const SideNavbar: FC<Props> = ({ toggleNav }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <div className='flex h-full min-h-screen flex-col bg-slate-800 shadow-lg'>
      <div className='flex-1 overflow-y-auto bg-theme py-4 md:ml-1'>
        <div className='flex items-center gap-1 border-b border-slate-400 px-4 py-6'>
          <Link to='/'>
            <img src={Logo} alt='MoodScribe Logo' />
          </Link>
        </div>
        <div className='space-y-1 px-2'>
          {routes.map((navItem) => {
            const isActive = navItem.route === location.pathname;
            return (
              <nav key={navItem.id}>
                {navItem.route && (
                  <Link
                    to={navItem.route}
                    onClick={() => {
                      toggleNav();
                    }}
                    className={clsx(
                      'group my-3 flex h-12 w-full items-center justify-between gap-4 rounded px-2',
                      isActive
                        ? 'border-r-4 border-teal-100 text-teal-100'
                        : 'text-white',
                    )}
                  >
                    <div className='flex w-full items-center gap-2 rounded-sm p-3 hover:bg-slate-300 group-hover:text-slate-800'>
                      <div className='flex h-9 w-9 items-center justify-center text-lg font-medium'>
                        <Icon
                          icon={navItem.icon}
                          className='h-5 w-5 group-hover:text-primary-500'
                        />
                      </div>
                      <p className='text-left font-medium'>{navItem.name}</p>
                    </div>
                  </Link>
                )}
              </nav>
            );
          })}
        </div>
      </div>
      <div className='shrink-0 border-t border-slate-600 px-9 py-6'>
        <Tooltip content='Logout' placement='top'>
          <button
            type='button'
            onClick={() => dispatch(signout())}
            className='rounded-lg bg-cyan-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            <Icon icon='tabler:logout' className='h-7 w-7 text-white' />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SideNavbar;
