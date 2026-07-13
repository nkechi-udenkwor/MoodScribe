import { Icon } from '@iconify/react/dist/iconify.js';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import clsx from 'clsx';
import {
  addQuote,
  fetchQuotes,
  deleteQuote,
} from '../../../redux/quotes/features';
import { getUser } from '../../../redux/auth/features';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { quotes } = useAppSelector((state) => state.quotes);
  const { status } = useAppSelector((state) => state.quote);
  const { user } = useAppSelector((state) => state.user);
  const [newQuote, setNewQuote] = useState('');
  const userName = user?.fullName
    .split(' ')
    .map((name) => `${name[0].toUpperCase()}${name.slice(1)}`)
    .join(' ');

  const getRandomColor = () => {
    const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFECB3', '#f4438a'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    dispatch(fetchQuotes());
    dispatch(getUser());
    status === 'succeeded' && dispatch(fetchQuotes());
  }, [dispatch, status]);

  const getRandomIcon = () => {
    const icons = [
      'fxemoji:beachumbrella',
      'meteocons:star-fill',
      'twemoji:fire',
      'noto:light-bulb',
      'icon-park-twotone:muscle',
      'streamline-emojis:love-hotel',
      'noto:bicycle',
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const defaultIconColor = ['#f4e543', '', '#f4c543', '#df43f4'];
  const color = getRandomColor();
  const icon = getRandomIcon();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuote.trim()) {
      dispatch(addQuote({ quote: newQuote, icon, color }));
      setNewQuote('');
    }
  };

  return (
    <div>
      <div className='container mx-auto max-w-2xl px-4 text-white'>
        <section className='pb-8 pt-3 text-center'>
          <h1 className='text-4xl tracking-wider'>
            <Icon
              icon='ph:scribble-bold'
              className='inline-block mr-4 text-teal-100'
            />
            Mood Scribe
            <Icon
              icon='ph:scribble-bold'
              className='inline-block ml-4 text-teal-100'
            />
          </h1>
          <p className='text-lg py-2 tracking-wider'>
            Document your day, Discover your mood.
          </p>
        </section>
        <section className='sm:grid grid-cols-auto-fit-100 gap-4 max-h-[50vh] overflow-y-auto pr-1'>
          {quotes.quote?.map((quote, idx) => (
            <div
              key={quote._id || idx}
              className={clsx(
                'my-4 sm:my-0 rounded-sm relative group overflow-hidden',
                idx % 3 === 0 ? 'col-span-2' : 'col-span-1',
              )}
              style={{
                background: quote.color,
              }}
              onClick={() =>
                quote._id && dispatch(deleteQuote(quote._id as string))
              }
            >
              {idx > 3 && (
                <div className='absolute inset-0 z-10 flex justify-center items-center bg-black bg-opacity-35 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out'>
                  <Icon
                    icon='ic:baseline-delete'
                    className='w-6 h-6 cursor-pointer'
                  />
                </div>
              )}
              <div className='flex justify-between items-center h-full'>
                <p className='px-2 py-3'>
                  {idx === 0 ? (
                    <span className='block font-semibold text-lg text-gray-200'>
                      Hi {userName}
                    </span>
                  ) : null}
                  {quote.quote}
                </p>
                <Icon
                  icon={quote.icon}
                  className='w-9 h-9 flex-shrink-0 mx-2'
                  style={{ color: defaultIconColor[idx] }}
                />
              </div>
            </div>
          ))}
        </section>
        <section className='my-4'>
          <form
            onSubmit={handleSubmit}
            className='p-4 bg-slate-700/60 bg-opacity-65 shadow-lg rounded-sm'
          >
            <label htmlFor='newQuote' className='block'>
              Add a new quote
            </label>
            <input
              type='text'
              id='newQuote'
              name='newQuote'
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              className='outline-none w-full py-2 px-3 mt-3 mb-7 text-slate-800 rounded-sm focus:border-cyan-600'
            />
            <button
              type='submit'
              className='text-center bg-cyan-700 hover:bg-cyan-500 py-2 px-4 rounded-sm'
            >
              Add Quote
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Home;
